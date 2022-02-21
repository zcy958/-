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
          @click="getGame()"
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
        <el-button type="primary" @click="dialogFormVisible = true,editflag = false,gameData={}"
          >添加游戏</el-button
        >
      </div>
    </div>
    <div class="page-table">
      <el-table :data="gameList.rows" border style="width: 100vw" :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="gameName" label="中文名" width="80"></el-table-column>
        <el-table-column prop="gameNameEn" label="英文名" width="80"></el-table-column>
        <el-table-column prop="gamePlatform" label="游戏平台" width="80"></el-table-column>
        <el-table-column prop="gameLanguage" label="游戏语言" width="80"></el-table-column>
        <el-table-column prop="introduce" label="简介" width="200"></el-table-column>
        <el-table-column prop="productionName" label="制作厂商" width="80"></el-table-column>
        <el-table-column prop="issuingName" label="发行厂商" width="80"></el-table-column>
        <el-table-column prop="releaseDate" label="发行日期" width="80"></el-table-column>
        <el-table-column prop="hot" label="热度" width="50"></el-table-column>
        <el-table-column prop="status" label="状态" width="50"></el-table-column>
        <el-table-column prop="createBy" label="创建者" width="80"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="150"> </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
              <el-row>
                  <el-button type="primary" size="mini" @click="editGame(scope.row)">修改</el-button>
                  <el-button type="danger" size="mini" @click="delGame(scope.row)">删除</el-button>
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
        :total="gameList.total"
        style="text-align:center;">
      </el-pagination>
      <el-dialog title="新增游戏" :visible.sync="dialogFormVisible">
        <el-form :model="gameData" label-width="80px" size="mini">
          <el-row>
            <el-col :span="8" :offset="2">
              <el-form-item label="中文名">
                <el-input
                  v-model="gameData.gameName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="英文名">
                <el-input
                  v-model="gameData.gameNameEn"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="游戏平台">
                <el-input
                  v-model="gameData.gamePlatform"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="游戏语言">
                <el-input
                  v-model="gameData.gameLanguage"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            
            <el-col :span="8" :offset="2">
              <el-form-item label="制作厂商">
                <el-input
                  v-model="gameData.productionName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="发行厂商">
                <el-input
                  v-model="gameData.issuingName"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="发行日期">
                <el-input
                  v-model="gameData.releaseDate"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="热度">
                <el-input
                  v-model="gameData.hot"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18" :offset="2">
              <el-form-item label="简介">
                <el-input
                  type="textarea"
                  :rows="4"
                  v-model="gameData.introduce"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-form-item label="状态">
                <el-radio-group v-model="gameData.status">
                  <el-radio label="禁用">禁用</el-radio>
                  <el-radio label="启用">启用</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8" :offset="2">
              <el-button type="primary" @click="checkType(gameData.gameId)">
                选择游戏类型
              </el-button>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false,editflag = false">取 消</el-button>
          <el-button v-if="editflag == false" type="primary" @click="addGame">创 建</el-button>
          <el-button v-if="editflag == true" type="primary" @click="editGameData">修 改</el-button>
        </div>
      </el-dialog>

      <el-dialog title="选择游戏类型" :visible.sync="dialogFormVisibleType">
        <el-form>
          <el-form-item label="请选择类型">
            <template>
              <el-checkbox-group v-model="typeIds">
                <el-checkbox
                  v-for="type in typeList"
                  :label="type.typeId"
                  :key="type.typeId"
                  >{{ type.typeName }}</el-checkbox
                >
              </el-checkbox-group>
            </template>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleType = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisibleType = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      dialogFormVisibleType:false,
      dialogFormVisible:false,
      pageNum:1,
      pageSize:10,
      gameList:[],
      gameData:{},
      typeList:[],
      typeData:{},
      input:'',
      typeIds:[],
      editflag:false,
      selectStatus: "启用"
    }
  },
  methods: {
    async getGame() {
      let data1 = await this.$api.game.getGame(this.input,this.selectStatus=="全部"?"":this.selectStatus, this.pageNum, this.pageSize);
      this.gameList = data1;
      console.log(this.gameList);
    },
    async getType(){
      let data1 = await this.$api.game.getAllType();
      this.typeList = data1;
      console.log(this.typeList);
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.pageNum = val
    },
    editGame(game){ 
      console.log(game);
    },
    async delGame(game){
      console.log(game);
      let data1 = await this.$api.game.delGame(game.gameId)
      if(data1.flag == false){
        this.$message.error({
              message: data1.message
        });
      }else{
        this.$message.success({
              message: data1.message
        });
      }
      this.getGame();
    },
    async addGame(){
      this.gameData.createBy = localStorage.getItem('userToken');
      let data1 = await this.$api.game.addGame(this.gameData,this.typeIds)
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
      this.editflag = false
      this.getGame();
    },
    editGame(game){
      this.dialogFormVisible = true
      this.editflag = true
      this.gameData = JSON.parse(JSON.stringify(game))
    },
    async editGameData(){
      this.gameData.updateBy = localStorage.getItem('userToken');
      let data1 = await this.$api.game.editGame(this.gameData,this.typeIds)
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
      this.editflag = false
      this.getGame();
    },
    async checkType(gameId){
      let data = await this.$api.game.getGameType(gameId)
      data.forEach((item,i) => {
        this.typeIds.push(item.typeId)
      })
      this.dialogFormVisibleType = true
    },
    async status_change(game){
      let row = JSON.parse(JSON.stringify(game))
      if(row.status == "启用")row.status = "禁用"
      else
      if(row.status == "禁用")row.status = "启用"
      let data1 = await this.$api.game.editGame(row);
      if(data1.flag == false){
        this.$message.error({
              message: data1.message
        });
      }else{
        this.$message.success({
              message: data1.message
        });
      }
      this.getGame(); 
    },
  },
  mounted() {
    this.getGame();
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