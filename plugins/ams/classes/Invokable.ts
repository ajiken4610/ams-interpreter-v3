export abstract class Invokable {
  public static NULL: Invokable = new (class extends Invokable {
    public invoke(
      argument: Invokable,
      variables: VariableMap<Invokable>
    ): Invokable {
      return this;
    }
    public invokeAsPlainText(
      argument: Invokable,
      variable: VariableMap<Invokable>
    ): string {
      return `[${this.TAG}]`;
    }
    public invokeAsHtmlObject(
      argument: Invokable,
      variable: VariableMap<Invokable>
    ): HtmlObject {
      return {
        tagName: "span",
        attrs: {},
        children: [],
        text: this.invokeAsPlainText(argument, variable),
      };
    }
    public getStructureString(indentOffset: string = ""): string {
      return `\n${indentOffset}==${this.TAG}==`;
    }
    private TAG = "NULL";
  })();
  private children: Invokable[] = [];
  protected indenter = "| ";
  /**
   * このインスタンスのgetAtメソッドで返される値を順番に返します。
   */
  public iterator(): IterableIterator<Invokable> {
    let outerThis = this;
    return new (class implements IterableIterator<Invokable> {
      private index = -1;
      public next(): IteratorResult<Invokable> {
        let current = outerThis.getAt(++this.index);
        if (current) {
          return { done: false, value: current };
        } else {
          return { done: true, value: null };
        }
      }
      [Symbol.iterator](): IterableIterator<Invokable> {
        return this;
      }
    })();
  }
  public abstract invoke(
    argument: Invokable,
    variables: VariableMap<Invokable>
  ): Invokable;
  public getAt(index: number): Invokable | null {
    return this.children[index];
  }
  public set(children: Invokable[]) {
    this.children = children;
  }
  public setAt(index: number, child: Invokable) {
    this.children[index] = child;
  }
  public append(child: Invokable) {
    this.children.push(child);
  }
  public abstract getStructureString(indentOffset?: string);
  public abstract invokeAsPlainText(
    argument: Invokable,
    variables: VariableMap<Invokable>
  ): string;
  public abstract invokeAsHtmlObject(
    argument: Invokable,
    variables: VariableMap<Invokable>
  ): HtmlObject;
}
