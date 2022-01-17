<template>
  <div class="page">
    <div class="page-top">
      <div class="title">星游网后台管理系统</div>
      <div class="right">
        <div class="user-right">当前登录：{{ tokenId }}</div>
      </div>
    </div>
    <div class="page-change">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">
          <i class="el-icon-s-operation" />
        </el-radio-button>
        <el-radio-button :label="true">
          <i class="el-icon-more-outline" />
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="page-center">
      <el-menu
        :default-active = "defaultActive"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :router="true"
      >
        <el-menu-item index="/home/detail">
          <i class="el-icon-s-home"></i>
          <span slot="title">主页</span>
        </el-menu-item>

        <el-submenu
          :index="menu.menuFather"
          v-for="(menu, index) in menuList"
          :key="index">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{ menu.menuFather }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(menuListVo, index) in menu.menuListVos"
              :key="index"
              :index="menuListVo.menuKey"
              @click="menu_click(menuListVo)"
            >
              {{ menuListVo.menuName }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <div class="router">
        <el-tabs v-model="editableTabsValue" type="card" closable  @edit="handleTabsEdit" @tab-click="tabclick">
          <el-tab-pane
            :key="item.name"
            v-for="(item, index) in editableTabs"
            :label="item.title"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      isCollapse: true,
      tokenId: "",
      menuList: [],
      editableTabsValue: '',
      editableTabs: [],
      defaultActive: "/home/detail"
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async getMenu() {
      let data = await this.$api.user.getMenu();
      this.menuList = data;
      console.log(this.menuList);
    },
    handleTabsEdit(targetName, action) {
      if (action === 'remove') {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        if(tabs.length === 1){
          this.defaultActive = "/home/detail"
          this.$router.push("/home/detail")
        }else{
          this.$router.push(activeName)
          this.defaultActive = activeName
        }
      }
    },
    tabclick(targetName, action){
      this.$router.push(targetName.name)
    },
    menu_click(index){
      let flag = false;
      for(let i=0;i<this.editableTabs.length;i++){
        if(this.editableTabs[i].name === index.menuKey){
          this.editableTabsValue = index.menuKey;
          this.$router.push(index.menuKey)
          flag = true;
          break;
        }
      }
      if(flag == false){
        this.editableTabs.push({
          title: index.menuName,
          name: index.menuKey,
        });
        this.editableTabsValue = index.menuKey;
        this.$router.push(index.menuKey)
      }
    }
  },
  mounted() {
    this.tokenId = localStorage.getItem("userToken");
    this.getMenu();
  },
};
</script>

<style scoped>
body {
  top: 0;
  left: 0;
  overflow: hidden;
}
.page {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.page-top {
  height: 60px;
  background-color: #74b9ff;
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.6px solid rgba(99, 99, 99, 0.5);
}
.title {
  font-size: 110%;
  padding-left: 30px;
}
.user-right {
  font-size: 110%;
  padding-right: 30px;
}
.page-center {
  width: 100vw;
  display: flex;
  float: left;
}
.router{
  box-sizing: border-box;
  padding: 0 15px;
  height: 100vh;
  overflow-x: scroll;
  /* overflow-y: hidden */
}
</style>