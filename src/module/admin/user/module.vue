<template>
  <div class="page">
    <el-tree
      :data="moduleList"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            添加子权限
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            删除此权限
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => edit(node, data)">
            编辑此权限
          </el-button>
        </span>
      </span>
    </el-tree>
    <el-dialog title="新增权限" :visible.sync="dialogFormVisible">
        <el-form :model="moduleData" label-width="80px" size="mini">
          <el-row>
            <el-col :span="8" :offset="8" :disabled="true">
              <el-form-item label="父权限ID" >
                <el-input :disabled="true"
                  v-model="moduleData.parentId"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="8" >
              <el-form-item label="父权限名" >
                <el-input
                  v-model="moduleData.parentName" :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="8">
              <el-form-item label="权限名" >
                <el-input
                  v-model="moduleData.name"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addModule">创 建</el-button>
        </div>
    </el-dialog>

    <el-dialog title="编辑权限" :visible.sync="editflag">
        <el-form :model="moduleData" label-width="80px" size="mini">
          <el-row>
            <el-col :span="8" :offset="8" :disabled="true">
              <el-form-item label="父权限ID" >
                <el-input :disabled="true"
                  v-model="moduleData.parentId"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="8" >
              <el-form-item label="父权限名" >
                <el-input
                  v-model="moduleData.parentName" :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="8">
              <el-form-item label="权限名" >
                <el-input
                  v-model="moduleData.name"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editflag = false">取 消</el-button>
          <el-button type="primary" @click="editModule">修 改</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      moduleList:[],
      moduleData:{
        moduleId:'',
        parentId:'',
        parentName:'',
        name:'',
        createBy:'',
      },
      editflag: false,
      dialogFormVisible:false
    }
  },
  methods: {
    async getModule(){
      this.moduleList = await this.$api.user.getModule()
    },
    async addModule(){
      this.moduleData.createBy = localStorage.getItem('userToken');
      let data =  await this.$api.user.addModule(this.moduleData)
      this.dialogFormVisible = false
      if(data.flag == false){
        this.$message.error({
              message: data.message
        });
      }else{
        this.$message.success({
              message: data.message
        });
      }
      this.getModule()
    },
    append(data) {
      this.editflag = false
      this.dialogFormVisible = true
      this.moduleData.parentId = data.id
      this.moduleData.parentName = data.label
    },
    async remove(node, data) {
      console.log(node,data);
      let del = await this.$api.user.delModule(data.id)
      if(del.flag == false){
        this.$message.error({
              message: del.message
        });
      }else{
        this.$message.success({
              message: del.message
        });
      }
      this.getModule()
    },
    edit(node, data){
      this.editflag = true
      this.moduleData.parentId = node.parent.data.id
      this.moduleData.parentName = node.parent.data.label
      this.moduleData.module_id = data.id  
      this.moduleData.name = data.label
    },
    async editModule(){
      this.moduleData.updateBy = localStorage.getItem('userToken');
      let data =  await this.$api.user.editModule(this.moduleData)
      this.dialogFormVisible = false
      if(data.flag == false){
        this.$message.error({
              message: data.message
        });
      }else{
        this.$message.success({
              message: data.message
        });
      }
      this.editflag = false
      this.getModule()
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={ () => this.append(data) }>添加子权限</el-button>
            <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除此权限</el-button>
          </span>
        </span>);
    }
  },
  mounted() {
    this.getModule()
  },
}
</script>

<style scoped>
.page {
  padding: 0;
  margin: 0;
  width: 100vw !important;
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