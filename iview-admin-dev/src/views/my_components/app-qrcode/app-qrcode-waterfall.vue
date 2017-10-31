<style lang="less">
    @import '../../../styles/loading.less';
</style>

<template>
    <div>

        <waterfall :line-gap="200" :watch="items">
            <!-- each component is wrapped by a waterfall slot -->
            <waterfall-slot
                    v-for="(item, index) in items"
                    :width="item.width"
                    :height="[item.height + '50']"
                    :order="index"
                    :key="item.id"
            >

                <h3>{{item.title}}</h3>
                <p><a href="#"><img :src="item.src" :height="item.height" :width="item.width" /></a></p>

                <!--
                  your component
                -->
            </waterfall-slot>
        </waterfall>
    </div>




</template>

<script>
    import tinymce from 'tinymce';
    import Waterfall from 'vue-waterfall/lib/waterfall'
    import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
    import global_ from '../../../libs/Global'
    export default {
        data () {
            return {
                url: global_.url,
                spinShow: true,
                items: []
            };
        },
        mounted () {
           // this.$http.jsonp('https://sddeznsm.com/qrcode?n=10', {}, {
              this.$http.jsonp( this.url + '/qrcode?n=10', {}, {
                headers: {

                },
                emulateJSON: true
            }).then(function(response) {
                // 这里是处理正确的回调

                this.items = response.data;
                // this.articles = response.data["subjects"] 也可以
            }, function(response) {
                // 这里是处理错误的回调
                console.log(response)
            });
        },
        destroyed () {
            tinymce.get('tinymceEditer').destroy();
        },
        components: {
            Waterfall,
            WaterfallSlot
        }
    };
</script>

<style>

</style>
