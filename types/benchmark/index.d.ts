// Type definitions for Benchmark v1.0.0
// Project: http://benchmarkjs.com
// Definitions by: Asana <https://asana.com>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'benchmark' {
  namespace Benchmark {
    export class Benchmark {
      static Benchmark: typeof Benchmark;
      static Deferred: typeof Deferred;
      static Event: typeof Event;
      static Suite: typeof Suite;

      static deepClone<T>(value: T): T;
      static each(obj: Object | any[], callback: Function, thisArg?: any): void;
      static filter<T>(arr: T[], callback: (value: T) => any, thisArg?: any): T[];
      static filter<T>(arr: T[], filter: string, thisArg?: any): T[];
      static forEach<T>(arr: T[], callback: (value: T) => any, thisArg?: any): void;
      static formatNumber(num: number): string;
      static forOwn(obj: Object, callback: Function, thisArg?: any): void;
      static has(path: string | string[]): boolean;
      static hasKey(obj: Object, key: string): boolean;
      static indexOf<T>(arr: T[], value: T, fromIndex?: number): number;
      static interpolate(template: string, values: Object): string;
      static invoke(benches: Benchmark[], name: string | Object, ...args: any[]): any[];
      static join(obj: Object, separator1?: string, separator2?: string): string;
      static map<T, K>(arr: T[], callback: (value: T) => K, thisArg?: any): K[];
      static options: Benchmark.Options;
      static platform: Benchmark.Platform;
      static reduce<T, K>(arr: T[], callback: (accumulator: K, value: T) => K, thisArg?: any): K;
      static runInContext(context: any): this;
      static support: Benchmark.Support;
      static version: string;

      constructor(fn: Function | string, options?: Benchmark.Options);
      constructor(name: string, fn: Function | string, options?: Benchmark.Options);
      constructor(name: string, options?: Benchmark.Options);
      constructor(options: Benchmark.Options);

      aborted: boolean;
      async: boolean;
      compiled: Function | string;
      count: number;
      cycles: number;
      defer: boolean;
      delay: number;
      error?: Error;
      fn?: Function | string;
      hz: number;
      id: number;
      initCount: number;
      maxTime: number;
      minSamples: number;
      minTime: number;
      options: Benchmark.Options;
      running: boolean;
      setup: Function | string;
      stats: Benchmark.Stats;
      teardown: Function | string;
      times: Benchmark.Times;

      abort(): this;
      clone(options: Benchmark.Options): this;
      compare(benchmark: Benchmark): number;
      emit(type: string | Object): any;
      listeners(type: string): Function[];
      off(type?: string, listener?: Function): this;
      off(types: string[]): this;
      on(type?: string, listener?: Function): this;
      on(types: string[]): this;
      reset(): this;
      run(options?: Benchmark.Options): this;
      toString(): string;
    }

    export interface Options {
      async?: boolean;
      defer?: boolean;
      delay?: number;
      id?: string;
      initCount?: number;
      maxTime?: number;
      minSamples?: number;
      minTime?: number;
      name?: string;
      onAbort?: Function;
      onComplete?: Function;
      onCycle?: Function;
      onError?: Function;
      onReset?: Function;
      onStart?: Function;
      setup?: Function | string;
      teardown?: Function | string;
      fn?: Function | string;
      queued?: boolean;
    }

    export interface Platform {
      description: string;
      layout: string;
      manufacturer: string;
      name: string;
      os: string;
      prerelease: string;
      product: string;
      version: string;
      toString(): string;
    }

    export interface Support {
      air: boolean;
      argumentsClass: boolean;
      browser: boolean;
      charByIndex: boolean;
      charByOwnIndex: boolean;
      decompilation: boolean;
      descriptors: boolean;
      getAllKeys: boolean;
      iteratesOwnFirst: boolean;
      java: boolean;
      nodeClass: boolean;
      timeout: boolean;
    }

    export interface Stats {
      deviation: number;
      mean: number;
      moe: number;
      rme: number;
      sample: any[];
      sem: number;
      variance: number;
    }

    export interface Times {
      cycle: number;
      elapsed: number;
      period: number;
      timeStamp: number;
    }

    export class Deferred {
      constructor(clone: Benchmark);

      benchmark: Benchmark;
      cycles: number;
      elapsed: number;
      timeStamp: number;
    }

    export class Event {
      constructor(type: string | Object);

      aborted: boolean;
      cancelled: boolean;
      currentTarget: Object;
      result: any;
      target: Object;
      timeStamp: number;
      type: string;
    }

    export class Suite {
      static options: { name: string };

      constructor(name?: string, options?: Options);

      aborted: boolean;
      length: number;
      running: boolean;
      abort(): this;
      add(name: string, fn: Function | string, options?: Options): this;
      add(fn: Function | string, options?: Options): this;
      add(name: string, options?: Options): this;
      add(options: Options): this;
      clone(options: Options): this;
      emit(type: string | Object): any;
      filter(callback: Function | string): this;
      forEach(callback: Function): this;
      indexOf(value: any): number;
      invoke(name: string, ...args: any[]): any[];
      join(separator?: string): string;
      listeners(type: string): Function[];
      map(callback: Function): any[];
      off(type?: string, callback?: Function): this;
      off(types: string[]): this;
      on(type?: string, callback?: Function): this;
      on(types: string[]): this;
      pluck(property: string): any[];
      pop(): Function;
      push(benchmark: Benchmark): number;
      reduce<T>(callback: Function, accumulator: T): T;
      reset(): this;
      reverse(): any[];
      run(options?: Options): this;
      shift(): Benchmark;
      slice(start: number, end: number): any[];
      slice(start: number, deleteCount: number, ...values: any[]): any[];
      unshift(benchmark: Benchmark): number;
    }
  }

  global {
    namespace NodeJS {
      interface Global {
        Benchmark: Benchmark.Benchmark;
      }
    }
  }

  export = Benchmark.Benchmark;
}
