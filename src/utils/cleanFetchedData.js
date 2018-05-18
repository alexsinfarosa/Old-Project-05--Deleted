import currentModel from "./currentModel";
import { isSameYear, getHours, isWithinInterval } from "date-fns/esm";
import {
  averageMissingValues,
  flatten,
  unflatten,
  dailyToHourlyDates
} from "./utils";

export default (acisData, params) => {
  let lastDate = params.edateUnformatted;
  // current station
  const currentStn = acisData.get("currentStn");

  // dates has date of interest +5 days
  let dates = currentStn.map(arr => arr[0]);

  const currentStnValues = averageMissingValues(
    flatten(currentStn.map(arr => arr[1]))
  );

  // sister station
  const sisterStn = acisData.get("sisterStn");
  const sisterStnValues = flatten(sisterStn.map(arr => arr[1]));

  // replace current station values with sister station's
  let replaced = currentStnValues.map(
    (t, i) => (t === "M" ? sisterStnValues[i] : t)
  );

  replaced = averageMissingValues(replaced);

  // if date of interest is in current year
  if (isSameYear(new Date(), new Date(params.sdate))) {
    const forecast = acisData.get("forecast");
    dates = forecast.map(arr => arr[0]);
    lastDate = new Date(`${dates.slice(-1)[0]} 23:00`);

    const forecastValues = flatten(forecast.map(arr => arr[1]));
    const onlyForecastDays = forecastValues.slice(-120).map(t => t.toString());

    // replace missing values with forecast data
    replaced = replaced.map(
      (t, i) => (t === "M" ? forecastValues[i].toString() : t)
    );

    // adding the 5 days forecast data
    replaced = [...replaced, ...onlyForecastDays];
  }

  // Since data comes back as 1am-24am, we need to shift the arry [0,23] one hour forward
  replaced = ["null", ...replaced.slice(0, -1)];
  const hourlyDatesList = dailyToHourlyDates(params.sdate, lastDate);

  const replacedUnflattened = unflatten(replaced);
  const hourlyDatesListUnflatted = unflatten(hourlyDatesList);

  // convert hourly dates from standard time to local time
  let results = [];
  hourlyDatesListUnflatted.forEach((day, i) => {
    day.forEach((h, j) => {
      // make sure we return only the correct range of hourly dates
      if (
        isWithinInterval(h, {
          start: params.sdateUnformatted,
          end: lastDate
        })
      ) {
        const time = getHours(h);
        let p = {};
        p.date = h;
        p.temp = replacedUnflattened[i][time];
        results.push(p);
      }
    });
  });

  // console.log(results);
  return currentModel(results, params);
};
