declare type LiteralMonth = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

declare type LiteralMonthContainer = LiteralMonth[];

declare type CalendarState = {
  month: number;
  year: number;
  literalMonth: LiteralMonth;
};

declare type CalendarAction = {
  type: string;
};
