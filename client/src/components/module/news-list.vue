<template>
    <div class="e-news-info clearfix">
        <div class="thumb" v-if="image" @click="$gotoUrl">
            <div class="img-box pb100">
                <div class="img" :style="{'background-image': 'url('+$getImage(image)+')'}"></div>
            </div>
        </div>
        <div class="news-content-text" :class="{'not-thumb':!image}">
            <h3 @click="$gotoUrl">{{title}}</h3>
            <div class="description" v-html="$substr(description,len)">

            </div>
            <div class="other-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<style type="text/scss" lang="scss">
.e-news-info{
    margin-bottom: 10px;
    background: #ffffff;
    position: relative;
    .thumb{
        float: left;
        width: 120px;
    }
    .news-content-text{
        margin-left: 130px;
        h3{
            cursor: pointer;
            font-size: 14px;
            margin: 0px;
            margin-bottom: 10px;
            font-weight: 700;
        }
        .description{
            color: #7b7b7b;
        }
        .other-content{
            position: absolute;
            left: 130px;
            bottom: 5px;
            span{
                display: inline-block;
                margin-right: 8px;
            }
        }
    }
    .news-content-text.not-thumb{
        margin-left: 0px;
    }

}

@media screen and (max-width: 768px){
    .e-news-info{
        .thumb {
            width: 100px;
        }
        .news-content-text {
            margin-left: 110px;
            .other-content {
                left: 110px;
            }
            .description{
                word-break:break-all;
                display:-webkit-box;/**对象作为伸缩盒子模型展示**/
                -webkit-box-orient:vertical;/**设置或检索伸缩盒子对象的子元素的排列方式**/
                -webkit-line-clamp:2;/**显示的行数**/
                overflow:hidden;/**隐藏超出的内容**/
            }
        }
    }
}
</style>
<script>
    import gotoUrl from "../mixins/gotoUrl";

    export default {
        name: "e-news-list",
        data() {
            return {}
        },
        mixins:[gotoUrl],
        props:{
            image:String,
            title:String,
            description:[String,Number],
            len:{
                type:Number,
                default:30
            }
        },
        watch: {},
        computed: {

        },
        methods: {

        },
        created() {
        },
        mounted() {
        },
        destroyed() {
        }
    }
</script>
