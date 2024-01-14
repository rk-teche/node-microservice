import React, { useState } from "react";
import { getReq, postReq } from "./utils/api.service";
import { PostUrl } from "./utils/Constant";

export default () => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (event: any) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event: any) => {
        setLoading(true);
        postReq(`${PostUrl}/posts`, { title })
            .then(data => {
                setTitle("");
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    return (
        <>
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input className="form-control" onChange={handleChange} value={title} />
                </div>
                <button className="btn btn-primary" type="button" onClick={handleSubmit}>submit</button>
            </form>
        </>
    );
};