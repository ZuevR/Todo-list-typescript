import { FilterType } from "./TodoList";

export class Filter {

  private allBtn: HTMLButtonElement;
  private completedBtn: HTMLButtonElement;
  private activeBtn: HTMLButtonElement;

  constructor() {
    this.allBtn = <HTMLButtonElement>document.getElementById('all');
    this.completedBtn = <HTMLButtonElement>document.getElementById('completed');
    this.activeBtn = <HTMLButtonElement>document.getElementById('active');
  }

  public init(callback: (str: FilterType) => void) {
    this.allBtn.addEventListener('click', event => {
      callback('all');
    });

    this.completedBtn.addEventListener('click', event => {
      callback('completed');
    });

    this.activeBtn.addEventListener('click', event => {
      callback('active');
    });
  }
}
