import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'

// 1.监听首页、详情页图片加载
export const itemListenerMixin = {
    data(){
        return {
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted(){
        // 监听GoodsListLoad中图片加载完成
        this.newRefresh = debounce(this.$refs.scroll.refresh,500);
        this.itemImgListener = () => {
            this.newRefresh(); 
        }
        this.$bus.$on('itemImageLoad',this.itemImgListener)
    }
}

// 2.回到顶部
export const backTopMixin = {
    data(){
        return {
            isShowBackTop: false
        }
    },
    components: {
        BackTop
    },
    methods:{
        // 返回顶部
        backTop(){
            this.$refs.scroll.scrollTo(0, 0);
        },
    }

}