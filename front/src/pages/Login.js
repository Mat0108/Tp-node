import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {login} from "../services/auth";
import {useRecoilState} from 'recoil';
import { UserState } from '../atom/Userinfo';

const Login = () => {
    let navigate = useNavigate();

    const [messages,setMessages] = useState([]);
    const [userset, setUserset] = useRecoilState(UserState);
    const [user,setUser] = useState({
        'email':'',
        'password':''
    });

    const onClick = async (event) =>{
        event.preventDefault();
        setMessages([])
        if(user.password !== "" && user.email !== ""){
            try{
                const userResult = await login(user);
                setMessages([...messages,{type:"alert alert-success",msg:"vous êtes connecté !"}]);
                setUserset({isAdmin:userResult.data.user.isAdmin,isConnected:true,token:userResult.data.token});              
                navigate("/"); 
            }catch (error){
                console.log(error);

            }
        }else{
            setMessages([...messages,{type:"alert alert-info",msg:"merci de remplir les deux champs "}]);
        }
        // alert(message.msg,message.type);
    }
    const onChangeHandler = (event) =>{
        const {id, value}= event.target
        setUser({...user, [id]:value})
        setMessages([]);
    }
    return (
        <div>
            { messages.map(message => <div class={message.type}>
                {message.msg}
            </div> )}
            <form onSubmit={onClick}>
                <div class="row Cfoam cardcolor">
                    <h2 className="CH1">Connection</h2>
                    <div class="col-2">
                        <label class="Llabel" for="email">Email</label></div>
                    <div class="col-10">
                        <input type="text" onChange={onChangeHandler} value={user.email} class="form-control Linput" placeholder="Entrez votre email "id="email"></input>
                    </div>
                    <div class="col-2">
                        <label class="Llabel" for="password1">Password</label></div>
                    <div class="col-10">
                        <input type="password" onChange={onChangeHandler} value = {user.password} class="form-control Linput" placeholder="Entrez votre password" id="password"></input>
                    </div>
                    <div class="col-12">
                        <input class="Rbutton" type="submit" name = "send" value = "Connection"></input>
                    </div>
                    <Link to='/Register' class="Clink">Creer votre compte</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;