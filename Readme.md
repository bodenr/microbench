# microbench

A [node.js](http://nodejs.org) module for microbenchmarking which includes:

- A basic set of JS language construct microbenchmarks.
- An ad hoc microbenchmark framework for synchronous based testing.

## Motovation

This module is primarily intended for my personal consumption and grew out of 
the need to easily create, execute and archive microbenchmarks which help
guide implementation decisions when performance is a priority. It's creation
was also a partial learning experience in further understanding the 
[optimizations](http://blog.mrale.ph/post/14403172501/simple-optimization-checklist)
that V8 makes on your JS code.

That said, the code found here was thrown together very quickly (a few hrs)
and is not documented nor the prettiest src in the world.

Finally, we all know microbenchmarks should be taken with a grain of salt
and used in accordance with project goals... This is standard stuff, so no
further divulgence.

## Results

A sample of microbenchmark results can be found under the
[results](results/) directory.

## Installation via git repo

The easiest way to run the microbenchmarks is to just clone the repo:
```
git clone https://github.com/bodenr/microbench.git
```

Then install the dependencies:
```
npm install
```

And finally run the test suite:
```
./bin/microbench
```

## Installation via npm

The module is also package via npm and can be installed with:
```
npm install microbench
```

To run the benchmarks:
```
cd node_modules/microbench
./bin/microbench
```

## The microbench command

The module contains a simple `microbench` binary to run benchmarks  
which can be found under the `/bin` directory of the module.

It supports the following options:
```
  Usage: microbench [options]

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -b, --benchmarks <path>  directory containing benchmark js files [./benchmarks]
    -a, --archive [path]     archive results in markdown format [./results]
    -g, --grep <pattern>     select benchmarks by name or pattern
    -u, --ungrep <pattern>   unselect benchmarks by name or pattern
```

Some examples...

Run all benchmark js files under `/home/boden/projects/js/benchmarks`:
```
microbench -b /home/boden/projects/js/benchmarks
```

Run only benchmark js files which contain `simple` in the name found 
under `/home/boden/projects/js/benchmarks`:
```
microbench -b /home/boden/projects/js/benchmarks -g simple
```

Run all benchmark js files which don't contain `long` in the name found 
under `/home/boden/projects/js/benchmarks`:
```
microbench -b /home/boden/projects/js/benchmarks -u long
```

By default `microbench` uses a [cli-table](https://github.com/LearnBoost/cli-table)
to display output:
[![console output](https://github.com/bodenr/microbench/blob/master/images/term.png)]

You can ask it to archive your bench results in markdown format using the
`-a` option. For example to run all benchmark js files under `./benchmarks`
and archive them under `/tmp/benchmark/results` use:
```
microbench -a /tmp/benchmark/results
```

## License

(The MIT License)

Copyright (c) 2012 Boden Russell &lt;bodensemail@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

