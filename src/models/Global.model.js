import { typeConvertor } from "../utils/typeConvertor";

export class Global {
  constructor(data) {
    this.id = data?.id ?? null;
    this.createdAt = typeConvertor(Date, data?.createdAt);
    this.updatedAt = typeConvertor(Date, data?.updatedAt);
  }

  update(data) {
    this.convertAndUpdate(data, "id");
    this.convertAndUpdate(data, "createdAt", Date);
    this.convertAndUpdate(data, "updatedAt", Date);
  }

  convertAndUpdate(data, key, type = null, fallback = null) {
    if (data[key] === undefined) {
      return;
    } else if (data[key] === null && fallback !== undefined) {
      this[key] = fallback;
    } else if (type) {
      this[key] = typeConvertor(type, data[key]);
    } else {
      this[key] = data[key];
    }
  }
}
