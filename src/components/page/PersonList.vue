<template>
    <div class="table" v-loading.body="loading" element-loading-text="上传中">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>抽奖人员管理</el-breadcrumb-item>

            </el-breadcrumb>

             <el-button  type="primary" size="small" style="margin-top: 15px" @click="downloadExc">下载excel导入模板</el-button>
            <!--<a style="display:inline-block;margin-top: 15px;border: solid 1px #eee;padding: 5px"></a>-->
            <div style="margin-top: 15px">


                人员导入:<input type="file" id="files" @change="upLoadF" style="width: 180px;border: solid 1px #eee;margin-right: 20px;margin-left: 10px" />

                <el-button @click="upLoadS" type="primary" size="small">确定</el-button>
                <el-button type="primary" size="small" @click="newPerson">添加人员</el-button>
            </div>
            <div class="bgmess" v-if="errdata.length>0">
                <div class="bgconter">
                    <div class="close" @click="closeErr"><i class="el-icon-close"></i></div>
                    <div class="bgtitle">{{errTitle}}</div>
                    <div class="bgcontent">
                       <div v-for="item in errdata" class="bgitem">
                           <span>{{item.userName}}</span><span>{{item.userNum}}</span><span>{{item.commentOne}}</span>
                       </div>
                    </div>
                </div>
            </div>
            <div style="display: flex;margin-top: 15px;align-items: center" >
                <el-input v-model="uName" placeholder="请输入姓名" style="width:150px"></el-input>
                <el-input v-model="uNum" placeholder="请输入工号" style="width:150px;margin-left: 10px"></el-input>
                <el-input v-model="uDept" placeholder="请输入部门" style="width:150px;margin-left: 10px"></el-input>
                <el-button type="primary" @click="search(1)" style="margin-left: 50px;width: 100px">查询</el-button>
                <span style="margin-left: 20px">总人数：{{total}}人</span>
            </div>

            <div style="width: 100%;margin-top: 10px" id="aaa">
                <el-table :data="tableData"    style="width: 100%;" header-row-class-name="abc"  rowKey="奖项名" height="450">
                    <el-table-column label="序号" type="index" width="100" >

                    </el-table-column>
                    <el-table-column label="工号"  prop="userNum">

                    </el-table-column>
                    <el-table-column label="姓名"  prop="userName" >

                    </el-table-column>
                    <el-table-column label="部门"  prop="userDept">

                    </el-table-column>

                    <el-table-column label="岗位名称"  prop="userPosition">

                    </el-table-column>



                    <el-table-column label="负责人" width="120" prop="createName">

                    </el-table-column>

                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            <el-button
                                size="mini"
                                @click="handleEdit(inside,scope.$index, scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    @current-change ="changePage">
                </el-pagination>
            </div>
        </div>
        <div v-show="xinzeng" style="position: fixed;top:0;left: 0;width: 100%;height: 100%;
        display: flex;justify-content: center;align-items: center; z-index: 99999">
            <el-form  label-width="80px" labelPosition="left" style="width:30%;height:50%;padding: 10px;padding-top: 15px;
            border-radius: 15px;background-color: #dddddd;z-index: 99999;display: flex;flex-direction:column;justify-content: center;align-items: center;">
                <el-form-item label="工号">
                    <el-input v-model="personNum" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="name"  style="width:250px"></el-input>
                </el-form-item>
                <el-form-item label="部门">
                    <el-input v-model="dept"  style="width:250px"></el-input>
                </el-form-item>
                <el-form-item label="岗位名称" >
                    <el-input v-model="gangwei" style="width: 250px" ></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即新增</el-button>
                    <el-button @click="guanbi">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-show="xiugai" style="position: fixed;top:0;left: 0;width: 100%;height: 100%;display: flex;justify-content: center;align-items: center; z-index: 99999">
            <el-form ref="inside" :model="inside"  label-width="80px" labelPosition="left" style="width:30%;height:50%;padding: 10px;padding-top: 15px;;border-radius: 15px;background-color: #dddddd;z-index: 99999">
                <el-form-item label="工号">
                    <el-input v-model="inside.userNum" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="inside.userName"  style="width:250px"></el-input>
                </el-form-item>
                <el-form-item label="部门">
                    <el-input v-model="inside.userDept"  style="width:250px"></el-input>
                </el-form-item>
                <el-form-item label="岗位名称" >
                    <el-input v-model="inside.userPosition" style="width: 250px" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit2">立即修改</el-button>
                    <el-button @click="guanbi2">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>

</template>


<script>

    import ElButton from "../../../node_modules/element-ui/packages/button/src/button.vue";

    export default {


        components: {ElButton},
        data:function(){

            return{
                loading:false,
                errdata:[],
                errTitle:"",
                xinzeng:false,
                tableData: [],
                files:[],
                errorList:[],
                errorMessage:false,
                fileName:"",
                xiugai:false,
                dept:'',
                name:"",
                gangwei:"",
                personNum:"",
                inside:{},
                uName:"",
                uDept:"",
                uNum:"",
                genggaihao:0,
                total:0
            }


        },

        mounted:function () {
            this.search(1);

        },
        computed: {
        },
        watch:{

        },
        methods: {
            downloadExc:function () {
                window.location="https://appinter.sunwoda.com/download/pda/抽奖人员导入格式.xlsx";
            },
            onSubmit2:function () {
                var vm=this;
                $.ajax({
                    type: "get",
                    url: vm.hrefLoction+"updateActiveUser.json",
                    data: {
                        id:vm.inside.id,
                        userName:vm.inside.userName,
                        userNum:vm.inside.userNum,
                        userDept:vm.inside.userDept,
                        userPosition:vm.inside.userPosition,
                        createName:window.localStorage.getItem("data")
                    },
                    dataType: "json",
                    success: function (data) {
                        vm.$message(data.message);
                        vm.search(1);
//                       if(data.statusCode==0){
//                           vm.tableData[vm.genggaihao-1].userName=vm.inside.userName;
//                           vm.tableData[vm.genggaihao-1].userNum=vm.inside.userNum;
//                           vm.tableData[vm.genggaihao-1].userDept=vm.inside.userDept;
//                           vm.tableData[vm.genggaihao-1].userPosition=vm.inside.userPosition;
//                           vm.tableData[vm.genggaihao-1].createName=vm.inside.createName;
//                       }



                    },
                    error: function (da) {
                        console.log(da);
                    }
                });
                this.xiugai=false;

            },
            search:function (page) {
                var vm=this;
                var data ={
                    createName:window.localStorage.getItem("data"),
                    userName:vm.uName,
                    userDept:vm.uDept,
                    userNum:vm.uNum,
                    pageSize:10,
                    pageNo:page
                };
                console.log(data);
                $.ajax({
                    type: "get",
                    url: vm.hrefLoction+"findAllActiveUser.json",
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        console.log(data)
                        if(data.extData){
                            vm.tableData=data.extData.list;
                            vm.total = data.extData.total
                        }

                    },
                    error: function (da) {
                        console.log(da);
                    }
                });

            },
            onSubmit:function () {
                var vm=this;
                $.ajax({
                    type: "post",
                    url: vm.hrefLoction+"addActiveUser.json",
                    data: {

                        userName:vm.name,
                        userNum:vm.personNum,
                        userDept:vm.dept,
                        userPosition:vm.gangwei,
                        createName:window.localStorage.getItem("data")
                    },
                    dataType: "json",
                    success: function (data) {
                        vm.$message(data.message)
                        vm.search(1);
                    },
                    error: function (da) {
                        console.log(da);
                    }
                });this.xinzeng=false;
            },
            guanbi:function () {
                this.xinzeng=false;
            },
            guanbi2:function () {
                this.xiugai=false;
            },
            newPerson:function () {
                this.xinzeng=true;
            },
            closeErr:function () {
                this.errdata=[];
            },
            changePage:function (page) {
                console.log(page);
                this.search(page);
            },
            upLoadF:function () {
                var vm=this;
                this.errorList = [];
                this.errorMessage = false;
                var file=document.getElementById("files").files[0];
                this.files[0]=file
            },
            upLoadS:function () {
                var vm=this;
                if(vm.files.length==0){
                    vm.$message("文件不能为空");
                    return 0
                }
                vm.loading = true;
                var formData=new FormData();
                formData.append("record",vm.files[0]);
                $.ajax({
                    url: vm.hrefLoction+"importActiveUser.json",
                    method: "POST",
                    data: formData,
                    contentType: false,
                    processData: false,
                    cache: false,
                    mimeType: "multipart/form-data",
                    success: function(data){
                        vm.loading = false
                        var obj = JSON.parse(data);
                        console.log(obj);
                        vm.errTitle = obj.message;
                        vm.$message(obj.message);
                        if(obj.dataInfo){
                            vm.errdata=obj.dataInfo.listData;
                            vm.search(1);
                        }

                    },
                    error:function () {
                        vm.$message("上传错误");
                        vm.loading = false;
                    }

                });
            },
            handleEdit(inside,index, row) {
                console.log(row)
                let vm=this;
                vm.genggaihao=row.index;
                vm.inside=row;
                this.xiugai=true;
                console.log(vm.inside)
                window.localStorage.setItem("bianma",row.id);
                console.log(window.localStorage.getItem("bianma"))
            },
            handleDelete(index, row) {
                this.$confirm('此操作将该参会人员信息，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.localStorage.setItem("haoma",row.id);
                    let vm = this;
                    $.ajax({
                        type:"get",
                        url:vm.hrefLoction+"deleteActiveUserById.json",
                        data:{id:window.localStorage.getItem("haoma")},
                        dataType:"json",
                        success:function (data) {
                            vm.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            vm.getallData();
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

            },


        }
    }
</script>



<style scoped>
    #aaa .abc{
        background-color: #eef1f6;
    }
    .el-table th{
        background-color: rgba(0,0,0,0);
    }
    .bgmess{
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        position: fixed;
        background-color: rgba(0,0,0,.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .bgconter{
        background-color: #fff;
        width: 600px;
        height: 500px;
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        position: absolute;
    }
    .close{
        position: absolute;
        top: -35px;
        right: 2px;
        color: #fff;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: solid 1px #fff;
    }
    .bgtitle{
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: red;
        border-bottom: solid 1px #eee;
    }
    .bgcontent{
        flex: 1;
        overflow-y: scroll;

    }
.el-pagination{
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
}
    .inner-container::-webkit-scrollbar {
        display: none;
    }
    .bgitem{
        border-bottom: solid 1px #eee;
        display: flex;

    }
    .bgitem span{
        padding: 5px;
        flex: 1;
        text-align: center;
    }

</style>
