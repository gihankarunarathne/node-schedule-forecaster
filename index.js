/**
 * A schedule forecaster for NodeJS which expose a generic API to
 * calculate number of occurrences within given time period.
 * Useful for API clients and sms, email, notification daemons
 * which tasks that need to calculate occurrence of a given event.
 *
 * USAGE:
 *   let ScheduleForecaster = require('schedule-forecaster);
 *   let forecaster = ScheduleForecaster.ScheduleForecaster;
 *   let nextTime = ScheduleForecaster.NextTime;
 */

'use strict';

let debug = require('debug')('ScheduleForecaster:lib:Index');

exports.ScheduleForecaster = require('./lib/ScheduleForecaster');
exports.NextTime = require('./lib/NextTime');
