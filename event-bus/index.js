import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = Express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};
const events = [];

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

    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);
    // axios.post("http://localhost:4003/events", event);

    res.send({ status: "OK" });
});

app.listen(4005, () => console.log("Listening @4005"));