<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo"  unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item  v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: '功能简述'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '活动管理',
                        subs: [
                            {
                                index: 'activityList',
                                title: '活动列表'
                            },
                            {
                                index: 'newActivity',
                                title: '新建活动'
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-circle-check',
                        index: '3',
                        title: '奖项管理',
                        subs: [
                            {
                                index: 'awardList',
                                title: '奖项列表'
                            },
                            {
                                index: 'newAward',
                                title: '新建奖项'
                            },

                        ]

                    },
                    {
                        icon: 'el-icon-zoom-in',
                        index: 'recordList',
                        title: '奖项记录'
                    },
                    {
                        icon: 'el-icon-document',
                        index: 'personList',
                        title: '抽奖人员管理'
                    },
                    {
                        icon: 'el-icon-printer',
                        index: 'userManage',
                        title: '用户管理'
                    },
                ]
            }
        },
        mounted () {
            console.log("---------------------------------")
            console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            console.log("---------------------------------")
            this.getlist();
        },
        methods: {
            getlist:function () {
                var vm =this;
                vm.items = [
                    {
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: '功能简述'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '活动管理',
                        subs: []
                    },
                    {
                        icon: 'el-icon-circle-check',
                        index: '3',
                        title: '奖项管理',
                        subs: []

                    }

                ]
                $.ajax({
                    type: "get",
                    url: vm.hrefLoction+"managerRole.json?managerName="+localStorage.getItem("data"),
                    dataType: "json",
                    success: function (data) {
                        console.log(data);
                        if(data.dataInfo){
                            for(var i=0;i<data.dataInfo.listData.length;i++){
                                console.log(data.dataInfo.listData[i].permissionName);
                                if(data.dataInfo.listData[i].permissionName == "活动列表" ){
                                    var item =  {
                                            index: 'activityList',
                                            title: '活动列表'
                                        }
                                    vm.items[1].subs.push(item);
                                }
                                if(data.dataInfo.listData[i].permissionName == "新建活动" ){
                                    var item = {
                                        index: 'newActivity',
                                            title: '新建活动'
                                    };
                                    vm.items[1].subs.push(item);
                                }
                                if(data.dataInfo.listData[i].permissionName == "奖项列表" ){
                                    var item =  {
                                        index: 'awardList',
                                        title: '奖项列表'
                                }
                                    vm.items[2].subs.push(item);
                                }
                                if(data.dataInfo.listData[i].permissionName == "新建奖项" ){
                                    var item =  {
                                        index: 'newAward',
                                        title: '新建奖项'
                                    };
                                    vm.items[2].subs.push(item);
                                }
                                if(data.dataInfo.listData[i].permissionName == "奖项记录" ){
                                    var item =   {
                                            icon: 'el-icon-zoom-in',
                                            index: 'recordList',
                                            title: '奖项记录'
                                        };
                                    vm.items.push(item);
                                }
                                if(data.dataInfo.listData[i].permissionName == "人员列表" ){
                                    var item =   {
                                            icon: 'el-icon-document',
                                            index: 'personList',
                                            title: '抽奖人员管理'
                                        }
                                    vm.items.push(item);
                                }
                                if(data.dataInfo.listData[i].permissionName == "用户列表" ){
                                    var item =   {
                                            icon: 'el-icon-printer',
                                            index: 'userManage',
                                            title: '用户管理'
                                        }
                                    vm.items.push(item);
                                }
                            }
                        }
                    },
                    error: function (da) {
                        console.log(da);
                    }
                });
            }

        },
        computed:{

            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
    }
    .sidebar > ul {
        height:100%;
    }
    .el-menu-vertical-demo{
        margin-top: 30px;
        margin-left: 20px;
        margin-bottom:20px;
        background: #ffffff;
        border: solid 1px #eee;
    }
    .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
        color: #20a0ff;
        border-right: 2px solid;
    }
</style>
