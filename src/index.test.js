import { describe, expect, it } from '@jest/globals';
import { greet } from '.';

describe('mock test', () => {
  it('works!', () => {
    expect.assertions(2);
    expect(greet('world')).toBe('Hello, world! Welcome to ES6.');
    expect(null).toBeNull();
  });
});
