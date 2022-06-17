<template>
    <article class="single_product v-module-xiezi">
        <figure>
            <div class="product_thumb" @click="$gotoUrl">
                <div class="label_product">
                    <span class="label_new" v-if="isNew">新</span>
                    <span class="label_sale" v-if="isBest">推</span>
                </div>
                <a class="primary_img img-box" :class="['pb'+imageHeight , (isScale?'img-scale':'')]" href="javascript:;">
                    <div class="img" :style="{'background-image': 'url('+$getImage(image)+')'}">

                    </div>
                </a>
                <a class="secondary_img img-box" v-if="image2" :class="['pb'+imageHeight , (isScale?'img-scale':'')]" href="javascript:;">
                    <div class="img" :style="{'background-image': 'url('+$getImage(image2)+')'}">

                    </div>
                </a>
            </div>
            <figcaption class="product_content">
                <h4 class="product_name"><a href="javascript:;" @click="$gotoUrl"> {{title}}</a></h4>

                <div class="price_box" v-if="price">
                    <span class="current_price" v-if="price">￥{{price}}</span>
                    <span class="old_price" v-if="oldPrice">￥{{oldPrice}}</span>
                </div>

                <div class="add_to_cart">
                    <a href="javascript:;" title="查看详情">查看详情</a>
                </div>
            </figcaption>
        </figure>
    </article>
</template>
<style type="text/scss" scoped lang="scss">
.v-module-xiezi{
    figure{
        padding: 0px;
        margin: 0px;
    }
    &.single_product{
        border: 1px solid #e5e5e5;
        border-radius: 30px;
        transition: .3s;
        background: #ffffff;

        .product_name{
            margin: 0px;
            padding: 0px;
            height: 45px;
            line-height: 18px;
            overflow: hidden;
        }
        .product_thumb {
            position: relative;
            overflow: hidden;
            border-top-left-radius: 30px;
            border-top-right-radius: 30px;
            text-align: center;
            a.secondary_img {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                opacity: 0;
                visibility: hidden;
                -moz-transition: all 0.3s ease-in-out 0s;
                transition: all 0.3s ease-in-out;
            }
            a {
                display: inline-block;
            }
        }
        .add_to_cart {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 20px;
            opacity: 0;
            visibility: hidden;
            transition: .3s;
            a {
                font-size: 13px;
                font-weight: 500;
                line-height: 36px;
                border: 1px solid #e5e5e5;
                color: #454545;
                background: #fff;
                padding: 0 30px;
                border-radius: 25px;
                display: inline-block;
                text-align: center;
                text-transform: uppercase;
                font-family: "Oswald", sans-serif;
            }
            a:hover {
                color: #fff;
                background: #F53737;
                border-color: #F53737;
            }
        }
        .label_product {
            span {
                position: absolute;
                z-index: 9;
            }
            span.label_sale {
                top: 15px;
                right: 13px;
                text-transform: uppercase;
                color: #ffffff;
                background: #F53737;
                font-size: 12px;
                font-weight: 600;
                height: 24px;
                line-height: 24px;
                width: 56px;
                text-align: center;
                display: block;
                border-radius: 18px;
            }
            span.label_new {
                top: 15px;
                left: 13px;
                text-transform: uppercase;
                color: #ffffff;
                background: #46ce91;
                font-size: 12px;
                font-weight: 600;
                height: 24px;
                line-height: 24px;
                width: 56px;
                text-align: center;
                display: block;
                border-radius: 18px;
            }
        }
        .product_content {
            text-align: center;
            padding: 17px 15px 40px 15px;
            position: relative;
            h4 {
                font-size: 14px;
                line-height: 24px;
                font-weight: 500;
                text-transform: capitalize;
                margin: 0;
                a:hover {
                    color: #F53737;
                }
            }
        }
        .price_box {
            margin-top: 17px;
            span {
                line-height: 16px;
                font-family: "Oswald", sans-serif;
            }
            span.old_price {
                text-decoration: line-through;
                font-weight: 400;
                font-size: 14px;
                margin-left: 5px;
            }
            span.current_price {
                font-weight: 500;
                font-size: 16px;
                color: #F53737;
            }
        }


        &:hover {
            box-shadow: 0 0 9px 1px rgba(0, 0, 0, 0.12);
            .add_to_cart {
                opacity: 1;
                visibility: visible;
                bottom: 27px;
            }
            .product_thumb a.secondary_img {
                opacity: 1;
                visibility: visible;
                -moz-transition: all 0.3s ease-in-out 0s;
                transition: all 0.3s ease-in-out;
            }
            .swatches-colors {
                opacity: 1;
                visibility: visible;
            }
        }


    }

}
</style>
<script>
    import gotoUrl from "../mixins/gotoUrl";

    export default {
        name: "e-module-xiezi",
        data() {
            return {}
        },
        mixins:[gotoUrl],
        props:{
            image:String,
            image2:String,
            isScale:{
                type:Boolean,
                default:false
            },
            imageHeight:{
                type:[String,Number],
                default:80
            },
            title:String,
            price:[String,Number],
            oldPrice:[String,Number],
            isNew:{
                type:Boolean,
                default:false
            },
            isBest:{
                type:Boolean,
                default:false
            }
        },
        watch: {},
        computed: {},
        methods: {},
        created() {

        },
        mounted() {
        },
        destroyed() {
        }
    }
</script>
