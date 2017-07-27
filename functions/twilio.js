const twilio = requre('twilio');
const config = require('./config');

module.exports = new twilio.Twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_ID);
