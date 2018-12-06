<template>
    <div class="popover" @click="openAndClose" ref="popover">
        <div class="content-wrapper" ref="contentWrapper" v-if="visible">
            <slot name="content"></slot>
        </div>
        <span class="button" ref="triggerWrapper">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "guluPopover",
        props: {
            position: {
                type: String,
                default: 'top',
                validator(value) {
                    return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
                }
            }
        },
        data() {
            return {
                visible: false
            }
        },
        methods: {
            positionContent() {
                document.body.appendChild(this.$refs.contentWrapper)
                let {width, height, top, left} = this.$refs.triggerWrapper.getBoundingClientRect()
                this.$refs.contentWrapper.style.left = left + 'px'
                this.$refs.contentWrapper.style.top = top + 'px'
            },
            eventHandler(e2){
                if (this.$refs.popover && (this.$refs.popover === e2.target || this.$refs.popover.contains(e2.target))) {
                    return;}
                this.close()
            },
            opens() {
                this.visible = true
                this.$nextTick(() => {
                    this.positionContent()
                    document.addEventListener('click', this.eventHandler)
                })
            },
            close(){
                this.visible = false
                document.removeEventListener('click', this.eventHandler)
            },
            openAndClose(e) {
                if (this.$refs.triggerWrapper.contains(e.target)) {
                    if (this.visible === true) {
                        this.close()
                    }else{
                        this.opens()
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .popover {
        display: inline-block;
        position: relative;

        .button {
            display: inline-block;
        }
    }
    .content-wrapper {
        position: absolute;
        border-radius: 4px;
        box-shadow: 0 0 3px rgba(0,0,0,0.5);
        max-width: 25em;
        transform: translateY(-100%);
        padding: 0.5em 1em;
        margin-top: -10px;
        word-break: break-all;
        &::before,&::after{
            position: absolute;
            content: '';
            display: block;
            border: 10px solid transparent;
            border-top-color: #c9c9c9;
            width: 0px;
            height: 0px;
        }
        &::before{
            top: 100%;
        }
        &::after{
            top: calc(100% - 1px);
            border-top-color: white;
        }
    }
</style>
