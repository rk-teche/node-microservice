import React, { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import { getReq } from "./utils/api.service";
import { PostUrl } from "./utils/Constant";

export default () =>
{
    const [posts, setPosts] = useState({});

    const fetchPosts = async () =>
    {
        getReq(`${PostUrl}/posts`).then(setPosts);
    };

    useEffect(() => 
    {
        fetchPosts();
    }, []);

    const renderedPost = Object.values(posts);
    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {
                renderedPost.map(post =>
                {
                    return (
                        <div className="card" key={post.id}>
                            <div className="card-body">
                                <h3>{post.title}</h3>
                                <CommentList id={post.id} />
                                <CommentCreate id={post.id} />
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};