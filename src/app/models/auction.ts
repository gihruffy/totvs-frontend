import {User} from "./user";

export class Auction {
  id: number;
  userId: number;
  name: String;
  initialValue: number;
  used: boolean;
  user: User;
  startDate: Date;
  endDate: Date;

}
