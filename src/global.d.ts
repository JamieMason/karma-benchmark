import { KarmaBenchmark } from './benchmark';

declare interface KarmaClient {
  complete(result: any): void;
  info(info: any): void;
  result(result: any): void;
  start(): void;
}

declare global {
  namespace NodeJS {
    interface Global {
      __coverage__: any;
      __karma__: KarmaClient;
      Benchmark: typeof KarmaBenchmark;
    }
  }
}
