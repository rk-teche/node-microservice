import axios from 'axios';

const getReq = (url: string) => {
    return axios.get(url)
        .then(response => {
            // Check if the status is OK (200)
            if (response.status === 200)
            {
                return response.data;
            } else
            {
                throw new Error('Response not OK');
            }
        })
        .catch(error => {
            // Handle any other errors
            throw new Error(error);
        });
};

const postReq = (url: string, data: any) => {
    return axios.post(url, data)
        .then(response => {
            if (response.status === 200 || response.status === 201)
            {
                return response.data;
            } else
            {
                throw new Error('Response not OK');
            }
        })
        .catch(error => {
            throw error;
        });
};

const putReq = (url: string, data: any) => {
    return axios.put(url, data)
        .then(response => {
            if (response.status === 200)
            {
                return response.data;
            } else
            {
                throw new Error('Response not OK');
            }
        })
        .catch(error => {
            throw error;
        });
};

const deleteReq = (url: string) => {
    return axios.delete(url)
        .then(response => {
            if (response.status === 200 || response.status === 204)
            {
                return response.data;
            } else
            {
                throw new Error('Response not OK');
            }
        })
        .catch(error => {
            throw error;
        });
};

export { getReq, postReq, putReq, deleteReq };
