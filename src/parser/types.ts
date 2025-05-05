type IP = string;
type User = string;
type Method = string;

export interface AccessLog {
  ip: IP;
  remoteLogName: string;
  user: User;
  accessTime: Date;
  Request: {
    method: Method;
    uri: string;
    protocol: string;
  }
  statusCode: number;
  responseSize: number | '-';
  agent: string;
}

export type LineParser = (data: string) => AccessLog;

/**
 * @deprecated Use `LineParser` instead. This function will be removed in version 2.0.
 */
export type Parser = (data: string) => AccessLog[];
