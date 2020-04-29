
/*
    作业1：写一个 UTF-8 Encoding 的函数
*/
// UTF-8转码 - js日常应用方案
function encodeUtf8(text) {
    const code = encodeURIComponent(text);
    const bytes = [];
    for (var i = 0; i < code.length; i++) {
        const c = code.charAt(i);
        if (c === '%') {
            const hex = code.charAt(i + 1) + code.charAt(i + 2);
            const hexVal = parseInt(hex, 16);
            bytes.push(hexVal);
            i += 2;
        } else bytes.push(c.charCodeAt(0));
    }
    return bytes;
}

// UTF-8解码 - js日常应用方案
function decodeUtf8(bytes) {
    var encoded = "";
    for (var i = 0; i < bytes.length; i++) {
        encoded += '%' + bytes[i].toString(16);
    }
    return decodeURIComponent(encoded);
}

/*
    作业2：正则表达式 匹配所有 Number 直接量
*/
function matchNumber(number){
    return /^(\-|\+)?\d+(\.\d+)?$/.test(number);
}
/*
    作业3：正则表达式 匹配所有 String 直接量
*/
function matchString(number){
    return /[\u0021-\u007E]{6,16}|[\x21-\x7E]{6,16}|(['"])(?:(?!\1).)*?\1/g.test(number);
}

