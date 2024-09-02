import React from 'react';
import { render } from '@testing-library/react';
import { SplitText } from '../src/index';
import ResizeObserver from 'resize-observer-polyfill';

describe('SplitText', () => {
  beforeAll(() => {
    global.ResizeObserver = ResizeObserver;
  });

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should only accept text children', () => {
    expect(() =>
      render(
        <SplitText>
          <div>foo</div>
        </SplitText>
      )
    ).toThrow();
  });

  it('should support computed text', () => {
    expect(() => render(<SplitText>foo {5}</SplitText>)).not.toThrow();
  });

  it('should forward the ref to the component', () => {
    const Component: React.FC = () => {
      const ref = React.useRef(null);
      setTimeout(() => {
        expect(ref.current).not.toBeNull();
        expect(ref.current).toBeInstanceOf(HTMLElement);
      }, 500);
      return <SplitText ref={ref}>Hello World</SplitText>;
    };

    render(<Component />);
  });
});
