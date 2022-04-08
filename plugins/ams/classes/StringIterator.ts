export class StringIterator implements Iterator<string> {
  private index: number = 0;
  private src: string;
  public constructor(src: string) {
    this.src = src;
  }
  public next(): { done: boolean; value: string | null } {
    return this.hasNext()
      ? {
          done: false,
          value: this.src.charAt(this.index++),
        }
      : {
          done: true,
          value: null,
        };
  }
  public hasNext(): boolean {
    return this.src.length > this.index;
  }
  public readAll(): string {
    let index = this.index;
    this.index = this.src.length;
    return this.src.substring(index, this.src.length);
  }
  public readBeforeChar(detect: string): {
    detected: string | null;
    value: string;
  } {
    let value = "";
    while (this.hasNext()) {
      let current = this.next().value;
      for (var i = 0; i < detect.length; i++)
        if (current === detect.charAt(i)) {
          return {
            detected: current,
            value: value,
          };
        }
      value += current;
    }
    return { detected: null, value: value };
  }
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
  ): { detected: string | null; value: string } {
    let nest = nestStart + nestEnd;
    let symboles = detect + nest;
    let nestCount = inNest ? 1 : 0;
    let ret = "";

    while (this.hasNext()) {
      if (nestCount > 0) {
        let current = this.readBeforeChar(nest);
        if (current.detected === nestStart) nestCount++;
        if (current.detected === nestEnd) {
          if (--nestCount === 0 && inNest) {
            return {
              detected: current.detected,
              value: ret + current.value,
            };
          }
        }
        ret += current.value + current.detected;
      } else {
        let current = this.readBeforeChar(symboles);
        // console.log(`detected: "${current.detected}"`);
        if (current.detected === nestStart) {
          if (detectContainNest) {
            return {
              detected: nestStart,
              value: ret + current.value,
            };
          } else {
            nestCount++;
          }
        } else if (current.detected === nestEnd) {
          return {
            detected: nestEnd,
            value: ret + current.value,
          };
        } else {
          return {
            detected: current.detected,
            value: ret + current.value,
          };
        }
        ret += current.value + current.detected;
      }
    }
    return { detected: null, value: ret };
  }
  public [Symbol.iterator](): StringIterator {
    return this;
  }
}
