import LiCarousel from './carousel'
import LiCarouselItem from './carousel-item'

export default (Vue) => {
  Vue.component(LiCarousel.name, LiCarousel)
  Vue.component(LiCarouselItem.name, LiCarouselItem)
}