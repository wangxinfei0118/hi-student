<script lang="tsx">
import { defineComponent, useAttrs } from 'vue'
const props = defineProps({
  pointColor: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  }
})
const attrs = useAttrs()

const clickHandler = attrs.onClick === 'function' ? attrs.onClick : () => {}
export default defineComponent({
  name: 'Status',
  setup() {
    return () => (
      <div class="flex items-center" onClick={clickHandler}>
        <div class="small-dot mr-1 bg-ddd" style={{ backgroundColor: props.pointColor }} />
        <span class="text-theme-black-650">{props.text}</span>
      </div>
    )
  }
})
</script>
