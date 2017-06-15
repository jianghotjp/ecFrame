使用less，工具库使用百度提供的[est](http://ecomfe.github.io/est/),编译less需输出map文件。

在less中定义了一些基本色，字体用5种黑色，

```
@gray-darker: lighten(#000, 17%);  // #2b2b2b
@gray-dark: lighten(#000, 20%);      // #333
@gray: lighten(#000, 40%);         // #666
@gray-light: lighten(#000, 60%); // #999
@gray-lighter: lighten(#000, 93.5%); // #eee
```

主色调

```
@c-main: #4680d1;  // 主色调
@c-main-light: #7ca9ea;  // 浅主色调
```

状态色

```
@c-success: #56d146; // 成功
@c-info: #4680d1; // 信息  default和主色调相同
@c-warn: #f49127; // 警告
@c-error: #df3a3a; // 错误
```

价格颜色

```
@c-price: #ff5454;
```

icon颜色

```
@c-icon: #ffaa06;
```



