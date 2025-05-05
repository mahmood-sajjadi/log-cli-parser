import { getTopResults } from './topResults';

describe('getTopResults', () => {
  test('WHEN list BIGGER than request PROVIDE what requested', () => {
    const list = ['abc', 'mno', 'xyz'];
    const result = getTopResults(list, 2);
    expect(result).toHaveLength(2);
    expect(result).toMatchSnapshot();
  });

  test('WHEN list SMALLER than request PROVIDE entire array', () => {
    const list = ['abc', 'mno', 'xyz'];
    const result = getTopResults(list, 10);
    expect(result).toHaveLength(3);
    expect(result).toMatchSnapshot();
  });

  test('WHEN list EMPTY than return empty array', () => {
    const list: any[] = [];
    const result = getTopResults(list, 5);
    expect(result).toHaveLength(0);
    expect(result).toMatchSnapshot();
  });
});
