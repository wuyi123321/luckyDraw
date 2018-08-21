<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>奖项管理</el-breadcrumb-item>
                <el-breadcrumb-item>奖项列表</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <div style="width: 100%" id="aaa">
            <el-table :data="tableData"    style="width: 100%" header-row-class-name="abc"   >
                <el-table-column label="奖项顺序" width="180" prop="commentOne">

                </el-table-column>
                <el-table-column label="奖项名" width="190" prop="awardName" >

                </el-table-column>
                <el-table-column label="抽奖状态" width="180" >
                    <template slot-scope="scope">
                        <div v-if="scope.row.awardStatus==1" style="color: red">
                            已抽
                        </div>

                        <div v-if="scope.row.awardStatus==0" style="color: #13ce66">
                            未抽
                        </div>
                        <div v-if="scope.row.awardStatus==2" style="color: #aaaa00">
                           抽奖中
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="次数" width="190" prop="commentThree">

                </el-table-column>
                <el-table-column label="奖项人数" width="180" prop="awardCount">

                </el-table-column>
                <el-table-column label="奖品" width="180" prop="awardZmount">

                </el-table-column>
                <el-table-column label="奖项属性" width="180" prop="awardBeanone">

                </el-table-column>

                <el-table-column label="线上/线下" width="120" prop="commentTwo">

                </el-table-column>

                <el-table-column label="发送时效" width="180" prop="awardBeanthree">

                </el-table-column>

                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>

                    </template>



                </el-table-column>
            </el-table>
        </div>

    </div>

</template>


<script>

    export default {


        data:function(){

            return{
                tableData: [],

                zhijian:"",


                form: {

                    dept:'',
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''

                },


            }


        },

        mounted:function () {
            this.getData();

        },
        computed: {
        },
        watch:{

        },
        methods: {

            getData:function () {
                let vm = this;
                $.ajax({
                    type:"get",
                    url:vm.hrefLoction+"findAllActiveList.json",
                    data:{token:vm.token,createName:window.localStorage.getItem("data")},
                    dataType:"json",
                    success:function (data) {
                        if(data.dataInfo){
                            for(var i=0;i<data.dataInfo.listData.length;i++){
                                if(data.dataInfo.listData[i].commentTwo==1){
                                    data.dataInfo.listData[i].commentTwo="线上";
                                }else{
                                    data.dataInfo.listData[i].commentTwo="线下";

                                }
                                if(data.dataInfo.listData[i].awardBeanthree==1){
                                    data.dataInfo.listData[i].awardBeanthree="抽奖发送"
                                }else{
                                    data.dataInfo.listData[i].awardBeanthree="立即发送"
                                }
                                if(data.dataInfo.listData[i].awardBeanone==1){
                                    data.dataInfo.listData[i].awardBeanone="一般奖项"
                                }else{
                                    data.dataInfo.listData[i].awardBeanone="重置奖项"
                                }
                            }
                            vm.tableData=data.dataInfo.listData;


                            console.log(vm.tableData)

                        }else{vm.$message("无奖项")

                        }

                    },


                    error:function (da) {
                        console.log(da);
                    }

                });
            },



            handleDelete:function(index, row){
                let vm = this;
                if(row.awardStatus == 1){
                this.$message("已经抽奖不能删除");
                return 0;
                }
                if(row.awardStatus == 2){
                    this.$message("抽奖中不能删除");
                    return 0;
                }
                    this.$confirm('此操作将永久删除本条奖项记录，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {

                        console.log(row)
                        $.ajax({
                            type:"post",
                            url:vm.hrefLoction+"removeActiveList.json?",
                            data:{token:vm.token,
                                activeName:row.activeName,
                                createName:window.localStorage.getItem("data"),
                                awardName:row.awardName,
                                id:row.id
                            },
                            dataType:"json",
                            success:function (data) {
                                console.log(data)
                                vm.getData();
                                vm.$message(data.message);
                                vm.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });

                            },

                            error:function (da) {
                                console.log(da);
                            }

                        });
                       }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });


            }



        }
    }
</script>


<style>
    #aaa .abc{
        background-color: #eef1f6;
    }
    .el-table th, .el-table tr{
        background-color: rgba(0,0,0,0);
    }
</style>
