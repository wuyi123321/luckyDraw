<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>新建活动</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px"  id="rrr" >
                <el-form-item label="活动名称" prop="name">
                    <el-input v-model="form.name" style="width: 250px"></el-input>
                </el-form-item>
                <el-form-item label="创建部门" prop="dept">
                    <el-input v-model="form.dept" style="width:250px"></el-input>
                </el-form-item>
                <el-form-item  label="创建时间"  >
                    <el-col :span="6">
                        <el-form-item >
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;" :disabled="true"></el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item >
                            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%; padding-left:50px"  :disabled="true"></el-time-picker>
                        </el-form-item>
                    </el-col>

                </el-form-item>
                <el-form-item label="备注" >
                    <el-input type="textarea" v-model="form.desc" style="width:636px" :rows='3'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
                    <el-button @click="reseT()">取消</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';


    export default {

        data: function(){
            return {
                form: {
                    dept:'',
                    name: '',
                    region: '',
                    date1:new Date(),
                    date2: new Date(),
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',

                },
                rules:{
                    name:[{required :true,message: '请设置活动名称', trigger: 'blur'}],
                    dept:[{required : true,message: '请设置部门', trigger: 'blur'}],


                }

            }
        },
        created(){

        },
        watch:{

        },
        methods: {
            onSubmit(formN) {
                let vm = this;
                console.log(vm.form.date1);
                console.log(vm.form.date2);

                this.$refs[formN].validate((valid)=>{
                    if(valid){


                $.ajax({
                    type:"post",
                    url:vm.hrefLoction+"addActive.json",
                    data:{token:'6f4bbfad206bbac3dce4d443fca2d81e',
                        activeName:vm.form.name,
                        CommentOne:vm.form.desc,
                        createPersion:window.localStorage.getItem("data")},
                    dataType:"json",
                    success:function (data) {
                        console.log(data);
                        vm.$message(data.message);

                    },

                    error:function (da) {
                        console.log(da);
                    }

                });
                    }else{
                        vm.$message("创建失败")
                    }
                } )
            },
                 reseT:function (){
               var xinForm=document.getElementById("rrr");
                     xinForm.reset()
                 }
        },


    }
</script>

<style >

</style>
