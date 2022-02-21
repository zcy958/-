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
        <el-button type="primary" @click="dialogFormVisible = true,editflage = false,userData={}"
          >添加用户</el-button
        >
      </div>
    </div>
    <div class="page-table">
      <el-table :data="userList.rows" border style="width: 100vw" :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="userName" label="用户名" width="80">
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="80">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="40"> </el-table-column>
        <el-table-column prop="age" label="年龄" width="40"> </el-table-column>
        <el-table-column prop="autograph" label="简介"> </el-table-column>
        <el-table-column prop="address" label="地址" width="160"> </el-table-column>
        <el-table-column prop="status" label="状态" width="50">
        </el-table-column>
        <el-table-column prop="createBy" label="创建者" width="80"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="250"> </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
              <el-row>
                  <el-button type="primary" size="mini" @click="editUser(scope.row)">修改</el-button>
                  <el-button type="danger" size="mini" @click="delUser(scope.row)">删除</el-button>
                  <el-button v-if="scope.row.status === '禁用'" type="success" size="mini" @click="status_change(scope.row)">启用</el-button>
                  <el-button v-if="scope.row.status === '启用'" type="danger" size="mini" @click="status_change(scope.row)">禁用</el-button>
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
        :total="userList.total"
        style="text-align:center;">
      </el-pagination>
      <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
        <el-form :model="userData" label-width="80px" size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名">
                <el-input
                  v-model="userData.userName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="密码">
                <el-input
                  placeholder="请输入密码"
                  v-model="userData.password"
                  show-password
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="昵称">
                <el-input
                  v-model="userData.nickName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年龄">
                <el-input
                  v-model="userData.age"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="电话">
                <el-input
                  v-model="userData.phone"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址">
                <el-input
                  v-model="userData.address"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="性别">
                <el-radio-group v-model="userData.sex">
                  <el-radio label="男">男</el-radio>
                  <el-radio label="女">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态">
                <el-radio-group v-model="userData.status">
                  <el-radio label="禁用">禁用</el-radio>
                  <el-radio label="启用">启用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="简介">
                <el-input
                  v-model="userData.autograph"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="头像">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-button type="primary" @click="checkRole(userData.userId)">
              选择角色
              </el-button
        >
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false,editflage = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>

      <!-- 添加角色对话框 -->

      <el-dialog title="添加角色" :visible.sync="dialogFormVisibleRole">
        <el-form>
          <el-form-item label="请选择角色">
            <template>
              <el-checkbox-group v-model="roleIds">
                <el-checkbox
                  v-for="role in roleList"
                  :label="role.roleId"
                  :key="role.roleId"
                  >{{ role.name }}</el-checkbox
                >
              </el-checkbox-group>
            </template>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisibleRole = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      userList: [],
      roleList: [],
      roleIds: [],
      input: "",
      dialogFormVisible: false,
      dialogFormVisibleRole: false,
      userData: {
        nickName:'',
        userName:'',
        password:'',
        sex:'',
        age:'',
        autograph:'',
        handImg:'',
        address:'',
        phone:'',
        status:'',
        createBy:'',
        userId:'',
      },
      imageUrl:'',
      pageSize: 10,
      pageNum: 1,
      editflag: false,
      selectStatus: "启用"
    };
  },
  methods: {
    async getUser() {
      let data1 = await this.$api.user.getUser(this.input, this.selectStatus=="全部"?"":this.selectStatus, this.pageNum, this.pageSize);
      let data2 = await this.$api.user.getRole("", "启用", this.pageNum, this.pageSize);
      this.userList = data1;
      this.roleList = data2.rows;
    },
    async addUser() {
      this.userData.createBy = localStorage.getItem('userToken');
      let data1 = {};
      if(this.editflage == false)data1 = await this.$api.user.addUser(this.userData,this.roleIds)
      else
      if(this.editflage == true)data1 = await this.$api.user.editUser(this.userData,this.roleIds)
      this.dialogFormVisible = false
      if(data1.flag == false){
        this.$message.error({
              message: data1.message
        });
      }else{
        this.$message.success({
              message: data1.message
        });
      }
      this.editflage = false
      this.getUser();
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageNum = val
    },
    async delUser(user){
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        let data1 = await this.$api.user.delUser(user.userId);
        if(data1.flag == false){
          this.$message.error({
                message: data1.message
          });
        }else{
          this.$message.success({
                message: data1.message
          });
        }
        this.getUser();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    async editUser(user){
      this.dialogFormVisible = true
      this.userData = JSON.parse(JSON.stringify(user))
      console.log(this.userData);
      this.editflage = true
    },
    async status_change(user){
      let row = JSON.parse(JSON.stringify(user))
      if(row.status == "启用")row.status = "禁用"
      else
      if(row.status == "禁用")row.status = "启用"
      let data1 = await this.$api.user.editUser(row);
      if(data1.flag == false){
        this.$message.error({
              message: data1.message
        });
      }else{
        this.$message.success({
              message: data1.message
        });
      }
      this.getUser();
    },
    async checkRole(userId){
      let data = await this.$api.user.getUserRole(userId)
      data.forEach((item,i) => {
        this.roleIds.push(item.roleId)
      })
      this.dialogFormVisibleRole = true
    }
  },
  mounted() {
    this.getUser();
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
</style>