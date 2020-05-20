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
        return start;
}

function foundB(c) {
    if (c === "b")
        return foundC;
    else
        return start;
}

function foundC(c) {
    if (c === "c")
        return foundD;
    else
        return start;
}

function foundD(c) {
    if (c === "d")
        return foundE;
    else
        return start;
}

function foundE(c) {
    if (c === "e")
        return foundF;
    else
        return start;
}

function foundF(c) {
    if (c === "f")
        return end;
    else
        return start;
}

console.log(match("I abm "));