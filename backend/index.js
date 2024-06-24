require("dotenv").config();
const http = require('http');
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.email,
    pass: process.env.password
  }
})

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.url === "/" && req.method === "POST") {

    let body = "";

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const data = JSON.parse(body);

      const mailOptions = {
        from: `Frontend developer <${process.env.email}>`,
        to: data.email,
        subject: "Form",
        html: `<h3>Name: ${data.name}<br/>Phone: ${data.phone}<br/>Email: ${data.email}</h3>`
      }

      transporter.sendMail(mailOptions, function (error) {
        if (!error) {
          res.end('Ok');
        } else {
          console.log(error)
          res.end('Error');
        }
      })
    });
  } else {
    res.statusCode = 404
    res.end('Error');
  }
})

server.listen(3000, "127.0.0.1");
