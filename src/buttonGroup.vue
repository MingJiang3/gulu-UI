<template>
    <div class="g-button-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        mounted(){
            for(let node of this.$el.children){
                let name = node.nodeName.toLowerCase()
                if(name !== 'vm'){
                    console.warn(`g-button-group的子元素应全部为g-button，不应有${name}`)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    $border-radius:4px;
    .g-button-group{
        display: inline-flex;
        vertical-align: top;
    > .g-button{
        border-radius: 0;
        &:not(:first-child){
            margin-left: -1px;
        }
        &:first-child{
            border-top-left-radius: $border-radius;
            border-bottom-left-radius: $border-radius;
        }
        &:last-child{
            border-top-right-radius: $border-radius;
            border-bottom-right-radius: $border-radius;
        }
        &:hover{
            position: relative;
            z-index: 1;
        }
    }
    }
</style>