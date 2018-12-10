<template>
    <button class="g-button" :class="{[`icon-${iconPosition}`]:true}" @click="$emit('click')"><!--iconPosition的值为变量 -->
        <g-icon class="icon" v-if="icon && !loading" :name="icon"></g-icon>
        <g-icon class="loading icon" v-if="loading" name="loading"></g-icon>

        <div class="content">
            <slot></slot>
        </div>
    </button></template>
<script>
    import Icon from './icon'
export default {
    components:{
        'g-icon':Icon
    },
    props:{
        icon:{},
        loading:{
            type:Boolean,
            default: false
        },
        iconPosition:{
            type: String,
            default: 'left',
            validator (value) {
                return value === 'left' || value === 'right'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    $font-size:14px;
    $button-height:32px;
    $border-radius:4px;
    $border-color:#999;
    $button-bg:white;
    $border-color-hover:#666;
    $button-active-bg:#eee;
    @keyframes spin {
        0%{transform: rotate(0deg)}
        100%{transform: rotate(360deg)}
    }
    .g-button{
        font-size: $font-size;
        height: $button-height;
        padding: 0 1em;
        border-radius: $border-radius;
        border: 1px solid $border-color;
        background: $button-bg;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        &:hover{border-color: $border-color-hover}
        &:active{background-color: $button-active-bg}
        &:focus { outline: none; }
        > .content { order: 2; }
        > .icon { order: 1; margin-right: .2em; }
        &.icon-right {
            > .content { order: 1; }
            > .icon { order: 2; margin-right: 0; margin-left: .2em;}
        }
        .loading {animation: spin 2s infinite linear;}
    }
</style>