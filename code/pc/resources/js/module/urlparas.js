/**
 * 处理浏览器地址栏参数
 * 1.0.1增加hash
 * urlParas
 */
(function(window, document) {

    var UrlParas = function(url) {
        return UrlParas.fn.init(url);
    };
    UrlParas.VERSION = '1.0.1';
    UrlParas.fn = UrlParas.prototype = {

        url: "",
        pathname: "",
        paras: "",
        hashParas: "",
        init: function(url) {
            this.url = url;
            this.pathname = url.indexOf('?') > 0 ? url.split("?")[0]:url.split("#")[0];
            this.paras = this.get();
            this.hashParas = this.getHash();
            return this;
        },

        //以object类型返回url参数及其取值
        get: function(option) {
            var paraStr, paras,
                url = this.url;
            if (url) {
                paraStr = (function(url){
                    if(url.indexOf('#') > 0){
                        url = url.split("#")[0];
                    }
                    return url.split("?")[1];
                })(url)
                if (paraStr) {
                    paras = {};
                    paraStr = paraStr.split("&");
                    for (var n = 0; n < paraStr.length; n++) {
                        var name = paraStr[n].split("=")[0];
                        var value = paraStr[n].split("=")[1];
                        paras[name] = value;
                    }
                } else {
                    return {};
                }
                if (!option) {
                    return paras;
                } else {
                    return paras[option] ? paras[option] : "";
                }


            }
        },
        //以object类型返回url参数及其取值
        getHash: function(option) {
            var paraStr, paras,
                url = this.url;
            if (url) {
                paraStr = (function(url){
                    if(url.indexOf('#') > 0){
                        url = url.split("#")[0];
                    }
                    return url.split("#")[1];
                })(url)
                if (paraStr) {
                    paras = {};
                    paraStr = paraStr.split("&");
                    for (var n = 0; n < paraStr.length; n++) {
                        var name = paraStr[n].split("=")[0];
                        var value = paraStr[n].split("=")[1];
                        paras[name] = value;
                    }
                } else {
                    return {};
                }
                if (!option) {
                    return paras;
                } else {
                    return paras[option] ? paras[option] : "";
                }


            }
        },
        //重设url参数取值，若无此参数则进行创建,若参数赋值为null则进行删除
        set: function(option) {
            var i, name, val;
            if (arguments.length == 2) {
                name = arguments[0];
                val = arguments[1];
                option = {};
                option[name] = val;
            }
            if ("string" === typeof option) {
                this.paras[option] = "";
            } else if ("object" === typeof option) {
                for (i in option) {
                    if (option[i] === null) {
                        delete this.paras[i];
                    } else {
                        this.paras[i] = option[i];
                    }
                }
            } else {

            }
            return this.build();
        },
        //重设url参数取值，若无此参数则进行创建,若参数赋值为null则进行删除
        setHash: function(option) {
            var i, name, val;
            if (arguments.length == 2) {
                name = arguments[0];
                val = arguments[1];
                option = {};
                option[name] = val;
            }
            if ("string" === typeof option) {
                this.hashParas[option] = "";
            } else if ("object" === typeof option) {
                for (i in option) {
                    if (option[i] === null) {
                        delete this.hashParas[i];
                    } else {
                        this.hashParas[i] = option[i];
                    }
                }
            } else {

            }
            return this.build();
        },
        //删除url中指定参数返回新url
        remove: function(option) {
            var i;
            if ("string" === typeof option) {
                option = option.split(",");
                for (i in option) {
                    delete this.paras[option[i]]
                }

            }
            return this.build();
        },
        //删除url中指定参数返回新url
        removeHash: function(option) {
            var i;
            if ("string" === typeof option) {
                option = option.split(",");
                for (i in option) {
                    delete this.hashParas[option[i]]
                }

            }
            return this.build();
        },
        //根据url和处理过的paras重新构件url
        build: function() {
            var i,newUrl = this.pathname;
                 function check(obj){
                     if (typeof obj === "object" && !(obj instanceof Array)){  
                        var hasProp = false;  
                        for (var prop in obj){  
                            hasProp = true;  
                            break;  
                        }  
                    }
                     return hasProp;
                 }
            if(check(this.paras)){
                newUrl += "?";
                var j = 0;
                for (i in this.paras) {
                    if(j){
                        newUrl += ("&" + i + "=" + this.paras[i]);
                    }else{
                        newUrl += (i + "=" + this.paras[i]);
                    }
                    
                    j++
                }
            }
            if(check(this.hashParas)){
                newUrl += "#";
                var k = 0;
                for (i in this.hashParas) {
                    if(k){
                        newUrl += ("&" + i + "=" + this.hashParas[i]);
                    }else{
                        newUrl += (i + "=" + this.hashParas[i]);
                    }
                    k++
                }
            }
            return newUrl;
        }


    };

    UrlParas.fn.init.prototype = UrlParas.fn;

    window.urlParas = UrlParas;

})(window, document);
