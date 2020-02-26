<template>
    <nav-bar>
        <div slot="left" class="back" @click="backClick">
            <img src="~assets/img/common/back.svg" alt="">
        </div>
        <div slot="center" class="title">
            <div v-for="(item, index) in title"
                 class="title-item"
                 :class="{active: currentIndex === index}"
                 @click="titleClick(index)"
                 >{{item}}</div>
        </div>
    </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    name: "DetailNavBar",
    components: {
        NavBar
    },
    data(){
        return {
            title: ['商品', '参数', '评论', '推荐'],
            currentIndex: 0
        }
    },
    methods: {
        titleClick(index){
            this.currentIndex = index;
            this.$emit('titleClick', index)
        },
        backClick(){
            // this.$router.back()
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.title{
    display: flex;
   
    
    
}
.title-item{
    flex: 1;
}
.back img{
    margin-top: 11px;
}
.active{
    color: var(--color-tint);
}
</style>