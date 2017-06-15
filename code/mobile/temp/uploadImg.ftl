<script src="${vars.theme.root}/resources/js/module/jquery-1.10.2.min.js?v=${ver}" type="text/javascript" charset="utf-8"></script>
<script src="${vars.theme.root}/resources/js/module/iscroll-zoom.js?v=${ver}" type="text/javascript" charset="utf-8"></script>
<script src="${vars.theme.root}/resources/js/module/hammer.js?v=${ver}" type="text/javascript" charset="utf-8"></script>
<script src="${vars.theme.root}/resources/js/module/lrz.all.bundle.js?v=${ver}" type="text/javascript" charset="utf-8"></script>
<script src="${vars.theme.root}/resources/js/module/jquery.photoClip.js?v=${ver}" type="text/javascript" charset="utf-8"></script>

<style type="text/css">
    /*头像裁剪组件*/
    .upload-img-btn-block{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
    .upload-img-bg{
        position: fixed;
        background: rgba(0,0,0,0.8);
        box-shadow: 0 0 5px 0 #000;
        display: none;
        z-index: 10000;
    }
    .upload-img-btn{
        width: 29%;
        height: 35px;
        margin: 2%;
        position: relative;
        overflow: hidden;
        background: #fff;
        font-size: 14px;
        font-weight: 400;
        line-height: 1.42;
        display: inline-block;
        padding: 6px 12px;
        cursor: pointer;
        -webkit-transition: all;
        transition: all;
        -webkit-transition-timing-function: linear;
        transition-timing-function: linear;
        -webkit-transition-duration: .2s;
        transition-duration: .2s;
        text-align: center;
        vertical-align: top;
        white-space: nowrap;
        color: #333;
        border: 1px solid #ccc;
        border-radius: 3px;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
        background-color: #fff;
        background-clip: padding-box;
    }
    .upload-img-btn p{
        line-height: 35px;
        text-align: inherit;
        z-index: 0;
        color: inherit;
    }
    .upload-img-btn input[type=file]{
        opacity:0;
        z-index: 1;
    }
    .tf-percents{
        width: 25%!important;
    }
    .tf-percents a i{
        width: 3.0rem;
        height: 3.0rem;
        line-height: 3.0rem;
        font-size: 1.5rem;
    }

</style>

<#--dom结构 start-->
<input type="hidden" name="photoClipImgWidth" id="photoClipImgWidth" value="100"/>
<input type="hidden" name="photoClipImgHeight" id="photoClipImgHeight" value="100"/>

<div class="mui-fullscreen upload-img-bg">
    <div class="mui-fullscreen" id="clipArea"></div>
    <div class="upload-img-btn-block">
        <button class="upload-img-btn l" id="cancelBtn">取消</button>
        <div class="upload-img-btn l">
            <p class="mui-fullscreen">选择文件</p>
            <input class="mui-fullscreen" type="file" id="file">
        </div>
        <button class="upload-img-btn l" id="clipBtn">截取</button>
    </div>
</div>

<div id="view"></div>
<#--dom结构 start-->

<script type="text/javascript">
    /**
     *图片裁剪组件
     * @type {{_view: string, _fileBtn: string, _okBtn: string, _el: string, _options: {width: number, height: number}}}
     */
    var clipCallback;
    var uploadComponent = {
        _view: "#view",
        _fileBtn: "#file",
        _okBtn: "#clipBtn",
        _cancelBtn: "#cancelBtn",
        _el: ".upload-img-bg",
        _options: {
            width: 150,
            height: 150,
            loadStart: function () {
                console.log("照片读取中");
            },
            loadComplete: function () {
                $('#clipBtn').addClass('readDone');
                console.log("照片读取完成");
            },
            clipFinish: function (dataURL) {
                //    console.log(dataURL);
                $('#clipBtn').removeClass('readDone');
                uploadComponent.elHide();
                if (clipCallback) {
                    clipCallback(dataURL);
                }
            }
        },
        elShow: function () {
            $(this._el).show();
        },
        elHide: function () {
            $(this._el).hide();
        },
        init: function () {
            $("#clipArea").photoClip($.extend({
                file: this._fileBtn,
                view: this._view,
                ok: this._okBtn
            }, this._options));
            $(this._cancelBtn).click(function () {
                uploadComponent.elHide();
            })
        }
    };
    uploadComponent.init();

    function photoClipInit(callback) {
        clipCallback = callback;
        uploadComponent.elShow();
    }

</script>