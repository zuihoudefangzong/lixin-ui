import chai, {expect} from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import {shallowMount, mount} from '@vue/test-utils'
import Carousel from '../../src/components/carousel/carousel.vue'
import LiCarouselItem from '../../src/components/carousel/carousel-item.vue'
import Vue from 'vue'
chai.use(sinonChai)

describe('carousel.vue', () => {

  it('存在.', () => {
    expect(Carousel).to.exist
  })

  it('接受 GuluSlidesItem，默认展示第一个', (done) => {
    Vue.component('li-carousel-item', LiCarouselItem)
    const wrapper = mount(Carousel, {
      propsData: {
        autoPlay: false
      },
      slots: {
        default: `
          <li-carousel-item name="1">
            <div class="box1">1</div>
          </li-carousel-item>

          <li-carousel-item name="2">
            <div class="box2">2</div>
          </li-carousel-item>

          <li-carousel-item name="3">
            <div class="box3">3</div>
          </li-carousel-item>
        `
      }
    })
    setTimeout(() => {
      // console.log('html')
      // console.log(wrapper.html())
      // 判断div.box存在
      expect(wrapper.find('.box1').exists()).to.be.true
      done()
    });
  })

  it('点击第二个就展示第二个轮播图', done => {
    Vue.component('li-carousel-item', LiCarouselItem)
    const wrapper = mount(Carousel, {
      propsData: {
        // 先关闭自动播放
        autoPlay: false
      },
      // name为1 2 3
      slots: {
        default: `
          <li-carousel-item name="1">
            <div class="box1">1</div>
          </li-carousel-item>

          <li-carousel-item name="2">
            <div class="box2">2</div>
          </li-carousel-item>

          <li-carousel-item name="3">
            <div class="box3">3</div>
          </li-carousel-item>
        `
      },

      // 监听事件update:selected事件
      listeners: {
        'update:selected': (x) => {
          expect(x).to.eq('2')
          done()
        }
      }
    })

    setTimeout(() => {
      wrapper.find('[data-index="1"]').trigger('click')
    })
  })

  it('会自动播放', done => {
    Vue.component('li-carousel-item', LiCarouselItem)
    // 申明假的回调
    const callback = sinon.fake();
    const wrapper = mount(Carousel, {
      propsData: {
        autoPlayDelay: 20
      },
      // name为1 2 3
      slots: {
        default: `
          <li-carousel-item name="1">
            <div class="box1">1</div>
          </li-carousel-item>

          <li-carousel-item name="2">
            <div class="box2">2</div>
          </li-carousel-item>

          <li-carousel-item name="3">
            <div class="box3">3</div>
          </li-carousel-item>
        `
      },

      // 监听事件update:selected事件
      listeners: {
        'update:selected': callback
      }
    })

    setTimeout(() => {
      expect(callback).to.have.calledWith('2')
      done()
    },21)
  })

  it('可以点击上一张', done => {
    Vue.component('li-carousel-item', LiCarouselItem)
    // 申明假的回调
    const callback = sinon.fake();
    const wrapper = mount(Carousel, {
      propsData: {
        // autoPlay: true,
        autoPlayDelay: 20,
        selected: '1'
      },
      // name为1 2 3
      slots: {
        default: `
          <li-carousel-item name="1">
            <div class="box1">1</div>
          </li-carousel-item>

          <li-carousel-item name="2">
            <div class="box2">2</div>
          </li-carousel-item>

          <li-carousel-item name="3">
            <div class="box3">3</div>
          </li-carousel-item>
        `
      },

      // 监听事件update:selected事件
      listeners: {
        'update:selected': callback
      }
    })

    setTimeout(() => {
      wrapper.find('[data-action="prev"]').trigger('click')
      expect(callback).to.have.been.calledWith('3')
      done()
    }, 21)
  })

  it('可以点击上一张', done => {
    Vue.component('li-carousel-item', LiCarouselItem)
    // 申明假的回调
    const callback = sinon.fake();
    const wrapper = mount(Carousel, {
      propsData: {
        // autoPlay: true,
        autoPlayDelay: 20,
        selected: '1'
      },
      // name为1 2 3
      slots: {
        default: `
          <li-carousel-item name="1">
            <div class="box1">1</div>
          </li-carousel-item>

          <li-carousel-item name="2">
            <div class="box2">2</div>
          </li-carousel-item>

          <li-carousel-item name="3">
            <div class="box3">3</div>
          </li-carousel-item>
        `
      },

      // 监听事件update:selected事件
      listeners: {
        'update:selected': callback
      }
    })

    setTimeout(() => {
      wrapper.find('[data-action="next"]').trigger('click')
      expect(callback).to.have.been.calledWith('2')
      done()
    }, 21)
  })
})
