import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
// import { POST_URL } from "./Constant";

const app = Express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};
const events: any[] = [];
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
    const event: any = req.body;
    events.push(event);

    axios.post(`${POST_URL}/events`, event);
    axios.post(`${COMMENT_URL}/events`, event);
    axios.post(`${QUERY_URL}/events`, event);
    axios.post(`${MODERATION_URL}/events`, event);

    res.send({ status: "OK" });
});

app.listen(4005, () => console.log("Listening @4005"));