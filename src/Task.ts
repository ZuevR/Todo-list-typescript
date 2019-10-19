export class Task {

  constructor(
    public id: number,
    public description: string,
    public status: boolean
  ) {
  }

  private toggleStatus(): void {
    this.status = !this.status;
  }

  public createView(cbxCallback: () => void, delCallback: (instance: Task) => void): HTMLLIElement {
    const li = document.createElement('li');
    li.classList.add('item-task');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = this.status;
    input.addEventListener('click', event => {
      this.toggleStatus();
      cbxCallback();
    });

    const span = document.createElement('span');
    span.textContent = this.description;

    const button = document.createElement('button');
    button.textContent = '×';
    button.addEventListener('click', event => {
      delCallback(this);
    });

    li.appendChild(input);
    li.appendChild(span);
    li.appendChild(button);

    return li;
  }

}
