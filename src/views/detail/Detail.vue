<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" ref="detailNav" @titleClick="titleClick"/>
        <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
            <detail-swiper :top-images="topImages"/>
            <detail-base-info :goods="goods"/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <detail-param-info ref="params" :param-info="paramInfo"/>
            <detail-comment-info ref="comments" :comment-info="commentInfo"/>
            <goods-list class="detail-goodslist" ref="recommends" :goods="recommends"/>
        </scroll>
        <detail-bottom-bar @addToCart="addToCart"/>
        <back-top @click.native="backTop" v-show="isShowBackTop"/>
        <!-- <toast :message="message"  :is-show="show"/> -->
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import {itemListenerMixin, backTopMixin} from 'common/mixin'


import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
export default {
    name: "Detail",
    components: {
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        GoodsParam,
        Scroll,
        GoodsList
    },
    data(){
        return{
            iid: null,
            topImages: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends: [],
            themeTopYs: [],
            currentIndex: 0,
            // message: '',
            // show: false
        }
    },
    created(){
        // 1.保存传入的iid
        this.iid = this.$route.query.iid;

        // 2.根据iid请求详情数据
        getDetail(this.iid).then(res => {
            // 1.获取详情页顶部的图片轮播数据
           // console.log(res);
            const data = res.result;
            this.topImages = data.itemInfo.topImages;

            // 2.获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

            // 3.获取店铺信息
            this.shop = new Shop(data.shopInfo);

            // 4.获取商品详细信息
            this.detailInfo = data.detailInfo;

            // 5.获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

            // 6.获取商品评价信息
            if(data.rate.cRate !== 0){
                this.commentInfo = data.rate.list[0];
            }
        })

        // 3.商品推荐信息
        getRecommend().then(res => {
            this.recommends = res.data.list
        })
        
    },
    mixins: [itemListenerMixin, backTopMixin],
    mounted(){
        
    },
    destroyed(){
        // 2.取消监听
        this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
        imageLoad(){
            this.$refs.scroll.refresh();

            this.themeTopYs = []
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
            //console.log(this.themeTopYs)
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 0)
        },
        contentScroll(position){
            const positionY = -position.y
            //console.log(positionY)
            let length = this.themeTopYs.length
            for(let i=0; i<length; i++){
                if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && 
                    positionY < this.themeTopYs[i+1]) || (i === length - 1 && 
                    positionY >= this.themeTopYs[i]))){
                        this.currentIndex = i;
                        this.$refs.detailNav.currentIndex = this.currentIndex
                }
            }

            // 回到顶部
            this.isShowBackTop = -(position.y) > 1000;
        },
        addToCart(){
            // 1.获取加入购物车所需要得信息
            const product = {};
            product.image = this.topImages[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid;

            this.$store.dispatch('addCart',product).then( res => {
                //console.log(res)
                // this.show = true;
                // this.message = res
                // setTimeout(() => {
                //     this.show = false;
                //     this.message = ''
                // },2000)
                this.$toast.show(res, 2000)

            })
        }
    }
}
</script>

<style scoped>
#detail{
    position: relative;
    z-index: 1000;
    background-color: #fff;
    height: 100vh;
}
.detail-nav{
    position: relative;
    z-index: 999;
    background-color: #fff;
}
.content{
    /* height: calc(100% - 44px); */
    position: absolute;
    top: 44px;
    bottom: 60px;
    right: 0;
    left: 0;
    overflow: hidden;
}
.detail-goodslist{
    padding-top: 5px;
}
</style>