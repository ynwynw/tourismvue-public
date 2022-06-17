import selectList from './select-list'
import selectView from './select-view'

function install(Vue) {
    if(install.installed)return;
    Vue.component(selectList.name , selectList)
    Vue.component(selectView.name , selectView)
}

export default {
    install,
    selectView,
    selectList
}
