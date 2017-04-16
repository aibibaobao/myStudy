# others
def triangles():
	x = [1]
	while True:
		yield x
		x.append(0)
		x = [x[i-1]+x[i] for i in range(len(x))]
	return 'over'
n=0
for t in triangles():
	print(t)
	n = n+1
	if n==10:
		break
# mine
def tr():
	x = [1]
	while True:
		yield x
		if len(x)<2:
			x = [1,1]
		else:
			y = [x[i]+x[i+1] for i in range(len(x)) if i < len(x)-1]
			x = [1] + y +[1]
	return 'over'

n=0
for t in tr():
	print(t)
	n = n+1
	if n==10:
		break

def tr1():
	x = [1]
	yield x
	x = [1,1]
	yield x
	while True:
		x = [1] + [x[i]+x[i+1] for i in range(len(x)) if i<len(x)-1] + [1]
		yield x
n=0
for t in tr1():
	print(t)
	n = n+1
	if n==10:
		break