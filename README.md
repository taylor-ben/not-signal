# not-signal

This npm package provides signals usability without the overengineering

## Installation

To install this package, run the following command:

```bash
npm install not-signal
```

## Usage



```tsx
// Create a signal observable by using createSignal
export const numberSignal = createSignal(1)

// Add 1 to the signal every second by using setValue
setInterval(() => {
  numberSignal.setValue((num) => num + 1);
}, 1000)

// Subscribe to the signal in the component by using useValue hook
function App() {
  const number = numberSignal.useValue()
  return (
    <>
      The number is {number}
    </>
  )
}
```
```tsx
// Alternatively, if we would like to avoid component rerender, we can use the signal directly in the jsx, and only numberSignal would be rerendered.
function App() {
  return (
    <>
      The number is {numberSignal}
    </>
  )
}
```


## License

This package is licensed under the MIT License. See the [LICENSE](https://github.com/taylor-ben/rxjs-hooks/blob/main/LICENSE) file for more information.
