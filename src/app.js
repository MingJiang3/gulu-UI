import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './buttonGroup'

Vue.component('g-button',Button)
Vue.component('g-icon',Icon)
Vue.component('g-button-group',ButtonGroup)

new Vue({
    el:'#app',
    data:{
        loading1:false,
        loading2:true,
        loading3:false,
    }
})

import chai from 'chai'
import spies from   'chai-spies'
chai.use(spies)
const expect  = chai.expect
//单元测试
{
    const Constructor = Vue.extend(Button)      //把butto组件变成构造函数
    const vm = new Constructor({                //构造函数变成实例
        propsData:{
            icon:'set'
        }
    })
    vm.$mount()                                  //实例挂载(括号里写挂载在到的位置)
    let userElement = vm.$el.querySelector('use')
    let href = userElement.getAttribute('xlink:href')
    expect(href).to.eq('#i-set')
    vm.$el.remove()
    vm.$destroy()
}
{
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
        propsData:{
            icon:'set',
            loading:true
        }
    })
    vm.$mount()
    let userElement = vm.$el.querySelector('use')
    let href = userElement.getAttribute('xlink:href')
    expect(href).to.eq('#i-loading')
    vm.$el.remove()
    vm.$destroy()
}
{
    let div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
        propsData:{
            icon:'set'
        }
    })
    vm.$mount(div)
    let svg = vm.$el.querySelector('svg')
    let {order} = window.getComputedStyle(svg)
    expect(order).to.eq('1')
    vm.$el.remove()
    vm.$destroy()
}
{
    let div = document.createElement('div')
    document.body.appendChild(div)
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
        propsData:{
            icon:'set',
            iconPosition:'right'
        }
    })
    vm.$mount(div)
    let svg = vm.$el.querySelector('svg')
    let {order} = window.getComputedStyle(svg)
    expect(order).to.eq('2')
    vm.$el.remove()
    vm.$destroy()
}
{//mock
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
        propsData:{
            icon:'set',
        }
    })
    vm.$mount()
    let spy = chai.spy(function(){})
    vm.$on('click',spy)
    let button = vm.$el
    button.click()
    expect(spy).to.have.been.called()
}