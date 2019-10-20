import { Task } from "./Task";

export class Counter {

  itemsLeft: HTMLSpanElement;
  itemsDone: HTMLSpanElement;
  cbxBtn: HTMLInputElement;

  constructor() {
    this.itemsLeft = <HTMLSpanElement>document.getElementById('left');
    this.itemsDone = <HTMLSpanElement>document.getElementById('done');
    this.cbxBtn = <HTMLInputElement>document.getElementById('check-all');
  }

  public setCounters(items: Task[]) {
    const all = items.length;
    const done = items.filter(elem => elem.status).length;
    const left = all - done;

    this.cbxBtn.checked = !!(items.length > 0 && done === all);

    this.itemsLeft.textContent = left.toString();
    this.itemsDone.textContent = done.toString();
  }
}
