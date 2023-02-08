//表单清空
// formRef: 表单的ref属性  obj表单绑定的model
export default function resetForm(formRef: any, obj: any) {
  //清除表单绑定的model
  Object.keys(obj).forEach((key) => {
    obj[key] = ''
  })
  //清除表单验证
  if (formRef) {
    formRef.resetFields()
    formRef.clearValidate()
  }
}
