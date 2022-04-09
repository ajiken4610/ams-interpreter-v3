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
   */
  public next(): { done: true; value: string } | { done: false; value: null };
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
   * 指定された文字が示される前に文字列の終端に達したとき、戻り値のdetectedプロパティはnullになります。
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
   * 変数のマップ
   *
   * @private
   * @memberof VariableMap
   */
  private map;

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
   * 親スコープに変数が既にあればそこに、無ければ自分自身に、変数の値を代入します。
   * @param name 代入する変数名
   * @param value 代入する値
   */
  public set(name: string, value: T): void;
  /**
   * 親スコープにすでに変数が存在するかしないかにかかわらず、現在のスコープに値を代入します。
   * @param name 代入する変数名
   * @param value 代入する値
   */
  public setAsOwn(name: string, value: T): void;
  /**
   * 内部で保持しているマップオブジェクトを取得します。
   */
  private getMap(): {};
  /**
   * このインスタンスの文字列表現を取得します。
   */
  public toString(): string;
}

/**
 * 名前空間付きの変数マップを表します。
 */
declare class NamespacedVariable<T> extends VariableMap<T> {
  /**
   * 名前空間がついている変数のマップ
   *
   * @protected
   * @type {{ [key: string]: VariableMap<T> }}
   * @memberof NamespacedVariable
   */
  protected namespacedVariableMaps: { [key: string]: VariableMap<T> };
  /**
   * インポートされた名前空間
   *
   * @protected
   * @type {ImportedNamespace}
   * @memberof NamespacedVariable
   */
  protected imported: ImportedNamespace;
  /**
   * インポートされている名前空間とあれば親スコープからインスタンスを初期化します。
   * @param namespace インポートされている名前空間
   * @param parent 親スコープ
   */
  public constructor(
    namespace?: ImportedNamespace,
    parent?: NamespacedVariable<T>
  );
  /**
   * 新しい名前空間がついたVariablesを追加します。
   * @param spaceName 名前空間名
   * @param variables 変数のマップ
   */
  public addNamespacedVariableMap(
    spaceName: string,
    variables: VariableMap<T>
  ): void;
  /**
   * 新しい名前空間がついたVariablesを複数追加します。
   * @param spaces 名前空間名と名前空間変数のマップ
   */
  public addNamespacedVariableMaps(spaces: { [key: string]: VariableMap<T> });
  /**
   * 変数名をもとに値を取得して返します。ローカル変数に無ければ、追加されている名前空間付き変数から探して返します。
   * @param name
   */
  public get(name: string): T;
  /**
   *  名前空間付き変数を含めて、変数が存在したらtrue,しなければfalse
   * @param name
   */
  public has(name: string): boolean;
  /**
   * ローカル変数を追加します。importという変数名の場合は、指定された値をインポートされた名前空間とします。
   * @param name
   * @param value
   */
  public set(name: string, value: T): void;
  /**
   * 新しい子スコープを作って返します。
   */
  public newScope(): NamespacedVariable<T>;
  /**
   * インポートされた名前空間を追加します。
   * @param namespace インポートする名前空間の名前
   */
  public addImport(namespace: string): void;
  /**
   * 名前空間付き変数から名前空間と変数名を分離させて、返します。名前空間がない場合は、戻り値のnamespaceがnullになります。
   * ams.grammer.forなら、ams.grammerとforに分解されます。
   * @param name
   */
  public static separateNamespaced(name: string): {
    namespace: string | null;
    name: string;
  };
  /**
   * インポートされている名前空間をもとに、変数名から名前空間を推論します。
   * 名前空間が見つからない場合はnullを返します。
   * @param name 推論する変数名
   */
  public guessNamespace(name: string): string | null;
  /**
   * インポートされ散る名前空間をもとに、名前空間付けされた変数を取得します。
   * @param combined 名前空間.変数名の形の、完全限定変数名(?)。FQVNとでもいうべきなのだろうか。
   */
  public getNamespaced(combined: string): T;
}

/**
 * 予約された記号を保持します。
 */
declare class ReservedWord {
  /**
   * ネストの初め文字「{」
   *
   * @static
   * @memberof ReservedWord
   */
  static NEST_START;
  /**
   * ネストの終わり文字「}」
   *
   * @static
   * @memberof ReservedWord
   */
  static NEST_END;
  /**
   * 変数分の区切り文字「\」
   *
   * @static
   * @memberof ReservedWord
   */
  static VARIABLE;
  /**
   * 呼び出し文の区切り文字「:」
   *
   * @static
   * @memberof ReservedWord
   */
  static INVOKER;
  /**
   * 文の区切り文字「;」
   *
   * @static
   * @memberof ReservedWord
   */
  static SEPARATOR;
}

/**
 * Htmlの階層構造を表すことができるインターフェース
 */
declare interface HtmlObject {
  /**
   * この要素のタグ名
   */
  tagName: string;
  /**
   * この要素の属性
   */
  attrs: { [key: string]: string };
  /**
   * あればこの要素のテキスト
   */
  text?: string;
  /**
   * この要素の子要素
   */
  children: HtmlObject[];
}

declare abstract class Invokable {
  /**
   * NULLを示すInvokableオブジェクトです。
   *
   * @static
   * @type {Invokable}
   * @memberof Invokable
   */
  public static NULL: Invokable;
  /**
   * 自分の子供の要素
   *
   * @private
   * @type {Invokable[]}
   * @memberof Invokable
   */
  private children: Invokable[];
  /**
   * 構造文字列を取得する際のヒント
   *
   * @protected
   * @memberof Invokable
   */
  protected indenter;
  /**
   * このインスタンスのgetAtメソッドで返される値を順番に返します。
   */
  public iterator(): IterableIterator<Invokable>;
  /**
   * このInvokableを呼び出します。
   * @param argument 呼び出しの引数
   * @param variables 呼び出し時の変数
   */
  public abstract invoke(
    argument: Invokable,
    variables: VariableMap<Invokable>
  );
  /**
   * 子要素をインデックスをもとに返します。
   * @param index
   */
  public getAt(index: number): Invokable | null;
  /**
   * 子要素を設定します。もともとあった子要素は削除されます。
   * @param children
   */
  public set(children: Invokable[]);
  /**
   * 指定されたインデックスに要素を設定します。
   * @param index 要素を設定するインデックス
   * @param child 指定する要素
   */
  public setAt(index: number, child: Invokable);
  /**
   * 子供の一番最後に要素を追加します。
   * @param child 最後に追加する要素
   */
  public append(child: Invokable);
  /**
   * インスタンスの構造文字列を取得します。
   * @param indentOffset 出力時に付けるインデント文字列。
   */
  public abstract getStructureString(indentOffset?: string);
  /**
   * このインスタンスを生テキストとして呼び出します。
   * @param variables 呼び出し時の変数
   */
  public abstract invokeAsPlainText(variables: VariableMap<Invokable>): string;
  /**
   * このインスタンスをHtmlのオブジェクトとして呼び出します。
   * @param variables 呼び出し時の変数
   */
  public abstract invokeAsHtmlObject(
    variables: VariableMap<Invokable>
  ): HtmlObject;
}

/**
 * スタックとレースを表します。
 */
declare class StackTrace {
  /**
   * スタックの位置を表します。
   *
   * @private
   * @type {((string | number)[])}
   * @memberof StackTrace
   */
  private position: (string | number)[];
  /**
   * スタックの位置を表す配列からインスタンスを初期化します。
   * @param position
   */
  public constructor(position: (string | number)[]);
  /**
   * インスタンスの文字列表現を返します。
   */
  public toString(): string;
}

declare abstract class StopInvokable extends Invokable {
  protected stackTraces: StackTrace[];
  public addStackTrace(stackTrace: StackTrace): void;
  public getTraceString(): string;
  public abstract getStopId(): string;
}

declare class Paragraph extends Invokable {
  private notLoaded: (string | null)[];
  public constructor(iterator: StringIterator);
  public getAt(index: number): Invokable | null;
  public invoke(argument: Invokable, variables: VariableMap<Invokable>);
  public append(invokable: Invokable): void;
  public invokeAsPlainText(variable: VariableMap<Invokable>): string;
  public invokeAsHtmlObject(variable: VariableMap<Invokable>): HtmlObject;
  public getStructureString(indentOffset: string);
}
