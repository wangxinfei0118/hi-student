import { reactive, ref } from 'vue'
import { LoginParams } from '@/api/user/UserModel'
import { ElForm } from 'element-plus'

export default function useLogin() {
  // 表单ref属性
  const loginFormRef = ref<InstanceType<typeof ElForm>>()

  //表单绑定的数据
  const loginModel = reactive<LoginParams>({
    username: '',
    password: '',
    code: ''
  })
  //表单验证规则
  const rules = reactive({
    username: [
      {
        required: true,
        trigger: 'blur',
        message: '请填写用户名'
      }
    ],
    password: [
      {
        required: true,
        trigger: 'blur',
        message: '请填写密码'
      }
    ],
    code: [
      {
        required: true,
        trigger: 'blur',
        message: '请填写验证码'
      }
    ]
  })
  return {
    loginModel,
    rules,
    loginFormRef
  }
}
