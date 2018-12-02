<template>
    <div class="tabs">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name:'guluTabs',
        props:{
            selected:{
                type:String,
                required:true
            },
            direction:{
                type:String,
                default:'horizontal',
                validator(value){
                    return ['horizontal','vertical'].indexOf(value) >= 0
                }
            }
        },
        created(){
            // tabs组件必修要触发selected事件,才能使 .sync 修饰符有用
            this.$emit('update:selected','xxx')
        }
    }
</script>
<style lang="scss" scoped>
    .tabs{}
</style>