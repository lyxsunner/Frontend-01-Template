const net = require("net");
const Response = require('./response');
const ResponseParser = require('./responseParser');

const CONTENT_TYPE = {
    APPLICATION_JSON: "application/json",
    APPLICTATION_FORM: "application/x-www-form-urlencoded",
}

class Request {
    //method,url = host + port + path
    //body: k/v
    //headers
    constructor(options) {
        this.method = options.method || "GET";
        this.host = options.host;
        this.path = options.path || "/";
        this.port = options.port || 80;
        this.body = options.body || {};
        this.headers = options.headers || {};
        if (!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded";
        }

        let checkCT = this.headers["Content-Type"];

        if (checkCT === CONTENT_TYPE.APPLICATION_JSON) {
            this.bodyText = JSON.stringify(this.body);
        } else if (checkCT === CONTENT_TYPE.APPLICTATION_FORM) {
            this.bodyText = Object.keys(this.body).map((key) => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
            this.headers["Content-Length"] = this.bodyText.length;
        }

    }

    toString() {
        let res = `${this.method} ${this.path} HTTP/1.1\r\n`
        res += `${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}`
        res += `\r\n`
        res += `\r\n`
        res += `${this.bodyText}`
        return res;
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser();
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    connection.write(this.toString());
                });
            }
            connection.on('data', (data) => {
                //http链接为流式链接，无法直接使用new Response的方式直接处理服务器响应，因为当前data包并不一定是完整的
                // console.log(data.toString());
                // new Response(data);
                parser.receive(data.toString());
                if (parser.isFinished) {
                    resolve(JSON.stringify(parser.response));
                }
                // console.log(parser.statusLine);
                // console.log(JSON.stringify(parser.headers));
                // resolve(data.toString());
                connection.end();
            })

            connection.on('end', () => {
                console.log('disconnected from server');
            });
            connection.on('error', (err) => {
                console.log(err);
                reject(err);
                connection.end();
            });
        })
    }
};

module.exports = Request;