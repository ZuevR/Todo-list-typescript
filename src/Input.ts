export class Input {

  private input: HTMLInputElement;
  private addButton: HTMLInputElement;

  constructor() {
    this.input = <HTMLInputElement>document.getElementById('input');
    this.addButton = <HTMLInputElement>document.getElementById('add-button');
  }

  private clearInput() {
    this.input.value = '';
  }

  public init(callback: (value: string) => any) {
    this.addButton.addEventListener('click', () => {
      callback(this.input.value);
      this.clearInput();
    });

    this.input.addEventListener('keyup', event => {
      if (event.key === 'Enter') {
        callback(this.input.value);
        this.clearInput();
      }
    })
  }
}
