import { typeConvertor } from "../utils/typeConvertor";
import { Admin } from "./Admin.model";
import { Global } from "./Global.model";

export class Session extends Global {
  constructor(data) {
    super(data);
    this.admin = typeConvertor(Admin, data.admin);
    this.isActive = data.isActive;
    this.ownerId = data.ownerId;
    this.userAgent = data.userAgent;
  }
}
