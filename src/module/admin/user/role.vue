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
      <el-table :data="roleList.rows" border style="width: 100vw">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="name" label="角色名" >
        </el-table-column>
        <el-table-column prop="remark" label="简介" >
        </el-table-column>
        <el-table-column prop="createBy" label="创建者" >
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" > </el-table-column>
        <el-table-column prop="udateBy" label="编辑者"> </el-table-column>
        <el-table-column prop="updateTime" label="编辑时间"> </el-table-column>
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
            <el-col :span="12">
              <el-form-item label="角色名">
                <el-input
                  v-model="roleData.name"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="简介">
                <el-input
                  autocomplete="off"
                  v-model="userData.password"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>
    </div>
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
      roleData: {},
      imageUrl:'',
      pageSize: 10,
      pageNum: 1,
    };
  },
  methods: {
    async getUser() {
      let data1 = await this.$api.user.getRole(this.input, "1", this.pageNum, this.pageSize);
      this.userList = data1;
    },
    async addUser() {

    },
    handleSizeChange(val) {
    this.pageSize = val
    },
    handleCurrentChange(val) {
    this.pageNum = val
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