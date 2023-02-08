import { ref } from 'vue'
import { getImageApi } from '@/api/user/user'

export default function useImage() {
  const imgSrc = ref('')
  //创建图片
  // btoa创建base64字符串
  const getImage = async () => {
    await getImageApi()
      .then((res) => {
        return (
          'data:image/png;base64,' +
          btoa(new Uint8Array(res.data as any).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        )
      })
      .then((data) => {
        imgSrc.value = data
      })
  }

  return {
    imgSrc,
    getImage
  }
}
