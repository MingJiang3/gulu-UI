const expect = chai.expect;
import Vue from 'vue'

import Tabs from '../src/tabs'
import TabsHead from '../src/tabs-head'
import TabsBody from '../src/tabs-body'
import TabsItem from '../src/tabs-item'
import TabsPane from '../src/tabs-pane'

Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-head', TabsHead)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-pane', TabsPane)

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Tabs', () => {
    it('存在.', () => {
        expect(Tabs).to.be.exist
    })
    it('子组件只能为tabs-heade和tabs-body ', () => {
        const div = document.createElement('div');
        document.body.appendChild(div);
        div.innerHTML = `
            <g-tabs :selected="man">
                 <g-tabs-head>
                    <g-tabs-item name="women" disabled>美女</g-tabs-item>
                    <g-tabs-item name="man">帅哥</g-tabs-item>
                    <g-tabs-item name="manwo">人妖</g-tabs-item>
                </g-tabs-head>
                <g-tabs-body>
                    <g-tabs-pane name="women">11</g-tabs-pane>
                    <g-tabs-pane name="man">22</g-tabs-pane>
                    <g-tabs-pane name="manwo">33</g-tabs-pane>
                </g-tabs-body>
             </g-tabs>`;
        let vm = new Vue({
            el: div
        })

    });
    // it('接受autoClose ', (done) => {
    //     const div = document.createElement('div')
    //     document.body.appendChild(div)
    //     const Constructor = Vue.extend(Toast)
    //     const vm = new Constructor({
    //         propsData: {
    //             aotuClose: 1
    //         }
    //     }).$mount(div)
    //     vm.$on('close', () => {
    //         expect(document.body.contains(vm.$el)).to.eq(false)
    //         done()
    //     })
    // });
})