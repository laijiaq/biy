<template>
    <div style="height: 100%;">
        <Header></Header>
        <div class="layout">
            <el-container>
                <el-menu  :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-menu-item index="1" @click="target('1','/home')">
                        <i class="el-icon-setting"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu :index="item.index" v-for="(item,index) in menu" :key="'menu'+index" >
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <el-menu-item-group >
                            <el-menu-item :index="menu.index" v-for="(menu,index1) in item.children" :key="'menu'+index1" @click="target(menu.index,menu.router)">{{ menu.title }}</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                </el-menu>
                <el-container>
                    <el-header style=" font-size: 12px">
                        <el-radio-group v-model="isCollapse" >
                            <div @click="isCollapse = true" class="apse">
                                <svg t="1718262726056"  v-if="isCollapse == false" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1607" width="200" height="200"><path d="M142.85978698 228.55273437L142.85978698 162.63476562c0-14.56292724 11.80426026-26.3671875 26.3671875-26.36718749l685.546875 0c14.56292724 0 26.3671875 11.80426026 26.3671875 26.3671875l0 65.91796874c0 14.56292724-11.80426026 26.3671875-26.3671875 26.3671875L169.22697448 254.91992187c-14.56292724 0-26.3671875-11.80426026-26.3671875-26.36718749z m342.7734375 237.30468751l369.140625-1e-8c14.56292724 0 26.3671875-11.80426026 26.3671875-26.3671875l0-65.91796874c0-14.56292724-11.80426026-26.3671875-26.3671875-26.36718751L485.63322448 347.20507812c-14.56292724 0-26.3671875 11.80426026-26.3671875 26.36718751l0 65.91796874c0 14.56292724 11.80426026 26.3671875 26.3671875 26.3671875zM169.22697448 887.73242188l685.546875-1e-8c14.56292724 0 26.3671875-11.80426026 26.3671875-26.3671875l0-65.91796874c0-14.56292724-11.80426026-26.3671875-26.3671875-26.3671875L169.22697448 769.08007813c-14.56292724 0-26.3671875 11.80426026-26.3671875 26.36718749l0 65.91796876c0 14.56292724 11.80426026 26.3671875 26.3671875 26.3671875z m316.40625-210.93750001l369.140625 1e-8c14.56292724 0 26.3671875-11.80426026 26.3671875-26.36718751l0-65.91796874c0-14.56292724-11.80426026-26.3671875-26.3671875-26.3671875L485.63322448 558.14257813c-14.56292724 0-26.3671875 11.80426026-26.3671875 26.3671875l0 65.91796874c0 14.56292724 11.80426026 26.3671875 26.3671875 26.3671875zM150.58372497 530.64324951l158.20312501 158.17675781C325.34379578 705.38354492 353.79728698 693.64355468 353.79728698 670.17675782L353.79728698 353.8100586c0-23.61346436-28.55072021-35.10791016-45.01043701-18.64324952l-158.203125 158.18994141c-10.29803467 10.29638672-10.29803468 26.9901123 0 37.28649902z" fill="#2c2c2c" p-id="1608"></path></svg>
                            </div>
                            <div @click="isCollapse = false" class="apse">
                                <svg t="1718262815822"  v-if="isCollapse == true" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1754" width="200" height="200"><path d="M881.14021302 795.44726563L881.14021302 861.36523438c0 14.56292724-11.80426026 26.3671875-26.3671875 26.36718749l-685.546875 0c-14.56292724 0-26.3671875-11.80426026-26.3671875-26.3671875l0-65.91796874c0-14.56292724 11.80426026-26.3671875 26.3671875-26.3671875L854.77302552 769.08007813c14.56292724 0 26.3671875 11.80426026 26.3671875 26.36718749z m-342.7734375-237.30468751l-369.140625 1e-8c-14.56292724 0-26.3671875 11.80426026-26.3671875 26.3671875l0 65.91796874c0 14.56292724 11.80426026 26.3671875 26.3671875 26.36718751L538.36677552 676.79492188c14.56292724 0 26.3671875-11.80426026 26.3671875-26.36718751l0-65.91796874c0-14.56292724-11.80426026-26.3671875-26.3671875-26.3671875zM854.77302552 136.26757812l-685.546875 1e-8c-14.56292724 0-26.3671875 11.80426026-26.3671875 26.3671875l0 65.91796874c0 14.56292724 11.80426026 26.3671875 26.3671875 26.3671875L854.77302552 254.91992187c14.56292724 0 26.3671875-11.80426026 26.3671875-26.36718749l0-65.91796876c0-14.56292724-11.80426026-26.3671875-26.3671875-26.3671875z m-316.40625 210.93750001l-369.140625-1e-8c-14.56292724 0-26.3671875 11.80426026-26.3671875 26.36718751l0 65.91796874c0 14.56292724 11.80426026 26.3671875 26.3671875 26.3671875L538.36677552 465.85742187c14.56292724 0 26.3671875-11.80426026 26.3671875-26.3671875l0-65.91796874c0-14.56292724-11.80426026-26.3671875-26.3671875-26.3671875zM873.41627503 493.35675049l-158.20312501-158.17675781C698.65620422 318.61645508 670.20271302 330.35644532 670.20271302 353.82324218L670.20271302 670.1899414c0 23.61346436 28.55072021 35.10791016 45.01043701 18.64324952l158.203125-158.18994141c10.29803467-10.29638672 10.29803468-26.9901123 0-37.28649902z" fill="#2c2c2c" p-id="1755"></path></svg>
                            </div>
                            <!-- <el-radio-button :label="false">展开</el-radio-button>
                            <el-radio-button :label="true">收起</el-radio-button> -->
                        </el-radio-group>
                    </el-header>
                    <div class="content">
                        <router-view></router-view>
                    </div>
                </el-container>
            </el-container>

        </div>
    </div>
    
</template>
<script>
    import Header from "../header"
    export default {
        data(){
            return {
                isCollapse:false,
                defaultActive:"1",
                menu:[
                    {
                        index:"2",
                        title:'基础信息',
                        icon:'el-icon-message',
                        children:[
                            {
                                index:'1-1',
                                router:'/sys',
                                title:'基础设置'
                            },
                        ],
                    },
                    {
                        index:"3",
                        title:'审核中心',
                        icon:'el-icon-message',
                        children:[
                            // {
                            //     index:'2-1',
                            //     router:'/news',
                            //     title:'撰写新闻'
                            // },
                            // {
                            //     index:'2-2',
                            //     router:'/draft',
                            //     title:'草稿箱'
                            // },
                            // {
                            //     index:'2-3',
                            //     router:'/News-management',
                            //     title:'新闻管理'
                            // },
                            {
                                index:'2-1',
                                router:'/contentreview',
                                title:'比赛审核'
                            },
                            {
                                index:'2-2',
                                router:'/reviewPhoto',
                                title:'图片审核'
                            },
                            {
                                index:'2-3',
                                router:'/review',
                                title:'参加比赛审核'
                            },
                        ],
                    },
                    {
                        index:"4",
                        title:'系统设置',
                        icon:'el-icon-message',
                        children:[
                            {
                                index:'3-1',
                                router:'/users',
                                  title:'用户管理'
                            },
                        ],
                    },
                ]    
            }
        },
        created(){
            this.defaultActive = localStorage.getItem('defaultActive')
            if(this.defaultActive == ''){
                this.defaultActive == '1'
            }
        },
        methods:{
            chence(){
                this.isCollapse = !this.isCollapse
            },
            handleClose(){

            },
            handleOpen(){

            },
            target(index,url){
                this.defaultActive = index
                localStorage.setItem('defaultActive',index)
                if(this.$route.path != url&&url != undefined && url != null && url != ''){                                                                       
                    this.$router.push(url)
                }                
            }
        },
        components:{
            Header
        }
    }
</script>
<style scoped lang="scss">

    .layout{
        height: 92%;

    }
    .el-container{
        height: 100%;
    }


  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-header{
    display: flex;
    align-items: center;
    background-color: #f5f5f2;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
  .apse{
    cursor: pointer;
    svg.icon {
        width: 25px;
        height: 25px;
    }
  }
  .content{
    height: 100%;
    padding: 1%;
    overflow: auto;
  }
  .el-menu{
    background-color: #83a0c2;

  }
  .el-submenu span{
    color: #fff;
  }
  .el-menu-item-group{
    background-color: #99bbd1;

  }
  .el-menu-item i{
    color: #353b6d;
  }
  .el-submenu__title i{
    color: #353b6d;
  }
  .el-menu-item{
    color: #fff;
    }
    .is-active{
        color: #617794 !important;
    }
  .el-menu-item:focus, .el-menu-item:hover {
        background-color: #6e95a5 !important;
   }
   ::v-deep .el-submenu__title:hover{
        background-color: #6e95a5 !important;
   }
    



</style>

