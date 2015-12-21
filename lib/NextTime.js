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
        date = this._getValidDate(date);
        date.setDate(date.getDate() + 1);
        return date;
    }

    static nextWeek(date) {
        date = this._getValidDate(date);
        date.setDate(date.getDate() + 7);
        return date;
    }

    static nextMonth(date, upto) {
        debug('NextMonth d: ', date);
        const STAMP = 1900;
        const d = this._getValidDate(date);
        // If upto is undefined, assign given date
        if (!upto) upto = d.getDate();

        let nextMonth = new Date(d.getTime()); // Create a shallow copy
        nextMonth.setDate(1); // Avoid changing date while changing month

        // WARNING: Date should change before Month, since changing month will
        // affect on Date
        let nextMonthEndWith = new Date(STAMP + d.getYear(), d.getMonth() + 2);
        nextMonthEndWith.setSeconds(-1);
        // Set next month `date`
        let nextMonthDate = upto;
        if (upto > nextMonthEndWith.getDate()) {
            nextMonthDate = nextMonthEndWith.getDate();
        } else {
            nextMonthDate = upto;
        }

        let nextMonthBeginWith = new Date(STAMP + d.getYear(), d.getMonth() + 1);
        // Set next month `year` and `month`
        nextMonth.setYear(STAMP + nextMonthBeginWith.getYear());
        nextMonth.setMonth(nextMonthBeginWith.getMonth());
        nextMonth.setDate(nextMonthDate);

        return nextMonth;
    }

    static nextMonths(startDate, endDate) {
        debug('NextMonths start: ', startDate, ' end: ', endDate);
        let occurences = [startDate];

        const s = startDate.getDate(); // Starting date
        let nextMonth = this.nextMonth(startDate, s);
        while (nextMonth < endDate) {
            occurences.push(nextMonth);
            nextMonth = this.nextMonth(nextMonth, s);
        }

        return occurences;
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
