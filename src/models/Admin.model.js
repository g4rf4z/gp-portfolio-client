import { Global } from "./Global.model";

export class Admin extends Global {
  constructor(data) {
    super(data);
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.nickname = data.nickname;
    this.email = data.email;
    this.password = data.password;
    this.role = data.role;
    this.isActive = data.isActive;
  }

  update(data) {
    super.update(data);
    this.convertAndUpdate(data, "firstname");
    this.convertAndUpdate(data, "lastname");
    this.convertAndUpdate(data, "nickname");
    this.convertAndUpdate(data, "email");
    this.convertAndUpdate(data, "password");
    this.convertAndUpdate(data, "role");
    this.convertAndUpdate(data, "isActive", null, false);
  }
}
