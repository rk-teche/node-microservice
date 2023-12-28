import Express from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import axios from "axios";

const app = Express();
app.use(cors());
app.use(bodyParser.json());

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

    await axios.post(`http://localhost:4005/events`, {
        type: "PostCreated",
        data: posts[id]
    });

    res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => 
{
    console.log("received Event", req.body.type);
    res.send({});
});

app.listen(4000, () => console.log("Listening @4000"));