# not-signal

`not-signal` is a React hook library designed to offer a reactive state management solution inspired by signal mechanisms, but tailored specifically for React applications. By leveraging the `rxjs` observables, it introduces a robust and adaptable approach to managing state changes within components. This library enables developers to create signals, compute derived signals, and manage side effects seamlessly.

## Installation

To integrate `not-signal` into your project, install it through npm by executing:

```bash
npm install not-signal
```

## Usage

Begin by importing `createSignal` from `not-signal` to initiate signal creation and management in your React app.

### Creating a Signal

```jsx
import { createSignal } from 'not-signal';

const countSignal = createSignal(0); 
// Initializes a global signal with an initial value of 0.

const CounterComponent = () => {
  const value = countSignal.useValue(); 
  // Subscribes to signal changes, rerendering the component accordingly.

  return (
    <div>
      <p>Current count: {value}</p>
      <button onClick={() => {
        countSignal.setValue((prev) => prev + 1)
      }}>Increment</button>
    </div>
  );
};
```

## Rendering Optimizations

Utilize the signal directly within JSX to minimize component subscriptions and unnecessary re-renders. Only the signal's content will be updated:

```jsx
const countSignal = createSignal(0);

function Unoptimized() {
  // Triggers component re-renders on `countSignal` changes.
  const value = countSignal.useValue();
  return <p>{value}</p>;
}

function Optimized() {
  // Updates text automatically without rerendering the component.
  return <p>{countSignal}</p>;
}
```

## Local State Management with Signals

While most application states are managed globally, components often require their own internal state. For such cases, `not-signal` offers `useSignal` and `useComputed` hooks for creating and computing signals within components:

```jsx
import { useSignal } from "not-signal";

function Counter() {
  const count = useSignal(0);
  const double = count.useComputed(value => value * 2);

  return (
    <div>
      <p>Current count: {count}, double: {double}</p>
      <button onClick={() => count.setValue(count.peek() + 1)}>Increment</button>
    </div>
  );
}
```

## Advanced Features

### Using `peek()`

The `peek()` method enables reading the current signal value without subscription or triggering re-renders, ideal for event-based updates:

```jsx
function Counter() {
  const count = useSignal(0);
  return (
    <div>
      <button onClick={() => count.setValue(count.peek() + 1)}>Increment</button>
    </div>
  );
}
```

### Using `compute`

The `compute` method facilitates the creation of `ComputedSignal`s from existing signals, allowing for dynamic and reactive derived states:

```jsx
const celsiusSignal = createSignal(0);
const fahrenheitSignal = celsiusSignal.compute(c => c * 9 / 5 + 32);

celsiusSignal.setValue(36); // Automatically updates `fahrenheitSignal`.

const TemperatureConverter = () => {
  return (
    <div>
      <p>Celsius: {celsiusSignal.useValue()}</p>
      <p>Fahrenheit: {fahrenheitSignal.useValue()}</p>
    </div>
  );
};
```

This method enhances state management by enabling efficient and logical reactive transformations, streamlining the development of complex reactive systems.

## License

`not-signal` is distributed under the MIT License. For more details, refer to the [LICENSE](https://github.com/taylor-ben/not-signal/blob/main/LICENSE) file in the repository.
