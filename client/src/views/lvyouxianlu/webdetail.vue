<template>
    <div class="lvyouxianlu-detail" v-loading="loading">
        <div>
<e-container>
            <div  style="margin:10px 0 0 0;background-color:#FFFFFF">
<e-module-model-box title="线路详情">
    
<div class="">
    <div class="goods-info clearfix">
        <div class="gallery-list">
            <e-shangpinban :images="map.tupian"></e-shangpinban>
        </div>
        <div class="goods-right-content">
            <h3 class="title" v-text="map.xianlumingcheng"></h3>
            <div class="descount">
                                    <div>
                        <span class="name">
                            出发地：
                        </span>
                        <span class="val">
                            {{ map.chufadi }}                        </span>
                    </div>
                                    <div>
                        <span class="name">
                            途经地：
                        </span>
                        <span class="val">
                            {{ map.tujingdi }}                        </span>
                    </div>
                                    <div>
                        <span class="name">
                            终点：
                        </span>
                        <span class="val">
                            {{ map.zhongdian }}                        </span>
                    </div>
                                    <div>
                        <span class="name">
                            价格：
                        </span>
                        <span class="val">
                            {{ map.jiage }}                        </span>
                    </div>
                                    <div>
                        <span class="name">
                            浏览量：
                        </span>
                        <span class="val">
                            {{ map.liulanliang }}                        </span>
                    </div>
                            </div>

                            <el-button type="primary" @click="$router.push('/yudingadd?id='+map.id)">预定</el-button>
            
                            <e-collect v-model="isCollect"
                           module="lvyouxianlu"
                           ziduan="xianlumingcheng"
                           :id="map.id"></e-collect>
            
        </div>
    </div>
    <div class="goods-content">
            </div>
</div>

</e-module-model-box>

</div>    

</e-container>
</div>
<div>
<e-container>
            <div  style="margin:15px 0 15px 0;background-color:#FFFFFF">


<e-container>
    <el-tabs type="border-card">
                <el-tab-pane label="线路特色">
            <div  style="margin:15px 0 15px 0;background-color:#FFFFFF">

<div style="text-indent: 2em">
<div v-html="map.xianlutese"></div></div>

</div>        </el-tab-pane>
                <el-tab-pane label="线路简介">
            <div  style="margin:15px 0 15px 0;background-color:#FFFFFF">

<div style="text-indent: 2em">
<div v-html="map.xianlujianjie"></div></div>

</div>        </el-tab-pane>
            </el-tabs>
</e-container>

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
                        xianlubianhao:'',
                        xianlumingcheng:'',
                        tupian:'',
                        chufadi:'',
                        tujingdi:'',
                        zhongdian:'',
                        jiage:'',
                        liulanliang:'',
                        xianlutese:'',
                        xianlujianjie:'',
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
                this.$get(api.lvyouxianlu.webdetail , {
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
