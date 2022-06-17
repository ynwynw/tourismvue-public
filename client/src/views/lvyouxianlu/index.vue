<template>
    <div v-loading="loading">
        <div>
<e-container>
            <div  style="margin:10px 0 0 0;background-color:#FFFFFF">
<e-module-model-box title="旅游线路">
    <div class="snick clearfix">
                <div style="margin-bottom: 20px">
            <form action="javascript:;" @submit="searchSubmit" class="form-search">
    <table class="jd-search">
        <tbody>
                    <tr>
                <td class="label">
                    出发地                </td>
                <td>
                                            <el-input
                                type="text" style="width: 150px"
                                v-model="search.chufadi"
                                placeholder="请输入关键词">

                        </el-input>
                                    </td>
            </tr>
                    <tr>
                <td class="label">
                    途经地                </td>
                <td>
                                            <el-input
                                type="text" style="width: 150px"
                                v-model="search.tujingdi"
                                placeholder="请输入关键词">

                        </el-input>
                                    </td>
            </tr>
                    <tr>
                <td class="label">
                    终点                </td>
                <td>
                                            <el-input
                                type="text" style="width: 150px"
                                v-model="search.zhongdian"
                                placeholder="请输入关键词">

                        </el-input>
                                    </td>
            </tr>
                    <tr>
                <td></td>
                <td>
                    <el-button type="success" @click="searchSubmit">搜索</el-button>
                </td>
            </tr>
        </tbody>
    </table>
</form>
        </div>
        <el-row>
        <el-col class="snock" v-for="r in list" :md="6">
            <div class="services">
                <router-link :to="'/lvyouxianludetail?id='+r.id">
                    <e-img-box :src="r.tupian" class="snocks"></e-img-box>
                    <h2 v-html="$substr(r.xianlumingcheng,15)"></h2>
                    <p v-html="$substr(r.xianlujianjie,30)"></p>
                </router-link>
            </div>
        </el-col>
    </el-row>
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
    import objectDiff from 'objectdiff';

    
    /**
     * 后台列表页面
     */
    export default {
        data() {
            return {
                loading:false,
                list:[],
                search:{

                    
                                                                xianlubianhao:'',
                    
                                                                xianlumingcheng:'',
                    
                                                                tupian:'',
                    
                                                                chufadi:'',
                    
                                                                tujingdi:'',
                    
                                                                zhongdian:'',
                    
                                                            jiage_start:'',
                    jiage_end:'',
                    
                                                            liulanliang_start:'',
                    liulanliang_end:'',
                    
                                                                xianlutese:'',
                    
                                                                xianlujianjie:'',
                    
                                                                addtime:'',
                    
                                    },
                page:1, // 当前页
                pagesize:12, // 页大小
                totalCount:0, // 总行数
                total:{},

                        }
        },
        watch: {
                    },
        computed: {
                    },
                methods: {
            searchSubmit(){
                this.loadList(1);
            },
            loadList( page ){
                // 防止重新点加载列表
                if(this.loading)return;
                this.loading = true;
                this.page = page;
                // 筛选条件
                var filter = extend(true , {} , this.search , {page:page+"", pagesize: this.pagesize+""});
                var diff = objectDiff.diff(filter, this.$route.query);
                if (diff.changed != 'equal') { // 筛选的条件不一致则更新链接
                    this.$router.replace({  // 更新query
                        path: this.$route.path,
                        query: filter
                    });
                }
                this.$post(api.lvyouxianlu.weblist , filter).then(res=>{
                    this.loading = false;
                    if(res.code == api.code.OK)
                    {
                        extend(this , res.data);
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(err=>{
                    this.loading = false;
                    this.$message.error(err.message);
                });
            },
                        selectRadio(target,name){
    this.search[target] = name;
    this.searchSubmit(1);
},
                    },
        beforeRouteUpdate(to,form,next){
            var search = extend(this.search , to.query)
            if(search.page)
            {
                this.page = Math.floor(to.query.page)
                delete search.page
            }
            if(search.pagesize)
            {
                this.pagesize = Math.floor(to.query.pagesize)
                delete search.pagesize
            }
            this.loadList(1);
            next();
        },
        created() {
            var search = extend(this.search , this.$route.query)
            if(search.page)
            {
                this.page = Math.floor(this.$route.query.page)
                delete search.page
            }
            if(search.pagesize)
            {
                this.pagesize = Math.floor(this.$route.query.pagesize)
                delete search.pagesize
            }
            this.loadList(this.page);
                    },
        mounted() {
                    },
        destroyed() {
                    }
    }
</script>
