import time, functools

def performance(unit):
    def perf_decorator(f): 
        @functools.wraps(f) 
        def wrapper(*args, **kw):
            t1 = time.time()
            r = f(*args, **kw)
            t2 = time.time()
            if(unit=='ms'):
                t = (t2 - t1)*1000
            else:
                t = t2 -t1
            print ('call %s() use %d %s' % (f.__name__, t, unit))
        return wrapper
    return perf_decorator

@performance('ms')
def factorial(n):
    return reduce(lambda x,y: x*y, range(1, n+1))

print (factorial.__name__)