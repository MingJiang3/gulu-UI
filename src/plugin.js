import Toast from './toast'
export default {
    install (Vue,options) {
        Vue.prototype.$toast = function (message) {
            let Constructor = Vue.extend(Toast)
            let toast = new Constructor()
            toast.$slots.default = [message]    //像toast插槽传默认内容
            toast.$mount()
            document.body.appendChild(toast.$el)

        }
    }
}