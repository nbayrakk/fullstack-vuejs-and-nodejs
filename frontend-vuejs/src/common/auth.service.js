const { default: ApiService } = require("./api.service")

const AuthService = {
    login (user){
        return ApiService.post("auth/login",user)
    },
    register(user)  {
        return ApiService.post("auth/register",user)
    },
    logout(){
        return ApiService.get("auth/logout")
    },
    profile(){
        return ApiService.get("auth/profile")
    },
    editUser(user,userId){
        return ApiService.put(`auth/edit/${userId}`,user)
    }
}
export default  AuthService;