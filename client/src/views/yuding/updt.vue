<template>
    <div class="yuding-add" v-loading="loading">
        <el-card class="box-card">
            <div slot="header" class="clearfix updt">
                                    <el-page-header @back="$router.go(-1)" content="编辑预定">
                    </el-page-header>
                            </div>
            <div class="form-database-form">
                

            <el-form :model="form" ref="formModel" label-width="130px" status-icon validate-on-rule-change>
                                <el-form-item v-if="isRead" label="线路编号" prop="xianlubianhao">
                                            {{  form.xianlubianhao  }}                                    </el-form-item>

                                <el-form-item v-if="isRead" label="线路名称" prop="xianlumingcheng">
                                            {{  form.xianlumingcheng  }}                                    </el-form-item>

                                <el-form-item v-if="isRead" label="出发地" prop="chufadi">
                                            {{  form.chufadi  }}                                    </el-form-item>

                                <el-form-item v-if="isRead" label="途经地" prop="tujingdi">
                                            {{  form.tujingdi  }}                                    </el-form-item>

                                <el-form-item v-if="isRead" label="终点" prop="zhongdian">
                                            {{  form.zhongdian  }}                                    </el-form-item>

                                <el-form-item v-if="isRead" label="价格" prop="jiage" :rules="[{validator:rule.checkNumber, message:'输入一个有效数字'}]">
                                            {{  form.jiage  }}                                    </el-form-item>

                                <el-form-item label="订单号" prop="dingdanhao" :rules="[{required:true, message:'请填写订单号'}]">
                                            <el-input placeholder="输入订单号" style="width:250px;" v-model="form.dingdanhao" />                                    </el-form-item>

                                <el-form-item label="预订时间" prop="yudingshijian" required :rules="[{required:true, message:'请填写预订时间'}]">
                                            <el-date-picker
          v-model="form.yudingshijian"
          type="datetime"
          :editable="false"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期">
        </el-date-picker>                                    </el-form-item>

                                <el-form-item label="预订人姓名" prop="yudingrenxingming">
                                            <el-input placeholder="输入预订人姓名" style="width:250px;" v-model="form.yudingrenxingming" />                                    </el-form-item>

                                <el-form-item label="联系方式" prop="lianxifangshi">
                                            <el-input placeholder="输入联系方式" style="width:250px;" v-model="form.lianxifangshi" />                                    </el-form-item>

                                <el-form-item label="备注" prop="beizhu">
                                            <el-input type="textarea" v-model="form.beizhu"></el-input>                                    </el-form-item>

                                <el-form-item label="预订人" prop="yudingren">
                                            <el-input v-model="form.yudingren" readonly style="width: 250px;"></el-input>                                    </el-form-item>

                                <el-form-item v-if="btnText">
                    <el-button type="primary" @click="submit">{{ btnText }}</el-button>
                </el-form-item>
            </el-form>

            </div>
        </el-card>
    </div>
</template>
<style type="text/scss" scoped lang="scss">
.yuding-add{

}
</style>
<script>
    import api from '@/api'
    import rule from '@/utils/rule'
    import { extend } from '@/utils/extend'

    
    export default {
        name:'yuding-add',
        data() {
            return {
                                rule,
                loading:false,
                form:{
                    xianlubianhao:'',
                    xianlumingcheng:'',
                    chufadi:'',
                    tujingdi:'',
                    zhongdian:'',
                    jiage:'',
dingdanhao:rule.getID(),
                    yudingshijian:'',
                    yudingrenxingming:'',
                    lianxifangshi:'',
                    beizhu:'',
yudingren:this.$store.state.user.session.username,
            lvyouxianluid:0,
                        iszf:"否"

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

                    this.$post(api.yuding.update , form).then(res=>{
                        this.loading = false;
                        if(res.code == api.code.OK){
                            this.$message.success('添加成功');
                            this.$emit('success' , res.data);
                            this.$refs.formModel.resetFields();
                                                        this.$router.go(-1);
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
                this.$post(api.yuding.edit , {
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
