import { AnyARecord } from "dns";
import React, { useEffect, useState } from "react";
import { getReq, postReq } from "./utils/api.service";
import { CommentUrl } from "./utils/Constant";

export default ({ id }: any) => {
    const [content, setContent] = useState("");

    const onSubmit = async (event: any) => {
        event.preventDefault();
        postReq(`${CommentUrl}/posts/${id}/comments`, {
            content
        }).then(_ => {
            setContent("");
        });

    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>New Comment</label>
                    <input
                        className="form-control"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};