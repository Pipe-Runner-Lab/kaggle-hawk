import moment from 'moment';

export function parseDates(
  enabledDate: string,
  mergerDeadline: string | null,
  deadline: string
) {
  const start = moment(enabledDate);
  const end = moment(deadline);
  const merger = moment(mergerDeadline);

  const totalDays = end.diff(start, "days");
  const elapsedDays = moment().diff(start, "days");
  const mergerDays = mergerDeadline ? merger.diff(start, "days") : null;

  return {
    finishedFraction: (100 * elapsedDays) / totalDays,
    mergerFraction: (100 * mergerDays) / totalDays,
  };
}