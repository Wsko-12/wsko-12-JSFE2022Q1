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

        test('Should return the same Array if filters incorrect', () => {
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

        test('Should return the same Array if filters incorrect', () => {
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

        test('Should return the same Array if filters incorrect', () => {
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

        test('Should return the same Array if filter incorrect', () => {
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

    describe('.filterByMinMax():', () => {
        let DATA;

        beforeEach(() => {
            DATA = [
                {
                    name: 'A',
                    price: 10,
                },
                {
                    name: 'B',
                    price: 20,
                },
                {
                    name: 'C',
                    price: 30,
                },
                {
                    name: 'D',
                    price: 50,
                },
                {
                    name: 'E',
                    price: 60,
                },
            ];
        });

        test('Should return the same Array if filter incorrect', () => {
            let result = filter.filterByMinMax(null, DATA, 'price');
            expect(result).toBe(DATA);

            result = filter.filterByMinMax({}, DATA, 'price');
            expect(result).toBe(DATA);

            result = filter.filterByMinMax({ price: 1 }, DATA, 'price');
            expect(result).toBe(DATA);

            result = filter.filterByMinMax({ price: { current: 1 } }, DATA, 'price');
            expect(result).toBe(DATA);

            result = filter.filterByMinMax({ price: { current: [] } }, DATA, 'price');
            expect(result).toBe(DATA);

            result = filter.filterByMinMax({ price: { current: ['1', '2'] } }, DATA, 'price');
            expect(result).toBe(DATA);

            result = filter.filterByMinMax({ price: { current: [1, true] } }, DATA, 'price');
            expect(result).toBe(DATA);
        });

        test('Should return same Array property undefined', () => {
            const DATA = [
                {
                    name: 'A',
                    price: 10,
                },
            ];
            const result = filter.filterByMinMax({}, DATA);
            expect(result).toBe(DATA);
        });

        test('Should return same Array if incorrect property', () => {
            const DATA = [
                {
                    name: 'A',
                    price: 10,
                },
            ];
            const result = filter.filterByMinMax({}, DATA, 'incorrect');
            expect(result).toBe(DATA);
        });

        test('Should filter by selected property', () => {
            DATA = [
                {
                    name: 'A',
                    year: 2020,
                },
                {
                    name: 'B',
                    price: 10,
                },
                {
                    name: 'B',
                    employees: 200,
                },
            ];

            const expected = [
                {
                    name: 'B',
                    employees: 200,
                },
            ];

            const filters = {
                employees: {
                    current: [0, 201],
                },
            };

            const result = filter.filterByMinMax(filters, DATA, 'employees');
            expect(result).toEqual(expected);
        });

        test('Should filter correct filter', () => {
            let expected = [
                {
                    name: 'B',
                    price: 20,
                },
                {
                    name: 'C',
                    price: 30,
                },
            ];

            let filters = {
                price: {
                    current: [11, 31],
                },
            };

            let result = filter.filterByMinMax(filters, DATA, 'price');
            expect(result).toEqual(expected);

            expected = [
                {
                    name: 'A',
                    price: 10,
                },
                {
                    name: 'B',
                    price: 20,
                },
                {
                    name: 'C',
                    price: 30,
                },
            ];

            filters = {
                price: {
                    current: [9, 31],
                },
            };

            result = filter.filterByMinMax(filters, DATA, 'price');
            expect(result).toEqual(expected);
        });

        test('Should filter correct filter if min or max value equal selected property', () => {
            const expected = [
                {
                    name: 'A',
                    price: 10,
                },
                {
                    name: 'B',
                    price: 20,
                },
                {
                    name: 'C',
                    price: 30,
                },
            ];

            const filters = {
                price: {
                    current: [10, 30],
                },
            };

            const result = filter.filterByMinMax(filters, DATA, 'price');
            expect(result).toEqual(expected);
        });
    });

    describe('.filterOut()', () => {
        let DATA;

        beforeEach(() => {
            DATA = [
                {
                    name: 'A',
                    color: ['blue'],
                    country: 'A',
                    discount: 10,
                    price: 10,
                    employees: 10,
                    year: 2000,
                },
                {
                    name: 'B',
                    color: ['red'],
                    country: 'A',
                    discount: 0,
                    price: 20,
                    employees: 20,
                    year: 2005,
                },
                {
                    name: 'C',
                    color: ['red', 'blue'],
                    country: 'B',
                    discount: 0,
                    price: 30,
                    employees: 30,
                    year: 2010,
                },
                {
                    name: 'D',
                    color: ['yellow'],
                    country: 'C',
                    discount: 0,
                    price: 40,
                    employees: 30,
                    year: 2015,
                },
            ];
        });

        test('Should return the same Array if filter incorrect', () => {
            let result = filter.filterOut(null, DATA);
            expect(result).toBe(DATA);

            result = filter.filterOut({}, DATA);
            expect(result).toBe(DATA);

            result = filter.filterOut(
                {
                    name() {
                        return 1;
                    },
                },
                DATA
            );
            expect(result).toBe(DATA);

            result = filter.filterOut(
                {
                    name: {
                        length: 1,
                    },
                },
                DATA
            );
            expect(result).toBe(DATA);
        });

        test('Should correct filtered data', () => {
            let filters = {
                colors: {
                    selected: ['red'],
                },
            };

            let expected = [
                {
                    name: 'B',
                    color: ['red'],
                    country: 'A',
                    discount: 0,
                    price: 20,
                    employees: 20,
                    year: 2005,
                },
                {
                    name: 'C',
                    color: ['red', 'blue'],
                    country: 'B',
                    discount: 0,
                    price: 30,
                    employees: 30,
                    year: 2010,
                },
            ];

            let result = filter.filterOut(filters, DATA);
            expect(result).toEqual(expected);

            filters = {
                colors: {
                    selected: ['red'],
                },
                countries: {
                    selected: ['B'],
                },
            };

            expected = [
                {
                    name: 'C',
                    color: ['red', 'blue'],
                    country: 'B',
                    discount: 0,
                    price: 30,
                    employees: 30,
                    year: 2010,
                },
            ];

            result = filter.filterOut(filters, DATA);
            expect(result).toEqual(expected);

            filters = {
                colors: {
                    selected: ['red'],
                },
                discountOnly: true,
                countries: {
                    selected: ['B'],
                },
            };

            result = filter.filterOut(filters, DATA);
            expect(result).toEqual([]);

            filters = {
                price: {
                    current: [20, 50],
                },
            };

            expected = [
                {
                    name: 'B',
                    color: ['red'],
                    country: 'A',
                    discount: 0,
                    price: 20,
                    employees: 20,
                    year: 2005,
                },
                {
                    name: 'C',
                    color: ['red', 'blue'],
                    country: 'B',
                    discount: 0,
                    price: 30,
                    employees: 30,
                    year: 2010,
                },
                {
                    name: 'D',
                    color: ['yellow'],
                    country: 'C',
                    discount: 0,
                    price: 40,
                    employees: 30,
                    year: 2015,
                },
            ];

            result = filter.filterOut(filters, DATA);
            expect(result).toEqual(expected);

            filters = {
                price: {
                    current: [20, 50],
                },
                employees: {
                    current: [25, 50],
                },
            };

            expected = [
                {
                    name: 'C',
                    color: ['red', 'blue'],
                    country: 'B',
                    discount: 0,
                    price: 30,
                    employees: 30,
                    year: 2010,
                },
                {
                    name: 'D',
                    color: ['yellow'],
                    country: 'C',
                    discount: 0,
                    price: 40,
                    employees: 30,
                    year: 2015,
                },
            ];

            result = filter.filterOut(filters, DATA);
            expect(result).toEqual(expected);

            filters = {
                price: {
                    current: [20, 50],
                },
                employees: {
                    current: [25, 50],
                },
                year: {
                    current: [2015, 2020],
                },
            };

            expected = [
                {
                    name: 'D',
                    color: ['yellow'],
                    country: 'C',
                    discount: 0,
                    price: 40,
                    employees: 30,
                    year: 2015,
                },
            ];

            result = filter.filterOut(filters, DATA);
            expect(result).toEqual(expected);
        });
    });

    describe('.calculateBasicFilters()', () => {
        let DATA;
        beforeEach(() => {
            DATA = [
                {
                    name: 'A',
                    color: ['blue'],
                    country: 'A',
                    discount: 10,
                    price: 10,
                    employees: 10,
                    year: 2000,
                },
                {
                    name: 'B',
                    color: ['red'],
                    country: 'A',
                    discount: 0,
                    price: 20,
                    employees: 20,
                    year: 2005,
                },
                {
                    name: 'C',
                    color: ['red', 'blue'],
                    country: 'B',
                    discount: 0,
                    price: 30,
                    employees: 30,
                    year: 2010,
                },
                {
                    name: 'D',
                    color: ['yellow'],
                    country: 'C',
                    discount: 0,
                    price: 40,
                    employees: 30,
                    year: 2015,
                },
            ];
        });

        test("Shouldn't change data array", () => {
            const dataClone = JSON.parse(JSON.stringify(DATA));
            filter.calculateBasicFilters(DATA);
            expect(DATA).toEqual(dataClone);
        });

        test('Name should be always empty string', () => {
            const result = filter.calculateBasicFilters(DATA);
            expect(result.name).toBe('');
        });

        test('Discount should be always false', () => {
            const result = filter.calculateBasicFilters(DATA);
            expect(result.discountOnly).toBe(false);
        });

        test('Should correct define min and max values', () => {
            const result = filter.calculateBasicFilters(DATA);
            expect(result.price.maxMin).toEqual([10, 40]);
            expect(result.employees.maxMin).toEqual([10, 30]);
            expect(result.year.maxMin).toEqual([2000, 2015]);
        });

        test('Should correct round min and max values', () => {
            DATA[0].price = 10.9999;
            DATA[3].price = 40.0001;

            DATA[0].year = 2000.9999;
            DATA[3].year = 2015.0001;

            DATA[0].employees = 10.9999;
            DATA[3].employees = 30.0001;

            const result = filter.calculateBasicFilters(DATA);
            expect(result.price.maxMin).toEqual([10, 41]);
            expect(result.year.maxMin).toEqual([2000, 2016]);
            expect(result.employees.maxMin).toEqual([10, 31]);
        });

        test('Should correct collect values', () => {
            const result = filter.calculateBasicFilters(DATA);
            expect(result.countries.all).toEqual(['A', 'B', 'C']);
            expect(result.colors.all).toContain('red');
            expect(result.colors.all).toContain('yellow');
            expect(result.colors.all).toContain('blue');
            expect(result.colors.all.length).toBe(3);
        });
    });
});
