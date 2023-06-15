import React from 'react'
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getPosts } from '../services/posts';
import { UserState } from '../atom/Userinfo';
import {useRecoilState} from 'recoil';
import { Link, useNavigate } from "react-router-dom";
const ShowPosts = () => {

    let navigate = useNavigate();
    const [userset, setUserset] = useRecoilState(UserState);

    const [isLoaded,setIsLoaded] = useState(false);
    const [posts,setPosts] = useState({});

     

    

    

    useEffect(()=>{
        const fetchData = async() =>{
            let data = await getPosts()
            setPosts(data.data);
            setIsLoaded(true);
        };
        fetchData();

    },[userset]);


       

    return (<>
        {!isLoaded && <> Chargement..</>}
        { isLoaded && <div class=" h-100">
        <table className="table table-dark table-striped ">
                            <thead>
                                <tr>
                                    <th className="text-center">titre</th>
                                    <th className="text-center">texte</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post, index) => <tr key={`cart-${index}`}>
                                    <td className="text-center"><Link to={`/post/${post._id}`} >{post.title}</Link> </td>
                                    <td className="text-start">{post.content}</td>
                                </tr>)}
                            </tbody>
                        </table>
            </div>}
        </>
    )
}

export default ShowPosts
