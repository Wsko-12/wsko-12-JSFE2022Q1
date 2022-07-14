/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Filter from './Filter';
describe('Filter ', () => {
    const filter = new Filter();
    describe('.filterByDiscount():', () => {
        let DATA;

        beforeEach(() => {
            DATA = [
                {
                    name: 'A',
                    discount: 0,
                },
                {
                    name: 'B',
                    discount: 0,
                },
                {
                    name: 'C',
                    discount: 10,
                },
                {
                    name: 'D',
                    discount: 10,
                },
                {
                    name: 'E',
                    discount: 0,
                },
            ];
        });

        test('Should return the same Array if filters uncorrected', () => {
            let result = filter.filterByDiscount(null, DATA);
            expect(result).toBe(DATA);

            result = filter.filterByDiscount({}, DATA);
            expect(result).toBe(DATA);

            result = filter.filterByDiscount({ name: [] }, DATA);
            expect(result).toBe(DATA);
        });

        test('Should return the same Array if filter not setted', () => {
            const filters = {
                discountOnly: false,
            };
            const result = filter.filterByDiscount(filters, DATA);
            expect(result).toBe(DATA);
        });

        test('Should return new Array if filter setted', () => {
            const filters = {
                discountOnly: true,
            };
            const result = filter.filterByDiscount(filters, DATA);
            expect(result).not.toBe(DATA);
        });

        test('Should return correct Array', () => {
            const filters = {
                discountOnly: true,
            };

            const result = filter.filterByDiscount(filters, DATA);

            expect(result).toContainEqual({
                name: 'C',
                discount: 10,
            });

            expect(result).toContainEqual({
                name: 'D',
                discount: 10,
            });

            expect(result).not.toContainEqual({
                name: 'A',
                discount: 0,
            });

            expect(result).not.toContainEqual({
                name: 'B',
                discount: 0,
            });

            expect(result).not.toContainEqual({
                name: 'E',
                discount: 0,
            });
        });
    });

    describe('.filterByLogoColor():', () => {
        let DATA;

        beforeEach(() => {
            DATA = [
                {
                    name: 'A',
                    color: ['red'],
                },
                {
                    name: 'B',
                    color: ['blue'],
                },
                {
                    name: 'C',
                    color: ['yellow'],
                },
                {
                    name: 'D',
                    color: ['red', 'yellow'],
                },
                {
                    name: 'E',
                    color: ['red', 'yellow', 'blue'],
                },
            ];
        });

        test('Should return the same Array if filters uncorrected', () => {
            let result = filter.filterByLogoColor(null, DATA);
            expect(result).toBe(DATA);

            result = filter.filterByLogoColor({}, DATA);
            expect(result).toBe(DATA);

            result = filter.filterByLogoColor(
                {
                    colors: 1,
                },
                DATA
            );
            expect(result).toBe(DATA);

            result = filter.filterByLogoColor(
                {
                    colors: {
                        selected: '1',
                    },
                },
                DATA
            );
            expect(result).toBe(DATA);
        });

        test('Should return the same Array if filter not setted', () => {
            const filters = {
                colors: {
                    selected: [],
                },
            };
            const result = filter.filterByLogoColor(filters, DATA);
            expect(result).toBe(DATA);
        });

        test('Should return new Array if filter setted', () => {
            const filters = {
                colors: {
                    selected: ['red'],
                },
            };
            const result = filter.filterByLogoColor(filters, DATA);
            expect(result).not.toBe(DATA);
        });

        test('Should return correct Array if filter by one color', () => {
            const filters = {
                colors: {
                    selected: ['red'],
                },
            };

            const expected = [
                {
                    name: 'A',
                    color: ['red'],
                },
                {
                    name: 'D',
                    color: ['red', 'yellow'],
                },
                {
                    name: 'E',
                    color: ['red', 'yellow', 'blue'],
                },
            ];

            const result = filter.filterByLogoColor(filters, DATA);
            expect(result).toEqual(expected);
        });

        test('Should return correct Array if filter by several colors', () => {
            let filters = {
                colors: {
                    selected: ['red', 'blue'],
                },
            };

            let expected = [
                {
                    name: 'E',
                    color: ['red', 'yellow', 'blue'],
                },
            ];

            let result = filter.filterByLogoColor(filters, DATA);
            expect(result).toEqual(expected);

            filters = {
                colors: {
                    selected: ['red', 'yellow'],
                },
            };

            expected = [
                {
                    name: 'D',
                    color: ['red', 'yellow'],
                },
                {
                    name: 'E',
                    color: ['red', 'yellow', 'blue'],
                },
            ];

            result = filter.filterByLogoColor(filters, DATA);
            expect(result).toEqual(expected);
        });

        test('Should return empty Array if items not found by this filter', () => {
            const filters = {
                colors: {
                    selected: ['red', 'blue', 'white'],
                },
            };

            const result = filter.filterByLogoColor(filters, DATA);
            expect(result).toEqual([]);
        });
    });

    describe('.filterByCountry():', () => {
        let DATA;

        beforeEach(() => {
            DATA = [
                {
                    name: 'A',
                    country: 'A',
                },
                {
                    name: 'B',
                    country: 'A',
                },
                {
                    name: 'C',
                    country: 'B',
                },
                {
                    name: 'D',
                    country: 'C',
                },
                {
                    name: 'E',
                    country: 'D',
                },
            ];
        });

        test('Should return the same Array if filters uncorrected', () => {
            let result = filter.filterByLogoColor(null, DATA);
            expect(result).toBe(DATA);

            result = filter.filterByLogoColor({}, DATA);
            expect(result).toBe(DATA);

            result = filter.filterByLogoColor(
                {
                    colors: 1,
                },
                DATA
            );
            expect(result).toBe(DATA);

            result = filter.filterByLogoColor(
                {
                    colors: {
                        selected: '1',
                    },
                },
                DATA
            );
            expect(result).toBe(DATA);
        });

        test('Should return the same Array if filter not setted', () => {
            const filters = {
                countries: {
                    selected: [],
                },
            };
            const result = filter.filterByCountry(filters, DATA);
            expect(result).toBe(DATA);
        });

        test('Should return new Array if filter setted', () => {
            const filters = {
                countries: {
                    selected: ['A'],
                },
            };
            const result = filter.filterByCountry(filters, DATA);
            expect(result).not.toBe(DATA);
        });

        test('Should return correct Array if filter by one country', () => {
            let filters = {
                countries: {
                    selected: ['A'],
                },
            };

            let expected = [
                {
                    name: 'A',
                    country: 'A',
                },
                {
                    name: 'B',
                    country: 'A',
                },
            ];

            let result = filter.filterByCountry(filters, DATA);
            expect(result).toEqual(expected);

            filters = {
                countries: {
                    selected: ['B'],
                },
            };

            expected = [
                {
                    name: 'C',
                    country: 'B',
                },
            ];

            result = filter.filterByCountry(filters, DATA);
            expect(result).toEqual(expected);
        });

        test('Should return correct Array if filter by several countries', () => {
            let filters = {
                countries: {
                    selected: ['A', 'B'],
                },
            };

            let expected = [
                {
                    name: 'A',
                    country: 'A',
                },
                {
                    name: 'B',
                    country: 'A',
                },
                {
                    name: 'C',
                    country: 'B',
                },
            ];

            let result = filter.filterByCountry(filters, DATA);
            expect(result).toEqual(expected);

            filters = {
                countries: {
                    selected: ['C', 'D'],
                },
            };

            expected = [
                {
                    name: 'D',
                    country: 'C',
                },
                {
                    name: 'E',
                    country: 'D',
                },
            ];

            result = filter.filterByCountry(filters, DATA);
            expect(result).toEqual(expected);
        });

        test('Should return empty Array if items not found by this filter', () => {
            const filters = {
                countries: {
                    selected: ['F'],
                },
            };

            const result = filter.filterByCountry(filters, DATA);
            expect(result).toEqual([]);
        });
    });

    describe('.filterByNameIncludes():', () => {
        let DATA;

        beforeEach(() => {
            DATA = [
                {
                    name: 'Aaa',
                },
                {
                    name: 'Bbb',
                },
                {
                    name: 'AaaBbb',
                },
                {
                    name: 'AAA',
                },
                {
                    name: 'Bcbb',
                },
            ];
        });

        test('Should return the same Array if filter uncorrected', () => {
            let result = filter.filterByNameIncludes(null, DATA);
            expect(result).toBe(DATA);

            result = filter.filterByNameIncludes({}, DATA);
            expect(result).toBe(DATA);

            result = filter.filterByNameIncludes(
                {
                    name: [],
                },
                DATA
            );
            expect(result).toBe(DATA);

            result = filter.filterByNameIncludes(
                {
                    name: 1,
                },
                DATA
            );
            expect(result).toBe(DATA);
        });

        test('Should return the same Array if filter not setted', () => {
            const filters = {
                name: '',
            };
            const result = filter.filterByNameIncludes(filters, DATA);
            expect(result).toBe(DATA);
        });

        test('Should return new Array if filter setted', () => {
            const filters = {
                name: 'Aaa',
            };
            const result = filter.filterByNameIncludes(filters, DATA);
            expect(result).not.toBe(DATA);
        });

        test("Shouldn't be case sensitive", () => {
            DATA = [
                {
                    name: 'Aaa',
                },
                {
                    name: 'aaa',
                },
                {
                    name: 'aaA',
                },
                {
                    name: 'AAA',
                },
            ];

            const filters = {
                name: 'aaa',
            };
            const result = filter.filterByNameIncludes(filters, DATA);
            expect(result).toEqual(DATA);
        });

        test('Should search for matches in the specified letter order', () => {
            DATA = [
                {
                    name: 'aaa',
                },
                {
                    name: 'bbaa',
                },
                {
                    name: 'aba',
                },
                {
                    name: 'aabbaa',
                },
            ];

            const filters = {
                name: 'aa',
            };

            const expected = [
                {
                    name: 'aaa',
                },
                {
                    name: 'bbaa',
                },
                {
                    name: 'aabbaa',
                },
            ];
            const result = filter.filterByNameIncludes(filters, DATA);
            expect(result).toEqual(expected);
        });

        test('Should trim filter string', () => {
            DATA = [
                {
                    name: 'aaa',
                },
                {
                    name: 'aa',
                },
            ];

            const filters = {
                name: ' aa ',
            };

            const expected = [
                {
                    name: 'aaa',
                },
                {
                    name: 'aa',
                },
            ];
            const result = filter.filterByNameIncludes(filters, DATA);
            expect(result).toEqual(expected);
        });

        test('Should return empty Array if items not found by this filter', () => {
            DATA = [
                {
                    name: 'aaa',
                },
                {
                    name: 'aa',
                },
            ];

            const filters = {
                name: 'bb',
            };

            const result = filter.filterByNameIncludes(filters, DATA);
            expect(result).toEqual([]);
        });
    });
});
