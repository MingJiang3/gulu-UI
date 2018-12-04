<template>
    <div class="tabs-head">
        <slot></slot>
        <div class="action-wrapper">
            <slot name="actions"></slot>
        </div>
    </div>
</template>
<script>
    export default {
        name:'guluTabsHead',
        inject:['eventBus'],
        created(){
        }
    }
</script>
<style lang="scss" scoped>
    $tab-height:40px;
    .tabs-head{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border: 1px solid red;
        height: $tab-height;
        .action-wrapper{
            margin-left: auto;
        }
    }
</style>