1. 在sublime集成nodejs开发环境，[处理链接](http://www.cnblogs.com/qiaojie/p/5560388.html)

2. 用npm install -g node-inspector安装node断点调试工具，
   一直报错"D:\\Program Files\\nodejs\\node.exe" "C:\\Users\\admin\\AppData\\Roaming\\npm\\node_modules\\npm\\bin\\npm-cli.js" "install" "-g" "node-inspector" Maximum call stack size exceeded
   解决： cnpm install -g node-inspector

3. 解决浏览器没有加载源文件 （1）先开一个cmd 运行node-inspector （2）再开一个cmd转到要调试的目录下，命令node --debug-brk test1.js（测试文件名）
   
4. 待补