export interface EmailType {
  email: string;
}

export class Customer {

  id: number;
  name: string;
  email: EmailType;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = { email: email };
  }

}
