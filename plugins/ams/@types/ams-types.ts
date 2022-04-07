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
