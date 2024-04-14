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

/**
 *
 * @deprecated 无法实现
 * @param fn 希望退出的函数
 * @param throwVar 控制退出的变量名
 * @param delay throwFn的执行间隔
 * @returns
 */
export async function interruptByOut(
  fn: () => Promise<any>,
  throwVar: string,
  delay = 200
) {
  let intervalID;
  try {
    intervalID = setInterval(() => {
      const func = new Function(
        `if (${throwVar}) {
          console.log("退出");
          throw "interrupt";
        } else {
          console.log("不退出");
        }
      `
      );
      func();
    }, delay);
    await fn();
    clearInterval(intervalID);
  } catch (e) {
    if (e === "interrupt") {
      clearInterval(intervalID);
      console.log("已提前退出");
      return;
    }
  }
}

/**
 *
 * @param timeout
 * @param text
 * @returns
 */
export const promiseExample = (timeout: number, text: string) => {
  return new Promise<string>((resolve, _reject) => {
    setTimeout(() => {
      console.log(text);
      resolve(text);
    }, timeout);
  });
};
