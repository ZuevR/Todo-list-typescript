import { Task } from "./Task";
import { Input } from "./Input";

export class TodoList {

  private counter = 0;
  private tasks: Task[] = [];
  private list: HTMLUListElement;

  constructor(
    private inputComponent: Input = new Input()
  ) {
    this.list = <HTMLUListElement>document.getElementById('todo-list');
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

  private render(): void {
    this.clearList();
    const fragment = document.createDocumentFragment();
    this.tasks.forEach((task: Task) => {
      const taskNode = task.createView(this.checkTask.bind(this), this.deleteTask.bind(this));
      fragment.appendChild(taskNode);
    });
    this.list.appendChild(fragment);
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

  private deleteTask(task: Task) {
    this.tasks = this.tasks.filter((item: Task) => {
      return item.id !== task.id;
    });
    this.render();
  }

  public init(): void {
    this.inputComponent.init(this.addTask.bind(this))
  }

}
