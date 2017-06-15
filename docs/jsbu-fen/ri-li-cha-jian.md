[Simple-Calendar](https://github.com/Lixucheng/Simple-Calendar)

无依赖，只有js和css文件。 配置项众多，添加标记的话需要设置option.showMark和mark两项，实例化后追加标记需要调用addmark和updateMark方法。

```
<div id='container'></div>
<script>
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
          backgroundColor: '#FBEC9C',
          fontColor: '#4A4A4A',
          fontSize: '20px',
        },
        days: {
          backgroundColor: '#ffffff',
          fontColor: '#565555',
          fontSize: '24px'
        },
        todaycolor: 'orange',
        activeSelectColor: 'orange',
      }
    }
    var myCalendar = new SimpleCalendar('#container',options);
</script>
```





