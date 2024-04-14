//https://blog.csdn.net/weixin_49229262/article/details/116867763
/**
 * 获取元素所有样式
 * @param ele
 * @param pseudoEle
 * @returns
 * todo div等选择器定义的没有添加
 * todo 伪类样式
 */
function getStyle(ele) {
    /**element不为空 */
    if (!ele)
        return;
    /**获取伪类样式 */
/*     let after = getComputedStyle(ele, "::after");
    let before = getComputedStyle(ele, "::before");
    let flag = false;
    for (let i = 0; i < after.length; i++) {
        let key = after[i];
        if (after.getPropertyValue(key)) {
            flag = true;
            console.log(key, after.getPropertyValue(key));
            break;
        }
    }
    if (flag) {
        console.log(after, before);
    } */
    /**创建空标签并渲染到页面 */
    const initTag = document.createElement(ele.tagName);
    document.body.appendChild(initTag);
    /**获取两标签样式 */
    const initTagStyle = getComputedStyle(initTag);
    const currEleStyle = getComputedStyle(ele);
    /**获取行内样式*/
    //const currEleInline = ele.style;
    /**过滤无用标签和行内标签并重新合并 */
    //const styles = filterObj(currEleStyle, initTagStyle, currEleInline);
    const styles = filterObj(currEleStyle, initTagStyle);
    initTag.remove();
    return styles;
    /**驼峰转标准 */
    function toLowerLine(str) {
        var temp = str.replace(/[A-Z]/g, function (match) {
            return "-" + match.toLowerCase();
        });
        if (temp.slice(0, 6) === "webkit") {
            temp = "-" + temp;
        }
        return temp;
    }
    function filterObj(currObj, initObj
    //style: CSSStyleDeclaration
    ) {
        let currEleArr = Object.keys(currObj);
        let newObj = {};
        let temp;
        for (let i = 1; i < currEleArr.length; i++) {
            if (currObj[currEleArr[i]] !== initObj[currEleArr[i]]) {
                /**大写转小写 */
                temp = toLowerLine(currEleArr[i]);
                /*         Object.defineProperty(newObj, temp, {
                  value: currObj[currEleArr[i]],
                  configurable: true,
                }); */
                newObj[temp] = currObj[currEleArr[i]];
                //console.log(currEleArr[i], currObj[currEleArr[i]]);
            }
        }
        /**包装行内标签 */
        /*let i = 0;
        while (true) {
          if (!style[i] || i > 99999) break;
          delete newObj[style[i]];
          i++;
        }
        newObj.inlineStyle = style.cssText; */
        return newObj;
    }
}
/**
 * getStyle衍生方法，将所有属性设置为内联属性
 */
function toInlineStyle(selector) {
    let ele = document.querySelector(selector);
    if (!ele) {
        return;
    }
    ele = ele.cloneNode(true);
    document.body.appendChild(ele);
    const setStyle = (cur) => {
        const style = getStyle(cur);
        let cssText = "";
        for (let key of Object.keys(style)) {
            cssText += ` ${key}: ${style[key]};`;
        }
        cur.setAttribute("style", cssText);
        for (let child of cur.children) {
            setStyle(child);
        }
    };
    setStyle(ele);
    const html = ele.outerHTML;
    ele.remove();
    return html;
}
//toInlineStyle(`#layouts > div.fn__flex.fn__flex-1 > div.layout__center.fn__flex.fn__flex-1 > div > div > div.layout-tab-container.fn__flex-1 > div:nth-child(5) > div.protyle-content.protyle-content--transition > div.protyle-wysiwyg.protyle-wysiwyg--attr > div:nth-child(2)`);
