const net = require("net");
const images = require('images')

const Request = require("./request/request.js");
const Response = require("./response/response");
const htmlParser = require("./response/parser/htmlParser");

void async function () {
    let request = new Request({
        method: "POST",
        host: 'localhost',
        port: 8088,
        headers: {
            ["X-Foo2"]: "customed"
        },
        body: {
            name: 'liyaoxu'
        }
    })
    let response = await request.send();
    let dom = htmlParser.parseHTML(response.body);

    // console.log(response);

    let viewport = images(800, 600)
    render(viewport, dom)
    viewport.save('viewport.png')
}()


function render(viewport, element) {
    if (element.style) {
        let img = images(element.style.width, element.style.height)

        if (element.style['background-color']) {
            let color = element.style['background-color'] || 'rgb(0,0,0)'
            color.match(/rgb\(([ ]*\d+),([ ]*\d+),([ ]*\d+)\)/)
            img.fill(Number(RegExp.$1), Number(RegExp.$2), Number(RegExp.$3), 1)
            viewport.draw(img, element.style.left || 0, element.style.top || 0)
        }
    }

    if (element.children) {
        for (let child of element.children) {
            render(viewport, child)
        }
    }
}



/* const client = net.createConnection({
    host: 'localhost',
    port: 8088
}, () => {
    // let body = 'field1=aaa&code=x%3D1';
    // let req = 'POST / HTTP/1.1\r\n';
    // req += 'Content-Type: application/x-www-form-urlencoded\r\n';
    // req += `Content-Length: ${body.length}\r\n`;
    // req += '\r\n';
    // req += body;
    // console.log(req);
    // client.write(req);


    console.log('connected to server!');
    let request = new Request({
        method: "POST",
        host: 'localhost',
        port: 8088,
        headers: {
            ["X-Foo2"]: "customed"
        },
        body: {
            name: 'liyaoxu'
        }
    })
    console.log(request.toString());
    client.write(request.toString())

})

client.on('data', (data) => {
    console.log(data.toString());
    client.end();
})

client.on('end', () => {
    console.log('disconnected from server');
});
client.on('error', (err) => {
    console.log(err);
    client.end();
}); */

/* net.connect({
    address: "localhost",
    port: 8088,
    onread: {
        buffer: Buffer.alloc(4 * 1024),
        callback: (nread, buf) => {
            console.log(buf.toString('utf8', 0, nread));
        }
    }
}); */