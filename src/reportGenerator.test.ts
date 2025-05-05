import { AccessLog } from './parser/types';
import { addToReport } from './reportGenerator';
import type { RawReport } from './reportGenerator';

describe('addToReport', () => {
  test('WHEN new access log line PROVIDED that should be added to reports', () => {
    const log: AccessLog = {
      "Request": {
        "method": "GET",
        "protocol": "HTTP/1.1",
        "uri": "/intranet-analytics/",
      },
      "accessTime": new Date(),
      "agent": "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7",
      "ip": "177.71.128.21",
      "remoteLogName": "-",
      "responseSize": 3574,
      "statusCode": 200,
      "user": "-",
    };
    const result: RawReport = addToReport({
      distinctIps: [],
      visitedUrlsCount: [],
      activityIpsCount: [],
    }, log);
    expect(result).toMatchSnapshot();
  });
});
