const net = require("net");
const Request = require("./request");
const Response = require("./response");

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
    console.log(response);
}()






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