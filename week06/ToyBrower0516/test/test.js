function* next_id() {
    var cid = 0;
    while (true) {
        console.log(cid);
        yield ++cid;
    }
}
var
    x,
    pass = true,
    g = next_id();
for (x = 1; x < 3; x++) {
    if (g.next().value !== x) {
        pass = false;
        console.log('测试失败!');
        break;
    }
}
if (pass) {
    console.log('测试通过!');
}

let test = {
    temp: '内置名称',
    set name(str) {
        this.temp += '-' + str;
    },
    get name() {
        return '测试-' + this.temp;
    }
}

test.name = 'abcd';
console.log('test.name:['+test.name+']');