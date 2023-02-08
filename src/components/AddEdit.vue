<template>
  <el-dialog
    :model-value="dialog.visible"
    :title="dialog.title"
    :width="dialog.width + 'px'"
    :before-close="onClose"
    append-to-body
    center>
    <div class="container" :style="{ height: dialog.height + 'px' }">
      <el-input type="textarea" :rows="12" placeholder="请输入内容" v-model="textarea"></el-input>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary w-64" @click="confirm">发布</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import useDialog from '@/hooks/useDialog'
import { EditType, Title } from '@/type/BaseEnum'
import { ref } from 'vue'
const { dialog, onShow, onClose } = useDialog()
const textarea = ref('')
const emits = defineEmits(['onConfirm'])
const confirm = () => {
  emits('onConfirm')
  onClose()
}
const show = (type: string) => {
  switch (type) {
    case EditType.EDIT:
      dialog.title = Title.EDIT
      break
    case EditType.NEWS:
      dialog.title = Title.NEWS
      break
    case EditType.QUESTION:
      dialog.title = Title.QUESTION
      break
    case EditType.FLEAMARKET:
      dialog.title = Title.FLEAMARKET
      break
    case EditType.FOUND:
      dialog.title = Title.FOUND
  }
  onShow()
}
defineExpose({
  show
})
</script>

<style scoped></style>
