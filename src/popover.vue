<template>
    <div class="popover" @click="openAndClose">
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
        props:{
            position:{
                type:String,
                default:'top',
                validator(value){
                    return ['top','bottom','left','right'].indexOf(value) >= 0
                }
            }
        },
        data(){
            return{
                visible:false
            }
        },
        methods:{
            openAndClose(e){
                if(this.$refs.triggerWrapper.contains(e.target)){
                    console.log(e.target);
                    this.visible = !this.visible
                    if (this.visible){
                        this.$nextTick(()=>{
                            document.body.appendChild(this.$refs.contentWrapper)
                            let {width,height,top,left} = this.$refs.triggerWrapper.getBoundingClientRect()
                            this.$refs.contentWrapper.style.left = left + 'px'
                            this.$refs.contentWrapper.style.top = top + 'px'
                            let eventHandler = (e2)=>{
                                if(this.$refs.contentWrapper.contains(e2.target)){

                                }else{
                                    this.visible = false
                                    document.removeEventListener('click',eventHandler)
                                }
                            }
                            document.addEventListener('click',eventHandler)
                        })

                    }
                }else {
                    console.log('11');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    /*.popover{*/
        /*position: absolute;*/
        /*> .content-wrapper{*/
        /*}*/
        /*> .button{*/
            /*position: relative;*/
        /*}*/
    /*}*/
</style>
