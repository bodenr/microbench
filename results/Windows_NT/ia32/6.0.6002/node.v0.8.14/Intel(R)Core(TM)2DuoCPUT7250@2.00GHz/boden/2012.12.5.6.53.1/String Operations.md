> #### Details

>> **Benchmark** ```String Operations```

>> **Date** ```Wed Dec 05 2012 08:56:16 GMT-0500 (Eastern Standard Time)```

>> **Node Version** ```v0.8.14```

>> **Operating System** ```Windows_NT ia32 6.0.6002```

>> **CPU** ```Intel(R) Core(TM)2 Duo CPU     T7250  @ 2.00GHz (2 cores)```

>> **Memory** ```3.747 GB (total), 1.720 GB (free)```



---

> #### Category: uncached char access

>> **(-) charAt()** ``` iterations: 100, avg: 35.902ms, longest: 46.273ms, shortest: 33.750ms```

>> **(+) bracket access** ``` iterations: 100, avg: 222.308ms, longest: 250.659ms, shortest: 215.537ms```

>> **substr()** ``` iterations: 100, avg: 77.491ms, longest: 111.424ms, shortest: 72.838ms```

>> **slice()** ``` iterations: 100, avg: 108.156ms, longest: 136.594ms, shortest: 97.196ms```



---

> #### Category: cached char access

>> **(-) charAt()** ``` iterations: 100, avg: 25.107ms, longest: 31.256ms, shortest: 24.251ms```

>> **(+) bracket access** ``` iterations: 100, avg: 212.276ms, longest: 226.504ms, shortest: 208.487ms```

>> **substr()** ``` iterations: 100, avg: 62.152ms, longest: 67.702ms, shortest: 60.837ms```

>> **slice()** ``` iterations: 100, avg: 84.508ms, longest: 100.660ms, shortest: 73.401ms```



---

