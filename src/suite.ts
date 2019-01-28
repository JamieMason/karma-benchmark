import Benchmark = require('benchmark');
import * as store from './store';

export class KarmaSuite extends Benchmark.Suite {
  public name: string = '';
  public runAlone: boolean = false;

  constructor(arg: any, ...args: any[]) {
    super(arg, ...args);
    store.addSuite(this);
  }

  public add(arg, ...args) {
    super.add(arg, ...args);
    const benchmark = this[this.length - 1];
    store.addBenchmark(benchmark, true);
    return this;
  }
}
