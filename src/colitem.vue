<template>
    <div class="colitem">
        <div class="title" @click="opens = !opens">
            {{title}}
        </div>
        <div class="content" v-if="opens">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "guluColitem",
        props: {
            title: {
                type: String,
                required: true
            }
        },
        data(){
            return{opens:false}
        }
    }
</script>

<style scoped lang="scss">
    $border-color: #dadada;
    $border-radius: 4px;
    .colitem {
        > .title {
            border: 1px solid $border-color;
            margin: 0 -1px;
            margin-top: -1px;
            background: #fafafa;
            min-height: 32px;
            display: flex;
            align-items: center;
            padding: 0 8px;
            cursor: pointer;
        }
        &:first-child {
            > .title {
                border-top-right-radius: $border-radius;
                border-top-left-radius: $border-radius;
            }
        }
        &:last-child {
            > .title:last-child {
                border-bottom-left-radius: $border-radius;
                border-bottom-right-radius: $border-radius;
            }
        }
        > .content {
            padding: 16px;
        }
    }
</style>