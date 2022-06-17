<template>
    <div class="lvyouxianlu-add" v-loading="loading">
        <el-card class="box-card">
            <div slot="header" class="clearfix updt">
                                    <el-page-header @back="$router.go(-1)" content="编辑旅游线路">
                    </el-page-header>
                            </div>
            <div class="form-database-form">
                

            <el-form :model="form" ref="formModel" label-width="130px" status-icon validate-on-rule-change>
                                <el-form-item label="线路编号" prop="xianlubianhao" :rules="[{required:true, message:'请填写线路编号'}]">
                                            <el-input placeholder="输入线路编号" style="width:250px;" v-model="form.xianlubianhao" />                                    </el-form-item>

                                <el-form-item label="线路名称" prop="xianlumingcheng" required :rules="[{required:true, message:'请填写线路名称'}]">
                                            <el-input placeholder="输入线路名称" style="width:450px;" v-model="form.xianlumingcheng" />                                    </el-form-item>

                                <el-form-item label="图片" prop="tupian">
                                            <e-upload-images v-model="form.tupian"></e-upload-images>                                    </el-form-item>

                                <el-form-item label="出发地" prop="chufadi">
                                            <el-input placeholder="输入出发地" style="width:450px;" v-model="form.chufadi" />                                    </el-form-item>

                                <el-form-item label="途经地" prop="tujingdi">
                                            <el-input placeholder="输入途经地" style="width:450px;" v-model="form.tujingdi" />                                    </el-form-item>

                                <el-form-item label="终点" prop="zhongdian">
                                            <el-input placeholder="输入终点" style="width:450px;" v-model="form.zhongdian" />                                    </el-form-item>

                                <el-form-item label="价格" prop="jiage" required :rules="[{required:true, message:'请填写价格'}, {validator:rule.checkNumber, message:'输入一个有效数字'}]">
                                            <el-input placeholder="输入价格" style="width:250px;" v-model="form.jiage" />                                    </el-form-item>

                                <el-form-item label="线路特色" prop="xianlutese">
                                            <e-editor v-model="form.xianlutese"></e-editor>                                    </el-form-item>

                                <el-form-item label="线路简介" prop="xianlujianjie">
                                            <e-editor v-model="form.xianlujianjie"></e-editor>                                    </el-form-item>

                                <el-form-item v-if="btnText">
                    <el-button type="primary" @click="submit">{{ btnText }}</el-button>
                </el-form-item>
            </el-form>

            </div>
        </el-card>
    </div>
</template>
<style type="text/scss" scoped lang="scss">
.lvyouxianlu-add{

}
</style>
<script>
    import api from '@/api'
    import rule from '@/utils/rule'
    import { extend } from '@/utils/extend'

    
    export default {
        name:'lvyouxianlu-add',
        data() {
            return {
                                rule,
                loading:false,
                form:{
xianlubianhao:rule.getID(),
                    xianlumingcheng:'',
                    tupian:'',
                    chufadi:'',
                    tujingdi:'',
                    zhongdian:'',
                    jiage:'',
                    xianlutese:'',
                    xianlujianjie:'',

                                    
                },

            
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

                    this.$post(api.lvyouxianlu.update , form).then(res=>{
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
                this.$post(api.lvyouxianlu.edit , {
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
