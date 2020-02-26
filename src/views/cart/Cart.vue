<template>
    <div id="cart">
        <nav-bar class="cart-nav"><div slot="center">购物车({{cartLength}})</div></nav-bar>
         <scroll class="content" ref="scroll">
                 <cart-list/> 
        </scroll>
        <cart-bottom-bar class="cart-bottom-bar"/>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
    name: "Cart",
    data(){
        return {

        }
    },
    components:{
        NavBar,
        CartList,
        Scroll,
        CartBottomBar
    },
    computed:{
        ...mapGetters(['cartLength'])
    },
    activated(){
        this.$refs.scroll.refresh();
    }
}
</script>

<style scoped>
#cart{
    height: 100vh;
    z-index: 1000;
    background-color: #f5f5f5;
}
.cart-nav{
    background-color: var(--color-tint);
    color: #fff;
}
.content{
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
    overflow: hidden;
    padding: 0 10px;
    
}
.cart-bottom-bar{
    position: fixed;
    display: flex;
    z-index: 1000;
    bottom: 49px;
    width: 100%;
    align-items: center;
    background-color: #fff;
    border-top: 1px solid #f5f5f5;
}
</style>