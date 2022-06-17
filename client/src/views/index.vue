<template>
    <div v-loading="loading">
        <div>

            <el-carousel indicator-position="outside" height="420px">
                <el-carousel-item v-for="item in bhtList" :key="item.id">
                    <div style="background-size: cover" @click="$goto(item.url)"
                         :style="{'background-image': 'url('+item.image+')',width:'100%', height: '420px'}">
                    </div>
                </el-carousel-item>
            </el-carousel>


        </div>
        <div>
            <e-container>
                <div style="margin:10px 0 0 0">
                    <e-module-model-box title="人气景点">
                        <el-row :gutter="30">
                            <el-col v-for="r in jingdianxinxilist1" :md="6" :key="r.id" style="margin-bottom: 20px">
                                <e-module-products
                                        :title="r.jingdianmingcheng"
                                        :price="r.piaojia" :description="r.miaoshu"
                                        :image="r.tupian"
                                        :image-height="100"
                                        :is-scale="true"
                                        :to="'/jingdianxinxidetail?id='+r.id">

                                </e-module-products>
                            </el-col>
                        </el-row>


                    </e-module-model-box>

                </div>

            </e-container>
        </div>
        <div>
            <e-container>
                <div style="margin:10px 0 0 0">
                    <e-module-model-box title="地方美食">
                        <el-row :gutter="30">
                            <el-col v-for="r in difangmeishilist2" :md="6" :key="r.id" style="margin-bottom: 20px">
                                <e-module-products
                                        :title="r.mingcheng"
                                        :price="r.jiage" :description="r.meishijianjie"
                                        :image="r.tupian"
                                        :image-height="100"
                                        :is-scale="true"
                                        :to="'/difangmeishidetail?id='+r.id">

                                </e-module-products>
                            </el-col>
                        </el-row>


                    </e-module-model-box>

                </div>

            </e-container>
        </div>
        <div>
            <e-container>
                <div style="margin:10px 0 0 0">
                    <e-module-model-box title="旅游线路">


                        <el-row :gutter="20">
                            <el-col v-for="r in lvyouxianlulist3" :md="6" :key="r.id" style="margin-bottom: 20px">
                                <e-module-blog
                                        :title="r.xianlumingcheng"
                                        :price="r.jiage" :content="r.xianlujianjie"
                                        :time="r.addtime"
                                        :image="r.tupian"
                                        :image-height="80"
                                        :is-scale="true"
                                        :to="'/lvyouxianludetail?id='+r.id">

                                </e-module-blog>
                            </el-col>
                        </el-row>


                    </e-module-model-box>

                </div>

            </e-container>
        </div>
        <div>
            <e-container>
                <div style="margin:10px 0 0 0">
                    <e-module-model-box title="旅游资讯">


                        <div class="">
                            <e-news-list v-for="r in xinwenxinxilist4" :key="r.id"
                                         :to="'/xinwenxinxidetail?id='+r.id"
                                         :title="r.biaoti"
                                         :description="r.neirong"
                                         :len="80"
                                         :image="r.tupian"

                            >
                                <span>分类: <e-select-view module="xinwenfenlei" :value="r.fenlei" select="id"
                                                         show="fenleimingcheng"></e-select-view></span>
                                <span>添加人:{{ r.tianjiaren }}</span>
                                <span>点击率:{{ r.dianjilv }}</span>

                            </e-news-list>
                        </div>


                    </e-module-model-box>

                </div>

            </e-container>
        </div>
    </div>
</template>
<style type="text/scss" scoped lang="scss">
</style>
<script>
    import api from '@/api';
    import {extend} from '@/utils/extend';

    export default {
        data() {
            return {
                loading: false,
                bhtList: [],
                jingdianxinxilist1: [],
                difangmeishilist2: [],
                lvyouxianlulist3: [],
                xinwenxinxilist4: [],
            }
        },
        watch: {},
        computed: {},
        methods: {
            loadPageData() {
                if (this.loading) return;
                this.loading = true;
                this.$get('/index').then(res => {
                    this.loading = false;
                    if (res.code == api.code.OK) {
                        extend(this, res.data);
                    } else {
                        this.$message.error(res.msg);
                    }
                }).catch(err => {
                    this.loading = false;
                    this.$message.error(err.message);
                });
            },
        },
        created() {
            this.loadPageData();
        },
        mounted() {
        },
        destroyed() {
        }
    }
</script>
