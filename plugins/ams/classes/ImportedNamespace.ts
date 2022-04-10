export class ImportedNamespace {
  public importeds: string[];
  public constructor(
    parent?: ImportedNamespace,
    hasGrammerImport: boolean = true
  ) {
    this.importeds = parent ? parent.importeds.slice() : [];
    if (hasGrammerImport) this.add("ams.grammer");
  }
  public newScope(): ImportedNamespace {
    return new ImportedNamespace(this, false);
  }
  public add(newNamespace: string) {
    this.importeds = this.importeds.filter(
      (importeds) => importeds !== newNamespace
    );
    this.importeds.push(newNamespace);
  }
  public iterator(): string[] {
    return this.importeds.reverse();
  }
}
