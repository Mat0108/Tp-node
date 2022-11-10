import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {login,register} from "../services/auth";
import { UserState } from '../atom/Userinfo';
import {useRecoilState} from 'recoil';
const Register = () => {
    let navigate = useNavigate();
    
    const [messages,setMessages] = useState([]);
    const [userset, setUserset] = useRecoilState(UserState);
    const [user,setUser] = useState({
        'email':'',
        'cf_email':'',
        'password':'',
        'cf_password':'',
        'firstname':'',
        'lastname':''
    })

    const onClick = async (event) =>{
        event.preventDefault();
        console.log(user);
        if(user.email === user.cf_email && 
            user.password === user.cf_password && 
            user.password.length >= 6 && user.email !== ""){
            const res = await register({email:user.email,password:user.password,isAdmin:false});
            if (res.status === 201)
            {
                const userResult = await login({email:user.email,password:user.password});
                
                setUserset({isAdmin:userResult.data.isAdmin,isConnected:true});
                if(userResult.status === 200){navigate("/");} 
            }
            console.log(res);
        }else{
            if(user.password.length <=6){setMessages([...messages,{type:"alert alert-danger message",text:"messageh1",msg:"mot de passe trop court"}]);}
            if(user.email !== user.cf_email && 
                user.password !== user.cf_password ){setMessages([...messages,{type:"alert alert-danger message",text:"messageh1",msg:"mot de passe ou mail différents"}]);}
            console.log('erreur sending');
        }
        
    }
    const onChangeHandler = (event) =>{
        const {id,value}= event.target
        setUser({...user,[id]:value})
    }
    return (
        <form onSubmit={onClick}>
            
            { messages.map(message => <div class={message.type}>
                <h1 class={message.text}>{message.msg}</h1>
            </div> )}
            <div class="row Rfoam cardcolor">
                <h2 className="CH1">Creer votre compte</h2>
                <div class="col-2">
                    <label class="Rlabel" for="email">Email</label>
                    </div>
                <div class="col-10">
                    <input type="text" onChange={onChangeHandler} value = {user.email} class="form-control Rinput" placeholder="Entrez votre email"  id="email"></input>
                </div>
                <div class="col-2">
                    <label class="Rlabel" for="cf_email">Email</label>
                    </div>
                <div class="col-10">
                    <input type="text" onChange={onChangeHandler} value = {user.cf_email} class="form-control Rinput" placeholder="Re-entrez votre email"  id="cf_email"></input>
                </div>
                <div class="col-2">
                    <label class="Rlabel" for="password">Password</label>
                    </div>
                <div class="col-10">
                    <input type="password" onChange={onChangeHandler} value = {user.password} class="form-control Rinput"  placeholder="Entrez votre password"  id="password"></input>
                </div>
                <div class="col-2">
                    <label class="Rlabel" for="cf_password">Password</label>
                </div>
                <div class="col-10">
                    <input type="password" onChange={onChangeHandler} value = {user.cf_password} class="form-control Rinput" placeholder="Re-entrez votre password" id="cf_password"></input>
                </div>
                <div >
                    <input class="Rbutton btn btn-succes" type="submit" name = "send" value = "Creation"></input>
                </div>
                <Link to='/Login' class="Rlink">Login</Link>

            </div>
        </form>

    )
}

export default Register;