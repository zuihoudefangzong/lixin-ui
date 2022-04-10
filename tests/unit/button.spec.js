import chai,{ expect } from 'chai'
import { shallowMount, mount} from '@vue/test-utils'
import Button from '@/components/button/button.vue'
// import sinon from 'sinon'
// import sinonChai from 'sinon-chai'
// chai.user(sinonChai)

describe('button.vue', () => {
  it('存在', () => {
    expect(Button).to.exist
    expect(1).to.exist
  })

  it('可以设置icon.', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings'
      }
    })
    const useElement = wrapper.find('use')
    expect(useElement.attributes()['href']).to.equal('#i-settings')
  })
})
