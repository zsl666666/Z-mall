<template>
    <div class="wrapper" ref="wrapper">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: "Scroll",
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            scroll : null
        }
    },
    mounted(){
        // 1.创建BScroll对象
         this.scroll = new BScroll(this.$refs.wrapper,{
            probeType: this.probeType,
            click: true,
            pullUpLoad: this.pullUpLoad
        })
        // 监听滚动位置
        this.scroll.on('scroll', (position) => {
            // console.log(position)
            this.$emit('scroll',position)
        })
        // 监听上拉加载
        this.scroll.on('pullingUp',() => {
            this.$emit('pullingUp')
        })
    },
    methods: {
        // 返回顶部函数
        scrollTo(x, y, time=400){
            this.scroll && this.scroll.scrollTo(x, y, time)
        },
        // 完成上拉加载，下次重复函数
        finishPullUp(){
           this.scroll && this.scroll.finishPullUp();
        },
        // 图片加载完刷新
        refresh(){
            this.scroll && this.scroll.refresh();
        },
        // 记录Y的值
        getScrollY(){
            return this.scroll ? this.scroll.y : 0
        }
    }

}
</script>

<style scoped>

</style>