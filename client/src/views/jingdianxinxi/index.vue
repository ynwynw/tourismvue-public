<template>
    <div v-loading="loading">
        <div>
<e-container>
            <div  style="margin:10px 0 0 0">
<e-module-model-box title="景点列表">
    
<form action="javascript:;" @submit="searchSubmit" class="form-search">
    <table class="jd-search">
        <tbody>
                    <tr>
                <td class="label">
                    所属地区                </td>
                <td>
                                            <p class="search-radio">

                            <a href="javascript:;" @click="selectRadio('suoshudiqu','')"
                               :class="{active:!search.suoshudiqu}">全部</a>

                                                                                        <a href="javascript:;"
                                   v-for="r in mapdiqu4"
                                   @click="selectRadio('suoshudiqu',r.id)" :class="{active:search.suoshudiqu == r.id}" v-text="r.diqumingcheng">

                                </a>
                            
                        </p>
                                    </td>
            </tr>
                    <tr>
                <td class="label">
                    景点名称                </td>
                <td>
                                            <el-input
                                type="text" style="width: 150px"
                                v-model="search.jingdianmingcheng"
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

<el-row :gutter="30">
    <el-col v-for="r in list" :md="6" :key="r.id" style="margin-bottom: 20px">
        <e-module-xiezi
                :title="r.jingdianmingcheng"
                                                :image="r.tupian"
                            :image-height="100"
                :is-scale="true"
                                            :to="'/jingdianxinxidetail?id='+r.id">

        </e-module-xiezi>
    </el-col>
</el-row>

    <div style="margin-top: 10px;text-align: center">
        <el-pagination
                @current-change="loadList"
                :current-page="page"
                :page-size="15"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
        </el-pagination>
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

                    
                                                                jingdianbianhao:'',
                    
                                                                jingdianmingcheng:'',
                    
                                                                suoshudiqu:'',
                    
                                                                tupian:'',
                    
                                                                kaifangshijian:'',
                    
                                                                fujinmeishi:'',
                    
                                                                dizhi:'',
                    
                                                            piaojia_start:'',
                    piaojia_end:'',
                    
                                                            liulanliang_start:'',
                    liulanliang_end:'',
                    
                                                                miaoshu:'',
                    
                                                                addtime:'',
                    
                                    },
                page:1, // 当前页
                pagesize:12, // 页大小
                totalCount:0, // 总行数
                total:{},

                        mapdiqu4:[],
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
                this.$post(api.jingdianxinxi.weblist , filter).then(res=>{
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
