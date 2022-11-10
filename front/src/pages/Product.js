import React from 'react'
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { getProduct } from '../services/products';
import { Cart } from '../context/Cart';

const Product = () => {


    const {productId} = useParams();
    const [isLoaded,setIsLoaded] = useState(false);
    const [product,setProduct] = useState({});
    const [qty,setQty] = useState(1);
    
    const {cart,setCart} = React.useContext(Cart);  
    const [buttonText, setButtonText] = useState("Ajouter");
    const changeText = (text) => setButtonText(text);
    

    

    useEffect(()=>{
        const fetchData = async() =>{
            const product = await getProduct(productId);
            setProduct(product);
            setIsLoaded(true);
            
            
        };
        fetchData();
    },[productId]);


    useEffect(()=>{
        let find = false
        var qty2 = 0;
        const fetchData = () =>{
            
            if (typeof cart !== "undefined"){
                cart.forEach(item => {

                    if (parseInt(item.product.id) === parseInt(productId)){
                        find = true;
                        qty2 = parseInt(item.qty);
             
                    }

                });
                if(find){
                    setQty(qty2);
                    changeText("Mise à jour");
                }
            }
            
       };
        fetchData();
        
    },[product]);

    
    const onChangeHandler = (event) =>{
        setQty(event.target.value);
    }

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        let find = false;
        if (parseInt(qty) === 0)
        { 
            let newCart = cart.filter(index => parseInt(index.product.id) !== parseInt(productId))
            setCart(newCart);
        }
        else{
            const newCart = cart.map((item) => {
                if (item.product && parseInt(item.product.id) === parseInt(productId)) {
                    const updatedItem = {
                        ...item,
                        qty: parseInt(qty),
                    };
                    return updatedItem;
                    find = true;
                }
                if (parseInt(qty) !== 0 || parseInt(item.product.id) !== parseInt(productId)){
                    return item;
                }
            });
    
    
            if (find) {
                setCart(newCart);
                changeText("Mise à jour");
            } else {
                setCart([...cart, { qty, product }])
            }
            console.log("test");
            console.log(cart);
        }
        
        /*
        if (qty === 0){
            console.log("del2");
            delete cart[0];
            cart.splice(0,1);
            console.log(cart);
            setCart(cart);
            changeText("Ajouter");
        }
        */
    }
    return (<>
        {!isLoaded && <> Chargement..</>}
        { isLoaded && <div class="card h-100 Pcard cardcolor">
            
            <div class="card-body ">
                <h5 class="card-title Ptext">{product.name}</h5>
                <div class="row align-items-start card-body">
                    <div class="col-8">
                    <p class="card-text Ptext">{product.description}</p>
                    </div>
                    <img src={product.picture2} alt={product.name} class=" col-3 Pimage" >
                    </img>
                    
                    <form class="row mb-3 col-1" onSubmit={onSubmitHandler}>
                        <div class="col-sm-10">
                             <label className="card-text Pprice">{product.price} € </label>
                        </div>
                        <div class="col-sm-10" >
                            <input class="form-control Pinput" onChange={onChangeHandler} value= {qty}type="number" placeholder="0"  ></input>
                        </div>
                        <div className="col-sm-10">
                            <button class="btn btn-outline-light Pbutton " type="submit" onClick={() => changeText("Mise à jour")} >{buttonText}</button>
                        </div>
                    </form>
                </div>
             </div>
        </div>
        }
        </>
    )
}

export default Product
