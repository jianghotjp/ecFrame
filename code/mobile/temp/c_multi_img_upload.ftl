<link rel="stylesheet" type="text/css" href="${vars.theme.root}/resources/css/uploader_style.css"/>
<div class="mui-fullscreen upload-img-bg">
    <div class="mui-fullscreen" id="clipArea"></div>
    <div class="upload-img-btn-block">
        <button class="upload-img-btn fl" id="cancelBtn">取消</button>
        <div class="upload-img-btn fl">
            <p class="mui-fullscreen">选择文件</p>
            <input class="mui-fullscreen" type="file" id="file">
        </div>
        <button class="upload-img-btn fl" id="clipBtn">截取</button>
    </div>
</div>
<#--<div class="mui-input-row fs-13">-->
    <#--<label style="width: 100%"><${model.title}</label>-->
<#--</div>-->
<div class="dataContent" id="photoClipList"></div>
<#--<ul class="upload-img-list mui-clearfix" data-max="${model.max}">
<#if model.oldPics!=null>
    <#list model.oldPics?split(",") as img>
        <li class="upload-img">
            <div class="upload-img-block">
			<span>
				<img src="${buildUrl(img)}">
			</span>
            </div>
            <div class="del-btn">
                删 除
            </div>
        </li>
    </#list>
</#if>

    <li class="view"></li>
</ul>-->
<script id="photoClipListTpl" type="text/html">
    <ul class="upload-img-list mui-clearfix" data-max="<%=model.max%>">
        <%if(model.oldPics!=null){%>
            <%for(i=0;i<model.oldPics.length;i++){%>
                <li class="upload-img">
                    <div class="upload-img-block">
                            <span>
                                <img src="<%=#imgFormat(model.oldPics[i],'370x370.png',false)%>">
                            </span>
                    </div>
                    <div class="del-btn">
                        删 除
                    </div>
                </li>
            <%}%>
        <%}%>
    <li class="view _addBtn"></li>
</ul>


</script>


<script type="text/javascript" src="${vars.theme.root}/resources/js/module/jquery-1.11.0.js"></script>
<script type="text/javascript" src="${vars.theme.root}/resources/js/module/iscroll-zoom.js"></script>
<script type="text/javascript" src="${vars.theme.root}/resources/js/module/hammer.js"></script>
<script type="text/javascript" src="${vars.theme.root}/resources/js/module/lrz.all.bundle.js"></script>
<script type="text/javascript" src="${vars.theme.root}/resources/js/module/jquery.photoClip.js"></script>
<script type="text/javascript" src="${vars.theme.root}/resources/js/module/uploadComponent.js"></script>
