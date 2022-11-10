import React,{useState,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import {login,register} from "../services/auth";
import { UserState } from '../atom/Userinfo';
import {useRecoilState} from 'recoil';

import { CreatePostAPI } from '../services/posts';
const CreatePost = () => {
    let navigate = useNavigate();
    const [userset, setUserset] = useRecoilState(UserState);
    useEffect(()=>{
        if(userset.isAdmin != true){
            navigate("/");
        }

    },[userset]);

    
    const [messages,setMessages] = useState([]);
    const [post,setPosts] = useState({
        'title':'',
        'content':'',
        'isAdmin':''
    })

    const onClick = async (event) =>{
        event.preventDefault();
        post.isAdmin=true;
        console.log(post);
        const res = await CreatePostAPI(post,userset.token);
            if (res.status === 201)
            {
                navigate("/posts")
            }
    }
    const onChangeHandler = (event) =>{
        const {id,value}= event.target
        setPosts({...post,[id]:value})
        console.log(post);
    }
    return (
        <form onSubmit={onClick}>
            
            { messages.map(message => <div class={message.type}>
                <h1 class={message.text}>{message.msg}</h1>
            </div> )}
            <div class="row Rfoam cardcolor">
                <h2 className="CH1">Creer un post</h2>
                <div class="col-2">
                    <label class="Rlabel" for="titre">titre</label>
                </div>
                <div class="col-10">
                    <input type="text" onChange={onChangeHandler} value = {post.title} class="form-control Rinput" placeholder="Entrez le titre"  id="title" required></input>
                </div>
                <div class="col-2">
                    <label class="Clabel" for="titre">contenu</label>
                </div>
                <div class="col-10">
                    <input type="text" onChange={onChangeHandler} value = {post.content} class="form-control Cinput text-start" placeholder="Entrez le contenu de votre post (non obligatoire)"  id="content"></input>
                </div>

                <div >
                    <input class="Rbutton btn btn-succes" type="submit" name = "send" value = "Creation"></input>
                </div>

            </div>
        </form>

    )
}

export default CreatePost;