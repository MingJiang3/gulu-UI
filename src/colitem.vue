<template>
    <div class="colitem">
        <div class="title" @click="toggle">
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
            },
            name: {
                type: String,
                required: true
            }
        },
        data() {
            return {opens: false, single: false}
        },
        inject: ['eventBus'],
        mounted() {
            this.eventBus && this.eventBus.$on('update:selected', (names) => {
                if (names.indexOf(this.name) >= 0) {
                    this.opens = true
                } else {
                    this.opens = false
                }
            })

        },
        methods: {
            toggle() {
                if (this.opens) {
                    this.eventBus && this.eventBus.$emit('update:removeSelected', this.name)
                } else {
                    this.eventBus && this.eventBus.$emit('update:addSelected', this.name)
                }
            }
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