<template>
    <div class="tabs">
        <slot></slot>
    </div>
</template>
<script>
    import Vue from 'vue'

    export default {
        name: 'guluTabs',
        props: {
            selected: {
                type: String,
                required: true
            },
            direction: {
                type: String,
                default: 'horizontal',
                validator(value) {
                    return ['horizontal', 'vertical'].indexOf(value) >= 0
                }
            }
        },
        data() {
            return {
                eventBus: new Vue()
            }
        },
        provide() {
            return {
                eventBus: this.eventBus
            }
        },
        mounted() {
            // console.log(this.$children);
            this.$children.forEach((vm) => {
                if (vm.$options.name === 'guluTabsHead') {
                    vm.$children.forEach((childVm) => {
                        if (childVm.$options.name === 'guluTabsItem' && childVm.name === this.selected) {
                            // tabs组件必修要触发selected事件,才能使 .sync 修饰符有用
                            this.eventBus.$emit('update:selected', this.selected,childVm)
                        }
                    })
                }
            })
        }
    }
</script>
<style lang="scss" scoped>
    .tabs {
    }
</style>