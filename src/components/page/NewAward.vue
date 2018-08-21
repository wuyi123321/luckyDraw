<template>
    <div class="table" style="display: flex;flex-wrap: wrap">
        <div class="crumbs" style="width: 100%">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>新建奖项</el-breadcrumb-item>
            </el-breadcrumb>
            <p></p>
            <div style="display: flex;flex-wrap: wrap;margin-top: 10px">
                已有奖项： <span v-for="item in allawking" style="padding-right: 10px;">{{item.awardName}}:（<span style="color: #20a0ff">{{item.commentOne}}</span>）</span>
            </div>
                    <div>
                        <el-form ref="form" :model="form" label-width="80px" labelPosition="left" id="www" :rules="rules" style="display: flex;flex-wrap: wrap;width:60%;padding: 10px">
                            <el-form-item label="活动选择" prop="huoD" style="margin-top: 18px;width: 50%">
                                <el-select v-model="form.huoD" placeholder="请选择活动"  >
                                    <el-option  v-for="i in tableData"  :value="i.activeName" id="rer"></el-option>
                                </el-select>
                            </el-form-item >
                            <el-form-item label="奖项名称" style="margin-top: 18px;width: 50%" prop="region" >
                                <el-input v-model="form.region"   placeholder="请设置奖项 " style="width: 217px"  ></el-input>
                            </el-form-item>

                            <el-form-item label="奖项属性" style="margin-top: 18px;width: 50%" prop="shuX">
                                <el-select v-model="form.shuX" placeholder="请选择奖项属性" >
                                    <el-option value="一般奖项"></el-option>
                                    <el-option value="重置奖项"></el-option>
                                </el-select>
                            </el-form-item >

                            <el-form-item label="人数设置" style="margin-top: 18px;width: 50%" prop="name" >
                                <el-input v-model="form.name"     @focus="tixing" :placeholder="perNumber" type="number" style="width: 217px" ></el-input>
                            </el-form-item>
                            <el-form-item label="奖品属性" style="margin-top: 18px;width: 50%" prop="jiangP">
                                <el-select v-model="form.jiangP" placeholder="请选择奖品属性" @change="qingkong">
                                    <el-option value="物品"></el-option>
                                    <el-option value="奖金"></el-option>
                                </el-select>
                            </el-form-item >
                            <el-form-item label="奖品设置" style="margin-top: 18px;width: 50%" prop="desc" >
                                <el-input v-model="form.desc"  placeholder="请设置奖品" @change="changeJine"  @focus="xianzhi"  id="qwe" style="width: 217px"></el-input>
                            </el-form-item>
                            <el-form-item label="发放方式" style="margin-top: 18px;width: 50%" prop="rei">
                                <el-select v-model="form.rei" placeholder="请选择方式" @change="zaipangduan" >
                                    <el-option value="线上"></el-option>
                                    <el-option value="线下"></el-option>
                                </el-select>
                            </el-form-item >
                            <el-form-item label="次数设置" style="margin-top: 18px;width: 50%"  prop="cishu" >
                                <el-input v-model="form.cishu" :max="form.name"   type="number" placeholder="0" @blur="qqqq" style="width: 217px" ></el-input>
                            </el-form-item>
                            <el-form-item label="优先级" style="margin-top: 18px;width: 50%"  prop="youxian" >
                                <el-input v-model="form.youxian" :max="form.name"   type="number" placeholder="0"  ></el-input>
                            </el-form-item>
                            <!--<el-form-item label="发送时效" style="margin-top: 18px;width: 50%" prop="shixiao">-->
                                <!--<el-radio-group v-model="form.shixiao" @change="panduan">-->
                                    <!--<el-radio label="抽奖发送" ></el-radio>-->
                                    <!--<el-radio   label="立即发送" ></el-radio>-->
                                <!--</el-radio-group>-->
                            <!--</el-form-item>-->
                        </el-form>
                        <div style="margin-top: 18px;padding: 10px">
                            <el-button type="primary" @click="onSubmit('form')" >立即创建</el-button>
                            <el-button @click="chongzhi" >取消</el-button>
                        </div>
                    </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios';


    export default {

        data: function(){
            return {
                activeName:"first",
                bbb:1,
                aaa:0,
                biaozhi:0,
                tableData:[],
                active: 0,
                perNumber:"请选择人数",
                extData:0,
                qqq:0,
                allawking:[],
                form: {
                    jiangP:"奖金",
                    shuX:"一般奖项",
                    huoD:"",
                    name: '',
                    region: '即兴奖',
                    rei:"线下",
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    cishu:"",
                    desc:"",
//                    shixiao:"抽奖发送",
                    youxian:""

                },
                rules:{
                    huoD:[{required :true,message: '请选择活动名称', trigger: 'change'}],
                    region:[{required : true,message: '请设置奖项', trigger: 'blur'}],
                    shuX:[{required : true,message: '请选择奖项属性', trigger: 'change'}],
                    jiangP:[{required : true,message: '请选择奖品属性', trigger: 'change'}],
                    name:[{required : true,message: '请设置人数', trigger: 'blur'}],
                    desc:[{required : true,message: '请设置奖品', trigger: 'blur'}],
                    cishu:[{required : true,message: '请设置次数', trigger: 'blur'}],
                    rei:[{required : true,message: '请选择发放方式', trigger: 'change'}],
//                    shixiao:[{required : true,message: '请选择发送时效', }],
                    youxian:[{required : true,message: '请设置优先级', trigger: 'blur'}],
                }
            }
        },

        created(){
        },
        mounted(){
            this.getData();
            this.getawkingall();
        },
//        watch: {
//            jine:function (val, oldVal) {
//                console.log(val);
//               if(parseInt(val.desc)>1200){
//                   this.form.rei="线下";
//               }else {
//                   this.form.rei="线上";
//               }
//            },
//        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            zaipangduan:function () {

                var vm=this;

                if(vm.form.rei=="线上"){
                    if(vm.form.jiangP=="物品"){
                        vm.$message("选择发送方式为线上时奖品属性只能为奖金")
                        vm.form.jiangP="";

                    }
                }
            },
            qingkong:function () {
                var vm=this;
                vm.form.desc=""

                if(vm.form.jiangP=="物品"&&vm.form.rei=="线上"){
                    vm.$message("选择奖品属性为物品时发送发送只能为线下")
                    vm.form.rei=""
                }
            },

            xianzhi:function () {
                var vm=this;
                if(vm.form.jiangP=="奖金"){
                    vm.$message("奖品属性为奖金，请输入数值")
                    $("#qwe").attr('type','number')
                }
                if(vm.form.jiangP=="物品"){

                    $("#qwe").attr('type','string')
                }
            },
            qqqq:function () {
                var vm=this;
                console.log(vm.form.cishu)
                console.log(vm.form.name)

                if(parseInt(vm.form.cishu)>parseInt(vm.form.name)){
                    console.log("balabala")
                    vm.$message("次数不能超过人数")
                }else{

                }
            },
            changeJine:function () {
                console.log(this.form.desc)
                if(parseInt(this.form.desc)>1200){
                    this.form.rei="线下";
                }else {
                    this.form.rei="线上";
                }
            },
//            panduan:function () {
//                var vm=this;
//
//                if(vm.form.shixiao=="立即发送"){
//                    vm.bbb=2;
//                    if(vm.form.jiangP!="奖金"||vm.form.rei!="线上"){
//
//                        vm.bbb=1;
//                        vm.$message("选择立即发送时奖品属性只能为现金，发送方式只能为线上")
//                        vm.form.shixiao=""
//                    }
//                }else{
//                    vm.bbb=1;
//                }
//            },

            getawkingall:function () {
                let vm = this;
                $.ajax({
                    type:"get",
                    url:vm.hrefLoction+"findAllActiveList.json",
                    data:{token:vm.token,createName:window.localStorage.getItem("data")},
                    dataType:"json",
                    success:function (data) {
                        console.log(data)
                        if(data.dataInfo){
                          vm.allawking = data.dataInfo.listData;
                        }else{vm.$message("无奖项")

                        }

                    },


                    error:function (da) {
                        console.log(da);
                    }

                });
            },
            tixing:function () {
                let vm =this;
                if(vm.form.shuX=="一般奖项"){
                    vm.biaozhi=1;
                }else{
                    vm.biaozhi=2;
                }
                $.ajax({
                    type:"get",
                    url:vm.hrefLoction+"findActiveListCount.json",
                    data:{token:vm.token,
                        createName:window.localStorage.getItem("data"),
                        activeName:this.form.huoD,
                        awardBeanone:vm.biaozhi},
                    dataType:"json",
                    success:function (data) {
                        console.log(data)
                        vm.extData=data.extData;
                        console.log(vm.extData);
                        vm.perNumber="最大可设置人数:"+vm.extData;
                    },
                    error:function (da) {
                        console.log(da);
                    }
                });
            },
            onSubmit(forN) {
               console.log("aaaaaaaaaaaaaaa");
                let vm =this;
                if (vm.form.region.replace(/(^\s*)|(\s*$)/g, "")=="")
                {alert("奖项名不能为空");
                } else{

                    console.log(vm.bbb)
                    if(vm.qqq==0) {
                        this.$refs[forN].validate((valid) => {
                            if (valid) {
                                if (this.form.rei == "线上") {
                                    var cT = 1;
                                } else {
                                    var cT = 2;
                                }
                                if(vm.form.jiangP=="奖金"){
                                    vm.aaa=1;
                                }else{
                                    vm.aaa=2;
                                }
                                $.ajax({

                                    type: "get",
                                    url: vm.hrefLoction+"addActiveList.json",
//                                    url: "http://appinter.sunwoda.com/active/addActiveList.json",
                                    data: {
                                        token: vm.token,
                                        awardCount: this.form.name,
                                        commentThree: this.form.cishu,
                                        activeName: this.form.huoD,
                                        awardName: this.form.region,
                                        awardZmount: this.form.desc,
                                        createName: window.localStorage.getItem("data"),
                                        commentTwo: cT,
                                        awardBeanone:this.biaozhi,
                                        awardBeantwo:this.aaa,
                                        awardBeanthree: this.bbb,
                                        awardStatus:1,
                                        commentOne:this.form.youxian
                                    },
                                    dataType: "json",
                                    success: function (data) {
                                        console.log(data);
                                        if(data.statusCode==0){
                                            vm.form.cishu="";
                                            vm.form.desc="";
                                            vm.form.name="";
                                            vm.getawkingall();
                                        }
                                        vm.$message(data.message)
                                    },
                                    error: function (da) {
                                        console.log(da);
                                    }

                                });
                            } else {
                                vm.$message("创建失败")
                            }
                        })
                    }else{
                        console.log( "创建失败")
                    } } },

            getData:function () {
                let vm =this;
                $.ajax({
                    type:"post",
                    url:vm.hrefLoction+"findAllActive.json",
                    data:{token:vm.token,createPersion:window.localStorage.getItem("data")},
                    dataType:"json",
                    success:function (data) {
                        console.log(data);
                        if(data.dataInfo){
                            vm.tableData=data.dataInfo.listData;
                            vm.form.huoD=vm.tableData[0].activeName;
                            console.log(vm.form.huoD)
                        }else{
                            vm.$message("无活动")
                        }
                    },

                    error:function (da) {
                        console.log(da);
                    }

                });

            },

            chongzhi:function () {
                var xinyeme=document.getElementById("www");
                xinyeme.reset();
            },


            computed:{

            },

        }
    }
</script>
