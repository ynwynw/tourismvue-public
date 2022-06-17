<template>
    <div class="v-zhifu" v-loading="loading">
        <div class="container">
            <div class="hd">
                <div class="hd-main">
                    <div class="ep-hd-info">
                        <div class="ep-order-status">
                            <h1>订单模拟支付</h1>
                        </div>
                    </div>
                    <div class="user-info">
                        <p>账号：xxxxxxxxxx</p>
                    </div>
                </div>
            </div>
            <div class="bd">
                <div class="bd-main">
                    <div class="ep-wrapper">
                        <div class="ep-pay-step ep-step-channel bd-main-container" style="display: block;">
                            <div class="ep-order-detail">
                                <div>
                                    <div class="ep-order-tit" v-if="$route.query.ordersn">
                                        <dl>
                                            <dt>商品订单：</dt>
                                            <dd>
                                                {{$route.query.ordersn}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="ep-order-tit"  v-if="$route.query.zongji">
                                        <span>支付金额：<em class="rmb"><i>¥</i>{{ $route.query.zongji }}</em></span>
                                    </div>
                                </div>
                            </div>
                            <div class="ep-pay-method ep-pay-methods">
                                <dl>
                                    <dt>支付方式：</dt>
                                    <dd class="pay-channel" id="pay-channel">
                                        <div class="ep-pay-method-list-tit">
                                            <ul>
                                                <li :class="{selected:form.payType == 'wechat'}" @click="selectPayType('wechat')" title="微信支付">
                                                    <span class="ep-icon ep-icon-wxpay"></span> <span class="ep-pay-method-name">微信支付</span>
                                                    <i class="ep-icon ep-icon-selected" v-if="form.payType == 'wechat'"></i>
                                                </li>
                                                <li :class="{selected:form.payType == 'alipay'}" title="支付宝支付" @click="selectPayType('alipay')">
                                                    <span class="ep-icon ep-icon-alipay"></span> <span class="ep-pay-method-name">支付宝支付</span>
                                                    <i class="ep-icon ep-icon-selected" v-if="form.payType == 'alipay'"></i>
                                                </li>
                                                <li :class="{selected:form.payType == 'qqwallet'}" title="QQ钱包支付" @click="selectPayType('qqwallet')">
                                                    <span class="ep-icon ep-icon-qqpay"></span> <span class="ep-pay-method-name">QQ钱包支付</span>
                                                    <i class="ep-icon ep-icon-selected" v-if="form.payType == 'qqwallet'"></i>
                                                </li>
                                                <li v-if="$route.query.bank" :class="{selected:form.payType == 'bank'}" title="余额支付" @click="selectPayType('bank')">
                                                    <span class="ep-icon ep-icon-unionpay"></span> <span class="ep-pay-method-name">余额支付</span>
                                                    <i class="ep-icon ep-icon-selected" v-if="form.payType == 'bank'"></i>
                                                </li>
                                            </ul>
                                        </div>

                                        <div class="ep-pay-operate">
                                            <a data-action="delay" href="javascript:void(0);" @click="payment()"
                                               title="立即支付" class="ep-btn ep-btn-blue">立即支付</a>
                                        </div>
                                    </dd>
                                </dl>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/api'
    export default {
        name: "v-zhifu",
        data() {
            return {
                loading:false,
                form:{
                    payType:'wechat',
                    zongji:this.$route.query.zongji,
                    ordersn:this.$route.query.ordersn,
                    biao:this.$route.query.biao,
                    id:this.$route.query.id
                }
            }
        },
        watch: {},
        computed: {},
        methods: {
            payment(){
                this.loading = true;
                this.$post(api.payment , this.form).then(res=>{
                    this.loading = false;
                    if(res.code == api.code.OK)
                    {
                        this.$alert('支付成功').then(res=>{
                            this.$router.go(-1);
                        });
                    }else{
                        this.$message.error(res.msg);
                    }
                }).catch(err=>{
                    this.$message.error(err.message);
                });
            },
            selectPayType(type){
                this.form.payType = type;
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
<style type="text/scss" scoped lang="scss">

    a {
        text-decoration: none
    }

    a:hover {
        text-decoration: underline
    }

    img {
        max-width: 100%;
        vertical-align: middle
    }

    .fl {
        float: left
    }

    .fr {
        float: right
    }

    .ep-icon {
        background-image: url('ep_new_sprites.png');
        background-repeat: no-repeat;
        display: block
    }

    .ep-icon-alipay {
        width: 24px;
        height: 24px;
        background: url('alipay.png') no-repeat
    }

    .ep-icon-wxpay {
        width: 22px;
        height: 19px;
        background-position: 0 -50px
    }

    .ep-icon-qqpay {
        width: 16px;
        height: 18px;
        background-position: 0 -71px
    }

    .ep-icon-tenpay {
        width: 56px;
        height: 26px;
        background-position: 0 -117px
    }

    .ep-icon-unionpay {
        width: 32px;
        height: 20px;
        background-position: 0 -173px
    }

    .ep-icon-selected {
        width: 20px;
        height: 20px;
        background-position: -25px 0
    }

    .ep-icon-arrow {
        width: 10px;
        height: 8px;
        background-position: -35px -175px
    }

    .ep-icon-radio {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        width: 14px;
        height: 14px;
        background-position: -43px -195px
    }

    .selected .ep-icon-radio {
        background-position: -43px -211px
    }

    .disabled .ep-icon-radio {
        background-position: -43px -227px
    }


    .disabled .ep-icon-wxpay {
        background-position: -24px -50px
    }

    .disabled .ep-icon-qqpay {
        background-position: -18px -71px
    }

    .disabled .ep-icon-tenpay {
        background-position: 0 -145px
    }

    .disabled .ep-icon-unionpay {
        background-position: 0 -193px
    }

    .disabled .ep-icon-alipay {
        background-position: -17px -212px
    }

    @media (-webkit-min-device-pixel-ratio: 1.25),(min-resolution: 120dpi) {
        .ep-icon {
            background-image: url('ep_new_sprites@2x.png');
            background-repeat: no-repeat;
            background-size: 60px 250px
        }
    }


    .ep-btn {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        border-radius: 2px;
        text-align: center;
        box-sizing: border-box;
        vertical-align: top;
        transition: color .1s ease-in, background-color .1s ease-in
    }

    .ep-btn:hover {
        text-decoration: none
    }

    .ep-btn.ep-btn-blue {
        width: 130px;
        height: 50px;
        background-color: #4580cb;
        border: 1px solid #3875c1;
        color: #fff;
        font-size: 16px;
        line-height: 50px
    }

    .ep-btn.ep-btn-blue.h42 {
        height: 42px;
        line-height: 42px
    }

    .ep-btn.ep-btn-blue:hover {
        background-color: #4495de
    }

    .ep-btn.ep-btn-blue:active {
        background-color: #2e7bc0
    }

    .ep-btn.ep-btn-blue.disabled, .ep-btn.ep-btn-blue:disabled {
        background-color: #b1b1b1;
        border-color: #b1b1b1;
        cursor: not-allowed
    }

    .ep-btn.ep-btn-blue.ep-btn-normal {
        width: 118px;
        height: 40px;
        line-height: 38px
    }

    .ep-btn.ep-btn-blue.small {
        width: auto;
        padding: 0 15px;
        height: 28px;
        line-height: 26px;
        font-size: 14px
    }

    .ep-btn.ep-btn-white {
        width: 118px;
        height: 40px;
        line-height: 38px;
        border: 1px solid #cdcdcd;
        color: #737373;
        font-size: 14px;
        background: #f7f7f7\9 \0;
        background-image: linear-gradient(to top, #f0f0f0 0%, #f5f5f5 26%, #fafafa 100%);
        -webkit-box-shadow: inset 0 2px 0 0 rgba(255, 255, 255, .2);
        -moz-box-shadow: inset 0 2px 0 0 rgba(255, 255, 255, .2);
        box-shadow: inset 0 2px 0 0 rgba(255, 255, 255, .2);
        filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#fafafa, endcolorstr=#f1f1f1, gradientType=0)
    }

    .ep-btn.ep-btn-white.h42 {
        height: 42px;
        line-height: 42px
    }

    .ep-btn.ep-btn-white:hover {
        background-image: linear-gradient(to top, #fafafa 0%, #f3f3f3 74%, #ebebeb 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#f1f1f1, endcolorstr=#fafafa, gradientType=0)
    }

    .ep-btn.ep-btn-white:active {
        background-image: linear-gradient(to top, #f7f7f7 0%, #ededed 74%, #e2e2e2 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#e9e9e9, endcolorstr=#f7f7f7, gradientType=0)
    }

    .ep-btn.ep-btn-disabled {
        border-color: #b1b1b1;
        background-color: #b1b1b1;
        color: #fff;
        cursor: not-allowed
    }

    .ep-btn.ep-btn-disabled:hover, .ep-btn.ep-btn-disabled:active {
        border-color: #b1b1b1;
        background-color: #b1b1b1;
        color: #fff
    }

    .ep-mr10 {
        margin-right: 10px
    }

    .rmb {
        font-size: 14px
    }

    .rmb i {
        font-size: 12px
    }

    a {
        color: #3584cb
    }

    a:hover {
        text-decoration: underline
    }





    .ep-pay-method {
        padding-top: 20px
    }

    .ep-pay-method dl {
        zoom: 1;
        clear: both
    }

    .ep-pay-method dl:after {
        content: '';
        height: 0;
        line-height: 0;
        overflow: hidden;
        visibility: hidden;
        clear: both;
        display: table
    }

    .ep-pay-method dt {
        color: #000;
        font-weight: 700;
        font-size: 14px;
        line-height: 25px
    }

    .ep-pay-methods dt {
        line-height: 44px
    }

    .ep-pay-method-list-tit li.selected .ep-pay-method-list-txt {
        display: block
    }

    .ep-pay-method-list-txt {
        display: none;
        position: absolute;
        top: 40px;
        left: -3px;
        width: 140px;
        font-size: 12px;
        height: 14px;
        line-height: 14px;
        text-align: left;
        cursor: default
    }




    .ep-order-detail {
        border-bottom: 1px solid #f3f3f3
    }

    .ep-order-tit > span {
        font-size: 15px;
        color: #000;
        font-weight: 700
    }

    .ep-order-tit > span > em {
        color: #0ac265;
        font-weight: 400;
        font-size: 24px
    }

    .ep-pay-method-list-tit ul {
        zoom: 1;
        clear: both
    }

    .ep-pay-method-list-tit ul:after {
        content: '';
        height: 0;
        line-height: 0;
        overflow: hidden;
        visibility: hidden;
        clear: both;
        display: table
    }

    .ep-pay-method-list-tit li {
        position: relative;
        font-size: 0;
        display: block;
        float: left;
        width: 130px;
        height: 44px;
        line-height: 42px;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid #dedede;
        cursor: pointer
    }

    .ep-pay-method-list-tit li + li {
        margin-left: 10px;
        margin-bottom: 8px
    }

    .ep-pay-method-list-tit li .ep-pay-method-name {
        transition: color .1s ease-in
    }

    .ep-pay-method-list-tit li .ep-transfer-confirm-tips, .ep-pay-method-list-tit li .ep-confirm-tips-content {
        visibility: hidden;
        border-color: #1379d8;
        right: 217px;
        top: -56px
    }

    .ep-pay-method-list-tit li .ep-transfer-confirm-tips::after, .ep-pay-method-list-tit li .ep-confirm-tips-content::after {
        background-image: none
    }

    .ep-pay-method-list-tit li .ep-transfer-confirm-tips.ep-iframe, .ep-pay-method-list-tit li .ep-confirm-tips-content.ep-iframe {
        right: 183px
    }

    .ep-pay-method-list-tit li:hover, .ep-pay-method-list-tit li.hover {
        border-color: #3879d1
    }

    .ep-pay-method-list-tit li:hover .ep-pay-method-name, .ep-pay-method-list-tit li.hover .ep-pay-method-name {
        color: #3879d1
    }

    .ep-pay-method-list-tit li:hover .ep-transfer-confirm-tips, .ep-pay-method-list-tit li.hover .ep-transfer-confirm-tips, .ep-pay-method-list-tit li:hover .ep-confirm-tips-content, .ep-pay-method-list-tit li.hover .ep-confirm-tips-content {
        visibility: visible
    }

    .ep-pay-method-list-tit li.selected {
        line-height: 40px;
        *height: 42px;
        *width: 128px;
        border: 2px solid #3879d1
    }

    .ep-pay-method-list-tit li.selected .ep-icon-selected {
        position: absolute;
        right: 0;
        bottom: 0;
        margin: 0
    }

    .ep-pay-method-list-tit li.disabled {
        background-color: #f9f9f9;
        border-color: #dedede;
        color: #bcbcbc
    }

    .ep-pay-method-list-tit li.disabled .ep-pay-method-name {
        color: #bcbcbc
    }

    .ep-pay-method-list-tit li.disabled:hover, .ep-pay-method-list-tit li.disabled:active {
        line-height: 42px;
        border: 1px solid #dedede
    }

    .ep-pay-method-list-tit li.disabled:hover .ep-pay-method-name, .ep-pay-method-list-tit li.disabled:active .ep-pay-method-name {
        color: #bcbcbc
    }

    .ep-pay-method-list-tit li span {
        display: inline-block;
        color: #707070;
        font-size: 14px;
        line-height: 25px;
        vertical-align: middle
    }

    .ep-pay-method-list-tit li .ep-icon {
        margin-right: 4px
    }

    .ep-pay-method-list-tit li .ep-if-unionpay-tip {
        position: absolute;
        margin-top: -53px;
        margin-left: 70px;
        float: none;
        display: block;
        width: 120px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        background-color: #ffc539;
        color: #fff;
        border-radius: 2px
    }


    @keyframes iconScale {
        0% {
            transform: scale(0)
        }
        100% {
            transform: scale(1)
        }
    }

    @keyframes loaderIconRotate {
        0% {
            transform: rotate(0)
        }
        100% {
            transform: rotate(-360deg)
        }
    }


    .hd {
        height: 60px;
        color: #000;
        background-color: #fff
    }

    .hd-main {
        width: 1080px;
        height: 100%;
        margin: 0 auto;
        *zoom: 1
    }

    .hd-main:after, .hd-main:before {
        content: '';
        display: table
    }

    .hd-main:after {
        clear: both
    }

    .ep-hd-info {
        float: left;
        height: 100%;
        font-size: 0
    }

    .ep-order-status {
        float: left
    }

    .ep-order-status {
        margin: 16px 0 0 20px;
        padding-left: 20px;
        border-left: 1px solid #f0f0f0;
        line-height: 26px;
        font-size: 16px
    }

    .ep-order-status h1 {
        font-size: 16px;
        font-weight: 700
    }

    .user-info {
        float: right;
        margin-top: 20px
    }

    .user-info p {
        font-size: 14px
    }

    .ft {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 140px;
        clear: both;
        padding-top: 16px
    }

    .ft-main {
        width: 1080px;
        margin: 0 auto
    }


    .container {
        height: auto !important;
        position: relative;
        background: #efefef
    }

    .bd {
        padding: 40px 0 200px
    }

    .bd-main {
        width: 1080px;
        margin: 0 auto;
        background: #fff
    }

    .bd-main-container {
        padding: 50px 270px 50px 250px
    }

    .ep-wrapper {
        position: relative;
        margin-left: 0
    }

    .ep-wp-hd {
        padding: 22px 135px;
        background: #f5fef3
    }

    .fail .ep-wp-hd {
        background-color: #f9f9f9
    }


    .ep-status-success {
        border: none
    }

    .ep-status-success .mod-it-text {
        font-weight: 700
    }

    .ep-links {
        font-size: 14px;
        padding-bottom: 20px;
        margin-top: 25px;
        margin-bottom: 10px;
        border-bottom: 1px solid #f5f5f5
    }


    .ep-question {
        margin-bottom: 30px;
        font-size: 14px;
        color: #888
    }

    .ep-question p {
        padding: 10px 0
    }

    .ep-order-detail {
        padding: 10px 0 20px
    }

    .ep-order-detail .ep-order-con {
        padding-left: 72px
    }

    .ep-order-tit {
        position: relative
    }

    .ep-order-tit .rmb {
        margin: 0 8px 0 4px
    }

    .ep-order-tit .rmb i {
        font-size: 18px
    }

    .ep-order-tit span {
        font-size: 14px
    }

    .ep-order-tit dl {
        padding-bottom: 12px
    }

    .ep-order-tit dt, .ep-order-tit dd {
        font-size: 14px
    }

    .ep-order-tit dt {
        float: left;
        color: #000;
        font-weight: 700
    }

    .ep-order-tit dd {
        color: #707070
    }

    .fail .ep-order-con p:first-child {
        padding-top: 0
    }

    .ep-pay-method dt {
        float: none
    }

    .ep-pay-method dd {
        padding-left: 0;
        float: none
    }

    .ep-pay-success-tips {
        font-size: 14px;
        color: #888
    }

    .ep-pay-success-tips a {
        padding-right: 4px;
        color: #3879d1
    }

    .ep-pay-qqpay-tips {
        display: none;
        position: absolute;
        margin-top: 5px;
        width: 233px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
        color: #888;
        background-image: linear-gradient(to top, #f0f0f4, #fff);
        filter: progid:DXImageTransform.Microsoft.gradient(startcolorstr=#ffffff, endcolorstr=#f0f0f4, gradientType=0);
        box-shadow: 2px 2px 5px rgba(185, 185, 185, .5);
        border: 1px solid #d0d0d0;
        border-radius: 1px
    }

    .ep-pay-operate {
        padding-bottom: 120px
    }


    .hide {
        display: none
    }

    .ep-pay-method-list-tit {
        margin-bottom: 25px
    }

    .ep-pay-method-list-tit .ep-pay-method-list-txt {
        display: none;
        position: absolute;
        top: 40px;
        left: -3px;
        width: 140px;
        color: #afafaf;
        font-size: 12px;
        height: 14px;
        line-height: 14px;
        text-align: left
    }

    .ep-pay-method-list-tit li {
        transition: border-color .1s ease-in, color .1s ease-in
    }

    .ep-pay-method-list-tit li.selected .ep-pay-method-list-txt {
        display: block
    }

    .ep-pay-method-list-tit li.selected .ep-icon-selected {
        transform-origin: 100% 100%;
        animation: iconScale .1s linear
    }

    .ep-pay-method-list-txt {
        padding: 10px 0;
        color: #afafaf
    }


    .ep-pay-method-list-txt.reminder-tip {
        color: #f7a04c;
        font-size: 12px
    }
    

    @media screen and (max-width: 768px) {
      .bd{
        padding: 0px;
      }
      .bd-main{
        width: 100% !important;
      }
      .bd-main-container{
        padding: 20px;
      }
      .ep-pay-method-list-tit li{
        margin-bottom: 10px;
      }
      .ep-pay-method-list-tit li + li{
        margin-left: 0px;
      }
      .pay-channel{
        margin-left: 0px;
      }
      .ep-pay-method-list-tit{
        ul{
          display: flex;
          flex-flow: wrap;
          justify-content: space-between;
          .li{
            width: 50px;
          }
        }
      }
    }

</style>
