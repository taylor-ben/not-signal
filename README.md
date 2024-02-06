# not-signal

`not-signal` is a React hook library designed to offer a reactive state management solution inspired by signal mechanisms, but tailored specifically for React applications. By leveraging the `rxjs` observables, it introduces a robust and adaptable approach to managing state changes within components. This library enables developers to create signals, compute derived signals, and manage side effects seamlessly.

[Example with global state](https://codesandbox.io/p/devbox/vite-react-ts-forked-sd6llg?workspaceId=b9e29851-b599-40e9-b8df-c7e54ea597e5&embed=1&file=%2Fsrc%2FApp.tsx&layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clsaen0v400073b6htgel6uus%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clsaen0v400023b6hni3s0qwn%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clsaen0v400043b6h83tq7hhe%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clsaen0v400063b6h31mb14hk%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clsaen0v400023b6hni3s0qwn%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clsaen0v300013b6heg8y2xzp%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252F_gitignore%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522id%2522%253A%2522clsaen0v400023b6hni3s0qwn%2522%252C%2522activeTabId%2522%253A%2522clsaen0v300013b6heg8y2xzp%2522%257D%252C%2522clsaen0v400063b6h31mb14hk%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clsaen0v400053b6h5u8ckbbs%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A3000%252C%2522path%2522%253A%2522%2522%257D%255D%252C%2522id%2522%253A%2522clsaen0v400063b6h31mb14hk%2522%252C%2522activeTabId%2522%253A%2522clsaen0v400053b6h5u8ckbbs%2522%257D%252C%2522clsaen0v400043b6h83tq7hhe%2522%253A%257B%2522id%2522%253A%2522clsaen0v400043b6h83tq7hhe%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clsaen0v400033b6hqk1zay23%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clsaen0v400033b6hqk1zay23%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

[Example with local state](https://codesandbox.io/p/devbox/not-signal-example-forked-qgzj5f?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clsaen0v400073b6htgel6uus%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clsaen0v400023b6hni3s0qwn%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clsaen0v400043b6h83tq7hhe%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clsaen0v400063b6h31mb14hk%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clsaen0v400023b6hni3s0qwn%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clsaen0v300013b6heg8y2xzp%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252F_gitignore%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522id%2522%253A%2522clsaen0v400023b6hni3s0qwn%2522%252C%2522activeTabId%2522%253A%2522clsaen0v300013b6heg8y2xzp%2522%257D%252C%2522clsaen0v400063b6h31mb14hk%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clsaen0v400053b6h5u8ckbbs%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A3000%252C%2522path%2522%253A%2522%2522%257D%255D%252C%2522id%2522%253A%2522clsaen0v400063b6h31mb14hk%2522%252C%2522activeTabId%2522%253A%2522clsaen0v400053b6h5u8ckbbs%2522%257D%252C%2522clsaen0v400043b6h83tq7hhe%2522%253A%257B%2522id%2522%253A%2522clsaen0v400043b6h83tq7hhe%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clsaen0v400033b6hqk1zay23%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clsaen0v400033b6hqk1zay23%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

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
  // Triggers component re-renders on countSignal changes.
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

celsiusSignal.setValue(36); // Automatically updates fahrenheitSignal.

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

