import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const validationText = "orange";

const app = Express();
app.use(cors());
app.use(bodyParser.json());

const EVENT_BUS_URL = "http://event-bus-srv:4005";

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
        await axios.post(`${EVENT_BUS_URL}/events`, {
            type: "CommentModerated",
            data
        });
    }

    res.send({});
});

app.listen(4003, async () => 
{
    console.log("Listening @4003");
    try
    {
        const res = await axios.get(`${EVENT_BUS_URL}/events`);

        for (let event of res.data)
        {
            console.log("Processing events", event.type);
            handleEvent(event);
        }
    }
    catch (error)
    {
        console.log(error.message);
    }
});