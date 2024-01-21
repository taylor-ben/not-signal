# create-external-store

This npm package provides easy-to-use and heighly performant state manager

## Installation

To install this package, run the following command:

```bash
npm install create-external-store
```

## Usage

createExternalStore return a hook and a setter.

Use the hook in the component, use the setter anywhere.
When you use the setter `setNumber(2)` components which use the hook `useNumber()` would be rerendered and display the new value. 

```tsx
const [useNumber, setNumber] = createExternalStore<number>(1)

setInterval(() => {
  setNumber(num => num + 1)
}, 1000)

function App() {
  const number = useNumber()
  const numberSquared = useNumber(num => num*num*num)
  return (
    <>
    number {number}
    <div>number squared {numberSquared}</div>
    </>
  )
}

export default App
```


## License

This package is licensed under the MIT License. See the [LICENSE](https://github.com/taylor-ben/rxjs-hooks/blob/main/LICENSE) file for more information.
