import React from 'react'
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getPosts } from '../services/posts';
import { UserState } from '../atom/Userinfo';
import {useRecoilState} from 'recoil';
import { useNavigate } from "react-router-dom";
const ShowPosts = () => {

    let navigate = useNavigate();
    const [userset, setUserset] = useRecoilState(UserState);

    const [isLoaded,setIsLoaded] = useState(false);
    const [posts,setPosts] = useState({});

     

    

    

    useEffect(()=>{
        console.log("user : ",userset);
        const fetchData = async() =>{
            let data = await getPosts()
            console.log(data)
            setPosts(data);
            setIsLoaded(true);
        };
        if(userset.isConnected == true){
            fetchData();
        }else{navigate("/login"); }
        console.log("user : ",userset);

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
                                    <td className="text-center">{post.title}</td>
                                    <td className="text-start">{post.content}</td>
                                </tr>)}
                            </tbody>
                        </table>
            </div>}
        </>
    )
}

export default ShowPosts
