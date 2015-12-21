# node-schedule-forecaster
A schedule forecaster for NodeJS which expose a generic API to calculate number of occurrences within given time period. Useful for API clients and sms, email, notification daemons which tasks that need to calculate occurrence of a given event.

## Installation

Use NPM to install using;

`npm install schedule-forecaster --save`

## Getting Started

Lets assume that we want to send a SMS to 10 mobile subscribers in each month. So, we are planing to create a schedule for this task. This schedule is going to start on 17th December of 2018 1.00 A.M., and we want to repeat this event on every month until it's end on 17th March of 2019, 2.00 A.M. Then we can calculate/forecast the number of SMS to be send on each month as below;

```JavaScript
let ScheduleForecaster = require('schedule-forecaster').ScheduleForecaster;
let forecaster = new ScheduleForecaster();

const forecast = forecaster.forecastSchedule({
    size: 10,
    recurrence: 'monthly',
    limitPeriod: 'monthly',
    startDate: new Date(2018, 11, 17, 1),
    endDate: new Date(2019, 2, 17, 2)
});

console.log(forecast);
// {'2018': { '12': 10}, '2019': { '1': 10, '2': 10, '3': 10} }
```
See test cases for more details.

## API

### forecastSchedule(args)

Forecast number of items need for given global message limit period which bound from `startDate` to `endDate`.

##### Parameters

An Object of parameters as described below;

- **recurrence** : *{String}* 'once|monthly|weekly|daily'
(optional) Default `monthly`

- **limitPeriod** : *{String}* 'monthly|weekly|daily'
(optional) Default `monthly`

- **startDate** : *{Integer/String/Date)* '1234567890|Date|Date String'
(optional) Default `new Date()`

- **endDate** : *{Integer/String/Date)* '1234567890|Date|Date String'
(required)

- **size** : *{Integer}* No of items (e.g.messages,email,sms) need to send in single schedule
(optional) Default 1

##### Return

Returns an Object which has keys as years, and values are also Objects such that
key values pairs of number of items to be send on each month.

E.g. If current date is 'Sun Nov 17 2015 00:00:00 GMT+0530 (IST)',
then it'll forecast number of items to be send by end of 'Sun Feb 10 2015 00:00:00 GMT+0530 (IST)' as below;

```JavaScript
{
    '2015': {'11': 30, '12': 50},
    '2016': {'1': 50, '2': 25}
}
```

## License

This Software is licensed under [MIT License](/LICENSE)

Copyright (c) 2015 Gihan Karunarathne <gckarunarathne@gmail.com>
