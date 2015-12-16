'use strict';

var assert = require("assert");
var ScheduleForecaster = require("../lib/ScheduleForecaster");

let debug = require('debug')('test:message_schedule');

describe("ScheduleMsg: ", function() {
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

    describe('Message Forecast Monthly global limit ', () => {

        it('should forecast for monthly recurrence ', done => {
            const forecast = forecaster.messageForecast({
                numberCount: 10,
                recurrence: 'monthly',
                limitPeriod: 'monthly',
                startDate: new Date(2018, 11, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 10);
            done();
        });

        it('should forecast for weekly recurrence ', done => {
            const forecast = forecaster.messageForecast({
                numberCount: 10,
                recurrence: 'weekly',
                limitPeriod: 'monthly',
                startDate: new Date(2018, 11, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 30);
            done();
        });

        it('should forecast for daily recurrence ', done => {
            const forecast = forecaster.messageForecast({
                numberCount: 10,
                recurrence: 'daily',
                limitPeriod: 'monthly',
                startDate: new Date(2018, 10, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 140);
            done();
        });

        it('should forecast for once ', done => {
            const forecast = forecaster.messageForecast({
                numberCount: 10,
                recurrence: 'once',
                limitPeriod: 'monthly',
                startDate: new Date(2018, 10, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 10);
            done();
        });

    });

    describe('Message Forecast Weekly global limit', () => {

        it('should forecast for once ', done => {
            const forecast = forecaster.messageForecast({
                numberCount: 10,
                recurrence: 'once',
                limitPeriod: 'weekly',
                startDate: new Date(2018, 11, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 10);
            done();
        });

        it('should forecast for daily recurrence ', done => {
            const forecast = forecaster.messageForecast({
                numberCount: 10,
                recurrence: 'daily',
                limitPeriod: 'weekly',
                startDate: new Date(2018, 11, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 60);
            done();
        });

        it('should forecast for weekly recurrence', done => {
            const forecast = forecaster.messageForecast({
                numberCount: 10,
                recurrence: 'weekly',
                limitPeriod: 'weekly',
                startDate: new Date(2018, 11, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 10);
            done();
        });

        it('should forecast for monthly recurrence', done => {
            const forecast = forecaster.messageForecast({
                numberCount: 10,
                recurrence: 'monthly',
                limitPeriod: 'weekly',
                startDate: new Date(2018, 11, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 10);
            done();
        });

    });

    describe('Message Forecast Daily global limit', () => {

        it('should forecast for monthly recurrence ', done => {
            const forecast = forecaster.messageForecast({
                numberCount: 10,
                recurrence: 'monthly',
                limitPeriod: 'daily',
                startDate: new Date(2018, 10, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 10);
            done();
        });

        it('should forecast for weekly recurrence ', done => {
            const forecast = forecaster.messageForecast({
                numberCount: 10,
                recurrence: 'weekly',
                limitPeriod: 'daily',
                startDate: new Date(2018, 10, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 10);
            done();
        });

        it('should forecast for daily recurrence ', done => {
            const forecast = forecaster.messageForecast({
                numberCount: 10,
                recurrence: 'daily',
                limitPeriod: 'daily',
                startDate: new Date(2018, 10, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 10);
            done();
        });

        it('should forecast for once ', done => {
            const forecast = forecaster.messageForecast({
                numberCount: 10,
                recurrence: 'once',
                limitPeriod: 'daily',
                startDate: new Date(2018, 10, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 10);
            done();
        });

    });

    describe('Message Forecast failure ', () => {
        it('should not forecast when recurrence not given ', done => {
            const forecast = forecaster.messageForecast({
                numberCount: 10,
                limitPeriod: 'daily',
                startDate: new Date(2018, 10, 17)
            });
            debug('Forecast : ', forecast);
            assert.equal(forecast.forecastMessages, 0);
            done();
        });
    });

});
