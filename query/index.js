import Express from "express";
import cors from "cors";
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

app.post("/events", (req, res) => 
{
    const { type, data } = req.body;

    if (type === "PostCreated")
    {
        const { id } = data;
        data["comments"] = [];
        posts[id] = data;
    }

    if (type === "CommentCreated")
    {
        const { id, content, postId, status } = data;
        const post = posts[postId];

        post.comments.push({ id, content, status });
    }

    if (type === "CommentUpdated")
    {
        const { id, postId } = data;
        const post = posts[postId];

        if (post)
        {
            post.comments = post.comments.map(comment => comment.id === id ? data : comment);
        }
    }

    res.send({});
});

app.listen(4002, () => console.log("Listening @4002"));