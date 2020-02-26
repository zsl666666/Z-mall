<template>
    <div class="cart-bar">
        <div class="checkAll" @click="checkClick">
            <check-button :is-checked="isSelectAll" class="check-all-button"/>
            <span>全选</span>
        </div>
        <div class="check-aut">
            合计:{{checkMoney}}
        </div>
        <div class="check-account">
            结算({{checkAccount}})
        </div>
            
    </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
import { mapGetters } from 'vuex'
export default {
    name: "CartBottomBar",
    components: {
        CheckButton
    },
    computed: {
        ...mapGetters(['cartList']),
        checkMoney(){
            return '￥' + this.cartList.filter( item => {
                return item.checked
            }).reduce((prePrice, item) => {
                return prePrice + item.price * item.count
            }, 0).toFixed(2)
        },
        checkAccount(){
            return  this.cartList.filter( item => {
                return item.checked
            }).length
        },
        isSelectAll(){
            if(this.cartList.length === 0) return false;
            return !this.cartList.find(item => {
               return !item.checked
            })
        }
    },
    methods: {
        checkClick(){
            if(this.isSelectAll){ //全部选中情况
                this.cartList.forEach(element => {
                    element.checked = false;
                })
            } else {
                this.cartList.forEach(element => {
                    element.checked = true;
                })
            }
        }
    }
}
</script>

<style scoped>
.cart-bar{
    height: 40px;
    background-color: #fff;
}
.checkAll{
    display: flex;
}
.check-all-button{
    padding: 0 5px 0 10px;
}
.check-aut{
    color: #ff630c;
    flex: 1;
    text-align: right;
    padding-right: 10px;
}
.check-account{
    background-color: #ff630c;
    width: 100px;
    height: 36px;
    margin-right: 10px;
    line-height: 36px;
    border-radius: 3rem;
    color: #fff;
    text-align: center;
}
</style>