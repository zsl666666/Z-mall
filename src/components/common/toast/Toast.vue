<template>
    <div class="toast" v-show="isShow">
        <span>{{message}}</span>
    </div>
</template>

<script>
export default {
    name: "Toast",
    // props: {
    //     message: {
    //         type:String,
    //         default: ''
    //     },
    //     isShow: {
    //         type: Boolean,
    //         default: false
    //     }
    // },
    data(){
        return {
            message: '',
            isShow: false
        }
    },
    methods: {
        show(message='暂无要Toast', duration=2000){
            this.isShow = true;
            this.message = message 
            setTimeout( () => {
                this.isShow = false;
                this.message = ''
            },duration)
        }
    }
}
</script>
 
<style scoped>
.toast{
    
    position: fixed;
    padding: 10px 15px;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 50%;
    color: #fff;
    background-color:rgba(0,0,0,.7);
    border-radius: 20px;
    z-index: 9999;
}
</style>