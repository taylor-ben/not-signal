import { useEffect, useState } from "react"
import { BehaviorSubject, map } from "rxjs"

export const createExternalStore = <T,>(initial: T) => {
  const bs = new BehaviorSubject(initial)
  const useStore = (onChange?: (change: T) => T) => {
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
  const setStore = (input: T | ((prevValue: T) => T)) => {
    if (typeof input === 'function') {
      bs.next((input as ((prevValue: T) => T))(bs.value))
    } else {
      bs.next(input)
    }
  }
  return [useStore, setStore] as const
}
