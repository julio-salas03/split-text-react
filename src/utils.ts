import React from 'react';

export function debounce<T extends any[]>(
  func: (...args: T) => any,
  timeout: number
): (...args: T) => void {
  let timer: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

type KeysMatching<T extends object, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

/**
 * This type extract all the HTML tag names from `JSX.IntrinsicElements`,
 * as it includes the tags for both HTML and SVG elements
 */
export type HTMLElementTag = KeysMatching<
  JSX.IntrinsicElements,
  React.DetailedHTMLProps<React.HtmlHTMLAttributes<HTMLElement>, HTMLElement>
>;
