import http from '../http'

const user = {
    login(userName,password){
        return http.post(`/api/admin/user/login/backstage`,null,{
            userName,
            password
        })
    },
    getMenu(){
        return http.get(`/api/admin/menu/all`)
    },
    getUser(queryString,status,currentPage,pageSize){
        return http.post(`/api/admin/user/list`,null,{
            currentPage,
            pageSize,
            queryString,
            status
        })
    },
    addUser(userData,roleId){
        return http.post(`/api/admin/user/add`,null,{
            nickName:userData.nickName,
            userName:userData.userName,
            password:userData.password,
            sex:userData.sex,
            age:userData.age,
            autograph:userData.autograph,
            handImg:userData.handImg,
            address:userData.address,
            phone:userData.phone,
            status:userData.status,
            createBy:userData.createBy,
            roleId
        },)
    },
    delUser(userId){
        return http.delete(`/api/admin/user/${userId}`)
    },
    editUser(userData,roleId){
        return http.put(`/api/admin/user/edit`,null,{
            userId:userData.userId,
            nickName:userData.nickName,
            userName:userData.userName,
            password:userData.password,
            sex:userData.sex,
            age:userData.age,
            autograph:userData.autograph,
            handImg:userData.handImg,
            address:userData.address,
            phone:userData.phone,
            status:userData.status,
            createBy:userData.createBy,
            roleId
        })
    },
    getUserRole(userId){
        return http.get(`/api/admin/user/role/${userId}`)
    },
    getRole(queryString,status,currentPage,pageSize){
        return http.post(`/api/admin/role/list`,null,{
            currentPage,
            pageSize,
            queryString,
            status
        })
    },
    getRoleModuleId(roleId){
        return http.get(`/api/admin/role/moduleId/${roleId}`)
    },
    addRoleToModule(map){
        return http.post(`/api/admin/role/module`,null,{map})
    },
    addRole(role){
        return http.post(`/api/admin/role/add`,null,{
            name:role.name,
            remark:role.remark,
            status:role.status,
            createBy:role.createBy
        })
    },
    delRole(roleId){
        return http.delete(`/api/admin/role/${roleId}`)
    },
    getModule(){
        return http.post(`/api/admin/module/all`,null,null)
    },
    addModule(moduleData){
        return http.post(`/api/admin/module/add`,null,{
            parentId:moduleData.parentId,
            parentName:moduleData.parentName,
            name:moduleData.name,
            createBy:moduleData.createBy
        })
    },
    delModule(id){
        return http.delete(`/api/admin/module/del/${id}`)
    },
    editModule(moduleData){
        return http.put(`/api/admin/module/edit`,null,{
            parentId:moduleData.parentId,
            parentName:moduleData.parentName,
            name:moduleData.name,
            moduleId:moduleData.module_id,
            updateBy:moduleData.updateBy
        })
    }
}

export default user