<style lang="less" xmlns="http://www.w3.org/1999/html">
    @import '../../../styles/common.less';
    @import 'upload.less';
</style>


<template>
    <Card>
        <div>
            <Form :label-width="80" :style="'background:'+ getColor">
                <FormItem label="APP名称:" :error="articleError">
                    <Input v-model="appName" @on-blur="handleArticletitleBlur" icon="android-list"/>
                </FormItem>

            </Form>

            <Col span="8">
            <Card>
                    <p slot="title">
                        <Icon type="ios-cloud-upload-outline"></Icon>
                        iOS安装包上传:
                    </p>

                <div style="display: block;width: 100%;text-align: center;">
                    <Upload
                            :action="[url + '/file?type=ipas&app_name='+appName]"
                            :on-format-error="handleFormatError"
                            :max-size="204800"
                            :before-upload="handleBeforeUpload"
                            :on-progress="handleProgress"
                            :on-success="handleSuccess"
                            :on-error="handleError"
                    >
                        <span>请选择文件&nbsp;&nbsp;</span>
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
                </div>

            </Card>
            </Col>


            <Col span="8" class="padding-left-10">
            <Card>
                <p slot="title">
                    <Icon type="ios-cloud-upload-outline"></Icon>
                    Android安装包上传:
                </p>
                <div style="display: block;width: 100%;text-align: center;">
                    <Upload
                            :action="[url + '/file?type=apks&app_name='+appName]"
                            :on-format-error="handleFormatError"
                            :max-size="204800"
                            :before-upload="handleBeforeUpload"
                            :on-progress="handleProgress"
                            :on-success="handleSuccess"
                            :on-error="handleError"
                    >
                        <span>请选择文件&nbsp;&nbsp;</span>
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
                </div>

            </Card>
            </Col>


            <Col span="8" class="padding-left-10">
            <Card>
            <p slot="title">
                <Icon type="ios-cloud-upload-outline"></Icon>
                iOS配置文件上传:
            </p>

                <div style="display: block;width: 100%;text-align: center;">
                    <Upload
                            :action="[url+'/file?type=plists&app_name='+appName]"
                            :on-format-error="handleFormatError"
                            :max-size="204800"
                            :before-upload="handleBeforeUpload"
                            :on-progress="handleProgress"
                            :on-success="handleSuccess"
                            :on-error="handleError"
                    >
                        <span>请选择文件&nbsp;&nbsp;</span>
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
                </div>
            </Card>
            </Col>

        </div>
    </Card>

</template>

<script>
    import global_ from '../../../libs/Global'
    export default {
        data () {
            return {
                url : global_.url,
                defaultList: [
                    {
                        'name': 'a42bdcc1178e62b4694c830f028db5c0',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': 'bc7521e033abdd1e92222d733590f104',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                appName: 'default',
                articleError: '',
            };
        },
        methods: {
            handleBeforeUpload (file) {
                this.$Notice.warning({
                    title: '文件准备上传',
                    desc: '文件 ' + file.name + ' 准备上传。'
                });
            },
            handleProgress (event, file) {
                this.$Notice.info({
                    title: '文件正在上传',
                    desc: '文件 ' + file.name + ' 正在上传。'
                });
            },
            handleSuccess (evnet, file) {
                this.$Notice.success({
                    title: '文件上传成功',
                    desc: '文件 ' + file.name + ' 上传成功。'
                });
            },
            handleError (event, file) {
                this.$Notice.error({
                    title: '文件上传失败',
                    desc: '文件 ' + file.name + ' 上传失败。'
                });
            },
            handleArticletitleBlur () {
                if (this.appName.length !== 0) {


                } else {
                    // this.articleError = '文章标题不可为空哦';
                    this.$Message.error('APP的名称不可为空哦');
                }
            },
            sendForm(str, types) {
                var form = this.$refs.ipas_form;
                var oOutput = document.querySelector("div"),
                    oData = new FormData((document.forms.namedItem(str)));

                oData.append("username", "This is some extra data");

                var oReq = new XMLHttpRequest();
                //oReq.open("POST", "https://sddeznsm.com/file?type="+ types +"&app_name="+$("#app_name").val(), true);
                oReq.open("POST", "http://localhost:9000/file?type=" + types + "&app_name=" + form.text, true);
                oReq.onload = function (oEvent) {
                    if (oReq.status == 200) {
                        alert("上传成功");
                        // oOutput.innerHTML = "Uploaded!";
                    } else {
                        alert("上传失败");
                        // oOutput.innerHTML = "Error " + oReq.status + " occurred when trying to upload your file.<br \/>";
                    }
                };

                oReq.send(oData);
            }


        },
        mounted () {
            function check() {
                var excel_file = $("#app_name").val();
                if (excel_file == "" || excel_file.length == 0) {
                    alert("请输入app的名称！");
                    return false;
                } else {
                    return true;
                }
            }
        }
    };
</script>


