<template>
    <div class="popover" @click="openAndClose" ref="popover">
        <div class="content-wrapper" ref="contentWrapper" v-if="visible" :class="{[`position-${position}`]:true}">
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
        mounted(){
            // console.log(this.position);
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
                const contentStyle = this.$refs.contentWrapper.style
                let {height:height2} = this.$refs.contentWrapper.getBoundingClientRect()
                if (this.position === 'top'){
                    contentStyle.left = left + scrollX + 'px'
                    contentStyle.top = top + scrollY + 'px'
                }else if(this.position === 'bottom'){
                    contentStyle.left = left + scrollX + 'px'
                    contentStyle.top = top + scrollY + height + 'px'
                }else if(this.position === 'left'){
                    contentStyle.left = left + scrollX + 'px'
                    contentStyle.top = top + scrollY + (height-height2)/2 + 'px'
                }else if(this.position === 'right'){
                    contentStyle.left = left + scrollX + width + 'px'
                    contentStyle.top = top + scrollY + (height-height2)/2 + 'px'
                }
            },
            eventHandler(e2) {
                if (this.$refs.popover && (this.$refs.popover === e2.target || this.$refs.popover.contains(e2.target))) {return;}
                if (this.$refs.contentWrapper && (this.$refs.contentWrapper === e2.target || this.$refs.contentWrapper.contains(e2.target))){return}
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
        &.position-top{
            transform: translateY(-100%);
            margin-top: -13px;
            &::before {
                top: 100%;
            }
            &::after {
                top: calc(100% - 1px);
                border-top-color: white;
            }
        }
        &.position-bottom{
            margin-top: 13px;
            &::before {
                bottom: 100%;
            }
            &::after {
                bottom: calc(100% - 1px);
                border-bottom-color: white;
            }
        }
        &.position-left{
            transform: translateX(-100%);
            margin-left: -13px;
            &::before, &::after {
                top:50%;
                transform: translateY(-50%);
            }
            &::before {
                left: 100%;
            }
            &::after {
                left: calc(100% - 1px);
                border-left-color: white;
            }
        }
        &.position-right{
            margin-left: 13px;
            &::before, &::after {
                top:50%;
                transform: translateY(-50%);
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
