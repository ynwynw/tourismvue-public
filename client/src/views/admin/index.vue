<template>
    <div class="gramos-index" @click="notify=false">
        <!-- begin::side menu -->
        <div class="side-menu">
            <div class='side-menu-body '>
                <ul class="scroll-scrollbar-style">
                    <li class="side-menu-divider">Navigation</li>
                    <li v-for="(m,k) in menus">
                        <a href="javascript:;" class="nav-top-item" @click="active=k == active?-1:k">
                            <i class="icon fa fa-home"></i>
                            <span v-text="m.label"></span>
                            <i class="sub-menu-arrow fa fa-angle-right"></i>
                        </a>
                        <ul v-show="k==active">
                            <li v-for="c in m.children">
                                <router-link :to="c.to" active-class="active" v-text="c.label">
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <!-- end::side menu -->

        <!-- begin::navbar -->
        <nav class="navbar">

            <div class="header-logo">
                <a href="#">
                    <img src="~@/assets/gramos/light-logo.png" alt="">
                    <span class="logo-text d-none d-lg-block">
                            {{ setting.title }}
                        </span>
                </a>
            </div>
            <div class="header-body">
                <form class="search">
                    <div class="input-group">
                        <input disabled type="text" class="form-control" placeholder=""
                               aria-label="Recipient's username"
                               aria-describedby="button-addon2">
                    </div>
                </form>
                <ul class="navbar-nav">

                    <li class="nav-item">
                        <router-link to="/" class="nav-link">
                            <i class="fa fa-home"></i>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/sy" active-class="active" class="nav-link nav-link-notify">后台主页</router-link>
                    </li>
                    <li class="nav-item">
                        <a href="javascript:;" class="nav-link">
                            {{ $session.username }}，{{ $session.cx }}
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="#" data-toggle="dropdown">
                            <figure class="avatar avatar-sm avatar-state-success">
                                <template v-if="$session.touxiang">
                                    <e-img :src="$session.touxiang" class="rounded-circle"></e-img>
                                </template>
                                <template v-else>
                                    <img class="rounded-circle" src="~@/assets/gramos/avatar.jpg" alt="...">
                                </template>
                            </figure>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a href="javascript:;" @click="logout" class="nav-link side-menu-open">
                            退出
                        </a>
                    </li>

                    <li class="nav-item d-lg-none d-sm-block">
                        <a href="javascript:;" class="nav-link side-menu-open">
                            <i class="ti-menu"></i>
                        </a>
                    </li>

                </ul>
            </div>

        </nav>
        <!-- end::navbar -->

        <!-- begin::main content -->
        <main class="main-content">
            <div class="main-content-iframe scroll-scrollbar-style">
              <router-view></router-view>
            </div>
        </main>
        <!-- end::main content -->
    </div>
</template>
<style type="type/scss" lang="scss">
@import "app";

</style>
<script>
import setting from '@/setting'
import menu from "@/views/admin/sidebar";
import api from "@/api";

export default {
    name: "gramos-index",
    data() {
        return {
            setting,
            notify:false,
            active:0
        }
    },
    watch: {},
    computed: {
        menus(){
            var cx = this.$session.cx;
            return menu[cx];
        }
    },
    methods: {
        logout(){
            this.$confirm('确定退出登录？','确认信息').then(()=>{
                // 退出登录
                this.$store.dispatch('user/logout').then(res=>{
                    if(res.code == api.code.OK)
                    {
                        this.$message.success('退出登录成功')
                        this.$router.replace('/index')
                    }else{
                        this.$message.error(res.msg)
                    }
                }).catch(err=>{
                    this.$message.error(err.message)
                });
            });
        }
    },
    created() {
    },
    mounted() {
    },
    destroyed() {
    }
}
</script>