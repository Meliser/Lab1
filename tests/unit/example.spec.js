import { shallowMount } from '@vue/test-utils';
import ProfileInformation from '@/components/ProfileInformation.vue';

describe('ProfileInformation.vue', () => {
  it('VK API key must persist in environment', async () => {
    expect(!!process.env.VUE_APP_VK_KEY).toBeTruthy();
  });

  it('User id changes must trigger api request', async () => {
    const wrapper = shallowMount(ProfileInformation);
    wrapper.setData({ user_id: 'deerose0' });
    await wrapper.vm.$nextTick();
    expect(wrapper.contains('#user-info')).toBeTruthy();
  });

  it('Wrong request must show error message', async () => {
    const wrapper = shallowMount(ProfileInformation);
    wrapper.setData({ user_id: '--- unbelievable user name ---' });
    expect(wrapper.contains('#user-not-found')).toBeTruthy();
  });
});
