<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">

                <el-breadcrumb-item><i class="el-icon-menu"></i>奖项记录</el-breadcrumb-item>
                <span>总人数：<span class="red">{{huizongData.allPersion}}</span></span>
                <span style="margin-left: 10px;margin-right: 10px">获奖人数：<span class="red">{{huizongData.luckPersion}}</span></span>
                <span>未获奖人数：<span class="red">{{huizongData.notLuckPersion}}</span></span>
                <span style="margin-left: 10px;margin-right: 10px">总奖项：<span class="red">{{huizongData.awardCount}}</span></span>
            </el-breadcrumb>
            <div style="display: flex;margin-top: 15px" >
                <el-select v-model="jx" placeholder="请选择奖项" style="width:150px;"  allow-create>
                    <el-option  v-for="i in mableData"  :value="i.awardName" id="rer"></el-option>
                </el-select>
                <el-input v-model="pc" placeholder="批次" type="number" min="1" style="width:100px;margin-left: 10px"></el-input>
                <el-input v-model="xm" placeholder="请输入姓名" style="width:150px;margin-left: 10px"></el-input>
                <el-input v-model="gh" placeholder="请输入工号" style="width:150px;margin-left: 10px"></el-input>



                <el-button>共{{total}}人</el-button>
                <el-button type="primary" @click="getData(1)" style="margin-left: 20px;width: 100px">查询</el-button>

                <el-dropdown style="margin-left: 20px">
                    <el-button type="primary">
                        导出数据
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><span @click="exportData(1)" style="width: 100%;height: 100%">未发送导出</span></el-dropdown-item>
                        <el-dropdown-item><span @click="exportData(3)" style="width: 100%;height: 100%">全部导出</span></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!--<el-button type="primary" @click="exportData" >导出数据</el-button>-->
                <el-input placeholder="请输入删除批次" v-model="deletePtime" style="width: 200px;margin-left: 20px;position: relative">
                    <template slot="append"><el-button type="primary" @click="deleteselect" >删除</el-button></template>
                </el-input>

            </div>

        </div>
        <div style="width: 100%" id="aaa">
            <el-table :data="tableData" height="480" style="width: 100%;" header-row-class-name="abc"  @selection-change="handleSelectionChange" >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column label="姓名" width="130" prop="awardName" style="align-content: center">

                </el-table-column>
                <el-table-column label="工号"  prop="awardNo" width="150" >

                </el-table-column>

                <el-table-column label="部门" width="120" prop="awardDept">

                </el-table-column>

                <el-table-column label="批次" prop="commentServen"  sortable>

                </el-table-column>

                <el-table-column label="奖项" prop="awardRanking">

                </el-table-column>
                <el-table-column label="企业微信" >
                    <template slot-scope="scope" >
                        <div v-if="scope.row.openid">
                            有
                        </div>
                        <div v-else="" style="color: red">无</div>
                    </template>
                </el-table-column>
                <el-table-column label="奖品"  prop="amount">

                </el-table-column>
                <el-table-column label="发送状态">
                    <template slot-scope="scope" >
                        <div v-if="scope.row.resultCode == 'SUCCESS' && scope.row.returnCode == 'SUCCESS'">
                            发送成功
                        </div>

                        <div v-else="" style="color: red">发送失败</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="200">
                    <template slot-scope="scope" >
                        <el-button
                            size="mini"
                            @click="handleSend(scope.$index, scope.row)">确认发送</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                        >取消</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="20"
                :current-page = "current"
                @current-change ="changePage">
            </el-pagination>
        </div>
        <div style="margin-top: 15px">
            <el-button type="primary" @click="allSend">全部发送</el-button>

        </div>

    </div>

</template>


<script>

    export default {


        data:function(){

            return{
                tableData: [],
                map:{},
                zongshu:[],
                xm:"",
                gh:"",
                jx:"",
                pc:"",
                mableData:[],
                huizongData:{},
                deletePtime:"",
                total:0,
                current:1
            }


        },

        mounted:function () {

            this.getHuodong();
            this.getActive();

        },
        computed: {
        },
        watch:{

        },
//        downExcelPayment.json  (1下载未发送 2查询 3 下载全部)
        methods: {



            exportData: function (type) {
                console.log(type);
                var vm = this;
                var href = vm.hrefLoction+"downExcelPayment.json";
                window.location = href + "?createName=" + window.localStorage.getItem('data') +
                    "&userName=" + vm.xm + '&awardName=' + vm.jx + '&userNum=' + vm.gh + '&status='+type+"&batch="+vm.pc;
            },
//确认是否删除该批次
            deleteselect:function () {
                var vm =this;
                vm.$confirm('此操作将永久删除批次所有获奖人员,必须从最后一批删除！ 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    vm.deleteP()

                }).catch(() => {
                    vm.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //执行删除该批次
             deleteP:function () {
                var vm = this;
                var awardid =""
                console.log(vm.mableData[0].awardName);
                console.log(vm.jx);
                for(var i = 0; i<vm.mableData.length;i++){
                    if(vm.mableData[i].awardName==vm.jx){
                        awardid=vm.mableData[i].id;

                    }
                }
                console.log(vm.deletePtime);
                console.log(awardid);
                $.ajax({
                    type: "get",
                    url: vm.hrefLoction+"removeStatus.json",
                    data: {
                        awardAmount:vm.deletePtime,
                        awardId:awardid
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if(data.statusCode==0){
                            vm.$message("删除成功")
                            vm.getData(1);
                        }
                    },
                    error: function (da) {
                        console.log(da);
                        vm.$message("删除失败")
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
                 console.log(data.dataInfo.listData[0].id);
                 if(data.dataInfo){
                     vm.getAllmess(data.dataInfo.listData[0].id);
                 }else {
                     vm.$message("无活动")
                 }

             },

             error:function (da) {
                 console.log(da);
             }

         });
     },

//            根据活动id获取统计信息
            getAllmess:function (id) {
                let vm = this;
                $.ajax({
                    type:"post",
                    url:vm.hrefLoction+"selectCondtionAward.json",
                    data:{createName:window.localStorage.getItem("data"),activeId:id},
                    dataType:"json",
                    success:function (data) {
                        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                        console.log(data);

                        if(data.extData){
                            vm.huizongData = data.extData;
                            console.log(vm.huizongData);
                        }else {

                        }

                    },

                    error:function (da) {
                        console.log(da);
                    }

                });
            },
            allSend: function () {
                var vm = this;
                $.ajax({
                    type: "post",
                    url: vm.hrefLoction+"sendPay.json",
                    data: {
                        ids:vm.zongshu.join(",")
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data.message)
                    },
                    error: function (da) {
                        console.log(da);
                    }
                });
            },
            getHuodong: function () {
                let vm = this;
                $.ajax({
                    type: "get",
                    url: vm.hrefLoction+"findAllActiveList.json",
                    data: {token: vm.token, createName: window.localStorage.getItem("data")},
                    dataType: "json",
                    success: function (data) {
                        if (data.dataInfo) {
                            vm.mableData = data.dataInfo.listData;
                            console.log(vm.mableData);
                            vm.getData(1);
                        } else {
                            vm.$message("无奖项")

                        }
                    }
                })
            },
            handleSend(index, row) {
                var vm = this;
                if (row.commentTwo == 2 || row.awardBeantwo == 2) {
                    vm.$message("线下发送或者物品不能通过后台直接发送")
                } else {
                    $.ajax({
                        type: "post",
                        url: vm.hrefLoction+"sendPay.json",
                        data: {
                            ids: row.id
                        },
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            vm.$message(data.message)
                        },
                        error: function (da) {
                            console.log(da);
                        }
                    });
                }
            },
            handleSelectionChange(val) {
                var vm=this;
                vm.zongshu =[]
                console.log(val);
                for (var i = 0; i < val.length; i++) {
                    if (val[i].commentTwo == 1) {
                        vm.zongshu.push(val[i].id)
                    }
                }
                console.log(vm.zongshu)
            },
            getData: function (page) {
                let vm = this;
                var data = {
                    createName: window.localStorage.getItem("data"),
                    userName: vm.xm,
                    awardName: vm.jx,
                    userNum:vm.gh,
                    batch:vm.pc,
                    status: 2,
                    pageSize:20,
                    pageNo:page

                };
                console.log(data);
                $.ajax({
                    type: "get",
                    url: vm.hrefLoction+"downExcelPayment.json",
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if (data.extData) {
                            vm.tableData = data.extData.list;
                            vm.total = data.extData.total;

                        } else {
                            vm.$message("无数据")
                        }
                    },
                    error: function (da) {
                        console.log(da);
                    }
                });
            },
            changePage:function (page) {
                console.log(page);
                this.getData(page);
            },



        }
    }
</script>



<style>
    #aaa .abc{
        background-color: #eef1f6;
    }
    .el-table th{
        background-color: rgba(0,0,0,0);
    }
    .el-pagination{
        margin-top: 10px;
        display: flex;
        justify-content: flex-end;
    }
.red{
    color: red;
}
</style>
