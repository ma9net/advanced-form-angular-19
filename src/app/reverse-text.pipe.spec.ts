import { ReverseTextPipe } from './reverse-text.pipe';

describe('ReverseTextPipe', () => {
  it('create an instance', () => {
    const pipe = new ReverseTextPipe();
    expect(pipe).toBeTruthy();
  });
});
