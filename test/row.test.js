const expect = chai.expect;
import Vue from 'vue'
import Row from '../src/row'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Row', () => {
    it('存在.', () => {
        expect(Row).to.be.exist
    })
    it('接收 gutter 属性', (done) => {      //done为测试异步的，最多2秒
        Vue.component('g-row',Row)
        Vue.component('g-col',Col)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `<g-row gutter="20"><g-col span="12"></g-col><g-col span="12"></g-col></g-row>`
        const vm = new Vue({
            el:div
        })
        setTimeout(()=>{
            const row = vm.$el.querySelector('.row')
            expect(getComputedStyle(row).marginLeft).to.eq('-10px')
            expect(getComputedStyle(row).marginRight).to.eq('-10px')
            const cols = vm.$el.querySelectorAll('.col')
            expect(getComputedStyle(cols[0]).paddingLeft).to.eq('10px')
            expect(getComputedStyle(cols[1]).paddingRight).to.eq('10px')

        })
    })
    it('接收 align 属性', () => {

    })

})