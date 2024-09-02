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
    let checkRef = () => {};

    const Component = () => {
      const ref = React.useRef(null);

      checkRef = () => {
        expect(ref.current).not.toBeNull();
        expect(ref.current).toBeInstanceOf(HTMLElement);
      };

      return <SplitText ref={ref}>Hello World</SplitText>;
    };

    render(<Component />);

    checkRef();
  });

  it('should break text as in the captured snapshot', () => {
    const { container } = render(
      <SplitText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac urna
        hendrerit, aliquet quam eget, faucibus lectus.
      </SplitText>
    );
    expect(container).toMatchSnapshot();
  });
});
