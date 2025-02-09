export enum Status {
  InProgress = 'In Progress',
  Completed = 'Completed',
  OnHold = 'On Hold',
  Cancelled = 'Cancelled',
  NotStarted = 'Not Started'
}

export type Department = {
  location: string;
  departmentName: string;
  employees: number;
  head: string;
};
