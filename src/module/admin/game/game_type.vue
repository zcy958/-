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
          @click="getType()"
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
        <el-button type="primary" @click="dialogFormVisible = true,editflag = false,typeData={}"
          >添加类型</el-button
        >
      </div>
    </div>
    <div class="page-table">
      <el-table :data="typeList.rows" border style="width: 100vw" :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="typeName" label="中文名" ></el-table-column>
        <el-table-column prop="typeNameEn" label="英文名" ></el-table-column>
        <el-table-column prop="status" label="状态" width="50"></el-table-column>
        <el-table-column prop="createBy" label="创建者" > </el-table-column>
        <el-table-column prop="createTime" label="创建时间" > </el-table-column>
        <el-table-column prop="updateBy" label="更改者" > </el-table-column>
        <el-table-column prop="updateTime" label="更改时间" > </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="250">
          <template slot-scope="scope">
              <el-row>
                  <el-button type="primary" size="mini" @click="edit(scope.row)">修改</el-button>
                  <el-button type="danger" size="mini" @click="delType(scope.row)">删除</el-button>
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
        :total="typeList.total"
        style="text-align:center;">
      </el-pagination>
      <el-dialog title="新增/编辑类型" :visible.sync="dialogFormVisible">
        <el-form :model="typeData" label-width="80px" size="mini">
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="中文名">
                <el-input
                  v-model="typeData.typeName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="英文名">
                <el-input
                  v-model="typeData.typeNameEn"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="状态">
                <el-radio-group v-model="typeData.status">
                  <el-radio label="禁用">禁用</el-radio>
                  <el-radio label="启用">启用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false,editflag = false">取 消</el-button>
          <el-button v-if="editflag == false" type="primary" @click="addType">创 建</el-button>
          <el-button v-if="editflag == true" type="primary" @click="editType">修 改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      selectStatus: "启用",
      editflag: false,
      dialogFormVisible:false,
      typeData:{},
      typeList:[],
      input:'',
      pageNum:1,
      pageSize:10,
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageNum = val
    },
    async getType(){
      let data1 = await this.$api.game.getType(this.input,this.selectStatus=="全部"?"":this.selectStatus, this.pageNum, this.pageSize);
      this.typeList = data1;
      console.log(this.typeList);
    },
    async editType(){
      this.typeData.updateBy = localStorage.getItem('userToken');
      let data1 = await this.$api.game.editType(this.typeData)
      if(data1.flag == false){
        this.$message.error({
          message: data1.message
        });
      }else{
        this.$message.success({
          message: data1.message
        });
      }
      this.dialogFormVisible = false
      this.getType();
    },
    edit(type){
      this.editflag = true
      this.dialogFormVisible = true
      this.typeData = JSON.parse(JSON.stringify(type))
    },
    async delType(type){
      let data1 = await this.$api.game.delType(type.typeId)
      if(data1.flag == false){
        this.$message.error({
          message: data1.message
        });
      }else{
        this.$message.success({
          message: data1.message
        });
      }
      this.getType();
    },
    async addType(){
      this.typeData.createBy = localStorage.getItem('userToken');
      let data1 = await this.$api.game.addType(this.typeData,this.typeIds)
      if(data1.flag == false){
        this.$message.error({
          message: data1.message
        });
      }else{
        this.$message.success({
          message: data1.message
        });
      }
      this.dialogFormVisible = false
      this.getType();
    },
    async status_change(type){
      let row = JSON.parse(JSON.stringify(type))
      if(row.status == "启用")row.status = "禁用"
      else
      if(row.status == "禁用")row.status = "启用"
      let data1 = await this.$api.game.editType(row);
      if(data1.flag == false){
        this.$message.error({
              message: data1.message
        });
      }else{
        this.$message.success({
              message: data1.message
        });
      }
      this.getType(); 
    },
  },
  mounted() {
    this.getType()
  },
}
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