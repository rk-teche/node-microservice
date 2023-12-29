import Express from "express";
import cors from "cors";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";
import axios from "axios";

const app = Express();
app.use(cors());
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => 
{
    const postID = req.params.id;

    const postComments = commentsByPostId[postID] || [];
    res.send(postComments);
});

app.post("/posts/:id/comments", async (req, res) => 
{
    const id = randomBytes(4).toString("hex");

    const postId = req.params.id;
    if (!postId)
        res.status(404).send("Post ID is not found");

    const { content } = req.body;
    const comments = commentsByPostId[postId] || [];
    const currentComment = { id, content, postId, status: "pending" };

    await axios.post(`http://localhost:4005/events`, {
        type: "CommentCreated",
        data: currentComment
    });
    comments.push(currentComment);
    commentsByPostId[postId] = comments;

    res.status(201).send(currentComment);
});


app.post("/events", async (req, res) => 
{
    const { type, data } = req.body;

    if (type === "CommentModerated")
    {
        const { id, postId } = data;
        let comments = commentsByPostId[postId] || [];
        comments = comments.map(comment => comment.id === id ? data : comment);
        commentsByPostId[postId] = comments;

        await axios.post("http://localhost:4005/events", {
            type: "CommentUpdated",
            data
        });
    }
    res.send({});
});

app.listen(4001, () => console.log("Listening @4001"));