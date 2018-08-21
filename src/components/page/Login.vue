<template>
    <div class="login-wrap">
        <div class="ms-title">年会管理系统</div>
        <div class="ms-login">
            <!--<div id="aaa" style="height: 200px;width: 200px;background-color: #555"></div>-->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username" id="nY"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitU"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-radio-group v-model="ruleForm.danxuan">
                       <el-radio label="活动界面" ></el-radio>
                       <el-radio   label="后台界面"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <div class="login-btn">
                    <el-button type="primary" @click="submitU">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:30px;padding-top: 12px;color: black">Tips :如使用ie浏览器，建议升级到ie11或者更高版本，或者使用360、谷歌浏览器。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import  Velocity from 'velocity-animate'
    export default {

        data: function(){
            return {
                tz:3,

                ruleForm: {
                    username: '',
                    password: '',
                    danxuan:"活动界面",
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
       mounted(){



        },
        methods: {

          submitU:function () {
                let vm = this;
//             Velocity($('#aaa'), {width: "100px", height: "100px"}, 500);
              $.ajax({
                  type:"get",
                  url:vm.hrefLoction+"toLogin.json",
                  data:{token:'6f4bbfad206bbac3dce4d443fca2d81e',
                      managerName:vm.ruleForm.username,
                      managerPassword:vm.ruleForm.password
                  },
                  dataType:"json",
                  success:function (data) {
                      console.log(data)
                     if(data.message == "验证成功"){
                         var storage=window.localStorage;
                         storage.setItem("data",vm.ruleForm.username);
                        if(vm.ruleForm.danxuan=="后台界面"){
                         vm.$router.push('/readme');}
                      else{
                            vm.$router.push({path:'/activityH',query: {name:vm.ruleForm.username}});
                     }
                      }
                     else{
                         vm.$message("登录失败");
                     }

                  },

                  error:function (da) {
                      console.log(da);
                  }

          });

        }

        }}

</script>

<style scoped>
    .login-wrap{
        background: url("../../../static/img/backgroud.jpg");
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:270px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background-color: #dcdfe6;
        border:solid;
        border-width: thin;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
