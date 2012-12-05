> #### Details

>> **Benchmark** ```String Operations```

>> **Date** ```Wed Dec 05 2012 05:34:10 GMT-0500 (EST)```

>> **Node Version** ```v0.8.14```

>> **Operating System** ```Linux x64 3.2.0-33-generic```

>> **CPU** ```AMD Phenom(tm) II X6 1090T Processor (6 cores)```

>> **Memory** ```7.552 GB (total), 4.654 GB (free)```



---

> #### Category: uncached char access

>> **(-) charAt()** ``` iterations: 100, avg: 82.754ms, longest: 91.935ms, shortest: 75.955ms```

>> **(+) bracket access** ``` iterations: 100, avg: 172.334ms, longest: 188.164ms, shortest: 163.739ms```

>> **substr()** ``` iterations: 100, avg: 101.681ms, longest: 123.541ms, shortest: 97.067ms```

>> **slice()** ``` iterations: 100, avg: 108.062ms, longest: 115.078ms, shortest: 105.399ms```



---

> #### Category: cached char access

>> **(-) charAt()** ``` iterations: 100, avg: 18.226ms, longest: 19.543ms, shortest: 17.684ms```

>> **(+) bracket access** ``` iterations: 100, avg: 110.111ms, longest: 118.496ms, shortest: 108.204ms```

>> **substr()** ``` iterations: 100, avg: 42.447ms, longest: 44.494ms, shortest: 41.595ms```

>> **slice()** ``` iterations: 100, avg: 49.726ms, longest: 51.898ms, shortest: 49.011ms```



---

