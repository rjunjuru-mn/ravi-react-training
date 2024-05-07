import axios from "axios";
import { useEffect, useState } from "react";
import { Space ,Card,Spin} from "antd";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

export default function Cartpage(){
    var [cartCakes, setCartCakes] = useState([]);
    const [loading, setLoading] = useState(true);
    var navigate = useNavigate();

    useEffect(() => {
        // Simulate loading process
       const timeout = setTimeout(() => {
        setLoading(false);
      }, 2000); // Simulating a 3-second loading time

      callApi()
    }, [])

    function callApi(){
        if (!localStorage.token){
            navigate("/login");
            return;
        }
        axios({
            url:"http://apibyauw.eu-4.evennode.com/api"+"/cakecart",
            method:"get",
            headers:{
                Authorization:localStorage.token 
            }
        }).then((response) => {
            setCartCakes(response.data.data)
        }, (error) => {
            console.log("error in cart");
        })
    }
    return (
        <>
        <Spin spinning={loading} size="large" />
        <div style={{ display: loading ? 'none' : 'block' }}></div>
        {   
            cartCakes?.map((each) => {
                return(
                    <Space direction="horizontal">
                    <Card>
                        <Link to={"/detail/"+each.cakeid}><img src={each.image} style={{height:150, width:150}} /></Link>
                        <p>Name : {each.name}</p>
                        <p>Price : {each.price}</p>
                    </Card>
                    </Space>
                );
            })
        }
        {cartCakes?.length == 0 && <h1>No items in cart</h1>}
        </>
    )
}