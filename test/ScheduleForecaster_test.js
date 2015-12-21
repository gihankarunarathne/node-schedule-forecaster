'use strict';

var assert = require("assert");
var ScheduleForecaster = require("../lib/ScheduleForecaster");

let debug = require('debug')('ScheduleForecaster:test:ScheduleForecaster');

describe("ScheduleForecaster: ", function() {
    let forecaster = null;

    before(function(done) {
        console.log("Setup Tests");
        forecaster = new ScheduleForecaster();
        done();
    });

    after(function(done) {
        console.log("Tear Down Tests");
        done();
    });

    describe('Forecast Monthly global limit ', () => {

        it('should forecast for monthly recurrence ', done => {
            const forecast = forecaster.forecastSchedule({
                numberCount: 10,
                recurrence: 'monthly',
                limitPeriod: 'monthly',
                startDate: new Date(2018, 11, 17),
                endDate: new Date(2019, 2, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 30);
            done();
        });

        it('should forecast for weekly recurrence ', done => {
            const forecast = forecaster.forecastSchedule({
                numberCount: 10,
                recurrence: 'weekly',
                limitPeriod: 'monthly',
                startDate: new Date(2018, 11, 17),
                endDate: new Date(2019, 0, 1)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 30);
            done();
        });

        it('should forecast for daily recurrence ', done => {
            const forecast = forecaster.forecastSchedule({
                numberCount: 10,
                recurrence: 'daily',
                limitPeriod: 'monthly',
                startDate: new Date(2018, 10, 17),
                endDate: new Date(2018, 11, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 300);
            done();
        });

        it('should forecast for once ', done => {
            const forecast = forecaster.forecastSchedule({
                numberCount: 10,
                recurrence: 'once',
                limitPeriod: 'monthly',
                startDate: new Date(2018, 10, 17),
                endDate: new Date(2019, 2, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 10);
            done();
        });

    });

    describe('Forecast Weekly global limit', () => {

        it('should forecast for once ', done => {
            const forecast = forecaster.forecastSchedule({
                numberCount: 10,
                recurrence: 'once',
                limitPeriod: 'weekly',
                startDate: new Date(2018, 11, 17),
                endDate: new Date(2019, 2, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 10);
            done();
        });

        it('should forecast for daily recurrence ', done => {
            const forecast = forecaster.forecastSchedule({
                numberCount: 10,
                recurrence: 'daily',
                limitPeriod: 'weekly',
                startDate: new Date(2018, 11, 17),
                endDate: new Date(2019, 0, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 310);
            done();
        });

        it('should forecast for weekly recurrence', done => {
            const forecast = forecaster.forecastSchedule({
                numberCount: 10,
                recurrence: 'weekly',
                limitPeriod: 'weekly',
                startDate: new Date(2018, 11, 17),
                endDate: new Date(2019, 0, 1)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 30);
            done();
        });

        it('should forecast for monthly recurrence', done => {
            const forecast = forecaster.forecastSchedule({
                numberCount: 10,
                recurrence: 'monthly',
                limitPeriod: 'weekly',
                startDate: new Date(2018, 11, 17),
                endDate: new Date(2019, 2, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 30);
            done();
        });

    });

    describe('Message Forecast Daily global limit', () => {

        it('should forecast for monthly recurrence ', done => {
            const forecast = forecaster.forecastSchedule({
                numberCount: 10,
                recurrence: 'monthly',
                limitPeriod: 'daily',
                startDate: new Date(2018, 10, 17),
                endDate: new Date(2019, 2, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 40);
            done();
        });

        it('should forecast for weekly recurrence ', done => {
            const forecast = forecaster.forecastSchedule({
                numberCount: 10,
                recurrence: 'weekly',
                limitPeriod: 'daily',
                startDate: new Date(2018, 11, 17),
                endDate: new Date(2019, 2, 3)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 110);
            done();
        });

        it('should forecast for daily recurrence ', done => {
            const forecast = forecaster.forecastSchedule({
                numberCount: 10,
                recurrence: 'daily',
                limitPeriod: 'daily',
                startDate: new Date(2019, 0, 1),
                endDate: new Date(2019, 2, 1, 0, 0, 1)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 600);
            done();
        });

        it('should forecast for once ', done => {
            const forecast = forecaster.forecastSchedule({
                numberCount: 10,
                recurrence: 'once',
                limitPeriod: 'daily',
                startDate: new Date(2018, 10, 17),
                endDate: new Date(2019, 2, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 10);
            done();
        });

    });

    describe('Forecast failure ', () => {
        it('should not forecast when recurrence not given ', done => {
            const forecast = forecaster.forecastSchedule({
                numberCount: 10,
                limitPeriod: 'daily',
                startDate: new Date(2018, 10, 17),
                endDate: new Date(2019, 2, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 40);
            done();
        });
    });

});
