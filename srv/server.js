const cds = require("@sap/cds");
const cors = require('cors');
const cov2ap = require("@sap/cds-odata-v2-adapter-proxy");
cds.on("bootstrap", (app) => {
    app.use(cov2ap());
    app.use(cors());
    app.get("/miendpoint", (req, res) => {
        res, status(200).send("I'm here");
    });
});
if (process.env.NODE_ENV !== "production") {

    require("dotenv").config();
}
module.exports = cds.server;

