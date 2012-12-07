> #### Details

>> **Benchmark** ```String Operations```

>> **Date** ```Fri Dec 07 2012 07:22:48 GMT-0500 (EST)```

>> **Node Version** ```v0.8.14```

>> **Operating System** ```Linux x64 3.2.0-33-generic```

>> **CPU** ```AMD Phenom(tm) II X6 1090T Processor (6 cores)```

>> **Memory** ```7.552 GB (total), 2.506 GB (free)```



---

> #### Category: uncached char access

>> **(-) charAt()** ``` iterations: 100, avg: 73.446ms, longest: 77.917ms, shortest: 72.244ms```

>> **(+) bracket access** ``` iterations: 100, avg: 162.734ms, longest: 174.379ms, shortest: 161.589ms```

>> **substr()** ``` iterations: 100, avg: 97.202ms, longest: 99.561ms, shortest: 96.257ms```

>> **slice()** ``` iterations: 100, avg: 104.226ms, longest: 118.086ms, shortest: 103.220ms```



---

> #### Category: cached char access

>> **(-) charAt()** ``` iterations: 100, avg: 18.02ms, longest: 19.694ms, shortest: 17.571ms```

>> **(+) bracket access** ``` iterations: 100, avg: 110.353ms, longest: 111.369ms, shortest: 109.507ms```

>> **substr()** ``` iterations: 100, avg: 43.225ms, longest: 44.648ms, shortest: 42.392ms```

>> **slice()** ``` iterations: 100, avg: 49.562ms, longest: 50.281ms, shortest: 48.770ms```



---

