import collect from "./collect";


function install(Vue) {
    Vue.component(collect.name , collect)
}

export default {
    install
}
