'use strict';

let assert = require('assert');
let NextTime = require('../lib/NextTime');
let debug = require('debug')('ScheduleForecaster:test:NextTime');

describe.only('NextTime ', () => {
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
    });

    describe('NextWeek ', () => {
        it('should return next week date object ', done => {
            const d = nextTime.nextWeek();
            assert.ok(d instanceof Date);
            done();
        });
    });

    describe('NextMonth ', () => {
        it('should return month date object ', done => {
            const d = nextTime.nextMonth();
            assert.ok(d instanceof Date);
            done();
        });
    });

});
