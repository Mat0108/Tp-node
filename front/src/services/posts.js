import axios from "axios";
export const getPosts = async (isConnected) => {
    console.log("service : ",isConnected);
    const res = await axios.get(`http://localhost:3000/posts`,{params: {isConnected: isConnected}});
    return res.data;
}

export const CreatePostAPI  = async (post,token) => {
    const res = await axios.post(`http://localhost:3000/posts`,{data: {post}},{headers:{'Authorization':token}});
    return res;
}
