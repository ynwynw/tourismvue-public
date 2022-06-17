
import http from "@/utils/ajax/http"
import {extend} from "@/utils/extend"

const api = {
    code:{
        OK:0    },
    user:{
        login:'authLogin.do?ac=login',
        tokenLogin:'tokenLogin.do',
        logout: 'logout.do'
    },
    checkUpdate:'sh.do',
    editorPassword :'editPassword',
    checkField:'checkno.do',

        payment:'payment.do',
    
    collect:'collect.do',
    shoucangjilu: {
        listusername:"shoucangjilu_list2.do",
        delete:'shoucangjilu_delete'
    },
    captch(){
        var url = "captcha.do?rd="+Math.floor(Math.random()*100000);
        return new Promise((resolve, reject) => {
            http.get( url ).then(res=>{
                var url = res.data;
                resolve(url);
            },reject);
        });
    },
    search:{
        select:'selectUpdateSearch.do',
        table:'tableAjax.do?a=table',
        selectView:'selectView.do',
        all:'selectAll.do'
    },
    attachment:{
        uploadUrl:'upload_re.do',
        upload (file) {
            return new Promise((resolve, reject) => {
                var formdata = new FormData();
                formdata.append("fujian" , file , file.name || 'tmp.png');
                http.post(api.attachment.uploadUrl , formdata)
                    .then(res=>{
                        if(res.code == api.code.OK)
                        {
                            resolve(res.data);
                        }else{
                            reject(res.msg);
                        }
                    }).catch(err=>{
                        reject(err.message);
                    });
            });
        },
    },
        admins:{
                list:"admins_list.do",
                insert:"adminsinsert.do",
                update:"adminsupdate.do",
                delete:"admins_delete.do",
                detail:"admins_detail.do",
                create:"admins_add.do",
                edit:"admins_updt.do",
            },
        yonghu:{
                list:"yonghu_list.do",
                insert:"yonghuinsert.do",
                update:"yonghuupdate.do",
                delete:"yonghu_delete.do",
                detail:"yonghu_detail.do",
                create:"yonghu_add.do",
                edit:"yonghu_updt.do",
            },
        xinwenfenlei:{
                list:"xinwenfenlei_list.do",
                insert:"xinwenfenleiinsert.do",
                update:"xinwenfenleiupdate.do",
                delete:"xinwenfenlei_delete.do",
                detail:"xinwenfenlei_detail.do",
                create:"xinwenfenlei_add.do",
                edit:"xinwenfenlei_updt.do",
            },
        xinwenxinxi:{
                list:"xinwenxinxi_list.do",
                insert:"xinwenxinxiinsert.do",
                update:"xinwenxinxiupdate.do",
                delete:"xinwenxinxi_delete.do",
                detail:"xinwenxinxi_detail.do",
                create:"xinwenxinxi_add.do",
                edit:"xinwenxinxi_updt.do",
                listtianjiaren:"xinwenxinxi_list_tianjiaren.do",
                weblist:"xinwenxinxilist.do",
                webdetail:"xinwenxinxidetail.do",
            },
        youqinglianjie:{
                list:"youqinglianjie_list.do",
                insert:"youqinglianjieinsert.do",
                update:"youqinglianjieupdate.do",
                delete:"youqinglianjie_delete.do",
                detail:"youqinglianjie_detail.do",
                create:"youqinglianjie_add.do",
                edit:"youqinglianjie_updt.do",
            },
        liuyanban:{
                list:"liuyanban_list.do",
                insert:"liuyanbaninsert.do",
                update:"liuyanbanupdate.do",
                delete:"liuyanban_delete.do",
                detail:"liuyanban_detail.do",
                create:"liuyanban_add.do",
                edit:"liuyanban_updt.do",
                listliuyanren:"liuyanban_list_liuyanren.do",
            },
        lunbotu:{
                list:"lunbotu_list.do",
                insert:"lunbotuinsert.do",
                update:"lunbotuupdate.do",
                delete:"lunbotu_delete.do",
                detail:"lunbotu_detail.do",
                create:"lunbotu_add.do",
                edit:"lunbotu_updt.do",
            },
        jingdianxinxi:{
                list:"jingdianxinxi_list.do",
                insert:"jingdianxinxiinsert.do",
                update:"jingdianxinxiupdate.do",
                delete:"jingdianxinxi_delete.do",
                detail:"jingdianxinxi_detail.do",
                create:"jingdianxinxi_add.do",
                edit:"jingdianxinxi_updt.do",
                weblist:"jingdianxinxilist.do",
                webdetail:"jingdianxinxidetail.do",
            },
        diqu:{
                list:"diqu_list.do",
                insert:"diquinsert.do",
                update:"diquupdate.do",
                delete:"diqu_delete.do",
                detail:"diqu_detail.do",
                create:"diqu_add.do",
                edit:"diqu_updt.do",
            },
        lvyouxianlu:{
                list:"lvyouxianlu_list.do",
                insert:"lvyouxianluinsert.do",
                update:"lvyouxianluupdate.do",
                delete:"lvyouxianlu_delete.do",
                detail:"lvyouxianlu_detail.do",
                create:"lvyouxianlu_add.do",
                edit:"lvyouxianlu_updt.do",
                weblist:"lvyouxianlulist.do",
                webdetail:"lvyouxianludetail.do",
            },
        yuding:{
                list:"yuding_list.do",
                insert:"yudinginsert.do",
                update:"yudingupdate.do",
                delete:"yuding_delete.do",
                detail:"yuding_detail.do",
                create:"yuding_add.do",
                edit:"yuding_updt.do",
                listyudingren:"yuding_list_yudingren.do",
            },
        difangmeishi:{
                list:"difangmeishi_list.do",
                insert:"difangmeishiinsert.do",
                update:"difangmeishiupdate.do",
                delete:"difangmeishi_delete.do",
                detail:"difangmeishi_detail.do",
                create:"difangmeishi_add.do",
                edit:"difangmeishi_updt.do",
                weblist:"difangmeishilist.do",
                webdetail:"difangmeishidetail.do",
            },
        meishifenlei:{
                list:"meishifenlei_list.do",
                insert:"meishifenleiinsert.do",
                update:"meishifenleiupdate.do",
                delete:"meishifenlei_delete.do",
                detail:"meishifenlei_detail.do",
                create:"meishifenlei_add.do",
                edit:"meishifenlei_updt.do",
            },
    }

export default api
