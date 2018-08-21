<template>
     <div id="usermange">
         <div class="crumbs">
             <el-breadcrumb separator="/">
                 <el-breadcrumb-item><i class="el-icon-menu"></i>用户管理</el-breadcrumb-item>
             </el-breadcrumb>
         </div>
         <el-button
             size="small"
             type="primary"
             @click="addUser">新建用户
         </el-button>
         <div class="bgmess" v-show="additem" >
              <div class="bgcontent">
                  <div class="close" @click="closeadd"><i class="el-icon-close"></i></div>
                  <el-form ref="form" :model="form" label-width="80px" label-position="left">
                      <el-form-item label="用户名">
                          <el-input v-model="form.username"></el-input>
                      </el-form-item>
                      <el-form-item label="密码">
                          <el-input v-model="form.userpassword"></el-input>
                      </el-form-item>
                      <el-form-item label="权限分配">
                          <el-radio-group v-model="form.usertype">
                              <el-radio :label="2" >普通用户</el-radio>
                              <el-radio :label="1" >管理员</el-radio>
                          </el-radio-group>
                      </el-form-item>
                      <el-form-item>
                          <el-button type="primary" @click="onSubmit" v-if="isedit == false">立即创建</el-button>
                          <el-button type="primary" @click="onEdit" v-else="">修改</el-button>
                      </el-form-item>
                  </el-form>
              </div>
         </div>
         <div class="table" style="width: 70%;margin-top:15px" id="table">
             <el-table :data="userList" height="450"  header-row-class-name="tableHeader">
                 <el-table-column label="序号" type="index" width="100" >
                 </el-table-column>
                 <el-table-column label="用户名"  prop="managerName">
                 </el-table-column>
                 <el-table-column label="密码"  prop="managerPassword" >
             </el-table-column>
                 <el-table-column label="是否管理员"  >
                     <template slot-scope="scope">
                        <div v-if="scope.row.managerPower == 1">
                         管理员
                     </div>
                         <div v-if="scope.row.managerPower == 2">
                             普通用户
                         </div>
                     </template>
                 </el-table-column>
                 <el-table-column label="操作" width="200">
                     <template slot-scope="scope">
                         <el-button
                             size="small"
                             type="danger"
                             @click="DeleteUser(scope.row.id)">删除
                         </el-button>
                         <el-button
                             size="small"
                             @click="EditUser(scope.row)">修改
                         </el-button>
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
                userList:[],
                additem:false,
                form:{
                    username:"",
                    userpassword:"",
                    usertype:1,
                    id:""
                },
                isedit:false
            }
        },
        mounted:function () {
            this.getuserData();

        },
        computed: {
        },
        watch:{


        },
        methods: {
          getuserData:function () {
              let vm = this;
              $.ajax({
                  type: "get",
                  url: vm.hrefLoction+"findAllActiveRole.json",
                  data: {managerName: window.localStorage.getItem("data")},
                  dataType: "json",
                  success: function (data) {
                      console.log(data);
                      if (data.dataInfo) {
                          vm.userList = data.dataInfo.listData

                      } else {
                          vm.$message("无用户")

                      }
                  }
              })
          },
          DeleteUser:function (id) {
              let vm = this;
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  $.ajax({
                      type: "get",
                      url: vm.hrefLoction+"removeActiveManager.json",
                      data: {id:id},
                      dataType: "json",
                      success: function (data) {
                          console.log(data);
                       if(data.statusCode == 0){
                           vm.getuserData();
                           vm.$message({
                               type: 'success',
                               message: '删除成功!'
                           });
                       }else {
                           vm.$message(data.message);
                       }
                      }
                  })

              }).catch(() => {
                  this.$message({
                      type: 'info',
                      message: '已取消删除'
                  });
              });
            },
          addUser:function () {
              this.isedit =false
              this.additem = true
          },
          closeadd:function () {
              this.form ={};
              this.additem = false;
              console.log(this.form)
            },
          onSubmit:function () {
              var vm =this;
              console.log(vm.form.userpassword);
              $.ajax({
                    type: "get",
                    url: vm.hrefLoction+"addActiveRole.json",
                    data: {
                        managerName:vm.form.username,
                        managerPassword:vm.form.userpassword,
                        managerPower:vm.form.usertype
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        vm.additem = false;
                        if(data.statusCode == 0){
                            vm.getuserData();
                            vm.$message({
                                type: 'success',
                                message: '新增成功!'
                            });
                        }else {
                            vm.$message(data.message);
                        }
                    }
                })
            },
          onEdit:function () {
                var vm =this;
                $.ajax({
                    type: "get",
                    url: vm.hrefLoction+"modifyByManager.json",
                    data: {
                        managerName:vm.form.username,
                        managerPassword:vm.form.userpassword,
                        managerPower:vm.form.usertype,
                        id:vm.form.id
                    },
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        vm.additem = false;
                        if(data.statusCode == 0){
                            vm.getuserData();
                            vm.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                        }else {
                            vm.$message(data.message);
                        }
                    }
                })
            },
          EditUser:function (item) {
              console.log(item);
             this.additem = true;
             this.isedit = true;
             this.form.username=item.managerName;
             this.form.userpassword=item.managerPassword;
             this.form.usertype=item.managerPower;
             this.form.id = item.id
            }

        }
    }
</script>



<style>


  #usermange #table .tableHeader{
        background-color: #eef1f6;
    }
  .el-table th, .el-table tr {
      /* background-color: #fff; */
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
   .bgmess .bgcontent{
        width: 430px;
        height: 300px;
        background-color: #fff;
       padding: 20px;
       display: flex;
       justify-content: center;
       align-items: center;
       position: relative;
    }
   .el-form{
       width: 100%;
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


</style>
