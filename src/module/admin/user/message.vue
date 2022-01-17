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
      </div>
      <div class="page-top-add">
        <el-button type="primary" @click="dialogFormVisible = true"
          >添加用户</el-button
        >
      </div>
    </div>
    <div class="page-table">
      <el-table :data="userList" border style="width: 100vw">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="userName" label="用户名" width="80">
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="80">
        </el-table-column>
        <el-table-column prop="password" label="密码" width="100">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="80"> </el-table-column>
        <el-table-column prop="age" label="年龄" width="80"> </el-table-column>
        <el-table-column prop="autograph" label="简介"> </el-table-column>
        <el-table-column prop="handImg" label="头像" width="80">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
        </el-table-column>
        <el-table-column prop="createBy" label="创建者"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      </el-table>
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
                <el-radio-group v-model="userData.gender">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态">
                <el-radio-group v-model="userData.state">
                  <el-radio label="0">停用</el-radio>
                  <el-radio label="1">启用</el-radio>
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
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
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
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
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
      roleIds: "",
      input: "",
      dialogFormVisible: false,
      dialogFormVisibleRole: false,
      userData: {},
      imageUrl:''
    };
  },
  methods: {
    async getUser() {
      let data1 = await this.$api.user.getUser(this.input, "1", 1, 6);
      let data2 = await this.$api.user.getRole();
      this.userList = data1.rows;
      this.roleList = data2.rows;
      console.log(this.userList);
    },
    async addUser() {

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