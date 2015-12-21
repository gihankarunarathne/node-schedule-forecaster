/**
 * A Schedule Forecaster
 *
 * USAGE:
 *
 */

'use strict';

let NextTime = require('./NextTime');
let debug = require('debug')('ScheduleForecaster:lib:ScheduleForecaster');

module.exports = class ScheduleForecaster {
    constructor(opts) {}

    /**
     * Return forecast no of items need for given global message limit period
     * which bound from `startDate` to `endDate`
     * @param args {Object}
     * {
     *   recurrence: 'once|monthly|weekly|daily', // (optional) Default `monthly`
     *   limitPeriod: 'monthly|weekly|daily', // (optional) Default `monthly`
     *   startDate: '1234567890|Date|Date String', // (optional) Default `new Date()`
     *   endDate: '1234567890|Date|Date String', // (required)
     *   size: 10, // No of items (e.g.messages,email,sms) need to send in single schedule (optional) Default 1
     * }
     * @return {object}
     * E.g. If current date is 'Sun Nov 17 2015 00:00:00 GMT+0530 (IST)',
     * then it'll forecast number of items to be send by end of
     * 'Sun Dec 01 2015 00:00:00 GMT+0530 (IST)'
     * {
     *   '2015': {'11': 50, '12': 50},
     *   '2016': {'1': 50, '2': 25}
     * }
     */
    forecastSchedule(args) {
        debug('ForecastSchedule args: ', args);

        const STAMP = 1900;
        let occurences = {};
        args.recurrence = args.recurrence || 'monthly';
        // if the date is provided in other format, create a Date instance
        if (args.hasOwnProperty('startDate')) {
            if (!(args.startDate instanceof Date)) {
                let stampLength = args.startDate.toString().length;
                if (!isNaN(args.startDate) && stampLength < 13) {
                    args.startDate = parseInt(args.startDate) *
                        Math.pow(10, 13 - stampLength);
                }
            }
            args.startDate = new Date(args.startDate);
        }
        const startDate = args.startDate || new Date();

        if (args.hasOwnProperty('endDate')) {
            if (!(args.endDate instanceof Date)) {
                let stampLength = args.endDate.toString().length;
                if (!isNaN(args.endtDate) && stampLength < 13) {
                    args.endDate = parseInt(args.endDate) *
                        Math.pow(10, 13 - stampLength);
                }
            }
            args.endDate = new Date(args.endDate);
        } else {
            throw new Error(`'endDate' is required.`);
        }
        const endDate = args.endDate;

        switch (args.recurrence) {
            case 'once':
                let month = startDate.getMonth() + 1;
                occurences[STAMP + startDate.getYear()] = {};
                occurences[STAMP + startDate.getYear()][month] = args.size;
                break;
            case 'daily':
                for (let i = startDate.getYear(); i <= endDate.getYear(); i++) {
                    occurences[STAMP + i] = {};
                }
                // Iterate Date one by one
                while (startDate < endDate) {
                    let year = STAMP + startDate.getYear();
                    let month = startDate.getMonth() + 1;
                    if (occurences[year][month]) {
                        occurences[year][month] += args.size;
                    } else {
                        occurences[year][month] = args.size;
                    }
                    startDate.setDate(startDate.getDate() + 1);
                }
                break;
            case 'weekly':
                for (let i = startDate.getYear(); i <= endDate.getYear(); i++) {
                    occurences[STAMP + i] = {};
                }
                // Iterate Weeks one by one
                while (startDate < endDate) {
                    let year = STAMP + startDate.getYear();
                    let month = startDate.getMonth() + 1;
                    if (occurences[year][month]) {
                        occurences[year][month] += args.size;
                    } else {
                        occurences[year][month] = args.size;
                    }
                    startDate.setDate(startDate.getDate() + 7);
                }
                break;
            case 'monthly':
                const s = startDate.getDate(); // Starting date
                let nextMonth = new Date(startDate.getTime());

                for (let i = startDate.getYear(); i <= endDate.getYear(); i++) {
                    occurences[STAMP + i] = {};
                }
                // Iterate Months one by one
                while (nextMonth < endDate) {
                    let year = STAMP + nextMonth.getYear();
                    let month = nextMonth.getMonth() + 1;
                    occurences[year][month] = args.size;
                    nextMonth = NextTime.nextMonth(nextMonth, s);
                }
                break;
            default:
                occurences = 0;
                break;
        }

        return occurences;
    }

    /**
     * Return start date and end date of given global message limit period
     * @param args {Object}
     * {
     *   limitPeriod: 'monthly|weekly|daily', (optional) Default `monthly`
     *   date: '1234567890|Date|Date String', (optional) Default `new Date()`
     * }
     * @return {Object}
     * E.g. If current date is 'Sun Nov 01 2015 00:00:00 GMT+0530 (IST)',
     * then this method should return for `monthly` period
     * {
     *   start: 'Sun Nov 01 2015 00:00:00 GMT+0530 (IST)', // Date Object
     *   end: 'Sun Nov 30 2015 23:59:59 GMT+0530 (IST)' // Date Object
     * }
     */
    getLimitPeriod(args) {
        debug('GetLimitPeriod args: ', args);

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
                throw new Error(`Unknown limitPeriod ${args.limitPeriod}`);
                break;
        }

        return {
            start,
            end
        };
    }

};
