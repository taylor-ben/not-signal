'use client'

import { useEffect, useMemo, useState } from 'react'
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs'

export type Signal<T> = JSX.Element & {
  use: () => T
  effect: (effectFn: (v: T) => void) => () => void
  useSignalEffect: (effectFn: (v: T) => void) => void
  peek: () => T
  set: (input: T | ((prevValue: T) => T)) => void
  compute: <U>(computeFn: ComputeFn<T, U>) => ComputedSignal<U>
  useCompute: <U>(computeFn: ComputeFn<T, U>) => ComputedSignal<U>
  observable: Observable<T>
  zero: () => void
}

export type ComputedSignal<T> = Omit<Signal<T>, 'set' | 'zero'>
export type ComputeFn<T, U> = (prevValue: T) => U

export const useSignal = <T,>(initial: T): Signal<T> => {
  return useMemo(() => createSignal(initial), [])
}

export const createSignal = <T,>(initial: T): Signal<T> => {
  const bs = new BehaviorSubject(initial)

  const peek = () => bs.value

  const set = (input: T | ((prevValue: T) => T)) => {
    if (typeof input === 'function') {
      bs.next((input as (prevValue: T) => T)(structuredClone(bs.value)))
    } else {
      bs.next(structuredClone(input))
    }
  }

  const basicSignal = createBasicSignal(bs, peek)

  return {
    ...basicSignal,
    set: set,
    zero: () => set(initial),
  }
}

function createComputedSignal<T, U>(
  obs: Observable<T>,
  computeFn: ComputeFn<T, U>,
  peekOriginal: () => T
): ComputedSignal<U> {
  const computedObservable = obs.pipe(map(computeFn))
  const peek = () => computeFn(peekOriginal())
  return createBasicSignal(computedObservable, peek)
}

function createBasicSignal<T>(obs: Observable<T>, peek: () => T): ComputedSignal<T> {
  const use = () => useSignalValue(obs, peek())
  const effect = (effectFn: (v: T) => void) => {
    const subscription = obs.subscribe(effectFn)
    return () => subscription.unsubscribe()
  }
  const useSignalEffect = (effectFn: (v: T) => void) => useEffect(() => effect(effectFn), [obs])
  const SignalComponent = () => {
    'use client'
    const value = use()
    return <>{value}</>
  }
  const compute = <U,>(computeFn: ComputeFn<T, U>) => createComputedSignal(obs, computeFn, peek)
  return {
    ...(<SignalComponent />),
    peek: peek,
    use: use,
    effect,
    useSignalEffect,
    compute,
    useCompute: (computeFn) => useMemo(() => compute(computeFn), [obs]),
    observable: obs,
  }
}

function useSignalValue<T>(observable: Observable<T>, initial: T): T {
  const [value, setValue] = useState(initial)
  useEffect(() => {
    const subscription = observable.subscribe(setValue)
    return () => subscription.unsubscribe()
  }, [observable])
  return value
}

export function combine<U, T extends any[]>(
  signals: readonly [...{ [K in keyof T]: ComputedSignal<T[K]> }],
  combineFn: (...values: { [K in keyof T]: T[K] }) => U
): ComputedSignal<U> {
  const peek = () =>
    combineFn(...(signals.map((signal) => signal.peek()) as unknown as { [K in keyof T]: T[K] }))

  const observables = signals.map((signal) => signal.observable)

  const observablesCombined = combineLatest(observables).pipe(
    map((values) => combineFn(...(values as unknown as { [K in keyof T]: T[K] })))
  )

  return createBasicSignal(observablesCombined, peek)
}
