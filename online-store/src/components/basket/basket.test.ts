/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Basket from './Basket';

jest.mock('../localStorage/LocalStorage', () => {
    return function LocalStorage() {
        this.getBasket = () => [];
        this.saveBasket = () => null;
    };
});
describe('Basket ', () => {
    const basket = new Basket();

    describe('Singleton', () => {
        test('Should be singleton', () => {
            expect(basket).toBe(new Basket());
        });
    });

    describe('getItems()', () => {
        afterEach(() => {
            basket.clear();
        });

        test('Should return Array', () => {
            expect(Array.isArray(basket.getItems())).toBe(true);
        });

        test('Should return correct Array', () => {
            basket.toggle('test');
            expect(basket.getItems()).toEqual(['test']);
        });
    });

    describe('toggle()', () => {
        beforeEach(() => {
            basket.clear();
        });

        test('Should add item', () => {
            basket.toggle('test');
            expect(basket.getItems()).toEqual(['test']);
        });

        test('Should remove item', () => {
            basket.toggle('test');
            expect(basket.getItems()).toEqual(['test']);
            basket.toggle('test');
            expect(basket.getItems()).toEqual([]);
        });

        test('Should return boolean', () => {
            expect(typeof basket.toggle('test') === 'boolean').toBe(true);
        });

        test('Should return true if add item', () => {
            expect(basket.toggle('test')).toBe(true);
        });

        test('Should return false if remove item', () => {
            basket.toggle('test');
            expect(basket.toggle('test')).toBe(false);
        });

        test("Can't add more then 20 items", () => {
            for (let i = 0; i < 20; i++) {
                basket.toggle(`test${i}`);
            }

            expect(basket.toggle('test')).toBe(false);

            basket.toggle('test0');
            expect(basket.toggle('test')).toBe(true);
            expect(basket.toggle('test0')).toBe(false);
        });
    });

    describe('onFull()', () => {
        beforeEach(() => {
            basket.clear();
        });

        test("Don't calls if isn't full", () => {
            const spy = jest.spyOn(basket, 'onFull');
            for (let i = 0; i < 20; i++) {
                basket.toggle(`test${i}`);
            }
            expect(spy).not.toHaveBeenCalled();
        });

        test('Calls if full', () => {
            const spy = jest.spyOn(basket, 'onFull');
            for (let i = 0; i < 21; i++) {
                basket.toggle(`test${i}`);
            }
            expect(spy).toHaveBeenCalled();
        });
    });
});
