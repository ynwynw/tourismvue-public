<template>
    <div class="v-module-products">
        <article>
            <div class="pro-btn pro-btn-add" @click="$gotoUrl">
                查看
            </div>
            <div :class="showType">
                <div class="image" @click="$gotoUrl">
                    <e-img-box :src="image" :pb="imageHeight" :is-scale="isScale"></e-img-box>
                </div>
                <div class="text">
                    <h2 class="title h4">
                        <a href="javascript:;" @click="$gotoUrl">{{title}}</a>
                    </h2>
                    <sup v-if="price!=''" class="price">￥ {{price}}</sup>
                    <span class="description clearfix" v-text="$substr(description , 30)">
                    </span>
                </div>
            </div>
        </article>
    </div>
</template>
<style type="text/scss" scoped lang="scss">
.v-module-products{
    article {
        position: relative;
        transition: all 0.3s;
        overflow: hidden;
        border: 1px solid #F5F4EF;
        margin-left: -1px;
        margin-top: -2px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        .badge {
            position: absolute;
            top: 10px;
            left: 10px;
            line-height: initial;
            color: white;
        }
        sub, sup {
            font-size: 100%;
        }
        .text {
            width: 100%;
            padding: 10px;
        }
        .text a:hover {
            color: #333;
        }
        .text .title {
            display: block;
            margin: 0;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 14px;
            margin-bottom: 5px;
        }
        .text sub,.text sup{
            bottom: auto;
            top: auto;
            display: inline-block;
            margin-right: 10px;
        }
        .text sub{
            text-decoration: line-through;
            font-weight: 300;
        }
        .image {
            overflow: hidden;
            height: auto;
            a {
                display: block;
            }
        }
        .pro-btn-add {
            opacity: 0;
            transform: translate3d(100%, 0, 0);
            transition: all 0.5s;
        }
        &:hover {
            box-shadow: 0 3px 30px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 22;
            .pro-btn-add {
                opacity: 1;
                transform: translate3d(0, 0, 0);
            }
            .info > span {
                transform: scale(1);
            }
        }

        .info {
            display: none;
            position: absolute;
            width: 35px;
            right: 15px;
            top: 15px;
            margin-right: 0;
            margin-top: 5px;
            z-index: 3;
            a {
                position: relative;
                display: inline-block;
                padding: 0 5px;
                background-color: dimgray;
                color: white;
                text-align: center;
                border-radius: 30px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                margin-bottom: 5px;
            }
            a:hover {
                background-color: #000000;
                color: white;
            }
            a:hover:after {
                position: absolute;
                content: attr(data-title);
                padding: 5px 6px;
                right: 110%;
                top: 3px;
                white-space: nowrap;
                z-index: 20;
                background-color: #000000;
                color: #fff;
                font-size: 10px;
                border-radius: 5px;
                line-height: normal;
            }

            .add-favorite.added {
                transform: scale(1);
                a {
                    background-color: #e71d36;
                }
                a:hover:after {
                    content: attr(data-title-added);
                    background-color: inherit;
                }
            }
            > span {
                display: block;
                transition: all 0.3s;
                transform: scale(0);
            }
            > span:nth-child(1) {
                transition-delay: 0.1s;
            }
            > span:nth-child(2) {
                transition-delay: 0.2s;
            }
            > span:nth-child(3) {
                transition-delay: 0.3s;
            }
        }
        .figure-list {
            display: table;
            width: 100%;
        }
        .figure-list .image,.figure-list .text{
            display: table-cell;
            vertical-align: middle;
            width: 50%;
        }
        .figure-list .image{
            width: 40%;
        }
        .figure-list .text {
            width: 60%;
            position: relative;
            padding: 0 20px;
            vertical-align: top;
            padding-top: 20px;
            .title {
                white-space: inherit;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .description {
                display: block;
                margin-top: 15px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .price{
                position: absolute;
                right: 0px;
                top: 10px;
            }
        }

        .figure-grid {
            .text .description {
                display: none;
            }
        }
        .figure-block{
            .text .description {
                position: relative;
                display: none;
                height: 80px;
                overflow: hidden;
                z-index: 1;
                padding-top: 5px;
            }
            .text .description:after {
                background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) 0%, white 100%);
                /* FF3.6-15 */
                background: -webkit-linear-gradient(top, rgba(255, 255, 255, 0) 0%, white 100%);
                /* Chrome10-25,Safari5.1-6 */
                background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, white 100%);
                /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 );
                /* IE6-9 */
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 75px;
                content: "";
                display: block;
                z-index: 2;
            }
        }
        .container {
            padding-left: 15px;
            padding-right: 15px;
        }
        .title {
            font-weight: 600;
            position: relative;
        }
        .title small {
            display: block;
            text-transform: none;
            color: black;
            font-size: 40%;
            margin: 5px 0;
        }
        .price {
            margin-bottom: 20px;
        }
        .pro-btn {
            -moz-border-radius: 3px;
            -webkit-border-radius: 3px;
            display: inline-block;
            font-weight: 400;
            color: #212529;
            text-align: center;
            vertical-align: middle;
            user-select: none;
            background-color: transparent;
            border: 1px solid transparent;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 12px;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }
        .pro-btn.pro-btn-add {
            background: #3c5570;
            position: absolute;
            overflow: hidden;
            color: white;
            bottom: 20px;
            right: 10px;
            border: 0;
            font-size: 12px;
            cursor: pointer;
            z-index: 9;
        }
        .pro-btn.pro-btn-add:hover {
            color: white;
        }
        .pro-btn:hover {
            color: #212529;
            text-decoration: none;
        }
    }

}
@media (min-width: 992px) {
    .v-module-products article {
        box-shadow: 0 3px 30px rgba(0, 0, 0, 0.1);
        .info a {
            margin-bottom: 10px;
        }
        .info {
            display: block;
        }
        .figure-list .image {
            padding: 0;
        }
    }
}
@media (min-width: 768px) {
    .v-module-products article .badge {
        top: 20px;
        left: 20px;
    }
}

</style>
<script>
    import gotoUrl from "../mixins/gotoUrl";

    export default {
        name: "e-module-products",
        data() {
            return {}
        },
        props:{
            image:String,
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
            description:[String,Number],
            type:{
                type:String,
                default:'grid'
            }
        },
        mixins:[gotoUrl],
        watch: {},
        computed: {
            showType(){
                switch (this.type) {
                    case 'grid':
                        return 'figure-grid';
                    default:
                        return 'figure-list';
                }
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
