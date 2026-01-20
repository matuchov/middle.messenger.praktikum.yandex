import { expect } from 'chai';
import { describe, it } from 'mocha';

const hello = (name: string): string => `Hello ${name}`;
describe('Typescript + Babel usage suite', () => {
  it('should return string correctly', () => {
    expect(hello('mocha'), 'Hello mocha');
  });
});
