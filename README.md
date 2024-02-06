# not-signal

`not-signal` is a React hook library that provides a reactive state management solution, resembling a signal mechanism but tailored specifically for React applications. It leverages observables from the `rxjs` library to create a powerful and flexible way to manage and react to state changes within your components. The library allows you to create signals, compute derived signals, and handle side effects with ease.

## Installation

To use `not-signal` in your project, you can install it via npm:

```bash
npm install not-signal
```

## Usage
Import the `createSignal` from not-signal to start creating and managing signals in your React application.

### Creating a Signal
```jsx
import React from 'react';
import { createSignal } from 'not-signal';

const countSignal = createSignal(0); // Global signal with the initial value of 0

const CounterComponent = () => {

  const value = countSignal.useValue() // Subscribes to the signal and rerenders the component on each signal change

  return (
    <div>
      <p>Current count: {value}</p>
      <button onClick={() => countSignal.setValue((prev) => prev + 1)}>Increment</button>
    </div>
  );
};
```


## Rendering optimizations
We can use the signal directly in JSX to avoid subscribing to it in the component, and thus avoiding unnessasary rerender. Only the signal itself will be rerendered:

```jsx
const countSignal = createSignal(0);

function Unoptimized() {
  // Re-renders the component when `countSignal` changes:
  const value = countSignal.useValue()
  return <p>{value}</p>;
}

function Optimized() {
  // Text automatically updates without re-rendering the component:
  return <p>{countSignal}</p>;
}
```

## Local state with signal
The majority of application state ends up being passed around using props and context. However, there are many scenarios where components have their own internal state that is specific to that component. Since there is no reason for this state to live as part of the app's global business logic, it should be confined to the component that needs it. In these scenarios, we can create signals as well as computed signals directly within components using the useSignal() and useComputed() hooks:

```jsx
import { useSignal } from "not-signal";

function Counter() {
  const count = useSignal(0);
  const double = count.useComputed((value) => value * 2);

  return (
    <div>
      <p>{count} x 2 = {double}</p>
      <button onClick={() => {
        count.setValue(count.peek() + 1)
      }}>click me</button>
    </div>
  );
}
```

## Using `peek()`

The `peek()` method provides a way to access the current value of a signal without subscribing to it or causing a component to re-render. This method is particularly useful when you need to read the current value of a signal but do not want to trigger a re-render of your component.

### When to Use `peek()`

During an event in time like for example and onClick event

```jsx
function Counter() {
  const count = useSignal(0);
  return (
    <div>
      <button onClick={() => {
        count.setValue(count.peek() + 1)
      }}>click me</button>
    </div>
  );
}
```
Will get the current value of the signal by using `peek()` and set a new value, all without rerendering the `Counter` component.

## Using `compute`

The `compute` method is a powerful feature of the `not-signal` package that allows you to create a new `ComputedSignal` based on the current signal. This derived signal is computed by applying a function to the current signal's value, enabling you to create reactive and dynamic derived states that update automatically when the underlying signal changes.

#### When to Use `compute`

- **Derived State**: When you need to create a state that is derived from another signal's state, such as performing calculations or applying transformations.
- **Reusability**: When you have complex logic that transforms a signal's value in a consistent manner across different components or parts of your application.
- **Performance Optimization**: To avoid unnecessary computations in the component body, especially if the derived state is only needed in response to specific changes in the underlying signal.

#### Example Usage

```jsx
const celsiusSignal = createSignal(0);
const fahrenheitSignal = celsiusSignal.compute(c => c * 9 / 5 + 32);
// Create a computed signal for Fahrenheit

celsiusSignal.setValue(36)
// Fahrenheit signal will update accordingly

const CounterComponent = () => {
  return (
    <div>
      <p>Celsius: {celsiusSignal}</p>
      <p>Fahrenheit: {fahrenheitSignal}</p>
    </div>
  );
};
```

In this example, `compute` is used to create a `fahrenheitSignal` from a `celsiusSignal`. The computation function converts Celsius to Fahrenheit. Whenever the value of `celsiusSignal` changes, `fahrenheitSignal` automatically updates, and any component part using `fahrenheitSignal.useValue()` will re-render to reflect the new Fahrenheit value.

The `compute` method simplifies state management in React applications by encapsulating reactive transformations, promoting cleaner and more maintainable code. It enables you to build complex reactive systems that are easy to reason about and efficient in responding to state changes.

## License

This package is licensed under the MIT License. See the [LICENSE](https://github.com/taylor-ben/not-signal/blob/main/LICENSE) file for more information.
