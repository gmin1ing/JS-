# JS-知识点
![image](https://github.com/gmin1ing/JS-/blob/pic/201709191131.png);
一、exec 方法
用正则表达式模式在字符串中查找，并返回该查找结果的第一个值（数组），如果匹配失败，返回null。
rgExp.exec(str)
**参数 **
rgExp
必选项。包含正则表达式模式和可用标志的正则表达式对象。
str
必选项。要在其中执行查找的 String 对象或字符串文字。
**返回数组包含： **
input：整个被查找的字符串的值；
index：匹配结果所在的位置（位）；
arr：结果值，arr[0]全匹配结果，arr[1,2...]为表达式内()的子匹配，由左至右为1,2...。
注意：在匹配后，rgExp 的 lastIndex 属性被设置为匹配文本的最后一个字符的下一个位置。lastIndex并不在返回对象的属性中，而是正则表达式对象的属性。
例子1：不含子表达式的正则表达式exec方法循环应用

!function RegExpTest(){ 
    var src="http://sumsung753.blog.163.com/blog/I love you!"; 
    // 注意g将全文匹配，不加将永远只返回第一个匹配。 
    var re = /\w+/g; 
    var arr; 
    // exec使arr返回匹配的第一个，while循环一次将使re在g作用寻找下一个匹配。 
    while((arr = re.exec(src)) !=null){ 
        document.write(arr.index + "-" + re.lastIndex + ":" + arr + "<br/>"); 
        for(key in arr){ 
            document.write(key + "=>" + arr[key] + "<br/>"); 
        } 
        document.write("<br/>"); 
    } 
}()

输出结果：

0-4:http
0=>http
index=>0
input=>http://sumsung753.blog.163.com/blog/I love you!

7-17:sumsung753
0=>sumsung753
index=>7
input=>http://sumsung753.blog.163.com/blog/I love you!

18-22:blog
0=>blog
index=>18
input=>http://sumsung753.blog.163.com/blog/I love you!

23-26:163
0=>163
index=>23
input=>http://sumsung753.blog.163.com/blog/I love you!

27-30:com
0=>com
index=>27
input=>http://sumsung753.blog.163.com/blog/I love you!

31-35:blog
0=>blog
index=>31
input=>http://sumsung753.blog.163.com/blog/I love you!

36-37:I
0=>I
index=>36
input=>http://sumsung753.blog.163.com/blog/I love you!

38-42:love
0=>love
index=>38
input=>http://sumsung753.blog.163.com/blog/I love you!

43-46:you
0=>you
index=>43
input=>http://sumsung753.blog.163.com/blog/I love you!

exec默认只返回匹配结果的第一个值，比如上例如果不用while循环，将只返回'http'（尽管后面的sumsung753等都符合表达式），无论re表达式用不用全局标记g。但是如果为正则表达式设置了全局标记g，exec从上次匹配结束的位置开始查找。如果没有设置全局标志，exec依然从字符串的起始位置开始搜索。利用这个特点可以反复调用exec遍历所有匹配，等价于match具有g标志。当然，如果正则表达式忘记用g，而又用循环（比如：while、for等)，exec将每次都循环第一个，造成死循环。

如果正则表达式中包含子表达式，那么输出结果将包含子匹配项
例子2：包含子表达式的正则表达式exec方法应用

!function execDemo(){ 
    var r, re; // 声明变量。 
    var s = "The rain in Spain falls mainly in the plain"; 
    re = /[\w]*(ai)n/ig; 
    r = re.exec(s); 
    document.write(r + "<br/>");
    for(key in r){ 
        document.write(key + "-" + r[key] + "<br/>"); 
    } 
}() 
输出结果如下：
rain,ai
0-rain
1-ai
index-4
input-The rain in Spain falls mainly in the plain

例子3：包含子表达式的正则表达式exec方法循环应用

!function execDemo(){ 
    var r, re; // 声明变量。 
    var s = "The rain in Spain falls mainly in the plain"; 
    re = /[\w]*(ai)n/ig; 
    while((r = re.exec(s))!=null){
        document.write(r + "<br/>"); 
        for(key in r){ 
            document.write(key + "-" + r[key] + "<br/>"); 
        } 
    }
}() 
输出结果：

rain,ai
0-rain
1-ai
index-4
input-The rain in Spain falls mainly in the plain
Spain,ai
0-Spain
1-ai
index-12
input-The rain in Spain falls mainly in the plain
main,ai
0-main
1-ai
index-24
input-The rain in Spain falls mainly in the plain
plain,ai
0-plain
1-ai
index-38
input-The rain in Spain falls mainly in the plain
二、match 方法
使用正则表达式模式对字符串执行查找，并将包含查找的结果作为数组返回。
stringObj.match(rgExp)
**参数 **
stringObj
必选项。对其进行查找的 String 对象或字符串文字。
rgExp
必选项。为包含正则表达式模式和可用标志的正则表达式对象。也可以是包含正则表达式模式和可用标志的变量名或字符串文字。
其余说明与exec一样，不同的是如果match的表达式匹配了全局标记g将出现所有匹配项，而不用循环，但所有匹配中不会包含子匹配项。
**例子4： **

!function MatchDemo(){
    // 声明变量。
    var r, re; 
    var s = "The rain in Spain falls mainly in the plain";
    // 创建正则表达式模式。
    re = /(a)in/ig; 
    // 尝试去匹配搜索字符串。
    r = s.match(re); 
    // 返回的数组包含了所有 "ain" 出现的四个匹配，r[0]、r[1]、r[2]、r[3]。
    //但没有子匹配项a。
    document.write(r); 
}()
输出结果：ain,ain,ain,ain

说明：
match() 方法将检索字符串 stringObject，以找到一个或多个与 regexp 匹配的文本。这个方法的行为在很大程度上有赖于 regexp 是否具有标志 g。
如果 regexp 没有标志 g，那么 match() 方法就只能在 stringObject 中执行一次匹配。如果没有找到任何匹配的文本， match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息。该数组的第 0 个元素存放的是匹配文本，而其余的元素存放的是与正则表达式的子表达式匹配的文本。除了这些常规的数组元素之外，返回的数组还含有两个对象属性。index 属性声明的是匹配文本的起始字符在 stringObject 中的位置，input 属性声明的是对 stringObject 的引用。
如果 regexp 具有标志 g，则 match() 方法将执行全局检索，找到 stringObject 中的所有匹配子字符串。若没有找到任何匹配的子串，则返回 null。如果找到了一个或多个匹配子串，则返回一个数组。不过全局匹配返回的数组的内容与前者大不相同，它的数组元素中存放的是 stringObject 中所有的匹配子串，而且也没有 index 属性或 input 属性。
注意：在全局检索模式下，match() 即不提供与子表达式匹配的文本的信息，也不声明每个匹配子串的位置。如果您需要这些全局检索的信息，可以使用 RegExp.exec()。

三、test方法
用于检测一个字符串是否匹配某个模式
rgExp.test(str)
返回值
如果字符串 string 中含有与 RegExpObject 匹配的文本，则返回 true，否则返回 false。
说明
调用 RegExp 对象 r 的 test() 方法，并为它传递字符串 s，与这个表示式是等价的：(r.exec(s) != null)。
例子5：

var str = "hello world!";
var result = /^hello/.test(str);
console.log(result); // true
**test()继承正则表达式的lastIndex属性，表达式在匹配全局标志g的时候须注意。 **
例子6：

function testDemo(){ 
    var r, re; // 声明变量。 
    var s = "I"; 
    re = /I/ig; // 创建正则表达式模式。 
    document.write(re.test(s) + "<br/>"); // 返回 Boolean 结果。 
    document.write(re.test(s) + "<br/>"); 
    document.write(re.test(s)); 
} 
testDemo(); 
输出结果：
true
false
true
当第二次调用test()的时候，lastIndex指向下一次匹配所在位置1，所以第二次匹配不成功，lastIndex重新指向0，等于第三次又重新匹配。
例子7：

function testDemo(){ 
    var r, re; // 声明变量。 
    var s = "I"; 
    re = /I/ig; // 创建正则表达式模式。 
    document.write(re.test(s) + "<br/>"); // 返回 Boolean 结果。 
    document.write(re.lastIndex); 
} 
testDemo(); 
输出：
true
1
当再次调用document.write(re.test(s) + "
")时输出false，原因就是从第2个字符开始搜索的。解决方法：将test()的lastIndex属性每次重新指向0，re.lastIndex = 0;

四、search方法
用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。
stringObject.search(regexp)
参数
regexp
该参数可以是需要在 stringObject 中检索的子串，也可以是需要检索的 RegExp 对象。如果要执行忽略大小写的检索，请在正则表达式中添加标志 i。
返回值
stringObject 中第一个与 regexp 相匹配的子串的起始位置。如果没有找到任何匹配的子串，则返回 -1。
说明
search() 方法不执行全局匹配，它将忽略标志 g。它同时忽略 regexp 的 lastIndex 属性，并且总是从字符串的开始进行检索，这意味着它总是返回 stringObject 的第一个匹配的位置。
例子8：

var str="Visit W3School!"
document.write(str.search(/w3school/i))
五、replace方法
用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
stringObject.replace(regexp/substr, replacement)
参数
regexp/substr
必需。规定子字符串或要替换的模式的 RegExp 对象。
replacement
必需。替换文本或生成替换文本的函数。
返回值
replace 方法的结果是一个完成了指定替换的 stringObj 对象的复制。这个新的字符串对象，是用 replacement 替换了 regexp 的第一次匹配或所有匹配之后得到的。
说明
replace() 方法将在 stringObject 中查找与 regexp 相匹配的子字符串，然后用 replacement 来替换这些子串。如果 regexp 具有全局标志 g，那么 replace() 方法将替换所有匹配的子串。否则，它只替换第一个匹配子串。
replacement 可以是字符串，也可以是函数。如果它是字符串，那么每个匹配都将由字符串替换。但是 replacement 中的 $ 字符具有特定的含义。如下表所示，它说明从模式匹配得到的字符串将用于替换。
Paste_Image.png

注意：ECMAScript v3 规定，replace() 方法的参数 replacement 可以是函数而不是字符串。在这种情况下，每个匹配都调用该函数，它返回的字符串将作为替换文本使用。该函数的第一个参数是匹配模式的字符串。接下来的参数是与模式中的子表达式匹配的字符串，可以有 0 个或多个这样的参数。接下来的参数是一个整数，声明了匹配在 stringObject 中出现的位置。最后一个参数是 stringObject 本身。
例子9：将所有单词首字母大写
name = 'aaa bbb ccc';
uw=name.replace(/\b\w+\b/g, function(word){
  return word.substring(0,1).toUpperCase()+word.substring(1);}
);
例子10：将Doe, John替换为John, Doe

name = "Doe, John";
name.replace(/(\w+)\s*, \s*(\w+)/, "$2 $1");
六、split() 方法
用于把一个字符串分割成字符串数组。
stringObject.split(separator,howmany)
参数
separator
必需。字符串或正则表达式，从该参数指定的地方分割 stringObject。
howmany
可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。
返回值
一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 stringObject 分割成子串创建的。返回的数组中的字串不包括separator 自身。
但是，如果 separator 是包含子表达式的正则表达式，那么返回的数组中包括与这些子表达式匹配的字串（但不包括与整个正则表达式匹配的文本）。
注意
如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割。
String.split() 执行的操作与 Array.join 执行的操作是相反的。
例子11：

var str="How are you doing today?"

document.write(str.split(" ") + "<br />")
document.write(str.split("") + "<br />")
document.write(str.split(" ",3))
输出
How,are,you,doing,today?
H,o,w, ,a,r,e, ,y,o,u, ,d,o,i,n,g, ,t,o,d,a,y,?
How,are,you

