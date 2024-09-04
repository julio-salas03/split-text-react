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
          <div>Lorem ipsum</div>
        </SplitText>
      )
    ).toThrow();
  });

  it('should support computed text', () => {
    expect(() => render(<SplitText>Lorem {'ipsum'}</SplitText>)).not.toThrow();
  });

  it('should forward the ref to the component', () => {
    let checkRef = () => {};

    const Component = () => {
      const ref = React.useRef(null);

      checkRef = () => {
        expect(ref.current).not.toBeNull();
        expect(ref.current).toBeInstanceOf(HTMLElement);
      };

      return <SplitText ref={ref}>Lorem ipsum</SplitText>;
    };

    render(<Component />);

    checkRef();
  });

  it('should add `display: block` if the "tag" prop is the default (span)', () => {
    let checkStyles = () => {};

    const Component = () => {
      const ref = React.useRef<HTMLSpanElement>(null);

      checkStyles = () => {
        const el = ref.current;
        expect(el?.style.display).toBe('block');
      };

      return (
        <SplitText tag="span" ref={ref}>
          Lorem ipsum
        </SplitText>
      );
    };

    render(<Component />);

    checkStyles();
  });

  it("shouldn't add any `display` value if the 'tag' prop is not the default", () => {
    let checkStyles = () => {};

    const Component = () => {
      const ref = React.useRef<HTMLDivElement>(null);

      checkStyles = () => {
        const el = ref.current;
        expect(el?.style.display).toBeFalsy();
      };

      return (
        <SplitText tag="div" ref={ref}>
          Lorem ipsum
        </SplitText>
      );
    };

    render(<Component />);

    checkStyles();
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
