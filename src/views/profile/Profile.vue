<template>
    <div id="profile">
        <nav-bar class="nav-bar"><div slot="center">个人中心</div></nav-bar>
        <user-id class="user-id"/>
        <profile-list/>

        <!-- 没有单独封装需要传参太多 -->
        <div class="profile-item">
            <div class="profile-item-list">
                <p><span class="item-money">0.00</span></p>
                <p><span>余额</span></p>
            </div>
            <div class="profile-item-list">
                <p><span class="item-money">0</span></p>
                <p><span>收藏</span></p>
            </div>
            <div class="profile-item-list">
                <p><span class="item-money">0</span></p>
                <p><span>优惠券</span></p>
            </div>
            <div class="profile-item-list">
                <p><span class="item-money">0</span></p>
                <p><span>积分</span></p>
            </div>
        </div>

        <profile-info/>
        <!-- <profile-info :list-data="listTwo"/> -->
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import UserId from './childComps/UserId'
import ProfileList from './childComps/ProfileList'
import ProfileInfo from './childComps/ProfileInfo'

export default {
    name: "Profile",
    components: {
        NavBar,
        UserId,
        ProfileList,
        ProfileInfo
    }
}
</script>

<style scoped>
#profile{
    background-color: #f5f5f5;
}
.nav-bar{
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
}
.profile-item{
    display: flex;
}
.profile-item-list{
    flex: 1;
    text-align: center;
    font-size: 13px;
    background-color: #fff;
    padding: 15px 6px;
    margin-right: 1px;
}
.profile-item-list:last-of-type{
    margin-right: 0;
}
.profile-item-list p{
    line-height: 20px;
}
.item-money{
    font-size: 22px;
    color: #ff630c;
    font-weight: 700;
}
</style>