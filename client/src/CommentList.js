import React, { useEffect, useState } from "react";
import { getReq, postReq } from "./utils/api.service";
import { CommentUrl } from "./utils/Constant";

export default ({ id, comments = [] }) =>
{
    // const [comments, setComments] = useState([]);

    // const fetchComments = async () =>
    // {
    //     getReq(`${CommentUrl}/posts/${id}/comments`).then(setComments);
    // };

    // useEffect(() => 
    // {
    //     fetchComments();
    // }, []);

    return (
        <ul className="">
            {
                comments.map(comment =>
                {
                    return (
                        <li className="" key={comment.id}>
                            {comment.content}
                        </li>
                    );
                })
            }
        </ul>
    );
};