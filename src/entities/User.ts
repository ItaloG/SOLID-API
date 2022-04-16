import { v4 } from "uuid";

export class User {
  public readonly id?: string;

  public name: string;
  public email: string;
  public password: string;

  constructor(props: Pick<User, "name" | "email" | "password">, id?: string) {
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;

    if (!id) {
      this.id = v4();
    }
  }
}
