"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const axios_1 = __importDefault(require("axios"));
// import { POST_URL } from "./Constant";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const posts = {};
const events = [];
const POST_URL = "http://posts-cluster-srv:4000";
const COMMENT_URL = "http://comment-cluster-srv:4001";
const QUERY_URL = "http://query-cluster-srv:4002";
const MODERATION_URL = "http://moderation-cluster-srv:4003";
app.get("/posts", (req, res) => {
    res.send(posts);
});
app.get("/events", (req, res) => {
    res.send(events);
});
app.post("/events", (req, res) => {
    const event = req.body;
    events.push(event);
    axios_1.default.post(`${POST_URL}/events`, event);
    axios_1.default.post(`${COMMENT_URL}/events`, event);
    axios_1.default.post(`${QUERY_URL}/events`, event);
    axios_1.default.post(`${MODERATION_URL}/events`, event);
    res.send({ status: "OK" });
});
app.listen(4005, () => console.log("Listening @4005"));
