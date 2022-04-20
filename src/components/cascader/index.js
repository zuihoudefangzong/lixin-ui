import LiCascader from './cascader.vue'
import LiCascaderItems from './cascader-items.vue'

export default (Vue) => {
  Vue.component(LiCascader.name, LiCascader)
  Vue.component(LiCascaderItems.name, LiCascaderItems)
}