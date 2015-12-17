/**
 * A Time Forecaster
 *
 * USAGE:
 * let nextTime = require('ScheduleForecaster').NextTime;
 * nextTime.nextDate();
 * nextTime.nextDate(new Date(2015, 12, 17));
 * nextTime.nextWeek();
 * nextTime.nextWeek(new Date(2015, 12, 17));
 * nextTime.nextMonth();
 * nextTime.nextMonth(new Date(2015, 12, 17));
 */
'use strict';

let debug = require('debug')('ScheduleForecaster:lib:NextTime');

module.exports = class NextTime {

    static nextDate(date) {
        return date = this._getValidDate(date);
    }

    static nextWeek(date) {
        return date = this._getValidDate(date);
    }

    static nextMonth(date) {
        debug('NextMonth d: ', date);
        const STAMP = 1900;
        const d = this._getValidDate(date);

        let nextMonth = new Date(d.getTime()); // Create a shallow copy

        // WARNING: Date should change before Month, since changing month will
        // affect on Date
        let nextMonthEndWith = new Date(STAMP + d.getYear(), d.getMonth() + 2);
        nextMonthEndWith.setSeconds(-1);
        // Set next month `date`
        if (d.getDate() > nextMonthEndWith.getDate()) {
            nextMonth.setDate(nextMonthEndWith.getDate());
        } else {
            nextMonth.setDate(d.getDate());
        }

        let nextMonthBeginWith = new Date(STAMP + d.getYear(), d.getMonth() + 1);
        // Set next month `year` and `month`
        nextMonth.setYear(STAMP + nextMonthBeginWith.getYear());
        nextMonth.setMonth(nextMonthBeginWith.getMonth());

        return nextMonth;
    }

    /**
     * @private
     */
    static _getValidDate(date) {
        if (date) {
            if (!(date instanceof Date)) {
                let stampLength = date.toString().length;
                if (!isNaN(date) && stampLength < 13) {
                    date = parseInt(date) * Math.pow(10, 13 - stampLength);
                }
            }
            date = new Date(date);
        } else {
            date = new Date();
        }
        return date;
    }

};
