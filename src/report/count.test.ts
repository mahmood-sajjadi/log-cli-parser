import { countInStream, count } from './count';

describe('countInStream', () => {
  test('WHEN item EXISTS in list INCREASE the count', () => {
    const list = [{item: 'abc', count: 10}];
    const result = countInStream(list, 'abc');
    expect(result).toHaveLength(1);
    expect(result[0].count).toEqual(11);
  });

  test('WHEN item NOT EXISTS in list ADD the item', () => {
    const list = [{item: 'abc', count: 10}];
    const item = 'mno';
    const result = countInStream(list, item);
    expect(result).toHaveLength(2);
    expect(result.find(x => x.item === item)?.count).toEqual(1);
    expect(result.find(x => x.item === 'abc')?.count).toEqual(10);
  });
});

describe('count', () => {
  test('WHEN data EXISTS then CREATE count result', () => {
    const list = [{a: 'abc', b: 10}, {a: 'mno', b: 100}, {a: 'abc', b: 3}];
    const result = count(list, (item) => item.a);
    expect(result).toHaveLength(2);
    expect(result.find(x => x.item === 'abc')?.count).toEqual(2);
    expect(result.find(x => x.item === 'mno')?.count).toEqual(1);
  });
});
