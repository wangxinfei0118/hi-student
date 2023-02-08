<template>
  <div>
    <RecycleScroller
      class="scroller"
      :items="props.list"
      :item-size="itemSize"
      :emitUpdate="true"
      @update="update"
      v-if="props.list.length">
      <template v-slot="props">
        <div class="listItem" :key="props.itemKey">
          <div class="item-title text-medium-x font-semibold text-theme-black-650">
            {{ props.item.title }}
          </div>
          <div class="item-content mt-2 text-medium">
            {{ props.item.text }}
          </div>
          <div class="item-footer mt-2 text-small-x text-shadow-x flex justify-between">
            <div class="author">
              {{ props.item.author }}
            </div>
            <div class="time">
              {{ props.item.time }}
            </div>
          </div>
        </div>
      </template>
    </RecycleScroller>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  list: Array,
  itemSize: Number
})
const emits = defineEmits(['update'])

const getData = () => {}
const update = () => {}
getData()
</script>
<style lang="scss" scoped>
.scroller {
  height: 600px;
  background-color: #ccc;
}

.item {
  height: 98px;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
.listItem {
  border-bottom: 1px solid #f4f5f5;
  @apply py-2 bg-white;
}
</style>
