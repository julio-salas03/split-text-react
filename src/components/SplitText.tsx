import React from 'react';
import {
  LineWrapper,
  WordWrapper,
  LetterWrapper,
  LetterWrapperProps,
  WordWrapperProps,
  LineWrapperProps,
} from './Wrappers';
import { debounce, HTMLElementTag } from '../utils';

const DefaultLineWrapper = React.memo(LineWrapper);
const DefaultWordWrapper = React.memo(WordWrapper);
const DefaultLetterWrapper = React.memo(LetterWrapper);

export interface SplitTextProps<T = any> {
  /**
   * className to forward to the container.
   * @type string
   */
  className?: string;
  /**
   * A style object to forward to the container.
   * @type CSSProperties
   */
  style?: React.CSSProperties;
  /**
   * A custom component to wrap each split line.
   * @type ComponentType<LineWrapperProp>
   */
  LineWrapper?: React.ComponentType<LineWrapperProps>;
  /**
   * A custom component to wrap each split word.
   * @type ComponentType<WordWrapperProp>
   */
  WordWrapper?: React.ComponentType<WordWrapperProps>;
  /**
   * A custom component to wrap each split letter.
   * @type ComponentType<LetterWrapperProp>
   */
  LetterWrapper?: React.ComponentType<LetterWrapperProps>;
  /**
   * An extra value that will be forwarded to each wrappers.
   * @type T = any
   */
  extraProps?: T;

  /**
   * The content to be split and rendered
   */
  children: React.ReactNode;

  /**
   * The time the resize listener should be debounced by. In milliseconds.
   *
   * See what is "debouncing" here: https://medium.com/@jamischarles/what-is-debouncing-2505c0648ff1
   * @type number
   * @default 400
   */
  debounceTime?: number;

  /**
   * The HTML tag as the container for the text.
   * @default "span"
   * @type HTMLElementTag
   */
  tag?: HTMLElementTag;
}

const DEFAULT_CONTAINER_TAG = 'span';

export const SplitText = React.forwardRef<HTMLElement, SplitTextProps>(
  function SplitText(
    {
      children,
      className,
      style = {},
      LineWrapper = DefaultLineWrapper,
      WordWrapper = DefaultWordWrapper,
      LetterWrapper = DefaultLetterWrapper,
      extraProps,
      debounceTime = 400,
      tag,
    },
    ref
  ) {
    let text = '';

    const Container = (tag || DEFAULT_CONTAINER_TAG) as JSX.ElementType;

    React.Children.map(children, child => {
      if (typeof child === 'string' || typeof child === 'number') {
        text += String(child);
      } else {
        throw new Error(`SplitText expect a text as children`);
      }
    });
    const [lines, setLines] = React.useState<Array<string>>([]);
    const elRef = React.useRef<HTMLElement | null>(null);
    const maxCharPerLine = React.useRef<number>(0);

    React.useEffect(() => {
      const el = elRef.current;

      if (!el) return;

      const resetLines = debounce(() => {
        setLines([]);
      }, debounceTime);

      const resizeObserver = new ResizeObserver(resetLines);

      resizeObserver.observe(el);

      return () => {
        resizeObserver.unobserve(el);
      };
    }, [debounceTime]);

    /**
     * Splits text into lines based on DOM measurements.
     */
    React.useLayoutEffect(() => {
      const el = elRef.current;

      if (lines.length || !el) return;

      maxCharPerLine.current = 0;
      let lastLineTop: null | number = null;
      let DOMLines: string[] = [];
      let words: string[] = [];
      for (const child of Array.from(el.children)) {
        const lineTop = child.getBoundingClientRect().top;
        if (lastLineTop === null) lastLineTop = lineTop;
        if (lineTop !== lastLineTop) {
          DOMLines.push(words.join(' '));
          words = [];
        }
        lastLineTop = lineTop;
        words.push((child.textContent || '').trim());
      }
      DOMLines.push(words.join(' '));
      setLines(DOMLines);
    }, [lines.length]);

    /**
     * Update lines when children changes
     */
    React.useLayoutEffect(() => {
      if (lines.length > 0) {
        const charPerLine =
          maxCharPerLine.current ||
          (lines.map(line => line.length).sort((a, b) => b - a)[0] ?? 0);
        const newLines: string[] = [];
        let line: string = '';
        let charCount = 0;
        const words = text.split(' ');
        for (const word of words) {
          charCount += word.length + 1;
          if (charCount > charPerLine + 1) {
            newLines.push(line);
            line = '';
            charCount = 0;
          }
          line += word.trim() + ' ';
        }

        newLines.push(line);
        const trimmedNewLines = newLines.map(line => line.trim());

        const JOIN_CHAR = ' ';

        if (
          trimmedNewLines.join(JOIN_CHAR).trim() ===
          lines.join(JOIN_CHAR).trim()
        )
          return;

        setLines(trimmedNewLines.map(line => line.trim()));

        if (charPerLine > maxCharPerLine.current) {
          maxCharPerLine.current = charPerLine;
        }
      }
    }, [lines, text]);

    let wordCount = 0;
    let letterCount = 0;

    const styles = Object.assign(
      style,
      Container === DEFAULT_CONTAINER_TAG ? { display: 'block' } : {}
    );

    return lines.length ? (
      <Container
        className={className}
        ref={(el: HTMLElement) => {
          elRef.current = el;
          if (!ref) return;
          if (typeof ref == 'function') {
            ref(el);
          } else {
            ref.current = el;
          }
        }}
        style={styles}
      >
        {lines.map((line, i) => {
          let words = line.split(' ');
          words = words.map((word, i) =>
            i === words.length - 1 ? word : word + ' '
          );
          return (
            <LineWrapper key={i} lineIndex={i} extraProps={extraProps}>
              {words.map((word, j) => {
                const letters = word.split('');
                return (
                  <WordWrapper
                    key={j}
                    lineIndex={i}
                    wordIndex={j}
                    countIndex={wordCount++}
                    extraProps={extraProps}
                  >
                    {letters.map((char, k) => (
                      <LetterWrapper
                        key={k}
                        lineIndex={i}
                        wordIndex={j}
                        letterIndex={k}
                        countIndex={letterCount++}
                        extraProps={extraProps}
                      >
                        {char}
                      </LetterWrapper>
                    ))}
                  </WordWrapper>
                );
              })}
            </LineWrapper>
          );
        })}
      </Container>
    ) : (
      <Container className={className} ref={elRef} style={styles}>
        {text.split(' ').map((word, i) => (
          <span key={i}>{word} </span>
        ))}
      </Container>
    );
  }
);
