import os
 
filepath = __file__
realpath = os.path.realpath(filepath)
current_path = os.path.dirname(realpath) + '/'
files = os.listdir(current_path)

i = 0

for file in files:
    suffix = os.path.splitext(file)[1].lower()
    if suffix == '.jpg' or suffix == '.png':
        #设置旧文件名（就是路径+文件名）
        oldname=current_path+file
    
        #设置新文件名
        newname=current_path+str(i+1)+suffix
    
        #用os模块中的rename方法对文件改名
        os.rename(oldname,newname)
        print(oldname,'======>',newname)
    
        i+=1