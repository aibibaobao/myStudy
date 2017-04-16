1. 函数参数  
	（1）可变参数：  
	`def calc(*numbers)`传入任意多个数字，在函数内部，numbers实际是一个tuple。若已经有一个tuple/list t=(1,2,3) 调用calc(\*t)在变量名前加 * 即可  
	（2）关键字参数：  
	`def person(name, age, **kw)`kw接收任意多个key=value形式的参数，person("aibi", 2, city="a", job="b")。若已经有一个dict d={"city":"a", "job":"b"} person("aibi", 2, \*\*d)在变量名前加 \*\*   
	（3）命名关键字参数：
	`def person(name, age, *, city, job)` 命名关键字必须传入，且传入时要带上参数名city="a",与基本参数之间用 * 隔开，若有可变参数 \*argc, city="a", job,则不用单独 * 且有默认参数的可不用传值。  
	（4）参数组合：  
	基本参数，默认参数，可变参数（\*args ），命名关键字参数，关键字参数(\*\*kw) 要传入可变参数，则前面的默认参数必须给值，要不然会覆盖默认参数值  

2. 切片  
	`L1=range(21); L2=L1[n:m:step]` 从n开始到m每step取一个 n默认0，m默认最后，：step可省，[]必须有一个: L3=L1[2] L3与L1没任何关系，L3为一新的list  

3. 迭代  
	（1）dict  A.for key in d B.for value in d.values() C.for key,value in d.items()  
	（2）list 需要list下标 for index,value in enumerate(['A','B']) index从0开始  
	（3）判断对象可否可迭代 `from collections import Iterable; isinstance(对象，Iterable)`  
	（4）L=[[1,2],[3,4]] for l in L 此时l相当于list; for x,y in L 此时x相当于每行list中第一个元素，y相当于第二个元素，要求每个list元素个数相同  

4. 列表生成式  
	`[x * x for x in range(1,11) if x%2 == 0] x*x`是表达式，其值为新list中与x对应的  

5. 生成器  
	（1）把列表生成式的[]换成()就可以得到生成器g=(),g是算法不是具体值，每次用next(g)来取值  
	（2）函数变生成器`def odd(): yield 1;  yield (2,3); yield [4,5,6]  o = odd() o为生成器，for x in o 每次执行到yield停止，x为yield后面的值，` 同一生成器对象从上次停止的位置开始  

6. 迭代器  
	Iterator 可用next(对象)取值，没有下一值时报错StopIteration，也可用 for x in 对象  
	Iterable 可用for x in 对象，但不可用next(),若要用next()就用iter(对象)包装对象  

7. 高阶函数  
	（1）reduce(fn,Iterable)返回一个值，若list只有唯一的元素[m]，返回唯一的元素值m，并不会用到函数fn  
	（2）map（fn,Iterable)返回一个惰性的Iterator,必须要用list()把所有元素都计算出来不可用tuple()，为空  
	（3）filter(fn, Iterable) fn的返回值是能够转换成True Flase  
	（4）sorted(Iterable,key=fn,reverse=True)返回值是一个list,将Iterable的每个元素作为参数传给fn,fn的返回值作为钙该元素用于比较的key  

8. 装饰器  
	（1）无参装饰器log def log(func)> [def wrapper] return wrapper  
	（2）有参构造器log def log(arg)>[def decorator(func)>[def wrapper] return wrapper] return decorator  
	（3）在wrapper的外部加上@functools.wraps(func)是因为原func加了装饰器后会更改func.\_\_name\_\_的值为wrapper  
	（4）加了装饰器后，每次调用func相当于调用wrapper,所以传给func的参数（\*args, \*\*kw）就是传给wrapper的  

9. 偏函数  
	int2 = functools.partial(int, base=2)固定函数的某些参数（给参数设定默认值），返回一个新函数方便调用  

10. 模块  
	if \_\_name\_\_=='\_\_main__': test() 如果是直接运行该模块，python 模块，则执行该模块中的test函数，若该模块是被import到另一模块，则if条件不满足  

11. 类  
	（1）定义 class ClassName(继承类)： 构造函数 \_\_init\_\_(self)在类里面所有函数，包括构造函数第一个参数都是self来指向当前对象本身。其余参数跟在后面，调用时只管自定义参数，不用管self  
	（2）若要私有化属性和方法，就在其名称前加\_\_  
	（3）实例属性是在\_\_init\_\_函数里用self.属性名定义，或者是实例.属性名定义。类属性是在class中直接用属性名定义，访问时可用实例.属性名或者类名.属性名  
	（4）在类定义中__slots__=('prop1', 'prop2')规定实例可添加的属性名称只能是这个tuple中的。但是这种限制只能是在当前类中，在其子类中是不起作用的，需重新定义
12. s