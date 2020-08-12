import { parseHTML } from '../src/parser.js'

let assert = require('assert');

it("parse a single element: ", () => {
    let doc = parseHTML("<div></div>");
    let div = doc.children[0];
    assert.equal(div.tagName, 'div');
    assert.equal(div.children.length, 0);
    assert.equal(div.type, 'element');
    assert.equal(div.attributes.length, 2);
})

it("parse a single element with text content: ", () => {
    let doc = parseHTML("<div>hello</div>");
    let text = doc.children[0].children[0];
    assert.equal(text.content, 'hello');
    assert.equal(text.type, 'text');
})


it("tag mismatch: ", () => {
    try {
        let doc = parseHTML("<div></iv>");
    } catch (e) {
        assert.equal(e.message, "Tag start end doesn't match!");
    }
})


it("text with < : ", () => {
    let doc = parseHTML("<div>a < b</div>");
    let text = doc.children[0].children[0];
    assert.equal(text.type, 'text');
    assert.equal(text.content, 'a < b');
})



it("with property: ", () => {
    let doc = parseHTML("<div id=a data=\"abc\" class=\"cls\"></div>");
    let count = 0;
    let div = doc.children[0];
    for(let attr of div.attributes) {
        if(attr.name == 'id') {
            assert.equal(attr.value, "a");
            return;
        }
        if(attr.name == 'class') {
            assert.equal(attr.value, "cls");
            return;
        }
        if(attr.name == 'data') {
            assert.equal(attr.value, "abc");
            return;
        }
    }
    assert.ok(count === 3) 
})


it("with property2: ", () => {
    let doc = parseHTML("<div id=a data='abc' class=\"cls\"></div>");
    let count = 0;  
    let div = doc.children[0];
    for(let attr of div.attributes) {
        if(attr.name == 'id') {
            assert.equal(attr.value, "a");
            return;
        }
        if(attr.name == 'class') {
            assert.equal(attr.value, "cls");
            return;
        }
        if(attr.name == 'data') {
            assert.equal(attr.value, "abc");
            return;
        }
    }
    assert.ok(count === 3) 
})


it("with property3: ", () => {
    let doc = parseHTML("<div id=a data='abc' class=\"cls\"/>");
    let count = 0;  
    let div = doc.children[0];
    for(let attr of div.attributes) {
        if(attr.name == 'id') {
            assert.equal(attr.value, "a");
            return;
        }
        if(attr.name == 'class') {
            assert.equal(attr.value, "cls");
            return;
        }
        if(attr.name == 'data') {
            assert.equal(attr.value, "abc");
            return;
        }
    }
    assert.ok(count === 3) 
})

it("script: ", () => {
    let content = `<div>1111</div>
    <span>1111</span>
    /script>
    <script
    <
    </
    </s
    </sc
    </scr
    </scri
    </scrip
    </script`;
    let doc = parseHTML(`<script>${content}</script>`);
    let text = doc.children[0].children[0];
    assert.equal(text.type, 'text')
    assert.equal(text.content, content)
})



it("attribute with node value: ", () => {
    let doc = parseHTML("<DIV/>")
})

it("attribute with not value: ", () => {
    let doc = parseHTML("<div class id>")
})