import {describe, it, expect} from "vitest";
import {
	capitalizeFirstLetter,
	shuffle,
	cn
} from "~/utils";

describe('utils', () => {
	it('test capitalize first letter', () => {
		const string = 'hello';
		const stringMaj = capitalizeFirstLetter(string);
		expect(stringMaj).toBe('Hello');
	})

	it('test capitalize empty string', () => {
		const string = '';
		const stringMaj = capitalizeFirstLetter(string);
		expect(stringMaj).toBe('');
	})

	it('test shuffle 10 times not to be equal', () => {
		const array = [1, 2, 3, 4, 5];
		for (let i = 0; i < 10; i++) {
			const arrayShuffled = shuffle(array);
			expect(arrayShuffled).not.toEqual(array);
		}
	})

	it('test cn from shadcn', () => {
		const className = cn('shadow', 'md');
		expect(className).toBe('shadow md');
	})

})