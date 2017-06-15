#### 1. common中的公用方法

#####  1.1 全局变量 page

定义了一个全局变量page作为页面数据命名空间，在其中存放页面中需要用到的变量，减少全局变量的污染。

\`page.url\`  对URL的操作

`location.href = "http://192.168.50.114:8083/m/ec/goods/index.html?id=1"`

`// 返回完整url`

`page.url.url // http://192.168.50.114:8083/m/ec/goods/index.html?id=1`

`// 返回url参数`

`page.url.paras //  {id: "1"}`

`// 返回不包含参数的url`

`page.url.pathname //  http://192.168.50.114:8083/m/ec/goods/index.html`

`// 取URL参数`

`page.url.get('id')  // 1`

`// 设置URL参数`

`page.url.set({'kw':'abc'})  // http://192.168.50.114:8083/m/ec/goods/index.html?id=1&kw=abc`

`// 重构url`

`page.url.build() `

`// 移除url参数`

`page.url.remove('id') // http://192.168.50.114:8083/m/ec/goods/index.html?kw=abc`



\`page.page\` 页码 默认0，应在success里做自增操作



\`page.pageSize\` 每页显示个数，默认10



####  1.2 getJson\(url,param,success,error\)

异步json获取  

\`\`\`js

/\*\*

 \* 异步json获取

 \* @param {String} url 接口地址

 \* @param {Object} param 发送数据

 \* @param {Function} \[success\] 成功回调

 \* @param {Function} \[error\] 错误回调

 \*/

getJson\('/ec/goods/doFindGoods.do', {

    goodsId: 129

}, function \(res\) {

  if\(!res.success\){

    mui.toast\(res.errorMessage\);

    setTimeout\(function\(\){

      mui.back\(\);

    },1000\);

  }

}\)

\`\`\`

\#\#\#\#\# 1.3  \`getWidgetData\(widgetName,type,success,error\)\`

根据组件名称返回数据   widgetName 组件中文名， type 组件数据类型， success 成功回调函数（返回data）， error 出错回调

&lt;font color='red'&gt;\[注\]&lt;/font&gt;  getWidgetData的 接口地址为/comm/widget/doSearchWidgetData.do，部分组件的接口地址不是这个地址，可自行封装。



\`\`\`js

/\*\*

 \* @param widgetName 组件中文名

 \* @param type 组件数据类型

 \* @param {Function} \[success\] 成功回调函数（返回data）

 \* @param {Function} \[error\] 出错回调

\*/

getWidgetData\('PC-首页顶部轮播下方多图广告位',2, function \(res\) {

    var data = {

    vars: vars,

    xData: res.data.widgetData

    };

    renderTmp\('\#topSilderad', 'topSilderadTpl', data\);

    lazyLoad.refresh\(true\);

}\);

\`\`\`



\#\#\#\#\# 1.4 \`renderTmp\(selector,tmpId,data,callback\)\`

渲染模板，追加数据,传入callback时返回原生dom+html，不做数据追加处理,需手动追加。使用方式：

\`\`\`js

/\*\*

 

 \* @param {String} selector 原生选择器，只处理第一个元素

 \* @param {String} tmpId 模板id，不需要加 \#

 \* @param {JSON} data 后台返回的json数据

 \* @param {Function} \[callback\] 回调函数

 \*/

 renderTmp\('\#topSilderad', 'topSilderadTpl', data\);

\`\`\`

或者：

\`\`\`js

 renderTmp\('\#topSilderad', 'topSilderadTpl', data，function\(el,html\){

    el.innerHTML += Tpl;

    if\(el.className.indexOf\('show'\) &lt; 0\){

        el.className += ' show';

    }

 }\);

\`\`\`

\#\#\#\#\# 1.5 \`toNewPage\(href,cantBack\)\`

处理页面跳转，href   cantBack 默认false，

\`\`\`js

/\*\*

 \* @param {String} href 要跳转的URL

 \* @param {Boolean} \[cantBack\] true 是否禁止页面返回，替换url,默认false，为true时禁止页面返回

 \*/

toNewPage\('http://www.baidu.com',true\);

\`\`\`

\#\#\#\#\# 1.6 Cookie操作

setCookie\(c\_name,value,expiredays\); 

c\_name 键,value值,expiredays过期时间\(毫秒\)

getCookie\(c\_name\);

\`\`\`js

setCookie\('name','Bob',10000\);

getCookie\('name'\);

\`\`\`

\#\#\#\#\# 1.7 localStorage操作 

使用前先判断浏览器支持情况

local.set\(key,val,dur\);  key 键,val 值,dur过期时间（小时）

local.get\(key\);

\`\`\`js

local.set\('name','Bob',24\);

local.get\('name'\);

\`\`\`



\#\#\#\#\# 1.8 \`imgFormat\(url,format,\[isZip\],\[notForTpl\]\)\`

图片格式化集成错误图片替换，返回一个拼接好的URL

，输出时不转义输出，artTemplate需要加\#，使用方式：



\`\`\`html

/\*\*

\*@param {String} url 图片路径， 

\* @param {String}format 后台拦截器裁剪尺寸 

\*@param {Boolean} isZip 是否使用压缩（否的话原图输出），

\*@param {Boolean} notForTpl只返回路径，不拼接img标签需要的onerror

\*/

&lt;img src="&lt;%=\#imgFormat\(xData\[i\], '750x750.png',false\)%&gt;"&gt;

\`\`\`

\#\#\#\#\# 1.9 \`dateFormat\(date, format\)\`

格式化时间 

\`\`\`js

/\*\*

\*@param {String} date 时间 格式为"2017-05-25 00:00:00"或"2017/05/25 00:00:00"

\*@param {String} format格式 'y'年， 'M'月份， 'd'日， 'h'小时，  'm'分， 's'秒 , 'q'季度 , 'S'毫秒

\*/



dateFormat\(time,'yyyy-MM-dd hh:mm:ss'\)

\`\`\`

\#\#\#\#\# 1.10 \`moneyFormat\(num, \[format\]\)\`

格式化金额，每一个设置价格的地方都必须要使用moneyFormat

\`\`\`js

/\*\*

 \* @param num  金额

 \* @param \[format\]  需保留的小数，不设置时原样输出

 \*/

moneyFormat\(3000,2\)   //  "3,000.00"

\`\`\`

\#\#\#\#\# 1.11 \`Base64\`加密解密

toUri\(str\) 加密

fromUri\(str\) 解密

\`\`\`js

toUri\(339\)   //  "MzM5"

fromUri\("MzM5"\)   //  "339"

\`\`\`

\#\#\#\#\# 1.12 \`checkLogin\(toLogin,callback\)\` 判断是否登录  

\`\`\`js

/\*\*

 \* 判断登录

 \* @param toLogin    如果未登录，是否进入登录页面,默认false

 \* @param callback   如果是已登录状态时的回调函数

 \*/

checkLogin\(function\(\){

    alert\('已登录才执行'\)

}\)

\`\`\`

\#\#\#\#\# 1.13 \`rmoney\(s\)\` 价格转换浮点型 把moneyFormat格式化后的金额转成number类型

\`\`\`js

rmoney\('20,100'\) // 20100

\`\`\`

\#\#\#\#\# 1.14 \`autoGrow\(selector\) \`

textarea内容超出自动扩展,不会出现滚动条

\#\#\#\#\# 1.15 \`定位\` 

若为微信端，可使用微信定位，moClient='wx'即可，否则使用百度定位

\`\`\`js

var moClient = $\('\#moClient'\).val\(\);

jsLocation\(moClient, function \(city\) {

    $\('\#userAddr'\).html\(city\);

}\);

\`\`\`



\#\#\#\#\# 1.16 \`vars\` 定义路径

\`\`\`js

var vars = {

    root: "${vars.root}",       // 根目录

    clientRoot: "${vars.clientRoot}", //根目录或根目录\m，包含root

    uploadRoot: "${vars.uploadRoot}", //图片上传路径

    resourceFolder:"${vars.resourceFolder}",   // 资源路径  \resources 

    theme: {

        id: "${vars.theme.id}",     //模板id  emall-&gt; default

        root: "${vars.theme.root}" //资源路径  \resources 

    }

};

\`\`\`

使用方式：

\`\`\`html

&lt;a href="&lt;%=vars.clientRoot%&gt;/ex/goods/index.html"&gt;&lt;/a&gt;

&lt;link href="${vars.theme.root}/resources/css/mui.picker.css" rel="stylesheet"/&gt;

\`\`\`



\#\#\#\# 2. 插件

\#\#\#\#\# 2.1 &lt;span id="Simple-Calendar"&gt;\`日历插件\`&lt;/span&gt; \[Simple-Calendar\]\[6\]

无依赖，只有js和css文件。 配置项众多，添加标记的话需要设置option.showMark和mark两项，实例化后追加标记需要调用addmark和updateMark方法。



\`\`\`html

&lt;div id='container'&gt;&lt;/div&gt;

&lt;script&gt;

var options = {

      width: '500px',

      height: '500px',

      language: 'CH', //语言

      showLunarCalendar: true, //阴历

      showHoliday: true, //休假

      showFestival: true, //节日

      showLunarFestival: true, //农历节日

      showSolarTerm: true, //节气

      showMark: true, //标记

      timeRange: {

        startYear: 1900,

        endYear: 2049

      },

      mark: {

        '2016-5-5': '上学'

      },

      theme: { //主题颜色

        changeAble: false,

        weeks: {

          backgroundColor: '\#FBEC9C',

          fontColor: '\#4A4A4A',

          fontSize: '20px',

        },

        days: {

          backgroundColor: '\#ffffff',

          fontColor: '\#565555',

          fontSize: '24px'

        },

        todaycolor: 'orange',

        activeSelectColor: 'orange',

      }

    }

    var myCalendar = new SimpleCalendar\('\#container',options\);

&lt;/script&gt;

\`\`\`

\#\#\#\#\# 2.2 &lt;span id="DownCount"&gt;\`倒计时插件\`&lt;/span&gt; \[DownCount\]\[7\]

因需要传入服务器时间，在原来插件基础上做了修改：

\`\`\`html

&lt;p class="countdown"&gt;

    &lt;span class="hours"&gt;00&lt;/span&gt;时

    &lt;span class="minutes"&gt;00&lt;/span&gt;分

    &lt;span class="seconds"&gt;00&lt;/span&gt;秒

&lt;/p&gt;

&lt;!--span上的class为必须--&gt;

&lt;script&gt;

    $\('.countdown'\).downCount\({

        date: date,   //结束时间

        offset: +8,   //时区

        now\_date: now\_date    //开始时间、服务器时间

    }, function \(\) {

        // 倒计时执行完回调函数

    }\);

&lt;/script&gt;

\`\`\`



\#\#\#\#\# 2.3 &lt;span id="qrcode"&gt;\` 二维码生成\`&lt;/span&gt;

依赖\[qrcode.js\]\[8\] （实现二维码数据计算的核心类）

和\[jquery.qrcode.js\]\[9\]（把qrcode用jquery方式封装起来的，用它来实现图形渲染，支持canvas和table两种方式），使用方式：

\`\`\`js

$\('\#output'\).qrcode\('http://www.jerei.com'\)

\`\`\`



\#\#\#\#\# 2.4 &lt;span id="html2canvas"&gt;\`html2canvas\`&lt;/span&gt;

\[html2canvas\]\[10\] html转成图片 因直接截图不清晰，所以在源码基础上做了调整，传参时宽高要乘2，html里的图片不要用百分比设置宽高，否则会缩小变形。

\`\`\`js

var ct = $\('.mui-content'\);

var width = ct.width\(\);

var height = ct.height\(\);

html2canvas\(ct, {

    timeout: 300,

    width: width \* 2,

    height: height \* 2,

    onrendered: function \(canvas\) {

    // 回调

    }

}\);

\`\`\`



\#\#\#\#\# 2.5 &lt;span id="validator"&gt;\`表单验证\`&lt;/span&gt;

一开始手写验证，随后引入\[validator.js\]\[3\],支持字符串验证和表单验证，可拓展，相比源码，新增加 \`is\_idCard\` 身份证验证, 使用如下：

\`\`\`html

&lt;!--字符串验证--&gt;

&lt;script&gt;

    var v = new validator\(\);

    v.isEmail\('wowohoo@qq.com'\);

    v.isIp\('192.168.23.3'\);

&lt;/script&gt;

&lt;!--表单验证--&gt;

&lt;form id="form"&gt;

    &lt;div&gt;

        &lt;label for="email"&gt;邮箱验证&lt;/label&gt;

        &lt;input type="email" name="email" id="email" class="" value=""&gt;

    &lt;/div&gt;

    &lt;div&gt;

        &lt;input type="radio" name="sex" value="1"&gt;

        &lt;input type="radio" name="sex" value="2"&gt;

    &lt;/div&gt;

    &lt;input type="text" name="phone" value=""&gt;

    &lt;button type="submit"&gt;提交&lt;/button&gt;

&lt;/form&gt;



&lt;script&gt;

// 表单验证,submit时验证

var v = new Validator\('form', \[{

    //name 字段

    name: 'phone',

    display: "你输入的{{phone}}不是合法手机号\|不能为空\|太长\|太短",

    // 验证条件

    rules: 'is\_phone\|required\|min\_length\(2\)\|max\_length\(12\)'

},{

    //name 字段

    name: 'email',

    display: "你输入的{{email}}不是合法邮箱\|不能为空\|太长\|太短",

    // 验证条件

    rules: 'is\_email\|required\|min\_length\(2\)\|max\_length\(12\)'

}, {

    //name 字段

    name: 'sex',

    display:"请你选择性别{{sex}}\|请输入数字",

    regexp\_num:/^\[0-9\]+$/,//增加验证条件

    // 验证条件

    rules: 'required\|regexp\_num'

}\], function\(obj, evt\) {

    if \(obj.errors\) {

        // 判断是否错误，obj.errors为数组

        console.log\(obj.errors\)

    }

}\)；



// 手动验证

v.validate\(\)

&lt;/script&gt;

\`\`\`





\#\#\#\#\# 2.6 &lt;span id="momentjs"&gt;\`时间处理函数\`&lt;/span&gt;

\[momentjs\]\[4\]\(\[momentjs中文网\]\[5\]\)，可支持多语言，对时间进行格式化，计算相对时间，日历时间



