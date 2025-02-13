import { UserInterface } from './user.interface';

export interface PeopleInterface {
  count: number;
  next: string;
  previous: number;
  results: UserInterface[];
}
