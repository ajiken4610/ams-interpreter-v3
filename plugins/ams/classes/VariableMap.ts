export class VariableMap<T> {
  public static fromMap<T>(map: { [key: string]: T }) {
    let ret = new VariableMap<T>();
    ret.map = map;
    return ret;
  }
  private map;
  private parent: VariableMap<T> | null;
  public constructor(parent?: VariableMap<T>) {
    this.map = parent ? Object.create(parent.getMap()) : {};
    this.parent = parent ?? null;
  }
  public newScope(): VariableMap<T> {
    return new VariableMap<T>(this);
  }
  public has(name: string): boolean {
    return name in this.map;
  }
  public get(name: string): T {
    return this.map[name];
  }
  public set(name: string, value: T): void {
    if (this.parent?.has(name)) {
      this.parent.set(name, value);
    } else {
      this.map[name] = value;
    }
  }
  public setAsOwn(name: string, value: T): void {
    this.map[name] = value;
  }
  private getMap(): {} {
    return this.map;
  }
  public toString(): string {
    return this.constructor.name + ": " + JSON.stringify(this, null, 2);
  }
}
