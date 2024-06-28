// protected routes on backend

const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        //console.log(req);
        const token = req.headers.authorization.split(" ")[1];
        //console.log("inside middle ware2");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        //console.log(decoded);
        //console.log(decoded._id);
        req.body.userId = decoded._id;
        //console.log(req);
        next();
    } catch (err) {
        res.status(401).send({ success: false, message: "Invalid Token" });
    }
}
