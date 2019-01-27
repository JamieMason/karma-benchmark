import Benchmark = require('benchmark');
import * as store from './store';
import { KarmaSuite } from './suite';

export class KarmaBenchmark extends Benchmark {
  public static Suite = KarmaSuite;

  constructor(arg: any, ...args: any[]) {
    super(arg, ...args);
    store.addBenchmark(this, false);
  }
}
