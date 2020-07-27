export interface Comment {
  _id?: string;
  Tags: [string];
  comment: string;
  UserId: string;
  FlightId: string;
  date: string;
}
