import Popover from './popover.vue'

Popover.install = function(Vue, options) {
  Vue.component(Popover.name, Popover)
}

export default Popover