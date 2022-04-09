export class NamespacedVariable<T> extends VariableMap<T> {
  protected namespacedVariableMaps: { [key: string]: VariableMap<T> };
  protected imported: ImportedNamespace;
  public constructor(
    namespace?: ImportedNamespace,
    parent?: NamespacedVariable<T>
  ) {
    super(parent);
    this.imported = namespace ?? new ImportedNamespace();
    this.namespacedVariableMaps = parent ? parent.namespacedVariableMaps : {};
  }
  public addNamespacedVariableMap(
    spaceName: string,
    variables: VariableMap<T>
  ): void {
    this.namespacedVariableMaps[spaceName] = variables;
  }
  public addNamespacedVariableMaps(spaces: { [key: string]: VariableMap<T> }) {
    for (let key of Object.keys(spaces)) {
      this.addNamespacedVariableMap(key, spaces[key]);
    }
  }
  public get(name: string): T {
    return super.get(name) ?? this.getNamespaced(name);
  }
  public has(name: string): boolean {
    return this.get(name) ? true : false;
  }
  public set(name: string, value: T): void {
    if (name === "import") {
      this.addImport(value.toString());
    } else {
      super.set(name, value);
    }
  }
  public newScope(): NamespacedVariable<T> {
    return new NamespacedVariable<T>(this.imported.newScope(), this);
  }
  public addImport(namespace: string): void {
    this.imported.add(namespace);
  }
  public static separateNamespaced(name: string): {
    namespace: string | null;
    name: string;
  } {
    let splited = name.split(".");
    return {
      namespace:
        splited.length === 0
          ? null
          : splited.slice(0, splited.length - 1).join("."),
      name: splited[splited.length - 1],
    };
  }
  public guessNamespace(name: string): string | null {
    for (let imported of this.imported.iterator()) {
      if (this.namespacedVariableMaps[imported]?.has(name)) {
        return imported;
      }
    }
    return null;
  }
  public getNamespaced(combined: string): T {
    let { namespace, name } = NamespacedVariable.separateNamespaced(combined);
    let guessed;
    if (!namespace && !(guessed = this.guessNamespace(name))) {
      return this.namespacedVariableMaps[guessed].get(name);
    }
    return this.namespacedVariableMaps[namespace]?.get(name);
  }
}
