import { getCurrentInstance } from 'vue'
import { LoginParams } from '@/api/user/UserModel'
import { useRouter } from 'vue-router'
import { userStore } from '@/store/user'

export default function loginRequest(loginModel: LoginParams) {
  const { proxy } = getCurrentInstance() as any
  const usStore = userStore()
  const router = useRouter()
  const login = async () => {
    proxy.$refs.loginFormRef.validate(async (valid: boolean) => {
      if (valid) {
        // await loginApi(loginModel).then((res)=>{
        //     console.log(res)
        // })
        usStore.login(loginModel).then((res) => {
          if (res.data.code == 200) {
            //获取用户信息
            usStore.getInfo()
            //转跳到首页
            router.push({ path: '/' })
          }
        })
      }
    })
  }

  return { login }
}
