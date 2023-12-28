import axios from 'axios';

const getUrl = (url) => `${"localhost:4000"}/${url}`;

const getReq = (url) =>
{
    return axios.get(getUrl(url))
        .then(response =>
        {
            // Check if the status is OK (200)
            if (response.status === 200)
            {
                return response.data;
            } else
            {
                throw new Error('Response not OK');
            }
        })
        .catch(error =>
        {
            // Handle any other errors
            throw error;
        });
};

const postReq = (url, data) =>
{
    const appURL = getUrl(url);
    return axios.post(appURL``, data)
        .then(response =>
        {
            if (response.status === 200 || response.status === 201)
            {
                return response.data;
            } else
            {
                throw new Error('Response not OK');
            }
        })
        .catch(error =>
        {
            throw error;
        });
};

const putReq = (url, data) =>
{
    return axios.put(getUrl(url), data)
        .then(response =>
        {
            if (response.status === 200)
            {
                return response.data;
            } else
            {
                throw new Error('Response not OK');
            }
        })
        .catch(error =>
        {
            throw error;
        });
};

const deleteReq = (url) =>
{
    return axios.delete(getUrl(url))
        .then(response =>
        {
            if (response.status === 200 || response.status === 204)
            {
                return response.data;
            } else
            {
                throw new Error('Response not OK');
            }
        })
        .catch(error =>
        {
            throw error;
        });
};

export { getReq, postReq, putReq, deleteReq };
