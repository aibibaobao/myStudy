#!/usr/bin/env python3
# -*- coding: utf-8 -*-

#第一行，告诉Linux/OS X系统，这是一个Python可执行程序，Windows系统会忽略这个注释
#第二行，告诉Python解释器，按照UTF-8编码读取源代码
# from  functools import reduce
# def f(x,y):
# 	return str(x)+"x"+ str(y) + "y"
# r = reduce(f, "1")
# print(r)

# r = sorted((3,2,-5), key=abs)
# print(r)
# r = sorted("MadC", key=str.lower)
# print(r)
def func(val, val0):
	val1 = 2
	print('%s,%x' % ("val0",id(val0)))
	print('%s,%x' % ("val",id(val)))
	print('%x' % id(val1))
	print("func + " + val)
	def in_func():
		val = "20"
		print("in_func + " + val + str(val1))
		return val;
	return in_func;
f = func("90", "56")
f()
print(f)
print(f.__closure__)
print()
f1 = func("90", "56")
f1()
print(f1)
print(f1.__closure__)