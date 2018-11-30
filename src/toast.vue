<template>
    <div class="toast" ref="toast">
        <div class="message">
            <slot></slot>
        </div>
        <div class="line" ref="line"></div>
        <span v-if="closeButton" class="close" @click="onClickClose">
            {{closeButton.text}}
        </span>
    </div>
</template>

<script>
    export default {
        name: 'guluToast',
        props: {
            autoClose: {
                type: [Boolean, Number],
                default: 3,
                validator(value) {
                    return value === false || typeof value === 'Number';
                }
            },
            closeButton: {
                type: Object,
                default() {
                    return {
                        text: '关闭', callback: (toast) => {
                            toast.close()
                        }
                    }
                }
            },
            position: {
                type: String,
                default: 'top',
                validator(value) {
                    return ['top', 'midel', 'bottom'].includes(value)
                }
            }
        },
        mounted() {
            this.autoClose()
            this.autoLineHeight()
        },
        methods: {
            close() {
                this.$el.remove()
                this.$destroy()
            },
            autoClose() {
                if (this.aotuClose) {
                    setTimeout(() => {
                        this.close()
                    }, this.closeDelay * 1000)
                }
            },
            onClickClose() {
                this.close()
                this.closeButton.callback()
            },
            autoLineHeight() {
                this.$nextTick(()=>{
                    this.$refs.line.style.height = `${this.$refs.toast.getBoundingClientRect().height}px`
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    $font-size: 14px;
    $toast-min-height: 40px;
    $toast-bg: rgba(0, 0, 0, 0.75);
    .toast {
        font-size: $font-size;
        min-height: $toast-min-height;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        background: $toast-bg;
        border-radius: 4px;
        box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
        padding: 0 16px;
        line-height: 1.8;
        display: flex;
        align-items: center;
        .message{
            padding: 7px 0;
        }
    }

    .close {
        padding-left: 16px;
        padding-right: 1px;
        flex-shrink: 0;
    }

    .line {
        border-left: 1px solid #666;
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 14px;
    }
</style>