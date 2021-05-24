import { mount, createLocalVue } from '@vue/test-utils';
import Navbar from '../../src/components/Navbar.vue';
import store from '../../src/store';
import Vuex from 'vuex';

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Navigation bar testing', () => {
    test('Only the title should be rendered if the user is not logged in', () => {
        const wrapper = mount(Navbar, { store, localVue })
        const mainTitle = wrapper.findAll('[data-testid="main-title"]')
        expect(mainTitle.length).toEqual(1);
        const navigationItems = wrapper.findAll('[data-testid="main-navigation"]');
        expect(navigationItems.length).toEqual(0);
    })
})
