const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = (req, res) => {
  if (!req.body.phone) {
    return res.status(422).json({ error: 'You must supply a phone number' });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, '');

  admin.auth().getUser(phone)
    .then((userRecord) => {
      const code = Math.floor(Math.random() * 8999 + 1000);

      twilio.messages.create({
        body: `Your security code is ${code}`,
        to: phone,
        from: '+442033224658'
      }, (err) => {
        if (err) { return res.status(422).send({ err: err }); }

        admin.database().ref(`users/${phone}`)
          .update({ code, codeValid: true }, () => {
            res.send({ success: true });
          });

      })
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
}
