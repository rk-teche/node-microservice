import Express from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";

const app = Express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => 
{
    res.send(posts);
});

app.post("/posts", (req, res) => 
{
    const id = randomBytes(4).toString("hex");

    console.log("req.body", req.body);
    const { title } = req.body;

    posts[id] = { title, id };

    res.status(201).send(posts[id]);
});

app.listen(4000, () => console.log("Listening @4000"));