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
    popover {
        position: absolute;
        .content-wrapper {
            position: relative;
            max-width: 20em;
        }
        .button {

        }
    }
</style>
