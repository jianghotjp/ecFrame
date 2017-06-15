function jsLocation(moClient,getCity){
//初始化百度经纬度计算接口
    var gc = new BMap.Geocoder();
    //初始化地图、地址查询
    //如果是新建，则获取当前位置
    if (moClient == "wx") {
        wxLocation(function (o) {
            if (!o || !o.latitude) {
                ipLocation();
            } else {
                var latitude = o.latitude;
                var longitude = o.longitude;
                var gpsPoint = new BMap.Point(longitude, latitude);
                //因为不同地图都有自己的处理，同一个经纬度在不同地图上显示的位置并不相同，因此，要把以前的数据直接拿过来用需要做一个转换
                BMap.Convertor.translate(gpsPoint, 2, function (point) {
                    gc = new BMap.Geocoder();//地理编码对象
                    pointLocationInput(gc,point,getCity);
                });
            }
        });
    }else {
        ipLocation(getCity);
    }

}

//ip定位所在城市
function ipLocation(getCity) {
    var myCity = new BMap.LocalCity();
    var city;
    myCity.get(function(citydata){
        city=citydata.name;
        getCity(city);
    });
}

//将坐标点转为地址描述
function pointLocationInput(gc,point,getCity) {
    var city;
    //经纬度
    gc.getLocation(point, function (rs) {
        var addComp = rs.addressComponents;
        city=addComp.city;
        getCity(city);
    });
}

