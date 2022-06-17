<template>
    <el-tooltip class="item" effect="dark" :content="isCollect ? '已收藏':'收藏'" placement="top-start">
        <el-button v-if="isCollect" icon="el-icon-star-on" type="danger" circle></el-button>
        <el-button @click="collect" v-else icon="el-icon-star-off" type="warning" circle></el-button>
    </el-tooltip>
</template>
<style type="text/scss" lang="scss">

</style>
<script>
    export default {
        name: "e-collect",
        data() {
            return {
            }
        },
        props:{
            value:[Boolean,Number],
            module:String,
            id:[String,Number],
            ziduan:[String,Number],
        },
        watch: {},
        computed: {
            isCollect(){
                return this.value;
            }
        },
        methods: {
            collect(){
                this.$collect(this.module , this.ziduan , this.id).then(res=>{
                    this.$emit('input' , true);
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
