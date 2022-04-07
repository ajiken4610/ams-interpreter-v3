/**
 * 文字列を1文字づつ返すイテレータです。
 */
declare class StringIterator implements Iterator<string> {
  /**
   * 現在の位置
   *
   * @private
   * @memberof StringIterator
   */
  private index: number;
  /**
   * イテレータのソースとなる文字列
   *
   * @private
   * @type {string}
   * @memberof StringIterator
   */
  private src: string;
  /**
   * イテレータをそーすとなる文字列から初期化します。
   * @param src ソースとなる文字列。
   */
  public constructor(src: string);
  /**
   * イテレータの次の要素を返します。
   * @return {done: boolean, value: string|null}
   */
  public next(): { done: boolean; value: string | null };
  /**
   * イテレータが終了しているかを返します。
   *
   * @return イテレータに次の文字があるならtrue、そうでなければfalse
   */
  public hasNext(): boolean;
  /**
   * イテレータの現在の位置から最後までの文字列を返します。
   */
  public readAll(): string;
  /**
   * 指定された文字のいずれかが示されるまで読み込み、示された文字と、その文字までの文字列を返します。
   * @param detect 終点の文字。2文字以上連ねることも可能。
   */
  public readBeforeChar(detect: string): { detected: string; value: string };
  /**
   * ネストを考慮して同じネストレベルに指定された文字が来るまで読み込んで返します。
   * @param detect 終点の文字。2文字以上連ねることも可能。
   * @param nestStart ネストの初めの文字
   * @param nestEnd ネストの終わりの文字
   * @param detectContainNest 終点の文字の中に、ネストの終わりの文字が含まれている場合、ネスト終了時に値を返す場合はtrue、そうでない場合はfalse
   * @param inNest 現在ネストに1つ入っている場合はtrue、入っていない場合はfalse。trueを指定すると、現在のブロックを出た際に値を返す。
   */
  public readBeforeCharWithNest(
    detect: string,
    nestStart: string,
    nestEnd: string,
    detectContainNest?: false | true,
    inNest?: false | true
  ): { detected: string; value: string };
  /**
   * このイテレータを返します。
   */
  public [Symbol.iterator](): StringIterator;
}

/**
 * このクラスは、インポートされた名前空間を表します。
 */
declare class ImportedNamespace {
  /**
   *インポートされた名前空間
   *
   * @type {string[]}
   * @memberof ImportedNamespace
   */
  public importeds: string[];
  /**
   * ImportedNamespaceをあれば親スコープから初期化します。
   * @param parent あれば親スコープ
   * @param hasGrammerImport 名前空間"ams.grammer"をインポートする場合はtrue、しない場合はfalse
   */
  public constructor(parent?: ImportedNamespace, hasGrammerImport?: boolean);
  /**
   * 子スコープを生成して返します。
   */
  public newScope(): ImportedNamespace;
  /**
   * インポートされた名前空間を追加します。
   * @param newNamespace
   */
  public add(newNamespace: string);
  /**
   * インポートされた名前空間を優先度順に並べたイテレータを返します。
   */
  public iterator(): string[];
}

/**
 * 変数のマップを表します。
 */
declare class VariableMap<T> {
  /**
   * マップからオブジェクトを初期化して返します。
   * @param map
   */
  public static fromMap<T>(map: { [key: string]: T });

  /**
   * 親スコープがあればそのVariableMap,なければnull
   *
   * @private
   * @type {(VariableMap<T> | null)}
   * @memberof VariableMap
   */
  private parent: VariableMap<T> | null;

  /**
   * あれば親のスコープからインスタンスを初期化します。
   * @param parent 親スコープ
   */
  public constructor(parent?: VariableMap<T>);
  /**
   * 新しい子スコープを返します。
   */
  public newScope(): VariableMap<T>;
  /**
   * 変数マップがその名前の変数を持つか調べます。
   * @param name 調べる変数の名前
   * @return　あるならtrue、ないならfalse。
   */
  public has(name: string): boolean;
  /**
   * 変数マップから指定された名前の変数の値を取得して返します。
   * @param name 取得する変数の名前
   */
  public get(name: string): T;
  /**
   *
   * @param name
   * @param value
   */
  public set(name: string, value: T): void;
  public setAsOwn(name: string, value: T): void;
  private getMap(): {};
  public toString(): string;
}
