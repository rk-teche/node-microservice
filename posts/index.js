import Express from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import axios from "axios";
// import { EVENT_BUS_URL } from "./Constant";

const app = Express();
app.use(cors());
app.use(bodyParser.json());

const EVENT_BUS_URL = "http://event-bus-srv:4005";
const posts = {};

app.get("/posts", (req, res) => 
{
    res.send(posts);
});

app.post("/posts", async (req, res) => 
{
    const id = randomBytes(4).toString("hex");

    console.log("req.body", req.body);
    const { title } = req.body;

    posts[id] = { title, id };

    await axios.post(`${EVENT_BUS_URL}/events`, {
        type: "PostCreated",
        data: posts[id]
    });

    res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => 
{
    console.log("received", req.body.type);
    res.send({});
});

app.listen(4000, () => console.log("Listening @4000 hello"));