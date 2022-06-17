<template>
    <div class="xinwenxinxi-detail" v-loading="loading">
        <div>
<e-container>
            <div  style="margin:10px 0 0 0">
<e-module-model-box title="新闻详情">
    
<div class="news-info">
    <h3 class="title" v-text="map.biaoti"></h3>
    <div class="descount">
                <span class="title">
            分类：
             <e-select-view module="xinwenfenlei" :value="map.fenlei" select="id" show="fenleimingcheng"></e-select-view>        </span>
                <span class="title">
            点击率：
            {{ map.dianjilv }}        </span>
                <span class="title">
            添加人：
            {{ map.tianjiaren }}        </span>
            </div>
    <div class="content" v-html="map.neirong">

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
                        biaoti:'',
                        fenlei:'',
                        tupian:'',
                        tianjiaren:'',
                        dianjilv:'',
                        neirong:'',
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
                this.$get(api.xinwenxinxi.webdetail , {
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
