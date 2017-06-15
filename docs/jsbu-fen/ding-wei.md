若为微信端，可使用微信定位，moClient='wx'即可，否则使用百度定位

```js
var moClient = $('#moClient').val();
jsLocation(moClient, function (city) {
    $('#userAddr').html(city);
});
```



