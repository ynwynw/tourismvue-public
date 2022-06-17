<template>
    <div class="jingdianxinxi-add" v-loading="loading">
        <el-card class="box-card">
            <div slot="header" class="clearfix updt">
                                    <el-page-header @back="$router.go(-1)" content="编辑景点信息">
                    </el-page-header>
                            </div>
            <div class="form-database-form">
                

            <el-form :model="form" ref="formModel" label-width="130px" status-icon validate-on-rule-change>
                                <el-form-item label="景点编号" prop="jingdianbianhao" :rules="[{required:true, message:'请填写景点编号'}]">
                                            <el-input placeholder="输入景点编号" style="width:250px;" v-model="form.jingdianbianhao" />                                    </el-form-item>

                                <el-form-item label="景点名称" prop="jingdianmingcheng" required :rules="[{required:true, message:'请填写景点名称'}]">
                                            <el-input placeholder="输入景点名称" style="width:450px;" v-model="form.jingdianmingcheng" />                                    </el-form-item>

                                <el-form-item label="所属地区" prop="suoshudiqu" required :rules="[{required:true, message:'请填写所属地区'}]">
                                            <el-select v-model="form.suoshudiqu" >
<el-option v-for="m in diquList" :value="m.id" :label="m.diqumingcheng"></el-option>
</el-select>                                    </el-form-item>

                                <el-form-item label="图片" prop="tupian" required :rules="[{required:true, message:'请填写图片'}]">
                                            <e-upload-images v-model="form.tupian"></e-upload-images>                                    </el-form-item>

                                <el-form-item label="开放时间" prop="kaifangshijian" required :rules="[{required:true, message:'请填写开放时间'}]">
                                            <el-input placeholder="输入开放时间" style="width:450px;" v-model="form.kaifangshijian" />                                    </el-form-item>

                                <el-form-item label="附近美食" prop="fujinmeishi">
                                            <el-select v-model="form.fujinmeishi"  multiple="multiple" >
<el-option v-for="m in difangmeishiList" :value="m.mingcheng" :label="m.mingcheng"></el-option>
</el-select>                                    </el-form-item>

                                <el-form-item label="地址" prop="dizhi" required :rules="[{required:true, message:'请填写地址'}]">
                                            <el-input placeholder="输入地址" style="width:450px;" v-model="form.dizhi" />                                    </el-form-item>

                                <el-form-item label="票价" prop="piaojia" :rules="[{validator:rule.checkNumber, message:'输入一个有效数字'}]">
                                            <el-input placeholder="输入票价" style="width:250px;" v-model="form.piaojia" />                                    </el-form-item>

                                <el-form-item label="描述" prop="miaoshu" required :rules="[{required:true, message:'请填写描述'}]">
                                            <e-editor v-model="form.miaoshu"></e-editor>                                    </el-form-item>

                                <el-form-item v-if="btnText">
                    <el-button type="primary" @click="submit">{{ btnText }}</el-button>
                </el-form-item>
            </el-form>

            </div>
        </el-card>
    </div>
</template>
<style type="text/scss" scoped lang="scss">
.jingdianxinxi-add{

}
</style>
<script>
    import api from '@/api'
    import rule from '@/utils/rule'
    import { extend } from '@/utils/extend'

    
    export default {
        name:'jingdianxinxi-add',
        data() {
            return {
                                rule,
                loading:false,
                form:{
jingdianbianhao:rule.getID(),
                    jingdianmingcheng:'',
                    suoshudiqu:'',
                    tupian:'',
                    kaifangshijian:'',
                    fujinmeishi:'',
                    dizhi:'',
                    piaojia:'',
                    miaoshu:'',

                                    
                },

                        diquList:[],
                        difangmeishiList:[],
            
            }
        },
                watch: {
                        id: {
                handler() {
                    this.loadInfo();
                }
            }
                    },
        props: {
            isRead:{
                type:Boolean,
                default:true
            },
            btnText:{
                type:String,
                default:'提交'
            },
                        id: {
                type: [String, Number],
                required: true
            },
                    },

        computed: {},
        methods: {
            submit(){
                this.$refs.formModel.validate().then(res=>{
                    if(this.loading)return;
                    this.loading = true;
                    var form = this.form;

                    this.$post(api.jingdianxinxi.update , form).then(res=>{
                        this.loading = false;
                        if(res.code == api.code.OK){
                            this.$message.success('添加成功');
                            this.$emit('success' , res.data);
                            this.$refs.formModel.resetFields();
                                                        this.loadInfo();
                                                    }else{
                            this.$message.error(res.msg);
                        }
                    }).catch(err=>{
                        this.loading = false;
                        this.$message.error(err.message);
                    })

                }).catch(err=>{
                    console.log(err.message);
                })

            },
            loadInfo(){

                                // 更新数据,获取数据
                this.loading = true;
                var form = this.form;
                this.$post(api.jingdianxinxi.edit , {
                    id:this.id
                }).then(res=>{
                    this.loading = false;
                    if(res.code == api.code.OK){
                        extend(this , res.data);
                        this.form = res.data.mmm;

                    }else{
                        this.$message.error(res.msg);
                        this.$router.go(-1);
                    }
                }).catch(err=>{
                    this.$message.error(err.message);
                    this.$router.go(-1);
                });
                            },
                    },
        created() {
            this.loadInfo();
                    },
        mounted() {
                    },
        destroyed() {
                    }
    }
</script>
