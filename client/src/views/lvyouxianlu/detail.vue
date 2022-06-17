<template>
    
    <div class="lvyouxianlu-detail" v-loading="loading" ref="print">
        <el-page-header @back="goBack" content="详情页面"></el-page-header>
        <div class="admin-detail">

                        <div class="detail detail-text">
                <div class="detail-title">
                    线路编号：
                </div>
                <div class="detail-content">
                    {{ map.xianlubianhao }}
                </div>
            </div>                        <div class="detail detail-longtext">
                <div class="detail-title">
                    线路名称：
                </div>
                <div class="detail-content">
                    {{ map.xianlumingcheng }}
                </div>
            </div><div class="detail detail-longtext">
                <div class="detail-title">
                    出发地：
                </div>
                <div class="detail-content">
                    {{ map.chufadi }}
                </div>
            </div><div class="detail detail-longtext">
                <div class="detail-title">
                    途经地：
                </div>
                <div class="detail-content">
                    {{ map.tujingdi }}
                </div>
            </div><div class="detail detail-longtext">
                <div class="detail-title">
                    终点：
                </div>
                <div class="detail-content">
                    {{ map.zhongdian }}
                </div>
            </div>                                                <div class="detail detail-money">
                <div class="detail-title">
                    价格：
                </div>
                <div class="detail-content">
                    {{ map.jiage }}
                </div>
            </div>                        <div class="detail detail-number">
                <div class="detail-title">
                    浏览量：
                </div>
                <div class="detail-content">
                    {{ map.liulanliang }}
                </div>
            </div>                                                <div class="detail detail-autotime">
                <div class="detail-title">
                    添加时间：
                </div>
                <div class="detail-content">
                    {{ map.addtime }}
                </div>
            </div>            
                        <div class="detail detail-images">
                <div class="detail-title">
                    图片：
                </div>
                <div class="detail-content">
                    <e-images :src="map.tupian" type="detail"></e-images>
                </div>
            </div>                                    <div class="detail detail-editor">
                <div class="detail-title">
                    线路特色：
                </div>
                <div class="detail-content">
                    <div v-html="map.xianlutese"></div>
                </div>
            </div><div class="detail detail-editor">
                <div class="detail-title">
                    线路简介：
                </div>
                <div class="detail-content">
                    <div v-html="map.xianlujianjie"></div>
                </div>
            </div>
        </div>
        <div class="mt10">
            <el-button type="default" class="hidePrint" @click="$router.go(-1)">
                返回
            </el-button>
            <el-button type="success" class="hidePrint" @click="$print">
                打印本页
            </el-button>
        </div>
    </div>
</template>
<style type="text/scss" scoped lang="scss">
.lvyouxianlu-detail{
    .admin-detail {
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        .detail {
            width: 50%;
            padding: 5px;
            display: flex;
            margin-bottom: 10px;
            border-bottom: 1px solid #DEDEDE;
            .detail-title {
                width: 120px;
                text-align: right;
              flex-shrink: 0;
            }
            .detail-content {
                flex-grow: 1;
            }
        }
        .detail.detail-images {
            width: 100%;
            flex-wrap: wrap;
            .detail-title {
                display: none;
            }

            .detail-content {
                width: 100%;
                padding: 10px;
            }
        }
        .detail.detail-editor,.detail.detail-dataset  {
            width: 100%;
            flex-wrap: wrap;
            .detail-title {
                width: 100%;
                padding: 10px;
                margin-top: 10px;
                background: #9a0606;
                color: #ffffff;
                text-align: left;
            }
            .detail-content{
                padding: 10px;
            }
        }
    }
}
</style>
<script>
    import api from '@/api';
    import { extend } from '@/utils/extend';

    
    export default {
        data() {
            return {
                loading:false,
                map:{},

                            }
        },
                props:{
            id:{
                type:[String,Number],
                required:true
            },
                    },
        watch: {
            id:{
                handler(){
                    this.loadDetail();
                },
                immediate:true
            }
        },
        computed: {
                    },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            loadDetail(){
                if(this.loading) return;
                this.loading = true;
                this.$get(api.lvyouxianlu.detail , {
                    id:this.id
                }).then(res=>{
                    this.loading = false;
                    if(res.code == api.code.OK){
                        extend(this , res.data);
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
