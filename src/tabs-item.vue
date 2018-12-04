<template>
    <div class="tabs-item" :class="classes" @click="onClick">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: 'guluTabsItem',
        inject: ['eventBus'],
        data() {
            return {
                active: false
            }
        },
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            name: {
                type: String | Number,
                required: true
            }
        },
        computed: {
            classes() {
                return {
                    active: this.active,
                    disabled:this.disabled
                }
            }
        },
        created() {
            this.eventBus.$on('update:selected', (name) => {
                this.active = name === this.name;
            })
        },
        methods:{
            onClick(){
                if (this.disabled){return}
                this.eventBus.$emit('update:selected',this.name,this)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .tabs-item {
        padding: 0 1em;
        flex-shrink: 0;
        height: 100%;
        cursor: pointer;
        align-items: center;
        display: flex;
        color: black;
        &.active {
            font-weight: bold;
            color: #1890ff;
        }
        &.disabled{
            color: #bfbfbf;
            cursor: no-drop;
        }
    }
</style>