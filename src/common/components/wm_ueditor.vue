<style>
    .edui-default {
        clear:both;
    }
    .edui-default .edui-toolbar {
        overflow: auto!important;
        width:100% !important;
        line-height: 22px;
    }

</style>
<template>
	<div>
		<script id="editor" type="text/plain"></script>
	</div>
</template>
<script>
export default {
    props: {
        setContent: {
            type: String,
            default:''
        },
        config: {
            type: Object
        }
    },
    data() {
        return {
            editor: null,
            defaultConfig: {
                getUploadSignUrl: '',
                imageUrlPrefix: '',
                uploadUrl:'',
                initialFrameWidth: 375,
                initialFrameHeight: 350,
                pathIndex: 2,
                autoFloatEnabled:false,
                toolbars: [[
                    'fullscreen', 'source', '|', 'undo', 'redo', '|',
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                    'directionalityltr', 'directionalityrtl', 'indent', '|',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                    'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                    'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
                    'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
                    'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                    'print', 'preview', 'searchreplace', 'drafts', 'help'
                ]]
            }
        }
    },
    mounted() {
        const _this = this
        this.editor = UE.getEditor('editor', this.defaultConfig); // 初始化UE
        this.editor.addListener("ready", function () {
            _this.editor.setContent(_this.setContent); // 确保UE加载完成后，放入内容。
        })
        this.editor.addListener("contentChange", function(editor) {
            _this.$emit('change',_this.editor.getContent())
        })
    },
    created() {
        this.defaultConfig = Object.assign(this.defaultConfig,this.config)
    },
    methods: {
        getUEContent() { // 获取内容方法
            return this.editor.getContent()
        },
        setUEContent(content){
            const _this = this;
            this.editor.ready(function() {
                _this.editor.setContent(content);
            });
        },
        setDefault(content) {
            this.editor.setContent(content);
        }
    },
    destroyed() {
        this.editor.destroy();
    }
}
</script>