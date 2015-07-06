'use strict';
var host, publicDir, app = require('./app'), myapp,
    https = require('https'), http = require('http'), path = require('path'), port = process.argv[2] || 443,
    insecurePort = process.argv[3] || 80, fs = require('fs'), path = require('path'), checkip = require('check-ip-address'), server, insecureServer, options;


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
// SSL Certificates
options = {
    key: fs.readFileSync(path.join('../certs', 'www_devesh_in.pem.key')),
    ca: [
        fs.readFileSync(path.join('../certs', 'level2_external_ca.pem.crt')),
        fs.readFileSync(path.join('../certs', 'level1_trust_ca.pem.crt')),
        fs.readFileSync(path.join('../certs', 'level0_root_ca.pem.crt'))
    ],
    cert: fs.readFileSync(path.join('../certs', 'www_devesh_in.pem.crt')),
    requestCert: true,
    rejectUnauthorized: false,
    passphrase: 'namezero'
};

// Serve an Express App securely with HTTPS
server = https.createServer(options);
checkip.getExternalIp().then(function (ip) {
host = ip || 'devesh.in';

function listen(application) {
    server.on('request', application);
    server.listen(port, function () {
        port = server.address().port;
        console.log('Listening on port ' + port);
    });
}

publicDir = path.join(__dirname, 'public');
myapp = app.create(server, host, port, publicDir);
    listen(myapp);
});

// Redirect HTTP to HTTPS
insecureServer = http.createServer();
insecureServer.on('request', function (req, res) {
    res.setHeader('Location', 'https://devesh.in' + req.url);
    res.statusCode = 302;
    res.end();
});
insecureServer.listen(insecurePort, function(){
    console.log("\nRedirecting all http traffic to https\n");
});
