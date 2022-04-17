import Tabs from './tabs.vue'
import TabsHead from './tabs-head.vue'
import TabsItem from './tabs-item.vue'
import TabsBody from './tabs-body.vue'
import TabsPane from './tabs-pane.vue'

export default (Vue) => {
  Vue.component(Tabs.name, Tabs)
  Vue.component(TabsHead.name, TabsHead)
  Vue.component(TabsItem.name, TabsItem)
  Vue.component(TabsBody.name, TabsBody)
  Vue.component(TabsPane.name, TabsPane)
}
