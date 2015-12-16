/**
 * A Schedule Forecaster
 *
 * USAGE:
 *
 */

'use strict';

let debug = require('debug')('ScheduleForecaster:lib:ScheduleForecaster');

module.exports = class ScheduleForecaster {
    constructor(opts) {

    }

    /**
     * Return forecast number of messages count,
     * for given global message limit period which bound the `startDate`
     * @param args {object}
     * {
     *   numberCount: 10, // No of mobile number to send single message
     *   recurrence: 'once|monthly|weekly|daily', // (optional) Default `monthly`
     *   limitPeriod: 'monthly|weekly|daily', // (optional) Default `monthly`
     *   startDate: '1234567890|Date|Date String', // (optional) Default `new Date()`
     * }
     * @return {object}
     * E.g. If current date is 'Sun Nov 17 2015 00:00:00 GMT+0530 (IST)',
     * then it'll forecast number of messages to be send by end of
     * 'Sun Dec 01 2015 00:00:00 GMT+0530 (IST)'
     * {
     *   forecastMessages: 10
     * }
     */
    messageForecast(args) {
        debug('MessageForecast args: ', args);

        let occurences = 0;
        // if the date is provided in other format, create a Date instance
        if (args.hasOwnProperty('startDate') &&
            !(args.startDate instanceof Date)) {
            let stampLength = args.startDate.toString().length;
            if (!isNaN(args.startDate) && stampLength < 13) {
                args.startDate = parseInt(args.startDate) *
                    Math.pow(10, 13 - stampLength);
            }
            args.startDate = new Date(args.startDate);
        }
        const startDate = args.startDate || new Date();
        let period = this.getGlobalLimitPeriod({
            limitPeriod: args.limitPeriod
        });
        // if start Date is not lay in current period
        if (startDate.getTime() < period.start.getTime() ||
            period.end.getTime() < startDate.getTime()) {
            period = this.getGlobalLimitPeriod({
                limitPeriod: args.limitPeriod,
                date: startDate
            });
        }
        debug('global limit period: ', period);
        const timezoneOffset = startDate.getTimezoneOffset() * 60 * 1000;

        switch (args.recurrence) {
            case 'once':
                occurences = 1;
                break;
            case 'daily':
                occurences =
                    (new Date(period.end - startDate + timezoneOffset)).getDate();
                break;
            case 'weekly':
                const dates =
                    (new Date(period.end - startDate + timezoneOffset)).getDate();
                occurences = Math.floor((dates - 1) / 7);
                occurences++; // Added for current start date
                break;
            case 'monthly':
                occurences = 1;
                break;
            default:
                occurences = 0;
                break;
        }

        return {
            forecastMessages: occurences * args.numberCount
        };
    }

    /**
     * Return start date and end date of given global message limit period
     * @param args {object}
     * {
     *   limitPeriod: 'monthly|weekly|daily', (optional) Default `monthly`
     *   date: '1234567890|Date|Date String', (optional) Default `new Date()`
     * }
     * @return {object}
     * E.g. If current date is 'Sun Nov 01 2015 00:00:00 GMT+0530 (IST)',
     * then this method should return for `monthly` period
     * {
     *   start: 'Sun Nov 01 2015 00:00:00 GMT+0530 (IST)', // Date Object
     *   end: 'Sun Nov 30 2015 23:59:59 GMT+0530 (IST)' // Date Object
     * }
     */
    getGlobalLimitPeriod(args) {
        debug('GetGlobalLimitPeriod args: ', args);

        // Set default as `monthly`
        const period = args.limitPeriod || 'monthly';

        // if the date is provided in other format, create a Date instance
        if (args.hasOwnProperty('date') &&
            !(args.date instanceof Date)) {
            args.date = new Date(args.date);
        }
        // Set default current date
        const now = args.date || new Date();

        let start = now;
        let end = now;
        const year = 1900 + now.getYear();

        switch (args.limitPeriod) {
            case 'daily':
                start = new Date(year, now.getMonth(), now.getDate());
                end = new Date(year, now.getMonth(), now.getDate() + 1);
                end.setMilliseconds(-1);
                break;
            case 'weekly':
                const day = now.getDay();
                start = new Date(year, now.getMonth(), now.getDate() - day);
                end = new Date(year, now.getMonth(), now.getDate() + 7 - day);
                end.setMilliseconds(-1);
                break;
            case 'monthly':
                start = new Date(year, now.getMonth(), 1);
                end = new Date(year, now.getMonth() + 1, 1);
                end.setMilliseconds(-1);
                break;
            default:

                break;
        }

        return {
            start,
            end
        };
    }

};
