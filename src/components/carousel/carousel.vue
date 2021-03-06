<template>
  <!-- 鼠标停留就取消自动轮播 -->
  <div class="li-carousel"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <!-- 窗口window -->
    <div class="li-carousel-window">
      <div class="li-carousel-wrapper">
        <slot></slot>
        <!-- childrenLength需要写在data里才能响应式 -->
        <!-- selectedIndex === index 才会添加类名active -->
        <ul class="li-carousel-dots">
          <!-- data-index是为了测试的时候好找到当前元素 -->
          <li
            v-for="n in childrenLength"
            :key="n"
            :class="{'active': selectedIndex === n-1}"
            @click="select(n-1)"
            :data-index="n-1"
          >
            {{n}}
          </li>
        </ul>
        <!-- 左右箭头 -->
        <!-- data-action是为了测试的时候好找到当前元素 -->
        <span
          class="li-carousel-prev"
          @click="onClickPrev"
          data-action="prev"
        >
          <icon name="left"></icon>
        </span>
        <span
          class="li-carousel-next"
          @click="onClickNext"
          data-action="next"
        >
          <icon name="right"></icon>
        </span>
      </div>
      
    </div>
    
  </div>
</template>

<script>
import Icon from '../icon'
export default {
  name: 'LiCarousel',
  components: { Icon },
  props: {
    // 当前选中的幻灯片
    // 不传默认第一张开始
    selected: String,
    // 默认轮播自动播放
    autoPlay: {
      type: Boolean,
      default: true
    },
    // 轮播事件间隔
    autoPlayDelay:{
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      // 我的儿子li-carousel-item有多少个
      childrenLength: 0,
      // 标记上一张轮播的index 才确认动画的方向
      lastSelectedIndex: undefined,
      // setTimeout的id
      timerId: undefined,
      // 记录手指触摸的位置
      startTouch: null
    }
  },
  mounted() {
    // 更新updateChildren
    this.updateChildren()
    if(this.autoPlay) { this.playAutomatically() }
    this.childrenLength = this.items.length
  },
  updated () {
    this.updateChildren()
  },
  computed: {
    items () {
      // 找到所有children li-carousel-item
      // 这里有bug 所有计算属性应该组件created的时候开始调用了
      // Vue没有监听this.$children的变化
      // 所以刚开始return 是空数组
      // console.log(this.$children)
      return this.$children.filter( vm => vm.$options.name === 'LiCarouselItem')
    },
    names () {
      // 找到所有children的$data的name
      return this.items.map(vm => vm.name)
    },
    // 获取要准备显示的轮播图的index
    selectedIndex () {
      // 当前轮播到的index
      let index = this.names.indexOf(this.selected)
      // 假如用户没传或者传错
      return index === -1 ? 0 : index
    }
  },
  methods: {
    getSelected(){
      return this.selected || this.items[0].name
    },
    // 轮播自动播放function
    playAutomatically () {
      // 保证自动播放开始没有setTimeout
      if(this.timerId) return
      // 避免直接用setInterval 老手setTimeout模拟setIneterval
      let run = () => {
        // 拿到childrenVue组件的所有name
        // 最顶级要显示的name 索引 
        // 而且要每次setTimeout开始都重新获取
        let index = this.names.indexOf(this.getSelected())
        // console.log('自动轮播时候的index'+index)
        let newIndex = index + 1
        // 自动轮播就当自动就等于点击右箭头下一张
        // 告诉外界 下一张要显示的name
        this.select(newIndex)
        // 不断调用自己
        this.timerId = setTimeout(run, this.autoPlayDelay);
      }
      this.timerId = setTimeout(run, this.autoPlayDelay);
    },
    // 更新所有children的data里面的selected
    updateChildren(){
      // this.getSelected获取下一张显示轮播的名字
      let selected = this.getSelected()
      // 更改所有children的data里面的selected条件
      // 要确定定上一次显示的轮播图和下一张要显示的轮播图
      // 才能确认动画的方向
      this.items.forEach( vm => {
        // 更新选中的名字
        // 准备显示的轮播图的index和上一次轮播的index
        let reverse = this.selectedIndex > this.lastSelectedIndex ? false : true
        // 要判断在自动轮播的情况 才需要改变动画方向
        if(this.timerId) {
          // 最后一张要回到到第一张的
          if (this.lastSelectedIndex === this.childrenLength - 1
            && this.selectedIndex === 0) {
              reverse = false
            }
          // 第一张要回到最后一张的情况
          if(this.lastSelectedIndex === 0 
            && this.selectedIndex === this.childrenLength -1){
              reverse = true
            }
        }
        vm.reverse = reverse
        // 向最顶级更新准备显示的轮播图的名字
        // 就是vm.selected值更改 动画才会开始
        // 让它进入事件队列 不马上做动画
        this.$nextTick(() => {
          vm.selected = selected
        })
      })
    },
    // 停止自动轮播
    pause(){
      if(this.timerId) { window.clearTimeout(this.timerId)}
      this.timerId = undefined
    },
    // 当鼠标停留在轮播图的时候
    onMouseEnter() {
      this.pause()
    },
    // 鼠标移开轮播图的时候
    onMouseLeave() {
      this.playAutomatically()
    },
    // 指示器被点击的时候 只需更新最顶级显示carouresl名字
    select(newIndex) {
      // 保存上一张轮播图的index
      this.lastSelectedIndex = this.selectedIndex
      // console.log(this.lastSelectedIndex,`newIndex为${newIndex}`)
      if(newIndex === this.names.length ) {newIndex = 0}
      if(newIndex === -1 ) {newIndex =  this.names.length - 1}
      // 讲下一次要显示的name告诉最顶级
      this.$emit('update:selected', this.names[newIndex])
    },

    // 手机mobile
    onTouchStart(e) {
      // stop
      this.pause()
      console.log(e.touches[0],'触摸')
      this.startTouch = e.touches[0]
    },
    onTouchEnd(e) {
      // 触摸end只剩下changedTouches有检测结束的手指头
      // console.log('触摸end')
      let { clientX: x1, clientY: y1} = this.startTouch
      let { clientX: x2, clientY: y2}= e.changedTouches[0]

      // sqrt开根号 pow平方
      let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
      // console.log('斜边'+distance)
      // abs绝对值
      let deltaY = Math.abs(y2 - y1)
      // console.log('对边' + deltaY)
      // 斜边比对边倍数
      let rate = distance / deltaY
      // console.log('斜边比对边倍数'+rate)
      if(rate > 2 ) {
        console.log('在滑轮播图')
        // 在滑轮播图 才开始判断x轴
        if(x2 > x1) {
          // 用户往左滑 轮播往左走
          this.select(this.selectedIndex - 1)
        }
        else {
          this.select(this.selectedIndex + 1)
        }
      }
      // 恢复自动播放
      this.$nextTick(() => {
        this.playAutomatically()
      })
    },

    // 左右箭头事件
    onClickPrev () {
      this.select(this.selectedIndex - 1)
    },
    onClickNext () {
      this.select(this.selectedIndex + 1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'var';
.li-carousel {
  border: 1px solid black;
  // 继承上面的前缀 li-carousel-window
  &-window { overflow: hidden;}
  &-wrapper { 
    border: 3px solid green;
    position: relative;
  }
  &-dots {
    list-style: none;
    position: absolute;
    margin: 0;
    padding: 0;
    z-index: 2;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    >li {
      width: 1.2em;
      height: 1.2em;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      margin: 0 8px;
      background-color: transparent;
      &:hover {
        cursor: pointer;
      }
      &.active {
        background: $border-color;
        &:hover {
          cursor: default;
        }
      }
      
    }
  }
  &-prev,&-next {
    position: absolute;
    top: 50%;
    padding: 11px;
    border-radius: 50%;
    background-color: red;
  }
  &-prev {
    left: 6px;
  }
  &-next {
    right: 6px;
  }
}
</style>