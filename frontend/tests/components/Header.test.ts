import {describe, test, expect} from "vitest";
import Header from "~/components/Header.vue";
import {mountSuspended} from "@nuxt/test-utils/runtime";

describe("Header.vue", () => {
	test('render the header', async () => {
		const wrapper = await mountSuspended(Header, {
			route: '/'
		});

		expect(wrapper.find('header').exists()).toBe(true);
		expect(wrapper.find('header').find('img').exists()).toBe(true);
	})
})