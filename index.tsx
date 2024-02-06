'use client'

import React from 'react'
import { useEffect, useMemo, useState } from "react"
import { BehaviorSubject, map, Observable } from "rxjs"

export type Signal<T> = JSX.Element & {
  useValue: () => T
  effect: (effectFn: (v: T) => void) => () => void
  useSignalEffect: (effectFn: (v: T) => void) => void
  peek: () => T
  setValue: (input: T | ((prevValue: T) => T)) => void
  compute: <U>(computeFn: ComputeFn<T, U>) => ComputedSignal<U>
  useCompute: <U>(computeFn: ComputeFn<T, U>) => ComputedSignal<U>
}
export type ComputedSignal<T> = Omit<Signal<T>, 'setValue'>
export type ComputeFn<T, U> = (prevValue: T) => U

export const useSignal = <T,>(initial: T): Signal<T> => {
  return useMemo(() => createSignal(initial), [])
}

export const createSignal = <T,>(initial: T): Signal<T> => {
  const bs = new BehaviorSubject(initial)

  const peek = () => bs.value

  const setValue = (input: T | ((prevValue: T) => T)) => {
    if (typeof input === 'function') {
      bs.next((input as ((prevValue: T) => T))(bs.value))
    } else {
      bs.next(input)
    }
  }

  const basicSignal = createBasicSignal(bs, peek)

  return { 
    ...basicSignal,
    setValue,
  }
}

function createComputedSignal<T, U>(obs: Observable<T>, computeFn: ComputeFn<T, U>, peekOriginal: () => T): ComputedSignal<U> {
  const computedObservable = obs.pipe(map(computeFn))
  const peek = () => computeFn(peekOriginal())
  return createBasicSignal(computedObservable, peek)
}

function createBasicSignal<T>(obs: Observable<T>, peek: () => T): ComputedSignal<T> {
  const useValue = () => useSignalValue(obs, peek())
  const effect = (effectFn: (v: T) => void) => {
    const subscription = obs.subscribe(effectFn)
    return () => subscription.unsubscribe()
  }
  const useSignalEffect = (effectFn: (v: T) => void) => useEffect(() => effect(effectFn), [obs])
  const SignalComponent = () => {
    'use client'
    const value = useValue()
    return <>{value}</>
  }
  const compute = <U,>(computeFn: ComputeFn<T, U>) => createComputedSignal(obs, computeFn, peek)
  return {
    ...(<SignalComponent />),
    peek,
    useValue,
    effect,
    useSignalEffect,
    compute,
    useCompute: (computeFn) => useMemo(() => compute(computeFn), [obs]),
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