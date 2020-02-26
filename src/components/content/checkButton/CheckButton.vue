<template>
    <div class="check-button">
        <div class="icon-selector" :class="{checked: isChecked}">
            <img src="~assets/img/cart/tick.svg" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: "CheckButton",
    props: {
        isChecked: {
            type: Boolean,
            default: false
        }
    },
   
}
</script>

<style scoped>
.icon-selector {
    position: relative;
    margin: 0 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }
.icon-selector img{
    width: 14px;
    height: 14px;
    border-radius: 50%;
}
  .checked {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>