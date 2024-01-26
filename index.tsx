import React from 'react'
import { useEffect, useMemo, useState } from "react"
import { BehaviorSubject, map, Observable } from "rxjs"

export type Signal<T> = JSX.Element & {
  useValue: () => T
  peek: () => T
  setValue: (input: T | ((prevValue: T) => T)) => void
  compute: <U>(computeFn: ComputeFn<T, U>) => ComputedSignal<U>
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
  const SignalComponent = () => {
    const value = useValue()
    return <>{value}</>
  }
  return {
    ...(<SignalComponent />),
    peek,
    useValue,
    compute: (computeFn) => createComputedSignal(obs, computeFn, peek),
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