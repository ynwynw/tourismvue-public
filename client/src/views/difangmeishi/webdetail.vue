<template>
    <div class="difangmeishi-detail" v-loading="loading">
        <div>
<e-container>
            <div  style="margin:10px 0 0 0">
<e-module-model-box title="详情">
    
<div class="">
    <div class="goods-info clearfix">
        <div class="gallery-list">
            <e-shangpinban :images="map.tupian"></e-shangpinban>
        </div>
        <div class="goods-right-content">
            <h3 class="title" v-text="map.mingcheng"></h3>
            <div class="descount">
                                    <div>
                        <span class="name">
                            附近景点：
                        </span>
                        <span class="val">
                            {{  map.fujinjingdian  }}                        </span>
                    </div>
                                    <div>
                        <span class="name">
                            分类：
                        </span>
                        <span class="val">
                             <e-select-view module="meishifenlei" :value="map.fenlei" select="id" show="fenleimingcheng"></e-select-view>                        </span>
                    </div>
                                    <div>
                        <span class="name">
                            人均价格：
                        </span>
                        <span class="val">
                            {{ map.jiage }}                        </span>
                    </div>
                                    <div>
                        <span class="name">
                            美食简介：
                        </span>
                        <span class="val">
                            {{ map.meishijianjie }}                        </span>
                    </div>
                            </div>

            
            
        </div>
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
                        meishibianhao:'',
                        mingcheng:'',
                        fujinjingdian:'',
                        fenlei:'',
                        tupian:'',
                        jiage:'',
                        meishijianjie:'',
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
                this.$get(api.difangmeishi.webdetail , {
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
