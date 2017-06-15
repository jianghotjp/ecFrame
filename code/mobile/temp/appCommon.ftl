<#--文件需引用在当前页面所有js后-->
<script>
    (function() {
        mui('body').progressbar().show();
        if (typeof pageInit == "function") {
            if (mui.os.plus) {
                document.addEventListener("plusready", pageInit);
            } else {
                mui.ready(pageInit);
            }
        }
    })();
</script>