<template>
    <div class="wrap">

        <div class="prize_con">
            <p class="prize_grade"><span>
                <!--{{name}}-->
                欣旺达20周年年会抽奖
            </span></p>

            <p class="prize_grade1" v-show="mableData.length<=0">
                狗年大吉 欣旺发达
            </p>
            <p class="prize_grade1"v-show="mableData.length>0">
                <span>{{ranking}}</span>
                <span v-if="shu==''"></span>
                <span v-if="bgtop==true">第{{shu+1}}次</span>
                <span v-else>第{{shu}}次</span>
                <span v-if="award==''"></span>
                <span v-else style="margin-left:150px">奖金：￥{{award}}</span>
            </p>
            <div class="prize_list vetically">
                <img :src="bgs" v-show="bgtop"/>
                <ul v-show="!bgtop">
                    <!--<li v-for="item in showData">{{item}}</li>-->
                </ul>
            </div>

            <p  class="start" @click="start" v-if="starttrue==true"><img :src="kaishi" alt=""></p>

            <p  class="start" @click="stop" v-else><img :src="jieshu" alt=""></p>
        </div>
    </div>
</template>
<script>
    import kaishi from 'src/assets/prize_start.jpg'
    import jieshu from 'src/assets/prize_stop.jpg'
    import bgs from 'src/assets/time22.png'

    export default{
        data:function () {
            return{
                kaishi:kaishi,
                jieshu:jieshu,
                bgs:bgs,
                bgtop:true,
                littt:[],//总人员名单
                mableData:[],//获奖人员名单
                starttrue:true,//开始按键显示
                showData:[],//显示的数字
                litt:[],
                e:0,
                shu:"",
                myNum:"",
                popt:"",
                li:"",
                arr : [],
                name:'',
                award:"",
                changdu:"ss",
                ranking:"",
                ttt:0,
                flag:1,
                awsd:"",
                ttg:"",
            }
        },
        mounted:function () {
            this.getData2();
            this.getData();
            this.control();
        },
        watch: {
            awsd:function (val, oldVal) {
                console.log("之前"+oldVal);
                console.log("之后"+val);
                this.shu = 1;

            },
        },
        methods: {
//     获取中奖人员名单
            getData: function () {
                let vm = this;
                $.ajax({
                    type: "get",
//                    url: "http://appinter.sunwoda.com/active/findSomePay.json",
                    url: "http://172.30.128.37:8090/swdAPP/active/findSomePay.json",
                    data: {token: vm.token, createName: window.localStorage.getItem("data")},
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if (data.dataInfo) {
                            if (data.dataInfo.listData.length > 0) {
                                vm.mableData = data.dataInfo.listData;
                                vm.ranking=data.dataInfo.listData[0].festive[0].awardRanking;
                                vm.shu = 0 ;
                                vm.e=0;
                                vm.bgtop=true;
                                console.log(vm.shu);
                                vm.name = data.extData;
                            } else {
                                vm.mableData = [];
                                vm.bgtop=true;
                                vm.$message("无抽奖活动");
                            }
                        } else {
                            vm.$message("无抽奖活动");
                        }
                    },
                    error: function (da) {
                        console.log(da);
                    }
                });
            },
//     获取全部人员名单
            getData2: function () {
                let vm = this;
                $.ajax({
                    type: "post",
                    url: "http://appinter.sunwoda.com/active/findActiveAllUser.json",
                    data: {token: vm.token, name: window.localStorage.getItem("data")},
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if (data.dataInfo) {
                            for (var i = 0; i < data.dataInfo.listData.length; i++) {
                                vm.littt.push(data.dataInfo.listData[i].userName + data.dataInfo.listData[i].userNum)
                            }
                        } else {
                            vm.$message("无抽奖活动");
                        }
                    },
                    error: function (da) {
                        console.log(da);
                    }
                });
            },

            start: function () {
                var vm = this;
                 if(vm.e>=vm.mableData.length){
                     this.fasong();
                     return 0;
                 }
                if(this.starttrue==false){
                    return 0;
                }
                this.starttrue = false;
                this.bgtop = false;
                vm.dianji();
                console.log(vm.e);
                console.log(vm.litt.length);
                vm.myNum = setInterval(function () {vm.showRandomNum(vm.littt.length, vm.litt.length, vm.littt)}, 10)

            },
            stop: function () {
                var vm =this;
                if(this.starttrue ==true){
                    return 0;
                }

                this.starttrue = true;
                clearInterval(vm.myNum);
                var aa = "";

                for (var i = 0; i < vm.litt.length; i++) {
                    aa += "<li>" + vm.litt[i] + "</li>"
                }

                $(".prize_list ul").html(aa);
                if(vm.litt.length==1){
                    $(".prize_list ul li").css({"font-size":"60px","width":"100%"})
                }
                if(vm.litt.length==2 || vm.litt.length==4){
                    $(".prize_list ul li").css({"font-size":"50px","width":"50%"})
                }
                if(vm.litt.length==3 || vm.litt.length==6 || vm.litt.length==9 || vm.litt.length==5){
                    $(".prize_list ul li").css({"font-size":"40px","width":"33%"})
                }

            },

            showRandomNum: function (n, b, a) {
                let vm = this;
                var li1 = "";
                for (var i = 0; i < n; i++) {
                    vm.arr[i] = i;
                }
                vm.arr.sort(function () {
                    return 0.5 - Math.random();
                });
                for (var i = 0; i < b; i++) {
                    var index = vm.arr[i];
                    li1 += '<li>' + a[index] + '</li>';
                }
                $(".prize_list ul").html(li1);
                if(vm.litt.length==1){
                    $(".prize_list ul li").css({"font-size":"60px","width":"100%"})
                }
                if(vm.litt.length==2 || vm.litt.length==4){
                    $(".prize_list ul li").css({"font-size":"50px","width":"50%"})
                }
                if(vm.litt.length==3 || vm.litt.length==6 || vm.litt.length==9 || vm.litt.length==5){
                    $(".prize_list ul li").css({"font-size":"40px","width":"33%"})
                }

            },
            chexiao:function () {
                var vm = this;
                 this.e--;
                clearInterval(vm.myNum);
                $(".prize_list ul").html("")
                this.bgtop=true;
                this.starttrue = true;
                this.shu--
            },
            dianji: function () {
                var vm = this;
                vm.litt = [];
                if (vm.e >= vm.mableData.length) {
                    vm.e++;
                    return 0
                }
                vm.shu++;
                vm.award = vm.mableData[vm.e].festive[0].amount;
                console.log(vm.award)
                for (var i = 0; i < vm.mableData[vm.e].festive.length; i++) {
                    vm.awsd = vm.mableData[vm.e].festive[i].awardRanking;
                    console.log(vm.awsd)
                    vm.ranking = vm.mableData[vm.e].festive[i].awardRanking;
                    vm.litt.push(vm.mableData[vm.e].festive[i].awardName + vm.mableData[vm.e].festive[i].awardNo)
                }
                console.log(vm.litt + vm.name)
                vm.e++;
            },

            fasong: function () {
                var vm = this;
                $.ajax({
                    type: "post",
                    url: "http://appinter.sunwoda.com/active/transfer.json",
                    data: {
                        token: vm.token,
                        activeName: vm.name,
                        awardName: vm.ranking,
                        user: window.localStorage.getItem("data"),
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                       if (data.statusCode == 0){
                           vm.getData()
                       }

                    },
                    error: function (da) {
                        console.log(da);
                    }
                });
            },
//空格键控制开始和停止
            control: function () {
                var vm = this;
                $(document).keydown(function (event) {
                    var e = event || window.event || arguments.callee.caller.arguments[0];
                    if (e && e.keyCode == 32) { // 空格键
                        vm.stop();
                    }
                    if (e && e.keyCode == 13) {
                        vm.start();
                    }
                    if (e && e.keyCode == 81 && e.ctrlKey) {
                        vm.chexiao();
                    }

                });
            }


        }
    }
</script>

<style>
    ::-webkit-scrollbar{
        display:none;  }
    *{margin:0;padding:0;}
    img{display:block;}
    i{font-style:normal;}
    .vetically{
        justify-content:center;
        display:-webkit-flex;
        align-items:center
    }
    .prize_con{position: absolute;
        width: 100%;
        height: 100%;
        justify-content: center;
        /*background: url(../../../static/img/firstp_bg.jpg) no-repeat left top / 100% 100%;*/
        background: url(../../../static/img/bg.png) no-repeat left top / 100% 100%;
        overflow: hidden;}
    .prize_grade{
        font-size:72px;
        color: #ffe9af;
        text-align: center;
        justify-content: center;
        font-family: 微软雅黑;
        margin-top: 20px;
        padding-top: 20px
    }
    .prize_grade1{
        font-size:60px;
        color: #ffe9af;
        text-align: center;
        justify-content: center;
        font-family: 宋体;
    }
    .prize_list{
        height:55%;
        overflow: hidden;
        display: flex;
        justify-content: center;
    }
    .prize_list ul{
        height:85%;
        font-size:0;
        display: flex;
        flex-wrap: wrap-reverse;
        justify-content: center;
        align-items: center;
        width: 90%
    }
    .prize_list li{
        height:auto;
        font-size:32px;
        color:#f1bf90;
        text-align: center;
        width:25%;
        line-height:60px;
        font-family:Arial;
        display: inline;
    }
    .start{
        width: 250px;
        height: 80px;
        margin:0 auto;
        cursor:pointer;
    }
    .prize_set{
        position: absolute;
        right: 60px;
        bottom:140px;
        font-size: 16px;
        color: #f7f3e8;
        line-height: 30px;
    }
    .prize_set li{
        display: inline-block;
        margin-left: 20px;
    }
    .set_grade select,.set_people input, .set_money input{
        background: #fff;
        width:110px;
        height:36px;
        border:1px solid #8f0000;
        margin-left: .1rem;
        color: #000;
        padding-left:10px;
    }
</style>
