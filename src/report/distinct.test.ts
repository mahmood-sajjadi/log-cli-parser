import { distinctInStream, distinct } from './distinct';

describe('distinctInStream', () => {
  test('WHEN item EXISTS in list do not ADD', () => {
    const list = ['abc', 'mno'];
    const result = distinctInStream(list, 'abc');
    expect(result).toHaveLength(2);
    expect(result).toMatchSnapshot();
  });

  test('WHEN item NOT EXISTS in list ADD', () => {
    const list = ['abc', 'mno'];
    const result = distinctInStream(list, 'xyz');
    expect(result).toHaveLength(3);
    expect(result).toMatchSnapshot();
  });
});

describe('distinct', () => {
  test('WHEN list PROVIDED then CREATE distinct result', () => {
    const list = [{a: 'abc', b: 10}, {a: 'mno', b: 100}, {a: 'abc', b: 3}];
    const result = distinct(list, (item) => item.a);
    expect(result).toHaveLength(2);
    expect(result).toMatchSnapshot();
  });
});
