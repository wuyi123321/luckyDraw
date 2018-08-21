import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'   // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import $ from 'jquery'
import  Velocity from 'velocity-animate'
Vue.use(ElementUI);

console.log(Velocity);
Vue.prototype.$axios = axios;
Vue.prototype.token="6f4bbfad206bbac3dce4d443fca2d81e";
// Vue.prototype.hrefLoction="http://appinter.sunwoda.com/active/";
Vue.prototype.hrefLoction="http://172.30.128.32:8083/swdAPP/active/";

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
