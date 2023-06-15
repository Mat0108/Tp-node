import axios from "axios";
export const getPosts = async (isConnected) => {
    const res = await axios.get(`http://localhost:3000/posts`);
    return res;
}

export const CreatePostAPI  = async (post,token) => {
    const res = await axios.post(`http://localhost:3000/posts`,post);
    return res;
}

export const getPost = async (postId)=>{
    const res = await axios.get(`http://localhost:3000/posts/${postId}`);
    return res.data;
}