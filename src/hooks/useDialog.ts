//弹窗相关
import { DialogModel } from '@/type/BastType'
import { reactive } from 'vue'

export default function useDialog() {
  //弹窗属性
  const dialog = reactive<DialogModel>({
    title: '',
    visible: false,
    width: 480,
    height: 300
  })
  //展示
  const onShow = () => {
    dialog.visible = true
  }
  //关闭
  const onClose = () => {
    dialog.visible = false
  }
  //确定
  const onConfirm = () => {
    dialog.visible = false
  }
  return {
    dialog,
    onShow,
    onClose,
    onConfirm
  }
}
