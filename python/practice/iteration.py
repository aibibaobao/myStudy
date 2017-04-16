#!/usr/bin/env python3
# -*- coding: utf-8 -*-
class Itr(object):  
    def __init__(self):  
        self.result = ['a', 'b', 'c', 'd']  
        self.i = iter(self.result)  
          
          
    def __call__(self):  
        res = next(self.i)  #self.i  为迭代对象 
        print("__call__ called, which would return ", res)  
        return res  
  
  
    def __iter__(self):  
        print("__iter__ called")  
        return iter(self.result)  
  
      
itr = Itr()  
# i2只需要类实现__iter__函数即可返回  
i2 = iter(itr)  
print("i2 = ", i2) 
  
for i in i2:  
    print(i)  

# i1必须是callable的，否则无法返回callable-iterator  
i1 = iter(itr, 'c')  
print("i1 = ", i1)  
 
  
for i in i1:  
    print(i)  

class  Person(object):
  """docstring for  person"""
  def __init__(self, name, score=0):
    self.name = name
    self.score = score
  def __next__(self):
    print("score + 1")
    self.score += 2
    if(self.score>10):
      raise StopIteration
    return self.score
    

class Next(object):  
    def __init__(self, data = 1):  
        self.data = data  
          
          
    def __iter__(self):  
        print("_iter_called")
        p = Person('aibi')
        return p  
      
      
    def __next__(self):  
        print("__next__ called")  
        if self.data > 5:  
            raise StopIteration  
        else:  
            self.data += 2  
            return self.data  
for i in Next():  #先用__iter__()返回一个对象,这个对象有__next__(self)方法,用来返回一个值，但在函数中要写结束取值的条件，raise StopIteration
    print(i)  