"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require('dotenv').config();
var app = (0, express_1.default)();
var port = process.env.PORT || 5000;
var whitelist = ['http://localhost:3000'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};
app.set('view engine', 'ejs');
app.use((0, cors_1.default)(corsOptions));
app.use('/api/rates', require('./api/currency'));
app.use('/**', function (req, res) {
    res.status(404).send("Api your searching for is not avail...");
});
app.listen(port, function () {
    console.log("Server running at port " + port);
});
