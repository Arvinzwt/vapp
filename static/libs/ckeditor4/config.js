/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';
    // var pathName=window.document.location.pathname;
    // var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    // config.filebrowserImageUploadUrl=projectName.toString()+"/ImageUploadServlet";
    // config.filebrowserUploadUrl= projectName.toString()+"/UploadMusicServlet";
    var baseURL = 'https://question-api-test.jronline.com';
    if (location.host.indexOf('question.jronline.com') !== -1) {//pro
        baseURL = "//question-api.jronline.com";
    } else if (location.host.indexOf('question-test.jronline.com') !== -1) { //test
        baseURL = "//question-api-test.jronline.com/";
    }

    config.toolbarGroups = [
        // {name: 'clipboard', groups: ['clipboard', 'undo']},
        // {name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing']},
        // {name: 'forms', groups: ['forms']},
        // {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
        // {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph']},
        // {name: 'links', groups: ['links']},
        // {name: 'insert', groups: ['insert']},
        // {name: 'document', groups: ['mode', 'document', 'doctools']},
        // {name: 'styles', groups: ['styles']},
        // {name: 'colors', groups: ['colors']},
        // {name: 'tools', groups: ['tools']},
        // {name: 'others', groups: ['others']},
        // {name: 'about', groups: ['about']}
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] }
    ];

    config.width = 'auto';
    config.height = 150;
    config.format_tags = 'p;h1;h2;h3;pre';
    config.extraPlugins = ['html5audio', 'mathjax', 'confighelper'];
    config.mathJaxLib = 'https://lib.baomitu.com/mathjax/2.7.7/MathJax.js?config=TeX-AMS_HTML';
    config.placeholder = '请输入';
    config.removePlugins = 'easyimage,cloudservices';
    config.removeDialogTabs = 'image:advanced;image:Link';
    config.image_previewText = ' ';
    config.removeButtons = 'ImageButton,Link,Unlink,Anchor,Flash';

    // config.removeButtons = 'Save,NewPage,Preview,Print,Templates,Cut,Paste,PasteFromWord,PasteText,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,NumberedList,BulletedList,Outdent,Indent,Blockquote,CreateDiv,Language,BidiRtl,Link,BidiLtr,Unlink,Anchor,Flash,HorizontalRule,Smiley,PageBreak,Iframe,Styles,Format,Font,FontSize,TextColor,BGColor,Maximize,ShowBlocks,About,Copy';

    config.filebrowserImageUploadUrl = baseURL + '/question/fileUpload/img';
    config.filebrowserUploadUrl = baseURL + '/question/fileUpload/audio';
};

