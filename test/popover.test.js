const expect = chai.expect;
import Vue from 'vue'
import Popover from '../src/popover'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Popover', () => {
    it('存在.', () => {
        expect(Popover).to.exist
    })
    it('可以设置position', (done) => {
        Vue.component('g-popover', Popover);
        const div = document.createElement('div');
        document.body.appendChild(div);
        div.innerHTML = `
            <g-popover position="left" ref="test">
                <template slot="content">
                    <div>内容区</div>
                </template>
                <button>点我</button>
            </g-popover>`;
        const vm = new Vue({
            el: div
        });
        console.log(vm.$el);
        vm.$el.querySelector('button').click();
        vm.$nextTick(() => {
            expect(vm.$refs.test.$refs.contentWrapper.classList.contains('position-left')).to.be.true
            done()
        })
    })
    xit('可以设置trigger', (done) => {
        Vue.component('g-popover', Popover);
        const div = document.createElement('div');
        document.body.appendChild(div);
        div.innerHTML = `
            <g-popover trigger="hover" ref="test">
                <template slot="content">
                    <div>内容区</div>
                </template>
                <button>点我</button>
            </g-popover>`;
        const vm = new Vue({
            el: div
        });
        setTimeout(()=>{
            let event = new Event('mouseenter')
            vm.$el.dispatchEvent(event)
            vm.$nextTick(() => {
                expect(vm.$refs.test.$refs.contentWrapper).to.exist
                done()
            })
        },300)
    })
})