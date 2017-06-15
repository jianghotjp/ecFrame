/*
 * 辅助函数模板
 * 日期、价格、服务器图片路径
 * 写法：
 * template.helper(name, callback)
 * js调用
 * var html = template('test', data);
 * document.getElementById('content').innerHTML = html;
 */
var tmpWidth = 750,
    windowWidth = window.screen.width;
var scale = tmpWidth / windowWidth;
/**
 * 日期格式化
 * @creat 2016-11-17
 * @param date 要格式化的日期
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     h:小时(0-23),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 * @example
 * 模板
 * <%=dateFormat(time, 'yyyy年 MM月 dd日 hh:mm:ss')%>
 * <%=dateFormat(time, 'yy年 MM月 dd日 hh:mm:ss')%>
 * <%=#dateFormat(time, 'yy<b>年</b> MM月 dd日')%>
 * 数据
 * var data = {
 *   time: (new Date).toString()
 * };
 */
template.helper('dateFormat', dateFormat);



/**
 * 格式化浮点型（商品价格）
 * @creat 2016-11-17
 * @param num 要格式化的数字
 * @param format 进行格式化的小数点位数
 * @return String
 * @example
 * 模板
 * <%=moneyFormat(price, '2')%>
 * <%=moneyFormat(price)%>
 * 数据
 * var num = {
 *   price: 23.5
 * };
 */
template.helper('moneyFormat', moneyFormat);

/**
 * ulpoad目录图片格式化
 * @creat 2016-11-17
 * @update 2016-11-18 增加错误图片替换，调用需加“#”防止转义
 * @param {String} url 要格式化的url
 * @param {String} format 裁剪尺寸.扩展名（.100x100.png）第一个“.”可省略
 * @param {Boolean} [isZip] 是否压缩图片,false:不压缩
 * @return {String}
 * @example
 * 模板
 * <%=#imgFormat(url, '100x100.png')%>
 * 数据
 * var url = {
 *    url: 'upload/12345/67890.jpg'
 * };
 */
template.helper('imgFormat', imgFormat);
