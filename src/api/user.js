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
    getRole(queryString,status,currentPage,pageSize){
        return http.post(`/api/admin/role/list`,null,{
            currentPage,
            pageSize,
            queryString,
            status
        })
    }
}

export default user