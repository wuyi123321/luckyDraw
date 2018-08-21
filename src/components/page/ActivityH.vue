<template>
    <div class="wrap">

        <div class="prize_con">
            <p class="prize_grade"><span>
                <!--{{name}}-->
               {{activName}}
            </span></p>

            <!--<p class="prize_grade1" v-show="bgtop">-->
                <!--狗年大吉 兴旺发达-->
            <!--</p>-->

            <p class="prize_grade1"v-show="!bgtop">
                <span>{{extData.awardId}}</span>
                <span v-if="extData.awardCount==''"></span>
                <span v-else><span style="margin-left: 20px;margin-right: 20px">第{{extData.awardCount}}次</span>  <span>共{{extData.awardMount}}次</span></span>
                <span style="margin-left:150px">奖金：￥{{extData.amount}}</span>
            </p>
            <div class="prize_list vetically">
                <img :src="bgs" v-show="bgtop"/>
                <ul v-show="!bgtop">
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
                activName:"",
                kaishi:kaishi,
                jieshu:jieshu,
                bgs:bgs,
                bgtop:true,
                littt:[],//总人员名单
                mableData:{},//获奖人员信息
                starttrue:true,//开始按键显示
                showData:[ ],//显示的数字
                extData:{},
                arr:[],
                myNum:""
            }
        },
        mounted:function () {
            this.getData2();
            this.control();
            this.getActive();
            console.log("aaaaaaaaaaaaaa");
        },
        watch: {

        },
        methods: {
//     获取中奖人员名单
            getData: function () {
                let vm = this;
                $.ajax({
                    type: "get",
                    url: vm.hrefLoction+"findSomePay.json?createName="+window.localStorage.getItem("data"),
                    data: {},
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if (data.extData) {
                            vm.extData = data.extData;
                            vm.starttrue = false;
                            vm.bgtop = false;
                            if(vm.extData.persionCount){
                                vm.myNum = setInterval(function () {vm.showRandomNum(vm.littt.length, vm.extData.persionCount, vm.littt)}, 10)
                            }

                        } else {
                            vm.bgtop = true;
                            clearInterval(vm.myNum);
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
                    url: vm.hrefLoction+"findActiveAllUser.json",
                    data: {token: vm.token, name: window.localStorage.getItem("data")},
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if (data.dataInfo) {
                            for (var i = 0; i < data.dataInfo.listData.length; i++) {
                                vm.littt.push(data.dataInfo.listData[i].userName+data.dataInfo.listData[i].userNum)
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
            getpersonMess: function () {
                let vm = this;
                $.ajax({
                    type: "get",
//                    url: "http://appinter.sunwoda.com/active/findSomePay.json",
                    url: vm.hrefLoction+"findSomePayOne.json",
                    data: {
                        awardAmount:vm.extData.awardCount,
                        awardId:vm.extData.awardName,
                       pici:vm.extData.persionCount,
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                            vm.starttrue = true;
                            vm.showData = data.dataInfo.listData;
                            clearInterval(vm.myNum);
                            var aa = "";
                        $(".prize_list ul").html("");
                            for (var i = 0; i < vm.extData.persionCount; i++) {
                                aa += "<li>" + data.dataInfo.listData[i].user_name +" "+  data.dataInfo.listData[i].user_num+ "</li>"
                            }

                            $(".prize_list ul").html(aa);
                            if(vm.showData.length==1){
                                $(".prize_list ul li").css({"font-size":"60px","width":"100%"})
                            }
                            if(vm.showData.length==2 || vm.showData.length==4){
                                $(".prize_list ul li").css({"font-size":"50px","width":"50%"})
                            }
                            if(vm.showData.length==3 || vm.showData.length==6 || vm.showData.length==9 || vm.showData.length==5){
                                $(".prize_list ul li").css({"font-size":"40px","width":"33%"})
                            }




                    },
                    error: function (da) {
                        console.log(da);
                    }
                });
            },
            getActive:function () {
                let vm = this;
                $.ajax({
                    type:"post",
                    url:vm.hrefLoction+"findAllActive.json",
                    data:{createPersion:window.localStorage.getItem("data")},
                    dataType:"json",
                    success:function (data) {
                        console.log(data);
                        if(data.dataInfo){
                            vm.activName = data.dataInfo.listData[0].activeName
                        }else {
                            vm.$message("无活动")
                        }

                    },

                    error:function (da) {
                        console.log(da);
                    }

                });
            },

            start: function () {
                var vm = this;

                console.log(vm.extData);
                if(this.starttrue==false){
                    return 0;
                }
                vm.getData();


            },
            stop: function () {
                var vm =this;
                if(this.starttrue ==true){
                    return 0;
                }
                vm.getpersonMess();
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
                console.log("aaaaaaaaa");
                $(".prize_list ul").html(li1);
                if(vm.extData.persionCount==1){
                    $(".prize_list ul li").css({"font-size":"60px","width":"100%"})
                }
                if(vm.extData.persionCount==2 || vm.extData.persionCount==4){
                    $(".prize_list ul li").css({"font-size":"50px","width":"50%"})
                }
                if(vm.extData.persionCount==3 || vm.extData.persionCount==6 || vm.extData.persionCount==9 || vm.extData.persionCount==5){
                    $(".prize_list ul li").css({"font-size":"40px","width":"33%"})
                }

            },
            chexiao:function () {
                var vm = this;
                clearInterval(vm.myNum);
                $(".prize_list ul").html("")
                this.bgtop=true;
                this.starttrue = true;
                console.log("--------------------------")
                console.log(vm.extData.awardCount);
                console.log("--------------------------")
                $.ajax({
                    type: "get",
//                    url: "http://appinter.sunwoda.com/active/findSomePay.json",
                    url: vm.hrefLoction+"removeStatus.json",

                    data: {
                        awardAmount:vm.extData.awardCount,
                        awardId:vm.extData.awardName
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);

                    },
                    error: function (da) {
                        console.log(da);
                    }
                });

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
                        if(vm.starttrue == true){   //如果暂停之后要回复  弹出确认框
                            vm.$confirm('此操作将取消这次抽奖结果, 是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                vm.chexiao();
                            }).catch(() => {
                                vm.$message({
                                    type: 'info',
                                    message: '已取消删除'
                                });
                            });

                        }else {
                            vm.chexiao();
                        }

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
