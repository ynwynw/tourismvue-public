<template>
    <div class="jingdianxinxi-detail" v-loading="loading">
        <div>
<e-container>
            <div  style="margin:10px 0 0 0">
<e-module-model-box title="景点详情">
    
<div class="">
    <div class="goods-info clearfix">
        <div class="gallery-list">
            <e-shangpinban :images="map.tupian"></e-shangpinban>
        </div>
        <div class="goods-right-content">
            <h3 class="title" v-text="map.jingdianmingcheng"></h3>
            <div class="descount">
                                    <div>
                        <span class="name">
                            所属地区：
                        </span>
                        <span class="val">
                             <e-select-view module="diqu" :value="map.suoshudiqu" select="id" show="diqumingcheng"></e-select-view>                        </span>
                    </div>
                                    <div>
                        <span class="name">
                            地址：
                        </span>
                        <span class="val">
                            {{ map.dizhi }}                        </span>
                    </div>
                                    <div>
                        <span class="name">
                            开放时间：
                        </span>
                        <span class="val">
                            {{ map.kaifangshijian }}                        </span>
                    </div>
                                    <div>
                        <span class="name">
                            附近美食：
                        </span>
                        <span class="val">
                            {{  map.fujinmeishi  }}                        </span>
                    </div>
                                    <div>
                        <span class="name">
                            票价：
                        </span>
                        <span class="val">
                            {{ map.piaojia }}                        </span>
                    </div>
                                    <div>
                        <span class="name">
                            浏览量：
                        </span>
                        <span class="val">
                            {{ map.liulanliang }}                        </span>
                    </div>
                            </div>

            
                            <e-collect v-model="isCollect"
                           module="jingdianxinxi"
                           ziduan="jingdianmingcheng"
                           :id="map.id"></e-collect>
            
        </div>
    </div>
    <div class="goods-content" v-html="map.miaoshu">

    </div>
</div>

</e-module-model-box>

</div>    

</e-container>
</div>    </div>
</template>
<style type="text/scss" scoped lang="scss">
    </style>
<script>
    import api from '@/api';
    import { extend } from '@/utils/extend';
        export default {
        data() {
            return {
                loading:false,   // 加载
                                isCollect:false, // 是否已经收藏
                                map:{
                        jingdianbianhao:'',
                        jingdianmingcheng:'',
                        suoshudiqu:'',
                        tupian:'',
                        kaifangshijian:'',
                        fujinmeishi:'',
                        dizhi:'',
                        piaojia:'',
                        liulanliang:'',
                        miaoshu:'',
                        addtime:'',
                            },
                            }
        },
                props:{
            id:{
                type:[String,Number],
                required:true
            }
        },
        watch: {
            id:{
                handler(){
                    this.loadDetail();
                },
                immediate:true
            },
                    },
        computed: {
                    },
        methods: {
            loadDetail(){
                if(this.loading) return;
                this.loading = true;
                this.$get(api.jingdianxinxi.webdetail , {
                    id:this.id
                }).then(res=>{
                    this.loading = false;
                    if(res.code == api.code.OK){
                        extend(this,res.data);
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(err=>{
                    this.loading = false;
                    this.$message.error(err.message);
                });
            },

                    },
        created() {
                    },
        mounted() {
                    },
        destroyed() {
                    }
    }
</script>
