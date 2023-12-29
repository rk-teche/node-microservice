import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const validationText = "orange";

const app = Express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => 
{
    res.send(posts);
});

app.post("/events", async (req, res) => 
{
    const { type, data } = req.body;

    if (type === "CommentCreated")
    {
        const { content = "" } = data;
        data.status = !content.includes(validationText) ? "approved" : "rejected";
        await axios.post("http://localhost:4005/events", {
            type: "CommentModerated",
            data
        });
    }

    res.send({});
});

app.listen(4003, () => console.log("Listening @4003"));