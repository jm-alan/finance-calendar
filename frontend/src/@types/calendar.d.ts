declare type CalendarState = {
  month: number;
  year: number;
  literalMonth: 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';
};

declare type CalendarAction = {
  type: string;
};
