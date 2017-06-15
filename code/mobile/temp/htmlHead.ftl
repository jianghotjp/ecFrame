<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
<meta name="format-detection" content="telephone=no" />
<link rel="stylesheet" type="text/css" href="${vars.theme.root}/resources/css/animate.css"/>
<link rel="stylesheet" type="text/css" href="${vars.theme.root}/resources/css/mui.min.css"/>
<link rel="stylesheet" type="text/css" href="${vars.theme.root}/resources/css/icons-extra.css"/>
<link rel="stylesheet" type="text/css" href="${vars.theme.root}/resources/css/style.css"/>
<style>
    @font-face {font-family: "jdb-icon";
        src:url('${vars.root}/upload/upload/icon/jdb-icon.ttf') format('truetype');
    }
    .jdb-icon {
        font-family:"jdb-icon" !important;
        font-size:.42rem;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
<#include "${vars.resourceFolder}/temp/platformHead.ftl"/>

<script type="text/javascript">
    var vars = {
        root: "${vars.root}",
        clientRoot: "${vars.clientRoot}",
        uploadRoot: "${vars.uploadRoot}",
        resourceFolder:"${vars.resourceFolder}",
        theme: {
            id: "${vars.theme.id}",
            root: "${vars.theme.root}"
            <#--ecImg: "${resRoot}/images/ec",-->
            <#--ecTmplImg: "${resRoot}/images/ec/${vars.theme.id}",-->
            <#--servImg: "${resRoot}/images/serv",-->
            <#--servTmplImg: "${resRoot}/images/serv/${vars.theme.id}"-->
        }
    };
//禁止长按菜单，模拟APP
    document.oncontextmenu=function(){
        return false;
    };
</script>
