/**
 * @jest-environment jsdom
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Builder from './Builder';
describe('Builder ', () => {
    describe('.createElement', () => {
        test('Should create HTML element', () => {
            const result = Builder.createElement('div', {}) instanceof Element;
            expect(result).toBe(true);
        });

        test('Should create div element by default', () => {
            const result = Builder.createElement();
            expect(result.tagName).toBe('DIV');
        });

        test('Should create element by tag', () => {
            let result = Builder.createElement('a');
            expect(result.tagName).toBe('A');

            result = Builder.createElement('header');
            expect(result.tagName).toBe('HEADER');

            result = Builder.createElement('footer');
            expect(result.tagName).toBe('FOOTER');

            result = Builder.createElement('img');
            expect(result.tagName).toBe('IMG');

            result = Builder.createElement('input');
            expect(result.tagName).toBe('INPUT');
        });

        test('Should correct add classes', () => {
            let result = Builder.createElement('div', {
                classes: 'test',
            });
            expect(result.classList.length).toBe(1);

            result = Builder.createElement('div', {
                classes: 'test test2',
            });
            expect(result.classList).toContain('test');
            expect(result.classList).toContain('test2');

            result = Builder.createElement('div', {
                classes: 'test,test2',
            });
            expect(result.classList).toContain('test');
            expect(result.classList).toContain('test2');

            result = Builder.createElement('div', {
                classes: 'test, test2',
            });
            expect(result.classList).toContain('test');
            expect(result.classList).toContain('test2');

            result = Builder.createElement('div', {
                classes: 'test,   test2',
            });
            expect(result.classList).toContain('test');
            expect(result.classList).toContain('test2');

            result = Builder.createElement('div', {
                classes: 'test,   ,test2',
            });
            expect(result.classList).toContain('test');
            expect(result.classList).toContain('test2');

            result = Builder.createElement('div', {
                classes: '.test,  ,. .,test2',
            });
            expect(result.classList).toContain('test');
            expect(result.classList).toContain('test2');

            result = Builder.createElement('div', {
                classes: ['test', 'test2'],
            });
            expect(result.classList).toContain('test');
            expect(result.classList).toContain('test2');

            result = Builder.createElement('div', {
                classes: ['.test', '.test2'],
            });
            expect(result.classList).toContain('test');
            expect(result.classList).toContain('test2');

            result = Builder.createElement('div', {
                classes: ['.test,', '.test2,'],
            });
            expect(result.classList).toContain('test');
            expect(result.classList).toContain('test2');
        });

        test('Should correct add id', () => {
            let result = Builder.createElement('div', {
                id: 'test',
            });
            expect(result.id).toBe('test');

            result = Builder.createElement('div', {
                id: '#test',
            });
            expect(result.id).toBe('test');

            result = Builder.createElement('div', {
                id: ' #test ',
            });
            expect(result.id).toBe('test');
        });

        test('Should correct add attributes', () => {
            let result = Builder.createElement('textarea', {
                attrs: {
                    row: 2,
                },
            });
            expect(result.getAttribute('row')).toBe('2');

            result = Builder.createElement('input', {
                attrs: {
                    type: 'text',
                    placeholder: 'test',
                },
            });
            expect(result.getAttribute('placeholder')).toBe('test');
        });

        test('Should correct add dataset', () => {
            const result = Builder.createElement('div', {
                dataset: {
                    test: 'test',
                },
            });
            expect(result.dataset.test).toBe('test');
        });

        test('Should correct add content', () => {
            let result = Builder.createElement('div', {
                content: 'test',
            });
            expect(result.innerHTML).toBe('test');

            result = Builder.createElement('div', {
                content: '<p></p>',
            });
            expect(result.children[0].tagName).toBe('P');

            result = Builder.createElement('div', {
                content: Builder.createElement('p'),
            });
            expect(result.children[0].tagName).toBe('P');

            result = Builder.createElement('div', {
                content: [Builder.createElement('p')],
            });
            expect(result.children[0].tagName).toBe('P');

            result = Builder.createElement('div', {
                content: [Builder.createElement('p'), '<div></div>'],
            });
            expect(result.children[1].tagName).toBe('DIV');
        });
    });
});
