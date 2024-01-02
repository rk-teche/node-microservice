import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
// import { POST_URL } from "./Constant";

const app = Express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};
const events = [];
const POST_URL = "http://posts-cluster-srv:4000";

app.get("/posts", (req, res) => 
{
    res.send(posts);
});

app.get("/events", (req, res) => 
{
    res.send(events);
});

app.post("/events", (req, res) => 
{
    const event = req.body;
    events.push(event);

    axios.post(`${POST_URL}/events`, event);
    // axios.post("http://localhost:4001/events", event);
    // axios.post("http://localhost:4002/events", event);
    // axios.post("http://localhost:4003/events", event);

    res.send({ status: "OK" });
});

app.listen(4005, () => console.log("Listening @4005"));