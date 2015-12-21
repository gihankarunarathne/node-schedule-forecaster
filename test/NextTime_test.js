'use strict';

let assert = require('assert');
let NextTime = require('../index').NextTime;
let debug = require('debug')('ScheduleForecaster:test:NextTime');

describe('NextTime ', () => {
    let nextTime = null;

    before(done => {
        nextTime = NextTime;
        done();
    });

    describe('NextDate ', () => {
        it('should return tomorrow date object ', done => {
            const d = nextTime.nextDate();
            assert.ok(d instanceof Date);
            done();
        });

        it('should return next date ', done => {
            const d = nextTime.nextDate(new Date(2015, 11, 17));
            assert.deepEqual(d, new Date(2015, 11, 18));
            done();
        });
    });

    describe('NextWeek ', () => {
        it('should return next week date object ', done => {
            const d = nextTime.nextWeek();
            assert.ok(d instanceof Date);
            done();
        });

        it('should return next week ', done => {
            const d = nextTime.nextWeek(new Date(2015, 11, 17));
            assert.deepEqual(d, new Date(2015, 11, 24));
            done();
        });
    });

    describe('NextMonth ', () => {
        it('should return month date object ', done => {
            const d = nextTime.nextMonth();
            assert.ok(d instanceof Date);
            done();
        });

        it('should return month date object at year end ', done => {
            const d = nextTime.nextMonth(new Date(2015, 11, 17));
            assert.deepEqual(d, new Date(2016, 0, 17));
            done();
        });

        it('should return month date object at year end ', done => {
            const d = nextTime.nextMonth(new Date(2015, 11, 31));
            assert.deepEqual(d, new Date(2016, 0, 31));
            done();
        });

        it('should return month date object for February ', done => {
            const d = nextTime.nextMonth(new Date(2016, 0, 31));
            debug(d);
            assert.deepEqual(d, new Date(2016, 1, 29));
            done();
        });

        it('should return month date object from February ', done => {
            const d = nextTime.nextMonth(new Date(2016, 1, 29), 31);
            debug(d);
            assert.deepEqual(d, new Date(2016, 2, 31));
            done();
        });
    });

});
