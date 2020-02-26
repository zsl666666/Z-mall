<template>
    <div class="cart-item">
        <cart-list-item v-for="item in cartList" :cart-item="item"/>
    </div>
</template>

<script>
import CartListItem from './CartListItem'
import { mapGetters } from 'vuex'

export default {
    name: "CartList",
    components: {
        CartListItem
    },
    computed: {
        ...mapGetters(['cartList'])
    }

}
</script>

<style scoped>
.cart-item{
    padding:1px 0 1px 0;
} 
</style>