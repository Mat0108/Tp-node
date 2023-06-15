import React from 'react'
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getPost, getPosts } from '../services/posts';
import { UserState } from '../atom/Userinfo';
import {useRecoilState} from 'recoil';
import { useNavigate } from "react-router-dom";
const ShowPost = () => {

    let navigate = useNavigate();
    const [userset, setUserset] = useRecoilState(UserState);

    const [isLoaded,setIsLoaded] = useState(false);
    const [post,setPost] = useState({});
    let postId = useParams();
     

    

    

    useEffect(()=>{
        console.log("postId : ",postId);
        const fetchData = async() =>{
            let data = await getPost(postId.postId)
            console.log(data)
            setIsLoaded(true)
            setPost(data);
            };
        fetchData();

    },[userset]);


       

    return (<>
        {!isLoaded && <> Chargement..</>}
        { isLoaded && <div class=" h-100">
        <table className="table table-dark table-striped ">
                            <thead>
                                <tr>
                                    <th className="text-center">titre : {post.title}</th>
                                    <th className="text-center">texte : {post.content}</th>
                                </tr>
                            </thead>
                        </table>
            </div>}
        </>
    )
}

export default ShowPost
