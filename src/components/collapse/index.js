import LiCollapse from './collapse.vue'
import LiCollapseItem from './collapse-item.vue'

export default (Vue) => {
  Vue.component(LiCollapse.name, LiCollapse)
  Vue.component(LiCollapseItem.name, LiCollapseItem)
}