import { useEffect, useState } from "react"
import { BehaviorSubject, map } from "rxjs"
import React from 'react'

type Signal<T> = JSX.Element & {
  useValue: (onChange?: ((change: T) => T) | undefined) => T
  setValue: (input: T | ((prevValue: T) => T)) => void
  getValue: () => T
}

export const createSignal = <T,>(initial: T): Signal<T> => {
  const bs = new BehaviorSubject(initial)
  const useValue = (onChange?: (change: T) => T) => {
    const [store, setStore] = useState(initial)
    useEffect(() => {
      const subscription = bs
          .pipe(map((value) => {
            return onChange ? onChange(value) : value
          }))
          .subscribe(value => setStore(value))
        return () => subscription.unsubscribe()
    }, [])
    return store
  }
  const setValue = (input: T | ((prevValue: T) => T)) => {
    if (typeof input === 'function') {
      bs.next((input as ((prevValue: T) => T))(bs.value))
    } else {
      bs.next(input)
    }
  }

  const getValue = () => bs.value

  const Value = () => {
    const value = useValue()
    return <>{value}</>
  }

  const element = <Value />

  return {
    ...element,
    getValue,
    useValue,
    setValue,
  }
}
