export class Dev {
  private isDev = true;
  //private thisBind;
  constructor(isDev: boolean) {
    this.isDev = isDev;
    //this.thisBind = thisBind;
    //this.log = this.log.bind(thisBind);
    //this.devMap = this.devMap.bind(thisBind);
  }
  public log = (name: string, obj: any) => {
    if (this.isDev) {
      console.log(name, obj);
    }
  };
  public async devMap<U>(
    list: Array<any>,
    cb: (value: any, index?: number, array?: any[]) => U
  ) {
    let result: U[] = [];
    if (this.isDev) {
      for (let item of list) {
        result.push(await cb(item));
      }
    } else {
      result = await Promise.all(list.map(cb));
    }
    return result;
  }
}

/**
 *
 * @param ms 毫秒
 * @returns
 */
export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
