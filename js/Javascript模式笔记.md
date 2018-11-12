# 第一章 模式
- 定义：在编程中，指一个通用问题的解决方案。
  - 使用经过实践的经验编写代码
  - 模式可以让大脑腾出精力，不被低层次细节干扰
  - 模式可以优化开发过程中团队之间的沟通
- 模式的三种类型
  - 设计模式：js是弱类型的语言，所以不适合从强类型语言视角研究的设计模式。
  - 编码模式：js特有的模式。
  - 反模式：是常见的，引发问题比解决问题更多的一种方法。
# JavaScript基本概念
## 面向对象
- 特性：
  - 大多数js代码都可能是一个对象
  - 五种基本类型不是对象：数值型、布尔型、字符串型、空类型（null）、未定义类型（undefined）
  - 前三种有对应的以包装类的对象表示：有隐式的js解析器机制来实现向对象的转换。（包装类）
  - 函数本身也是对象，有自己的属性和方法。
  - 变量:
    - 一旦定义好变量，也就是在处理对象了
    - 改变量会自动成为内置对象的一个属性（可能是全局对象的属性）
    - 该变量实际上也是伪类，因为它拥有自身的属性，该属性决定了该变量是否可以被修改、删除、遍历。
- 对象：
  - 一个容器：包含命名的属性列表，属性可以是函数（方法）
  - 可以随时增删改查他的成员变量。
  - 对象两种类型
    - 原生的native：
      - 内置对象（数组、日期等...）
      - 用户自定义对象 var a = {};等
      - 任何在不同的、无浏览器环境下正确运行的代码对象
    - 主机的host（主机环境中定义的，例如浏览器）
      - windows对象
      - DOM对象
- 没有类
  - JavaScript只处理对象，无需定义一个类
  - 空对象：
    - 先创建一个空对象，然后再添加成员变量、属性函数等。
    - 空对象不空，实际上是包含一些内置属性的，只是没有自身属性。
    - Gang of Four 书中强调规则：尽量使用对象的组合，而不是类的继承。JavaScript能很好地实践该建议。
- 原型（prototype）
  - JavaScript使用原型的方式实现继承。
  - prototype原型是一个对象
  - 每一个函数都有prototype属性
- 环境
  - 浏览器不是唯一的运行环境
- strict模式
    - function my(){'use strict';...}
- JSLint:http://jslint.com js代码检查工具
- console：浏览器提供的一个运行环境。
  - Console.log(对象...)打印对象
  - Console.dir(对象...)枚举对象，并打印属性

# 第二章 基本技巧
- 易于维护的代码：
  - 阅读性好
  - 具有一致性
  - 预见性好
  - 看起来如同一个人编写
  - 有文档
- 尽量少用全局变量,访问全局变量的方式
```javascript
myglobal = 'hello';//反模式
console.log(myglobal);
console.log(window.myglobal);
console.log(window['mygloble']);
console.log(this.mygloble);
```
  - 以上打印出来都是‘hello’
- 任何变量，如果未经声明，就为全局对象所有。 
- 用以下方式声明避免误生成全局变量
```JavaScript
function foo(){
            var a,b;
            //...
            a = b = 0;//均为局部变量
}

function sum(x,y){
    //反模式：暗示全局变量
    result = x + y;
    return result;
}
```
- 变量释放的副作用
  - 用var创建的全局变量（这类变量在函数外不创建），不能删除。
  - 未经var创建的隐含全局变量（无论是在函数内还是外部创建）都可以删除。隐含全局变量不是真正的变量，而是全局对象的属性。属性可以delete，单变量不可以。 
```JavaScript
var g1 = 1;
g2 = 2;//反模式
(function(){
    g3 = 3;//反模式
}());
//以下企图删除
delete g1;//false
delete g2;//true
delete g3;//true
//测试删除情况
typeof(g1);//number类型
typeof(g2);//undefined
typeof(g3);//undefined
```        

- 访问全局变量
  - 在浏览器下可以用woindow或者this来访问全局对象
  - 通用环境可以用如下方式，内嵌函数作用域访问
  ```JavaScript
  var global = (function(){
      return this;
  }());
``
  - 在ECMAScript 5严格模式下,不能这样用
- 单一 var模式
  - 实例：
    ```JavaScript
    function myf(){
        var a = 1,
            b = 2,
            sun = a + b,
            myObj = {},
            i,
            j;
        //函数体
    }
    //声明变量是可以做一些实质性的工作
    function updateElement(){
        var el = document.getElementById('result'),
            style = el.style;
        //使用el和style再做其他事。
    }
    ```
- 提升：零散变量的问题
  - JavaScript允许在函数任意地方生命多个变量，无论在哪里声明，效果都等同于顶部，这就是所谓“提升”。
  - 代码处理分为两个阶段：
    - 第一，创建变量、函数声明、形参。
    - 第二，代码执行。
- for 循环
  - 先把容器的长度缓存起来，可以大大提升效率
  - 使用最少的变量，逐步减至0，这样更快
  - 使用while循环
  ```JavaScript
  for(var i=0, max=myarray.length; i<max; i++){
      //对myarray[i]进行处理
  }
  //使用最少的变量，逐步减至0，这样更快
  var i, myarray = [];
  for(i = myarray.length; i--;){
      //处理myarray[i]
  }
  //使用while循环
  var myarray = [];
      i = myarray.length;
  while(i--){
    //处理myarray[i]
  }
  ```
- for-in 循环
  - for-in循环用来遍历非数组对象，也叫枚举
  - 不推荐用for-in遍历数组
  - 当使用遍历对象属性的方式遍历原型链属性时，使用hasOwnProperty()很重要

  ```JavaScript
    //for-in例子
    var man = {
        hands:2,
        legs:2,
        heads:1
    };
    if(typeof(Object.prototype.clone === 'undefined')){
        Object.prototype.clone = function(){
            console.log('hello');
        };
    }
    man.clone();
    //不用hasOwnProperty(),就能遍历出Object的方法clone()
    for(var i in man){
        console.log(i,':',man[i]);
    }
    //使用hasOwnProperty()
    for(var i in man){
        if(man.hasOwnProperty(i)){//过滤，是否自己的函数
            console.log(i,':',man[i]);
        }
    }
    //在Object.prototype中调用hasOwnProperty()
    for(var i in man){
        if(Object.prototype.hasOwnProperty.call(man,i)){
            console.log(i,':',man[i]);
        }
    }
  ```

- 不要随便扩展内置构造函数
  - （如Objct、Array、Function等等）
  -  特殊情况下，可以如下方式添加
  ```JavaScript
  if(typeof(Object.prototype.myMethod !== 'function')){
    Object.prototype.myMethod = function(){
        //添加代码
    }
  }
  ```
- switch模式
    ```JavaScript
    var inspect_me = 0;
    result = '';
    switch(inspect_me){
    case 0:
        result = 'zero';
        break;
    case 1:
        result = 'one';
        break;
    default:
        result = 'unknown';
    }
    console.log(result);
    ```
  - 每个case和swich对齐
  - 每个case代码缩进
  - 每个case明确有一个break
  - 用default结尾

- 避免使用隐式类型转换
- 比如：false==0 或 ''==0 这类语句会返回true
- 为了避免饮食类型转换混淆不清，请在比较语句的时候使用：=== 和 !=== 操作符来对数值和类型进行比较：
    ```javascript
    var zero = 0;
    if(zero === false){//类型和值比较
        //因为zero是0，而不是false，所以不执行
    }else if(zero == false){
        //会执行...
    }

    ```
- 避免使用eval()
  - eval()是一个魔鬼。该函数可以将任意字符串当作一个JavaScript代码来执行。
  ```JavaScript
  eval("console.log('abcde');");
  //把字符串当js代码执行
    console.log(typeof un);//undefined
    console.log(typeof deux);//undefined
    console.log(typeof trois);//undefined
    var jsstring = "var un = 1; console.log(un);";
    eval(jsstring);//1

    var jsstring = "var deux = 2; console.log(deux);";
    new Function(jsstring)();//2

    var jsstring = "var trois = 3; console.log(trois);";
    (function(){
        eval(jsstring);
    }());//3

    console.log(typeof un);//number
    console.log(typeof deux);//undefined
    console.log(typeof trois);//undefined
  ```
  - 如果一定要用eval()，建议new Function()来替代eval()，因为他俩不叫类似。new Function的代码在局部函数空间中运行。
  - 以上代码中un仍然是一个全局变量，会影响到命名空间。
  - eval()会影响到作用域链
  - Function()更类似一个沙盒。它仅仅能看到全局变量。
  - Function()和使用new Function()是一样的
  ```JavaScript
    //eval()能访问和修改外部作用域
    (function(){
    var local = 1;
    eval("local = 3;console.log(local)");//3
    console.log(local);//3
    }());
    //Function()不能访问和修改外部作用域
    (function(){
        var local = 1;
        Function("console.log(typeof (local));")();//3
    }());
  ```