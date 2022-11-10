import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Navbar = () => {
    const [categories,setCategories] = useState([]);
    const getProductCategory = async () => {
        const res = await axios.get('http://localhost:5000/api/products-category/');
        console.log(res);
        setCategories(res.data);
    };
    useEffect(()=>{
        getProductCategory()
    }, []);

    
    return (
        <nav>
            <Link to='/'>Home</Link>
            {
                categories.map((category)=> <Link key ={`cat-${category.id}`} to = {`/category/${category.id}`}>
                    {category.name}
                </Link>
                    
                )
            }
        </nav>
    
    )
}

export default Navbar
