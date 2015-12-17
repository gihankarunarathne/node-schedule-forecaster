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
        return date = this._getValidDate(date);
    }

    /**
     * @private
     */
    static _getValidDate(date) {
        if(date) {
            if(!(date instanceof Date)) {
                let stampLength = date.toString().length;
                if(!isNaN(date) && stampLength < 13) {
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
