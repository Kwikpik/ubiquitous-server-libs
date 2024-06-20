"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYSTACK_SECRET = exports.NM_PASSWORD = exports.NM_EMAIL = exports.TERMII_API_KEY = void 0;
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.TERMII_API_KEY = process.env.TERMII_API_KEY;
exports.NM_EMAIL = process.env.NM_EMAIL;
exports.NM_PASSWORD = process.env.NM_PASSWORD;
exports.PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;
