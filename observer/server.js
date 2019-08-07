const http = require('http')
const fs = require('fs')

const server = http.createServer(function (request, response) {
    response.setHeader('Content-Type', 'text/plain')
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.setHeader('Access-Control-Request-Method', '*')
    response.setHeader('Access-Control-Allow-Headers', '*')
    response.statusCode = 200

    if (request.method === 'POST') {
        if (request.headers["content-type"] !== 'text/plain') {
            response.statusCode = 400
            response.write('400 Bad Request')
            response.end()
            return
        }

        try {
            let requestBody = ''

            request.on('data', function (chunk) {
                requestBody += chunk
            })

            request.on('end', function () {
                const text = requestBody.replace(' - YouTube Music', '')
                fs.writeFileSync('title.txt', text)
                console.log('Wrote: ' + text + ' to title.txt')

                response.setHeader('Content-Type', 'text/plain')
                response.end(text)
            })
        }
        catch {
            response.statusCode = 500
            response.write('500 Internal Server Error')
            response.end()
            return
        }
    } else {
        response.write('Hello World!')
        response.end()
    }
})

server.listen(4112)
console.log('Server runing on localhost:4112')