<template>
    <div class="popover" ref="popover">
        <div class="content-wrapper" ref="contentWrapper" v-if="visible" :class="{[`position-${position}`]:true}">
            <slot name="content" :close="close"></slot>
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
            },
            trigger:{
                type:String,
                default:'click',
                validator(value) {
                    return ['click', 'hover'].indexOf(value) >= 0
                }
            }
        },
        data() {
            return {
                visible: false,
            }
        },
        mounted(){
            if(this.trigger === 'click'){
                this.$refs.popover.addEventListener('click',this.openAndClose)
            }else {
                this.$refs.popover.addEventListener('mouseenter',this.opens)
                this.$refs.popover.addEventListener('mouseleave',this.close)
            }
        },
        destroyed(){
            if(this.trigger === 'click'){
                this.$refs.popover.removeEventListener('click',this.openAndClose)
            }else {
                this.$refs.popover.removeEventListener('mouseenter',this.opens)
                this.$refs.popover.removeEventListener('mouseleave',this.close)
            }
        },
        methods: {
            positionContent() {
                const {contentWrapper, triggerWrapper} = this.$refs
                document.body.appendChild(contentWrapper)
                const {width, height, top, left} = triggerWrapper.getBoundingClientRect()
                const {height: height2} = contentWrapper.getBoundingClientRect()
                let positions = {
                    top: {top: top + scrollY, left: left + scrollX},
                    bottom: {top: top + scrollY + height, left: left + scrollX},
                    left: {top: top + scrollY + (height - height2) / 2, left: left + scrollX},
                    right: {top: top + scrollY + (height - height2) / 2, left: left + scrollX + width}
                }
                contentWrapper.style.left = positions[this.position].left + 'px'
                contentWrapper.style.top = positions[this.position].top + 'px'
            },
            eventHandler(e2) {
                if (this.$refs.popover && (this.$refs.popover === e2.target || this.$refs.popover.contains(e2.target))) {
                    return;
                }
                if (this.$refs.contentWrapper && (this.$refs.contentWrapper === e2.target || this.$refs.contentWrapper.contains(e2.target))) {
                    return
                }
                this.close()
            },
            opens() {
                this.visible = true
                this.$nextTick(() => {
                    this.positionContent()
                    document.addEventListener('click', this.eventHandler)
                })
            },
            close() {
                this.visible = false
                document.removeEventListener('click', this.eventHandler)
            },
            openAndClose(e) {
                if (this.$refs.triggerWrapper.contains(e.target)) {
                    if (this.visible === true) {
                        this.close()
                    } else {
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
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
        background: white;
        max-width: 25em;
        padding: 0.5em 1em;
        word-break: break-all;
        font-size: 16px;
        &::before, &::after {
            position: absolute;
            content: '';
            display: block;
            border: 10px solid transparent;
            width: 0;
            height: 0;
        }
        &.position-top {
            transform: translateY(-100%);
            margin-top: -13px;
            &::before {
                top: 100%;
                border-bottom: none;
            }
            &::after {
                top: calc(100% - 1px);
                border-top-color: white;
                border-bottom: none;
            }
        }
        &.position-bottom {
            margin-top: 13px;
            &::before {
                bottom: 100%;
                border-top: none;
            }
            &::after {
                bottom: calc(100% - 1px);
                border-bottom-color: white;
                border-top: none;
            }
        }
        &.position-left {
            transform: translateX(-100%);
            margin-left: -13px;
            &::before, &::after {
                top: 50%;
                transform: translateY(-50%);
                border-right: none;
            }
            &::before {
                left: 100%;
            }
            &::after {
                left: calc(100% - 1px);
                border-left-color: white;
            }
        }
        &.position-right {
            margin-left: 13px;
            &::before, &::after {
                top: 50%;
                transform: translateY(-50%);
                border-left: none;
            }
            &::before {
                right: 100%;
            }
            &::after {
                right: calc(100% - 1px);
                border-right-color: white;
            }
        }
    }
</style>
