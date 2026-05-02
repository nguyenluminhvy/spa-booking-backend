import moment from 'moment';

export function getDateRange(query: any) {
  const now = moment().local();

  const { range, startDate, endDate } = query;

  if (startDate && endDate) {
    const currentStart = moment(startDate).startOf('day');
    const currentEnd = moment(endDate).endOf('day');

    const diff = currentEnd.diff(currentStart, 'days') + 1;

    const prevStart = currentStart.clone().subtract(diff, 'days');
    const prevEnd = currentStart.clone().subtract(1, 'day').endOf('day');

    return {
      currentStart: currentStart.toDate(),
      currentEnd: currentEnd.toDate(),
      prevStart: prevStart.toDate(),
      prevEnd: prevEnd.toDate(),
    };
  }

  let rangeValue = range || 'day';

  if (range === 'all') {
    return {
      currentStart: null,
      currentEnd: null,
      prevStart: null,
      prevEnd: null,
    };
  }

  if (range === 'week') {
    rangeValue = 'isoWeek';
  }

  const currentStart = now.clone().startOf(rangeValue);
  const currentEnd = now.clone().endOf(rangeValue);

  const prevStart = currentStart.clone().subtract(1, rangeValue as any);
  const prevEnd = currentStart.clone();

  return {
    currentStart: currentStart.toDate(),
    currentEnd: currentEnd.toDate(),
    prevStart: prevStart.toDate(),
    prevEnd: prevEnd.toDate(),
  };
}

export function calcGrowth(current: number, prev: number) {
  if (!prev) return 0;
  return Math.round(((current - prev) / prev) * 100);
}

export function buildBusinessHourLabels(
  currentHour: number,
  start = 9,
  end = 21,
  max = 7,
): number[] {
  const lastHour = Math.min(currentHour, end);

  const hours: number[] = [];
  for (let h = start; h <= lastHour; h++) {
    hours.push(h);
  }

  const total = hours.length;

  if (total <= max) return hours;

  const result: number[] = [];

  result.push(hours[0]);

  const middleCount = max - 2;

  for (let i = 1; i <= middleCount; i++) {
    const ratio = i / (middleCount + 1);

    const index = Math.round((total - 1) * Math.pow(ratio, 0.8));

    const value = hours[index];

    if (!result.includes(value)) {
      result.push(value);
    }
  }

  result.push(hours[hours.length - 1]);

  return result.sort((a, b) => a - b);
}

export function buildFinal(
  fullLabels: any[],
  fullData: number[],
  selected: number[],
  format: (val: any) => string,
) {
  const labels: string[] = [];
  const data: number[] = [];

  selected.forEach((val) => {
    const index = fullLabels.indexOf(val);

    labels.push(format(val));
    data.push(fullData[index]);
  });

  return {
    code: 0,
    message: 'SUCCESS',
    data: {
      labels,
      data,
    },
  };
}

export function buildSmartLabels(total: number, max = 7) {
  if (total <= max) return Array.from({ length: total }, (_, i) => i + 1);

  const result = [1];
  const middle = max - 2;

  for (let i = 1; i <= middle; i++) {
    const ratio = i / (middle + 1);
    const value = Math.round(total * Math.pow(ratio, 0.8));

    if (!result.includes(value)) result.push(value);
  }

  result.push(total);

  return result.sort((a, b) => a - b);
}

export function generateHexToken(length: number = 64): string {
  const hex = '0123456789abcdef';
  let result = '';

  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * 16);
    result += hex[rand];
  }

  return result;
}
