//在一个字符串中，找到字符"a";
function match1(string) {
    for (const c of string) {
        if (c == "a")
            return true;
    }
    return false;
}

//在一个字符串中，找到字符"ab";
function match2(string) {
    let foundA = false;
    for (let c of string) {
        if (c == "a")
            foundA = true;
        else if (foundA && c == "b")
            return true;
        else
            foundA = false;
    }
    return false;
}

//在一个字符串中，找到字符"abcdef";
function match3(string) {
    let foundA = false;
    let foundB = false;
    let foundC = false;
    let foundD = false;
    let foundE = false;
    for (let c of string) {
        if (c == "a")
            foundA = true;
        else if (foundA && c == "b")
            foundA = true;
        else if (foundB && c == "c")
            foundA = true;
        else if (foundC && c == "d")
            foundA = true;
        else if (foundD && c == "e")
            foundA = true;
        else if (foundE && c == "f")
            foundA = true;
        else {
            foundA = false;
            foundB = false;
            foundC = false;
            foundD = false;
            foundE = false;
        }
    }
    return false;
}