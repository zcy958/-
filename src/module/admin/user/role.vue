<template>
  <div class="page">
    <div class="page-top">
      <div class="page-top-search">
        <el-input
          v-model="input"
          placeholder="请输入内容"
          style="width: 200px"
        ></el-input>
        <el-button
          class="page-top-search-button"
          type="primary"
          icon="el-icon-search"
          @click="getUser()"
          >搜索</el-button
        >
        <el-radio-group v-model="selectStatus"
          class="page-top-search-button">
          <el-radio-button label="启用"></el-radio-button>
          <el-radio-button label="禁用"></el-radio-button>
          <el-radio-button label="全部"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="page-top-add">
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加角色</el-button
        >
      </div>
    </div>
    <div class="page-table">
      <el-table :data="roleList.rows" border style="width: 100vw" :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="角色名" >
        </el-table-column>
        <el-table-column prop="remark" label="简介" >
        </el-table-column>
        <el-table-column prop="status" label="状态" width="50">
        </el-table-column>
        <el-table-column prop="haveModule" label="拥有权限" >
        </el-table-column>
        <el-table-column prop="createBy" label="创建者" width="80">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" > </el-table-column>
        <el-table-column prop="udateBy" label="编辑者" width="80"> </el-table-column>
        <el-table-column prop="updateTime" label="编辑时间"> </el-table-column>
        <el-table-column
          label="操作"
          width="205"
          >
          <template slot-scope="scope">
              <el-row>
                  <el-button type="primary" size="mini" @click="editRole(scope.row)">修改</el-button>
                  <el-button type="danger" size="mini" @click="delRole(scope.row)">删除</el-button>
                  <el-button v-if="scope.row.status === '禁用'" type="success" size="mini" @click="listModule(scope.row)">启用</el-button>
                  <el-button v-if="scope.row.status === '启用'" type="danger" size="mini" @click="listModule(scope.row)">禁用</el-button>
                  <el-button type="success" size="mini" @click="authModule(scope.row),addModuleView = true">授权</el-button>
              </el-row>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="roleList.total"
        style="text-align:center;">
      </el-pagination>
      <el-dialog title="新增角色" :visible.sync="dialogFormVisible">
        <el-form :model="roleData" label-width="80px" size="mini">
          <el-row>
            <el-col :span="8" :offset="8">
              <el-form-item label="角色名">
                <el-input
                  v-model="roleData.name"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="8">
              <el-form-item label="简介">
                <el-input
                  autocomplete="off"
                  v-model="roleData.remark"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="8">
              <el-form-item label="状态">
                <el-radio-group v-model="roleData.status">
                  <el-radio label="禁用">禁用</el-radio>
                  <el-radio label="启用">启用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRole">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <el-dialog title="授权" :visible.sync="addModuleView">
      <el-tree
        :data="moduleList"
        ref="tree"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        @check-change="handleCheckChange"
        :default-checked-keys='resourceCheckedKey'>
        <span class="custom-tree-node" slot-scope="{ node }">
          <span>{{ node.label }}</span>
        </span>
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addModuleView = false">取 消</el-button>
        <el-button type="primary" @click="roleAuth">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      roleList: [],
      roleIds: "",
      input: "",
      dialogFormVisible: false,
      dialogFormVisibleRole: false,
      addModuleView: false,
      moduleList:[],
      checkModule:[],
      resourceCheckedKey:[],
      roleData: {},
      authRoleId:'',
      imageUrl:'',
      pageSize: 10,
      pageNum: 1,
      selectStatus: "启用"
    };
  },
  methods: {
    async getRole() {
      let data1 = await this.$api.user.getRole(this.input,this.selectStatus=="全部"?"":this.selectStatus, this.pageNum, this.pageSize);
      this.moduleList = await this.$api.user.getModule()
      this.roleList = data1;
      console.log(this.roleList);
    },
    async addRole(){
      this.roleData.createBy = localStorage.getItem('userToken');
      let data = await this.$api.user.addRole(this.roleData)
      if(data.flag == false){
        this.$message.error({
              message: data.message
        });
      }else{
        this.$message.success({
              message: data.message
        });
      }
      this.dialogFormVisible = false
      this.getRole();
    },
    async roleAuth(){
      let module = {
        roleId:this.authRoleId,
        modules:this.checkModule
      }
      console.log(module);
      let data = await this.$api.user.addRoleToModule(module)
      console.log(data);
      if(data.flag == false){
        this.$message.error({
              message: data.message
        });
      }else{
        this.$message.success({
              message: data.message
        });
      }
      this.addModuleView = false
      this.getRole();
    },
    handleSizeChange(val) {
    this.pageSize = val
    },
    handleCurrentChange(val) {
    this.pageNum = val
    },
    editRole(role){
      console.log(role);
    },
    async delRole(role){
      let data = await this.$api.user.delRole(role.roleId)
      if(data.flag == false){
        this.$message.error({
              message: data.message
        });
      }else{
        this.$message.success({
              message: data.message
        });
      }
      this.getRole();
    },
    listModule(role){
      console.log(role);
    },
    async authModule(role){
      this.resourceCheckedKey = await this.$api.user.getRoleModuleId(role.roleId)
      this.authRoleId = role.roleId
    },
    handleCheckChange () {
      let res = this.$refs.tree.getCheckedNodes().concat(this.$refs.tree.getHalfCheckedNodes())
      let arr = []
      res.forEach((item) => {
        if(Object.keys(item.children).length==0)
        arr.push({id:item.id,label:item.label})
      })
      this.checkModule = arr;
    },
  },
  mounted() {
    this.getRole();
  },
};
</script>

<style scoped>
.page {
  padding: 0;
  margin: 0;
  width: 100% !important;
}
.page-top {
  height: 40px;
}
.page-top-add {
  display: flex;
  float: right;
}
.page-top-search {
  float: left;
}
.page-top-search-button {
  margin-left: 20px;
}


.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 18px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }
  .el-button{
    margin: 3px;
  }
</style>