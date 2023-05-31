import { Global } from './Global.model';

import { typeConvertor } from '../utils/typeConvertor';
import { dateToString } from '../utils/dateConvertor';

export class Experience extends Global {
  constructor(data) {
    super(data);
    this.position = data.position;
    this.company = data.company;
    this.city = data.city;
    this.country = data.country;
    this.from = typeConvertor(Date, data.from);
    this.to = typeConvertor(Date, data.to);
    this.tasks = data.tasks;
    this.technologies = data.technologies;
  }

  get fromToString() {
    return dateToString(this.from, '/');
  }

  get toToString() {
    return dateToString(this.to, '/');
  }

  get fromToIsoString() {
    return dateToString(this.from, '-', true);
  }

  get toToIsoString() {
    return dateToString(this.to, '-', true);
  }
}
