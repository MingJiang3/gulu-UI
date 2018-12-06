import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './buttonGroup'
import Input from './input'
import Row from './row'
import Col from './col'
import Header from './header'
import Footer from './footer'
import Content from './content'
import Sider from './sider'
import Layout from './layout'
import Toast from './toast'
import Plugin from './plugin'
import Tabs from './tabs'
import TabsHead from './tabs-head'
import TabsBody from './tabs-body'
import TabsItem from './tabs-item'
import TabsPane from './tabs-pane'
import Popover from './popover'

Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('g-button-group', ButtonGroup)
Vue.component('g-input', Input)
Vue.component('g-row', Row)
Vue.component('g-col', Col)
Vue.component('g-layout', Layout)
Vue.component('g-sider', Sider)
Vue.component('g-content', Content)
Vue.component('g-footer', Footer)
Vue.component('g-toast', Toast)
Vue.component('g-header', Header)

Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-head', TabsHead)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-pane', TabsPane)
Vue.component('g-popover', Popover)

Vue.use(Plugin)

new Vue({
    el: '#app',
    data: {
        selectedTab:"man"
    },
    methods: {

    }
    // mounted() {
    //     this.$toast('货他内解决大V深V浑身都会立方米让你',{
    //             autoClose:9,
    //             position:'bottom',
    //             closeButton:{
    //                 text:'更好打发第三方的',
    //                 callback(){
    //                     console.log('i am close');
    //                 }
    //             }
    //
    //     })
    // }
})

