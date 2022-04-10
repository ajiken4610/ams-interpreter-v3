export class Stack {
  private position: (string | number)[];
  public constructor(position: (string | number)[]) {
    this.position = position;
  }
  public toString(): string {
    return `\tat (${this.position.join(":")})`;
  }
}
