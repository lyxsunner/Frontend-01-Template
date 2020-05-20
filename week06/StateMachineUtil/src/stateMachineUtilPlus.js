let start = 0;

function match(string) {
    let state = start;
    for (let c of string) {
        console.log(c);
        state = start(c);
    }
    return state === end;
}

function start(c) {
    if (c === "a")
        return foundA;
    else
        return start;
}


function end(c) {
    return end; //陷阱状态，表示最终结果
}

function foundA(c) {
    if (c === "b")
        return foundB;
    else
        return start(c);//严格状态机不允许/不推荐如此写，应全部使用状态来进行
}

function foundB(c) {
    if (c === "b")
        return foundC;
    else
        return start(c);
}

function foundC(c) {
    if (c === "c")
        return foundD;
    else
        return start(c);
}

console.log(match("I abm "));