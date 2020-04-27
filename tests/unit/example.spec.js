import { shallowMount } from '@vue/test-utils';
import ProfileInformation from '@/components/ProfileInformation.vue';

describe('ProfileInformation.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(ProfileInformation, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
