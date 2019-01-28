import { KarmaBenchmark } from './benchmark';
import { provideApi } from './provide-api';
import { provideDump } from './provide-dump';
import { provideRunner } from './run-benchmarks';

global.Benchmark = KarmaBenchmark;

provideApi(global);
provideDump(global);
provideRunner(global);
