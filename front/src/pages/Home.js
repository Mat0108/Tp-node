import React from 'react';

import { UserState } from '../atom/Userinfo';
import {useRecoilState} from 'recoil';
import { Link } from 'react-router-dom';

const Home = () => {
    
    const [userset, setUserset] = useRecoilState(UserState);
    console.log(userset)
    return (
        <div className="Container" >
            <h1 className="Pstitre">Bienvenue sur le site</h1>
            <Link class="dropdown-item Cdropdown" to="/posts">posts </Link>
            <Link class="dropdown-item Cdropdown" to="/posts/create">create post </Link>
            
        </div>
    )
}
export default Home;