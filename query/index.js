import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = Express();
app.use(cors());
app.use(bodyParser.json());

const EVENT_BUS_URL = "http://event-bus-srv:4005";
const posts = {};

app.get("/posts", (req, res) => 
{
    res.send(posts);
});

function postCreated(data)
{

    const { id } = data;
    data["comments"] = [];
    posts[id] = data;
}

function commentCreated(data)
{
    const { id, content, postId, status } = data;
    const post = posts[postId];

    post.comments.push({ id, content, status });
}

function commentUpdated(data)
{
    const { id, postId } = data;
    const post = posts[postId];

    if (post)
    {
        post.comments = post.comments.map(comment => comment.id === id ? data : comment);
    }
}

app.post("/events", (req, res) => 
{
    handleEvent(req.body);
    res.send({});
});

const handleEvent = (event) =>
{
    const { type, data } = event;

    switch (type)
    {
        case "PostCreated":
            postCreated(type, data);
            break;
        case "CommentCreated":
            commentCreated(type, data);
            break;
        case "CommentUpdated":
            commentUpdated(type, data);
            break;
    }
};

app.listen(4002, async () => 
{
    console.log("Listening @4002");
    try
    {
        const res = await axios.get(`${EVENT_BUS_URL}/events`);
        console.log("res", res.data);
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