<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">喜购</div></nav-bar>
        <tab-control class="tab-control" 
                     :titles="['流行','新款','精选']"
                     @tabClick="tabClick"
                     ref="tabControl1"
                     v-show="isTabFixed"
                         />
        <scroll class="content" ref="scroll" 
                :probe-type="3" 
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore"
                >
            <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
            <home-recommend-view :recommends="recommends"/>
            <feature-view/>
            <tab-control :titles="['流行','新款','精选']"
                         @tabClick="tabClick"
                         ref="tabControl2"/>
            <goods-list :goods="showGoods"/>
        </scroll>

        <back-top @click.native="backTop" v-show="isShowBackTop"/>
    </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import FeatureView from './childComps/FeatureView'


import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import {getHomeMultidata,getHomeGoods} from "network/home"
import {debounce} from 'common/utils'
import {itemListenerMixin,backTopMixin} from 'common/mixin'

export default {
    name: "Home",
    components: {
        HomeSwiper,
        HomeRecommendView,
        FeatureView,

        NavBar,
        TabControl,
        GoodsList,
        Scroll
    },
    data(){
        return {
            banners: [],
            recommends: [],
            goods: {
                'pop': { page:0, list:[] },
                'new': { page:0, list:[] },
                'sell': {page:0, list:[] }
            },
            currentType: 'pop',
            isTabFixed: false,
            tabControlOffsetTop: 0,
            saveY: 0,
        }
    },
    created(){
        // 1.请求多个数据
        this.getHomeMultidata();

        // 2.请求首页流行，新款，精选数据
        this.getHomeGoods('pop');
        this.getHomeGoods('new');
        this.getHomeGoods('sell');

    },
    mixins: [itemListenerMixin, backTopMixin],
    mounted(){
      
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    activated(){
        this.$refs.scroll.refresh(); //回到位置后刷新一次防止产生位置失调
        this.$refs.scroll.scrollTo(0, this.saveY,0);  //进来时回到上次离开时的位置（saveY）
         
    },
    deactivated(){
        // 1.记录Y的值
        this.saveY = this.$refs.scroll.getScrollY(); //离开时记录当前离开时的y的值赋值给saveY
    
        // 2.取消监听
        this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
        /**
         * 事件监听的方法
         */
        tabClick(index){
            switch(index){
                case 0:
                    this.currentType = 'pop';
                    break;
                case 1:
                    this.currentType = 'new';
                    break;
                case 2:
                    this.currentType = 'sell';
                    break;
            }
            //将tabControl1与tabControl2联系起来，两者保持同步
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },
        
        // 判断返回顶部小图标是否显示
        contentScroll(position){
            this.isShowBackTop = -(position.y) > 1000;
            this.isTabFixed = -(position.y) > this.tabControlOffsetTop;
        },
        // 上拉加载更多
        loadMore(){
            this.getHomeGoods(this.currentType);
            this.$refs.scroll.refresh(); //但请求到的图片加载完后重新刷新计算可滚高度
        },
        // 监听tabControl的offsetTop
        swiperImageLoad(){
            this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop; //// 所有的组件都有$el 属性，用于获取组件中的元素
        },
         



        /**
         * 网络请求数据的方法
         */
        // 1.请求多个数据
        getHomeMultidata(){
            getHomeMultidata().then(res => {
                //console.log(res);
                this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })
        },
        // 2.请求首页流行，新款，精选数据
        getHomeGoods(type){
            const page = this.goods[type].page + 1;
            getHomeGoods(type,page).then(res =>{
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page += 1;

                //完成上拉加载更多
                this.$refs.scroll.finishPullUp();
            })
        }
    }
}
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav{
    background-color: var(--color-tint);
    color: #fff;
}
.tab-control{
   position: relative;
   z-index: 999;
   background-color: #fff;
}
.content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
    overflow: hidden;
}
</style>