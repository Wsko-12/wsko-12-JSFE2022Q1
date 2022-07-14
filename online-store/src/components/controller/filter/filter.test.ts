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
});
