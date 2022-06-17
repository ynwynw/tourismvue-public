<template>
    <div class="gramos-login">
        <div class="page-loader" v-show="isLoaded">
            <div class="spinner-border"></div>
            <span>Loading ...</span>
        </div>

        <e-container class="h-100vh">
            <el-row type="flex" align="center" justify="center" class="h-100vh" style="align-items: center">
                <el-col :md="12">
                    <img class="img-fluid" src="~@/assets/gramos/login.png" alt="...">
                </el-col>
                <el-col :md="8" :offset="1">
                    <div class="d-flex align-items-center" style="margin-bottom: 20px">
                        <img src="~@/assets/gramos/dark-logo.png" class="m-r-15" style="margin-right: 15px" width="40" alt="">
                        <h3 class="m-0" style="margin: 0;">{{ setting.title }}</h3>
                    </div>
                    <p>输入账号密码，登录系统.</p>
                    <form action="javascript:;" id="loginForm" name="loginForm" method="post" @submit="login">
                        <div class="form-group mb-4">
                            <el-input type="text" v-model="form.username"
                                      id="username" autofocus placeholder="账号"></el-input>
                        </div>
                        <div class="form-group mb-4">
                            <el-input type="password" v-model="form.pwd" id="password" placeholder="密码"></el-input>
                        </div>
                        <div class="form-group mb-4">

                            <el-input type="text" v-model="form.pagerandom" name="pagerandom" class="form-control form-control-lg" id="pagerandom" placeholder="验证码">
                                <span class="input-group-append" slot="append">
                                    <e-img :src="captchUrl" style="min-width: 60px;min-height: 30px;" onClick="this.src='captcha.do?time='+new Date().getTime();" alt="点击刷新"/>
                                </span>
                            </el-input>
                        </div>
                        <div class="form-group mb-4">
                            <el-select id="sys" name="cx" v-model="form.cx" class="form-control-lg">
                                <el-option :value="r" :label="r" v-for="r in rules" :key="r"></el-option>
                            </el-select>
                        </div>

                        <el-button type="primary" native-type="submit" class="btn btn-primary btn-lg btn-block btn-uppercase mb-4">登录系统</el-button>

                        <div class="text-center">
                            版权所有：{{ setting.title }}
                        </div>
                    </form>
                </el-col>
            </el-row>
        </e-container>

    </div>
</template>
<style type="type/scss" lang="scss">
.gramos-login{
    height: 100%;
    width: 100%;
    background: #ffffff;
    font-family: "微软雅黑", "Microsoft YaHei", sans-serif, Arial, 'Times New Roman', -apple-system, BlinkMacSystemFont, sans-serif;
    .h-100vh{
        height: 100vh;
    }
    .d-flex {
        display: -ms-flexbox !important;
        display: flex !important
    }
    .form-control-lg{
        width: 100%;
    }
    .btn-block{
        display: block;
        width: 100%;
    }
    h3{
        font-size: 26px;
    }
    .align-items-center {
        -ms-flex-align: center !important;
        align-items: center !important
    }
    .page-loader {
        position: fixed;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        z-index: 1001;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .align-items-md-center {
        -ms-flex-align: center !important;
        align-items: center !important
    }
    .page-loader .spinner-border {
        margin-bottom: 15px;
    }
    .mb-4, .my-4 {
        margin-bottom: 1.5rem !important
    }

    .page-loader span {
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #646464;
        font-size: 12px;
    }

}
</style>
<script>
import setting from "@/setting";
import api from "@/api";

export default {
    name: "gramos-login",
    data() {
        return {
            isLoaded:true,
            setting,
            captchUrl: '',
            loading: false,
            form: {
                username: '',
                pwd: '',
                cx: '管理员',

                /* 验证码段 */
                pagerandom:'',
                a:'a'
                /* 验证码段 */

            },
            rules: [
                                    '管理员',
                                    '用户',
                            ]
        }
    },
    watch: {},
    computed: {},
    methods: {
        login() {

            this.loading = true;
            this.$store.dispatch('user/login', this.form).then(res => {

                this.loading = false;
                if (res.code == api.code.OK) {
                    this.$message.success('登录成功');
                    var redirect = this.$route.query.redirect;
                    if (redirect) {
                        this.$router.replace(redirect);
                    } else {
                        this.$router.replace('/admin/sy');
                    }
                } else {
                    this.$message.error(res.msg);
                }
                if(res.code == 20){
                    this.loadCaptch();
                }
            }).catch(err => {
                this.loading = false;
                this.$message.error(err.message)
            });
        },
        loadCaptch()
        {
            api.captch().then(res=>{
                console.log(res);
                this.form.captchToken = res.token;
                this.captchUrl = res.url;
            });
        }
    },
    created() {
        this.form.cx = this.rules[0];
        this.loadCaptch();

    },
    mounted() {
        setTimeout(()=>{
            this.isLoaded = false;
        },500);
    },
    destroyed() {
    }
}
</script>