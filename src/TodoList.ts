import { Task } from "./Task";
import { Input } from "./Input";
import { Filter } from "./Filter";
import { Counter } from "./Counter";

export type FilterType = 'all' | 'active' | 'completed';

export class TodoList {

  private counter = 0;
  private tasks: Task[] = [];
  private list: HTMLUListElement;
  private checkBox: HTMLInputElement;
  private filter: FilterType = 'all';

  constructor(
    private inputComponent: Input = new Input(),
    private filterComponent: Filter = new Filter(),
    private counterComponent: Counter = new Counter()
  ) {
    this.list = <HTMLUListElement>document.getElementById('todo-list');
    this.checkBox = <HTMLInputElement>document.getElementById('check-all');
  }

  private getId(): number {
    return ++this.counter;
  }

  private clearList(): void {
    this.list.innerHTML = '';
  }

  private sanitizeString(str: string): string {
    return str.trim().replace(/</g, '&#60').replace(/>/g, '&#62');
  }

  private drawTasks(tasks: Task[]) {
    const fragment = document.createDocumentFragment();
    tasks.forEach((task: Task) => {
      const taskNode = task.createView(this.checkTask.bind(this), this.deleteTask.bind(this));
      fragment.appendChild(taskNode);
    });
    this.list.appendChild(fragment);
  }

  private setFilter(str: FilterType): void {
    this.filter = str;
    this.render();
  }

  private getCurrentData() {
    switch (this.filter) {
      case "all": return this.tasks;
      case "active": return this.tasks.filter((item: Task) => !item.status);
      case "completed": return this.tasks.filter((item: Task) => item.status);
    }
  }

  private render(): void {
    this.clearList();
    const tasks = this.getCurrentData();
    this.drawTasks(tasks);
    this.counterComponent.setCounters(this.tasks);
  }

  private addTask(value: string): void {
    const id = this.getId();
    const description = this.sanitizeString(value);
    if (description) {
      const task = new Task(id, description, false);
      this.tasks.push(task);
      this.render();
    }
  }

  private checkTask(): void {
    this.render();
  }

  private checkAllTasks(event: MouseEvent): void {
    const target: HTMLInputElement = <HTMLInputElement>event.target;
    this.tasks.forEach((task: Task) => {
      task.status = target.checked;
    });
    this.render();
  }

  private deleteTask(task: Task) {
    this.tasks = this.tasks.filter((item: Task) => {
      return item.id !== task.id;
    });
    this.render();
  }




  public init(): void {
    this.checkBox.addEventListener('click', this.checkAllTasks.bind(this));
    this.inputComponent.init(this.addTask.bind(this));
    this.filterComponent.init(this.setFilter.bind(this));
  }

}
