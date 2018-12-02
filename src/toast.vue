<template>
    <div class="wrapper" :class="toastPosition">
        <div class="toast" ref="toast">
            <div class="message">
                <slot></slot>
            </div>
            <div class="line" ref="line"></div>
            <span v-if="closeButton" class="close" @click="onClickClose">
                {{closeButton.text}}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'guluToast',
        props: {
            autoClose: {
                type: Number,
                default:3,
                validator(value) {
                     return typeof value === 'number';
                }
            },
            closeButton: {
                type: Object,
                default() {
                    return {
                        text: '关闭', callback: undefined
                    }
                }
            },
            position: {
                type: String,
                default: 'top',
                validator(value) {
                    return ['top', 'middle', 'bottom'].indexOf(value) >= 0
                }
            }
        },
        mounted() {
            this.autoCloses()
            this.autoLineHeight()
        },
        computed: {
            toastPosition() {
                return {
                    [`position-${this.position}`]: true
                }
            }
        },
        methods: {
            close() {
                this.$el.remove()
                this.$emit('close')
                this.$destroy()
            },
            autoCloses() {
                if (this.autoClose) {
                    setTimeout(() => {
                        this.close()
                    }, this.autoClose * 1000)
                }
            },
            onClickClose() {
                this.close()
                this.closeButton.callback()
            },
            autoLineHeight() {
                this.$nextTick(() => {
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
    $animation-time:300ms;
    @keyframes slide-down {
        0% {
            transform: translateY(-100%)
        }
        100% {
            transform: translateY(0%)
        }
    }

    @keyframes slide-up {
        0% {
            transform: translateY(100%)
        }
        100% {
            transform: translateY(0%)
        }
    }

    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .wrapper {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        &.position-top {
            .toast {
                border-top-left-radius: 0;
                border-top-right-radius: 0;
                animation: slide-down $animation-time;
            }
            top: 0;
        }
        &.position-bottom {
            bottom: 0;
            .toast {
                border-bottom-left-radius: 0;
                border-bottom-right-radius: 0;
                animation: slide-up $animation-time;
            }
        }
        &.position-middle {
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            .toast{
                animation: fade-in $animation-time;
            }
        }
    }
        .toast {
            font-size: $font-size;
            min-height: $toast-min-height;
            color: white;
            background: $toast-bg;
            border-radius: 4px;
            box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
            padding: 0 16px;
            line-height: 1.8;
            display: flex;
            align-items: center;
            .message {
                padding: 7px 0;
            }
        }
        .close {
            padding-left: 16px;
            padding-right: 1px;
            flex-shrink: 0;
            cursor: pointer;
        }

        .line {
            border-left: 1px solid #666;
            height: 100%;
            display: flex;
            align-items: center;
            margin-left: 14px;
        }
</style>