<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<style>

    @import "../static/css/main.css";
    @import "../static/css/color-dark.css";     /*深色主题*/
    /*@import "../static/css/theme-green/color-green.css";   浅绿色主题*/


</style>
<script>
    export default {
        data () {
            return {
                transitionName: 'slide-left'
            }
        },
        mounted () {
//            window.onunload = function(){
//                alert("AAAAAaa");
//                window.localStorage.removeItem("data");
//            }
        },
        //监听路由的路径，可以通过不同的路径去选择不同的切换效果
        watch: {
            '$route' (to, from) {
                if(!window.localStorage.getItem("data")){
                    this.$router.replace({ path: "/login"});
                }

            }

        }
    }
</script>
