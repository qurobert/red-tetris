import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
	test: {
		environment: 'nuxt',
		coverage: {
			enabled: true,
			provider: 'istanbul',
			all: true,
			exclude: [
				'node_modules/**',
				'types/**',
				'tests/**',
				'dist/**',
				'nuxt.config.ts',
				'tailwind.config.ts',
				'**/*.d.ts',
				'vitest.config.ts',
				'.nuxt/**',
				'virtual**',
				'.nuxt',
				'coverage/**',
				'**/coverage/**',
				'**/ui/**',
				'**/**.vue',
				'app.vue',
				'**/useSocket.ts',
			]
		}
	}
})
