interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  dateNow(): Date;
  convertToUtc(date: Date): string;
  compareInDays(start_date: Date, end_date: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfBefore(start_date: Date, end_date): boolean;
}

export { IDateProvider };
