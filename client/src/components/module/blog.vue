<template>
    <article class="single_blog">
        <figure>
            <div class="blog_thumb" v-if="image" @click="$gotoUrl">
                <a href="javascript:;" class="img-box" :class="['pb'+imageHeight , (isScale?'img-scale':'')]">
                    <div class="img" :style="{'background-image':'url('+$getImage(image)+')'}"></div>
                </a>
            </div>
            <figcaption class="blog_content">
                <h4 class="post_title">
                    <a href="javascript:;" @click="$gotoUrl"> {{ title }} </a>
                </h4>
                <div class="articles_date">
                    <span><i class="fa fa-calendar" aria-hidden="true"></i> {{ formatTime }}</span>
                    <span v-if="sendUser"><i class="fa fa-user" aria-hidden="true"></i> {{ sendUser }}</span>
                </div>
                <p class="post_desc">
                    {{ contents }}
                </p>
                <a href="javascript:;" class="btn-see" @click="$gotoUrl"> {{btnText}} </a>
                <span class="article-price" v-if="price">￥ {{ price }}</span>
            </figcaption>
        </figure>
    </article>
</template>

<script>

import gotoUrl from "../mixins/gotoUrl";

export default {
    name: "e-module-blog",
    data() {
        return {}
    },
    props:{
        to:[String,Object],
        replace:{
            type:Boolean,
            default:false
        },
        title:String,
        price:[String,Number],
        content:[String,Number],
        sendUser:String,
        time:String,
        image:String,
        imageHeight:{
            type:[String,Number],
            default:80
        },
        btnText:{
            type:String,
            default:'+ 查看详情'
        },
        isScale:{
            type:Boolean,
            default:false
        },
        len:{
            type:Number,
            default:30
        }
    },
    mixins:[gotoUrl],
    watch: {},
    computed: {
        contents() {
            if (this.content) {
                return this.content.replace(/<[^>]+>/g, "")
                    .replace(/\&nbsp\;/ig,'')
                    .replace(/\s+/ig , '')
                    .replace(/(\n|\r)/ig , '')
                    .substr(0, this.len);
            }
            return '';
        },
        formatTime () {
            if ( this.time ) {
                return this.time.substr(0,10);
            }
            return "";
        },
        imageSrc(){
            return this.image ? this.image.split(',')[0] : '';
        }
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
<style type="text/scss" scoped lang="scss">
.single_blog{
    padding: 10px;
    background: #ffffff;
    figure{
        margin: 0px;
        padding: 0px;
        .blog_content {
            padding-top: 20px;
            position: relative;
            .post_title {
                margin: 0px;
                padding: 0px;
                font-size: 16px;
                text-transform: capitalize;
                line-height: 30px;
                margin-bottom: 10px;
                font-weight: 500;
            }
            .articles_date {
                margin-bottom: 10px;
                display: flex;
            }
            .articles_date span {
                font-size: 13px;
                line-height: 15px;
                margin-right: 5px;
            }
            p.post_desc {
                font-size: 14px;
                line-height: 24px;
                height: 48px;
                overflow: hidden;
                color: #9a9a9a;
                margin-bottom: 0;
            }
            > a.btn-see {
                font-size: 14px;
                text-transform: uppercase;
                font-weight: 600;
                display: inline-block;
                border: 1px solid #454545;
                line-height: 30px;
                padding: 10px;
                border-radius: 20px;
                margin-top: 24px;
                text-decoration: none;
            }
            > a:hover {
                color: #fff;
                background: #F53737;
                border-color: #F53737;
            }
            .article-price{
                position: absolute;
                right: 10px;
                bottom: 10px;
                color: #F53737;
                font-size: 18px;
            }
        }

        .blog_carousel:hover .owl-nav div {
            opacity: 1;
            visibility: visible;
            left: 0;
        }
        .blog_carousel:hover .owl-nav div.owl-next {
            right: 0;
        }
        .blog_carousel .owl-nav.disabled {
            display: block;
        }

        .blog_carousel .owl-nav div {
            position: absolute;
            top: 50%;
            transform: translatey(-50%);
            font-size: 18px;
            -webkit-transition: 0.3s;
            transition: 0.3s;
            opacity: 0;
            visibility: hidden;
            width: 62px;
            height: 62px;
            line-height: 60px;
            text-align: center;
            background: rgba(255, 255, 255, 0.75);
            border-radius: 50%;
            left: 25px;
            border: 1px solid #e5e5e5;
        }
        .blog_carousel .owl-nav div:hover {
            color: #fff;
            background: #F53737;
            border-color: #F53737;
        }
        .blog_carousel .owl-nav div.owl-next {
            right: 15px;
            left: auto;
        }
        @media only screen and (max-width: 767px) {
            .blog_carousel .owl-nav div {
                display: none;
            }
        }
    }

}
</style>
