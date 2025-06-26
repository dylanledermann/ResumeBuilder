const {onRequest} = require("firebase-functions/https");
const app = require("../backend/server");

exports.api = onRequest(app);
