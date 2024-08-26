import React from 'react';

export interface LineWrapperProp<T = any> {
  /**
   * The current index of the line.
   */
  lineIndex: number;
  /**
   * Extra props forwarded from SplitText.
   */
  extraProps?: T;

  children: React.ReactNode;
}

export const LineWrapper = ({ children }: LineWrapperProp) => (
  <div>{children}</div>
);

export interface WordWrapperProp<T = any> {
  /**
   * The current line index where the word wrapper lives.
   */
  lineIndex: number;
  /**
   * The current index of the word.
   */
  wordIndex: number;
  /**
   * The current index of the total wrapped words inside <SplitText />.
   */
  countIndex: number;
  /**
   * Extra props forwarded from SplitText.
   */
  extraProps?: T;

  children: React.ReactNode;
}

export const WordWrapper = ({ children }: WordWrapperProp) => (
  <span style={{ whiteSpace: 'pre' }}>{children}</span>
);

export interface LetterWrapperProp<T = any> {
  /**
   * The current line index where the letter wrapper lives.
   */
  lineIndex: number;
  /**
   * The current word index where the letter wrapper lives.
   */
  wordIndex: number;
  /**
   * The current index of the letter.
   */
  letterIndex: number;
  /**
   * The current index of the total wrapped letters inside `<SplitText />`.
   */
  countIndex: number;
  /**
   * Extra props forwarded from SplitText.
   */
  extraProps?: T;

  children: React.ReactNode;
}

export const LetterWrapper = ({ children }: LetterWrapperProp) => (
  <span>{children}</span>
);
