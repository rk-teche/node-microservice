import Express from "express";
import { randomBytes } from "crypto";
import bodyParser from "body-parser";

const app = Express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => 
{
    const postID = req.params.id;

    const postComments = commentsByPostId[postID] || [];
    res.send(postComments);
});

app.post("/posts/:id/comments", (req, res) => 
{
    const id = randomBytes(4).toString("hex");

    const postId = req.params.id;
    if (!postId)
        res.status(404).send("Post ID is not found");

    const { content } = req.body;
    const comments = commentsByPostId[postId] || [];
    const currentComment = { id, content, postId };
    comments.push(currentComment);
    commentsByPostId[postId] = comments;

    res.status(201).send(currentComment);
});

app.listen(4001, () => console.log("Listening @4001"));