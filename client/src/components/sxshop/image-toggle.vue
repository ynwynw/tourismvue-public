<template>

    <div class="product-preview">
        <div class="big-image">
            <a href="javascript:;" data-toggle="lightbox">
                <img :src="lists[active]" alt="" />
            </a>
        </div>
        <ul class="thumbs unstyled clearfix">
            <li v-for="(r,k) in lists" :class="{active:active == k}" :key="r" @click="active=k">
                <a href="javascript:;">
                <img :src="r" alt="" />
                </a>
            </li>
        </ul>
    </div>

</template>
<style type="type/scss" lang="scss">
.product-preview {
    position: relative;
    overflow: hidden;
    zoom: 1;
    .big-image {
        margin-right: 124px;
        overflow: hidden;
        zoom: 1;
    }
    .thumbs {
        position: absolute;
        top: 25px;
        right: 0;
        width: 68px;
        > li {
            margin-top: 5px;
            border: 3px solid #919191;
            border-radius: 50%;
            overflow: hidden;
            transition: all 200ms ease-in-out;
            > a {
                display: block;
                width: 100%;
                height: 84px;
            }
            > a:hover {

            }
        }
        >li.active{
            border-color: #fa6f57;
        }
        > li:first-child {
            margin-top: 0;
        }
    }
}

</style>
<script>
import { isArray } from "@/utils/extend";

export default {
    name: "e-image-toggle",
    data() {
        return {
            active:0
        }
    },
    props:{
        images:{
            type:[String,Array]
        }
    },
    watch: {},
    computed: {
        lists(){
            var images = this.images;
            if(!images){
                return [];
            }
            var arr;
            if(isArray(images)){
                arr = images;
            }else{
                arr = images.split(',');
            }
            arr = arr.filter(s=>s);
            return arr;
        }
    },
    methods: {},
    created() {
    },
    mounted() {
    },
    destroyed() {
    }
}
</script>