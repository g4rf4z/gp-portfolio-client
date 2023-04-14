import { Global } from "./Global.model";

export class Skill extends Global {
  constructor(data) {
    super(data);
    this.name = data.name;
    this.image = data.image;
    this.progress = data.progress;
  }
}
