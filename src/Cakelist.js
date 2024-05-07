import axios from "axios";
import { Space,Card,Spin } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cakelist(){
    var [allCakes,setAllCakes] = useState([]);
    const [loading, setLoading] = useState(true);

    //we are taking all the cakes from backend api
    useEffect(() => {
        // Simulate loading process
       const timeout = setTimeout(() => {
        setLoading(false);
      }, 3000); // Simulating a 3-second loading time

        axios({
            url:"http://apibyauw.eu-4.evennode.com/api"+"/allcakes",
            method: "get"
        }).then(
            (response) => {
                setAllCakes(response.data.data);
                console.log("all cakes = ",allCakes)
            }, (error) => {
                console.log("no cakes data found", error)
            }
        )
    },[])
    
    return(<>
        <Spin spinning={loading} size="large" />
        <div style={{ display: loading ? 'none' : 'block' }}></div>
        {   
            allCakes?.map((each) => {
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
    </>);
}