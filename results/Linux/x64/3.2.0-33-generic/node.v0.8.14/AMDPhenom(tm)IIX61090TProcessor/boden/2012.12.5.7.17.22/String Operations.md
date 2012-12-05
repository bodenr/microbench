> #### Details

>> **Benchmark** ```String Operations```

>> **Date** ```Wed Dec 05 2012 07:20:20 GMT-0500 (EST)```

>> **Node Version** ```v0.8.14```

>> **Operating System** ```Linux x64 3.2.0-33-generic```

>> **CPU** ```AMD Phenom(tm) II X6 1090T Processor (6 cores)```

>> **Memory** ```7.552 GB (total), 4.501 GB (free)```



---

> #### Category: uncached char access

>> **(-) charAt()** ``` iterations: 100, avg: 73.714ms, longest: 77.864ms, shortest: 72.353ms```

>> **(+) bracket access** ``` iterations: 100, avg: 164.07ms, longest: 175.704ms, shortest: 162.890ms```

>> **substr()** ``` iterations: 100, avg: 97.439ms, longest: 99.047ms, shortest: 96.798ms```

>> **slice()** ``` iterations: 100, avg: 104.834ms, longest: 107.933ms, shortest: 103.903ms```



---

> #### Category: cached char access

>> **(-) charAt()** ``` iterations: 100, avg: 17.139ms, longest: 19.343ms, shortest: 16.658ms```

>> **(+) bracket access** ``` iterations: 100, avg: 111.383ms, longest: 119.030ms, shortest: 110.305ms```

>> **substr()** ``` iterations: 100, avg: 42.079ms, longest: 42.804ms, shortest: 41.449ms```

>> **slice()** ``` iterations: 100, avg: 49.333ms, longest: 50.023ms, shortest: 48.698ms```



---

