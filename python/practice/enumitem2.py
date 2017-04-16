from enum import Enum
# class  enumitem2(object):
# 这种定义方式，下标从1开始
Month = Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))
Weekday = Enum('Weekday', ('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'))


