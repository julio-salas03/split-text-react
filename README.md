# Split Text React

Helps you create beautiful text animations by splitting and wrapping your text into lines, words and letters with a custom element.

Want to see the library in action? Check out these awesome [Demos](#TODO). If you're ready to get started, visit the [Installation Guide](#installation) and the [API Documentation](https://julio-salas03.github.io/split-text-react/api/).

## Standout Features

- _Fully Responsive_ 📐: recalculates wrappers on component resize with `ResizeObserver`, rather than on window resize.
- _Lightweight_ 🪶: **zero** dependencies, and **less than 7kb** un-minified.
- _Semantic_ 📝: wraps you text in `span` by default, so you can use it inside `h1` and many other elements. You can also select the container's rendered container tag via [props](https://julio-salas03.github.io/split-text-react/api/#props).

## Installation

You can get started by running the following command

```bash
npm i split-text-react
```

That's it! You can now import the component and the types. Checkout the [API Documentation](https://julio-salas03.github.io/split-text-react/api/) to learn how to use them

```tsx
import SplitText {
  SplitTextProps,
  LineWrapperProps,
  WordWrapperProps,
  LetterWrapperProps,
} from 'split-text-react';

export default function Component() {
    return <SplitText>This is awesome!</SplitText>
}
```

## Deep Dive

In the following sections I'll explain some aspects of the library I think you might want to be aware of when using the library. You're completely free to give them a miss, but taking a look would at them would help you understand the library better

### The `ResizeObserver`

This is the web `API` that allows `SplitText` to only re-calculate the wrappers when it has actually been resized, rather than listening to the `window`'s resize event. You can check the [MDN documentation for this API here](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).

Although it sits at `96.17%` support on caniuse.com at the moment of writing this README, if you ever encounter issues with compatibility you can install the [`resize-observer-polyfill`](https://www.npmjs.com/package/resize-observer-polyfill) to patch this API.

### The default wrappers

If you've used [GSAP's `SplitText`](https://gsap.com/docs/v3/Plugins/SplitText/) before, you'd probably noticed we're using `span` elements rather than `div`. This is intentional, as `span` elements can be children of basically any HTML element due to them being `inline` by default. However, we're setting their `display` property to `inline-block` to avoid issues with the `transform` property in some browsers.

## Acknowledgments

- **[@CyriacBr](https://github.com/CyriacBr)**: This package was inspired/forked from [`react-split-text`](https://github.com/CyriacBr/react-split-text) _(hence this package's super creative name)_. Thank you for building this awesome library! ❤️
- **The GSAP team**: More specifically the [SplitText's features section](https://gsap.com/docs/v3/Plugins/SplitText/#features). It helped me figure out the issues I was having with `span` elements. If you're building animations with this package, definitely checkout [`gsap`](https://gsap.com/docs/v3/GSAP/). It's one of the best animation libraries out there.
