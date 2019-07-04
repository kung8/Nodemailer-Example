const nodemailer = require('nodemailer')
const { EMAIL, PASSWORD } = process.env
module.exports = {
  email: async (req, res) => {
    const { name, message, email, title, image } = req.body

    try {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL,
          pass: PASSWORD
        }
      });

      let info = await transporter.sendMail({
        from: `'${name}' <${email}>`,
        to: EMAIL,
        subject: title,
        text: message,
        html: `<div>${message}<div>
              <img src="cid:unique@nodemailer.com"/>`,
        attachments: [
          { //this is the attachment of the document
            filename: 'license.txt',
            path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
          },
          { //this is the embedded image
            cid: 'unique@nodemailer.com', //same cid value as in the html img src
            path:image
          }
        ]
      }, (err, res) => {
        if (err) {
          console.log('err', err)
        } else {
          console.log('res', res)
          res.status(200).send(info)
        }
      })
    } catch (err) {
      console.log(err)
      res.sendStatus(500)
    }
  }
}