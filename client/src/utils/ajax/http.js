/**
 * Created by JnToo on 2018/6/1.
*/

import axios from 'axios'
import config from '@/config'
import Qs from 'qs'
import jdk from '../extend'
import router from '../../router'
import store from '@/store'

var https = axios.create({
    baseURL:config.service_url,
    withCredentials:true,

    transformRequest: [function (data) {
        if(!(data instanceof FormData))
        {
            data = Qs.stringify(data , {arrayFormat: 'repeat'});
        }
        return data;
    }]
});


function fetchModel(url , content) {
    if(!(this instanceof fetchModel)){
        return new fetchModel(url , content);
    }

    this._content = content;
    this._init = jdk.extend(true,{} , {
        method:'GET',
        cache:'no-cache',
        headers:{
            'X-Requested-With':'XMLHttpRequest',
            'token': store.state.user.token,
        },
        cors:'cors',
        credentials:true,
        data:{}
    });
    this.url(url);
}


fetchModel.baseUrl = config.service_url;
fetchModel.prototype = {
    // 模型参数
    _url:'',
    _content:null,
    _init:null,
    _leval:false,
    method:function (method) {this._init.method = method;return this;},
    get:function () {
        return this.method('GET');
    },
    leval:function (setLeval) {
        this._leval = setLeval;
        return this;
    },
    post:function () {
        return this.method('POST');
    },
    put:function () {
        return this.method('PUT');
    },
    delete:function () {
        return this.method('DELETE');
    },
    head:function () {
        return this.method('HEAD');
    },
    options:function () {
        return this.method('OPTIONS');
    },
    url:function (url) {
        this._url = url;
        return this;
    },
    progress: function(target){
        this._init.onUploadProgress = target;
        return this;
    },
    header:function (name , value) {
        this._init.headers[name] = value;
        return this;
    },
    body:function (value) {
        this._init.data = value;
        return this;
    },
    add:function (name , value) {
        this._init[name] = value;
        return this;
    },
    then:function (fn , fn2) {
        // 开始执行
        var url = this.getUrl();
        return https(url , this._init).then((result)=>{
            var data = result.data;
            if(data.code == 1001 && router.currentRoute.name != 'Login'){
                router.replace({path:'/login' , query:{
                    callback:router.currentRoute.fullPath
                    }
                });
            }
            return data;
        }).then(fn,fn2);
    },
    getUrl(){
        var url = this._url;
        if(this._init.method == 'GET' && this._init.data){
            var body = this._init.data;
            var query = jdk.isObject(body)? Qs.stringify(body) : body;
            url += (url.indexOf('?') == -1 ? '?' : '&') + query;
            this._init.data = null;
        }
        return url;
    },
    thenBlob(fn,fn2){
        var url = this.getUrl();
        https(url , jdk.extend(true,{},this._init,{responseType:'blob'})).then(res=>{
            fn( res.data );
        }).catch(fn2)

    }
}

export function fetchGet(url , param) {
    var m = new fetchModel(url).get();
    if(param) m.body(param);

    return m;
}

export function fetchPost(url , param) {
    var m = new fetchModel(url).post();
    if(param) m.body(param);
    return m;
}

export default {
    http:fetchModel,
    get:fetchGet,
    post:fetchPost,
    //leval:leval
}
