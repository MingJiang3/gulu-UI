<template>
    <div class="tabs-head">
        <slot></slot>
        <div class="line" ref="line"></div>
        <div class="action-wrapper">
            <slot name="actions"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name:'guluTabsHead',
        inject:['eventBus'],
        mounted(){
            this.eventBus.$on('update:selected',(item,vm)=>{
                let {width,left} = vm.$el.getBoundingClientRect()
                this.$refs.line.style.width = `${width}px`
                this.$refs.line.style.left = `${left}px`
            })
        }
    }
</script>
<style lang="scss" scoped>
    $tab-height:40px;
    .tabs-head{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        height: $tab-height;
        position: relative;
        border-bottom: 1px solid #edebed;
        > .action-wrapper{
            margin-left: auto;
            padding: 0 2em;
        }
        > .line{
            transition: all 350ms;
            position: absolute;
            bottom: 0;
            border-bottom:3px solid #1890ff;

        }
    }
</style>