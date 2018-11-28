import Toast from './toast'
export default {
    install (Vue,options) {
        Vue.prototype.$toast = function (message) {
            let Constructor = Vue.extend(Toast)
            let toast = new Constructor({
                propsData:{
                    closeButton:{
                        text:'知道了',
                        callback(){
                            console.log('ok')
                        }
                    }
                }
            })
            toast.$slots.default = [message]    //向toast插槽传默认内容
            toast.$mount()
            document.body.appendChild(toast.$el)

        }
    }
}