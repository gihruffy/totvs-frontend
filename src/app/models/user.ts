export class User {
  id!: number;
  userName!: string;
  role!: string;
  password?: string | undefined;
  token?: string | undefined;
}
