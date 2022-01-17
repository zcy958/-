<template>
  <div class="page">
    <div class="login-panel">
        <div class="title">
            <span class="big">星游网</span>
            <span class="small">后台管理系统</span>
        </div>
        <div class="login-form">
            <div class="form-item">
                <div class="label">登录账户：</div>
                <input class="input" type="text" placeholder="请输入登录账户" v-model="username"/>
            </div>
            <div class="form-item">
                <div class="label">账户密码：</div>
                <input class="input" type="password" placeholder="请输入账户密码" v-model="password"/>
            </div>
            <div class="form-item">
                <div class="login-button" v-on:click="login()">登录</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
        username: null,
        password: null,
        token: null,
    }
  },
  methods: {
    async login(){
        localStorage.removeItem('userToken');
        let data = await this.$api.user.login(this.username,this.password)
        .catch(error =>{
            console.log(error);
            return false;
        })
        this.token = data.userName
        if(this.token!=null){
            console.log(this.token)
            localStorage.setItem('userToken',this.token);
            this.$router.push({path:'/home/detail'}, () => {});
        }else{
            this.$message.error({
            message: '用户名或密码错误!'
          });
        }
    },
  },
}
</script>

<style scoped>
.page{
    width:100vw;
    height:100vh;
    overflow: hidden;
    padding:0;
    margin:0;
    background-color: #74b9ff;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-size: cover;
}
.login-panel{
    background-color: #fff;
    width:450px;
    height:400px;
    box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    display:flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
}

.login-panel .title{
    margin-top:20px;
    font-weight:600;
    color:#74b9ff;
}
.title .big{
    font-size:180%;
}
.title .small{
    color:#888;
    font-size:120%;
}
.login-form{
    margin-top:20px;
    width:90%;
}
.login-form .form-item{
    display: flex;
    flex-direction: column;
    margin-top:15px;
}
.form-item .label{
    margin-top:15px;
    margin-bottom:10px;
    font-size:110%;
}

.form-item .input{
    line-height:32px;
    border:none;
    border-bottom:1px solid #888888;
    outline: none;
    font-size:105%;
}
.login-button{
    width:100px;
    padding:10px 15px;
    text-align: center;
    background-color:#74b9ff;
    color:#fff;
    margin:20px auto;
    cursor:pointer;
}
</style>