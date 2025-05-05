import { ApacheLogLineParser, ApacheLogFileParserFactory } from './apache';

describe('ApacheLogLineParser', () => {
  test('WHEN line match PARSE line', () => {
    const line = '177.71.128.21 - - [10/Jul/2018:22:21:28 0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"';
    expect(ApacheLogLineParser(line)).toMatchSnapshot();
  });

  test('WHEN line not match THROW error', () => {
    expect(() => ApacheLogLineParser('')).toThrow('Invalid log format');
  });
});

describe('ApacheLogFileParser', () => {
  test('WHEN multi line match PARSE all lines', () => {
    const line = '177.71.128.21 - - [10/Jul/2018:22:21:28 0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"';
    const delimiter = '\n';
    const ApacheLogFileParser = ApacheLogFileParserFactory(delimiter);
    const result = ApacheLogFileParser(line + delimiter + line);
    expect(result).toHaveLength(2);
    expect(result).toMatchSnapshot();
  });
});
