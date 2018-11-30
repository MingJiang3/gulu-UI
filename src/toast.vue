<template>
    <div class="toast">
        <slot></slot>
        <div class="line">
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
            aotuClose: {
                type: Boolean,
                default: true
            },
            closeDelay: {
                type: Number,
                default: 30000
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

        },
        mounted() {
            if (this.aotuClose) {
                setTimeout(() => {
                    this.close()
                }, this.closeDelay * 1000)
            }
        },
        created(){
            console.log(this.closeButton);
        },
        methods: {
            close() {
                this.$el.remove()
                this.$destroy()
            },
            onClickClose(){
                this.close()
                this.closeButton.callback()
            }
        }
    }
</script>

<style lang="scss" scoped>
    $font-size: 14px;
    $toast-height: 40px;
    $toast-bg: rgba(0, 0, 0, 0.75);
    .toast {
        font-size: $font-size;
        height: $toast-height;
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
    }
    .close{
        padding-left: 16px;
    }
    .line{
        border-left: 1px solid #666;
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: 14px;
    }
</style>