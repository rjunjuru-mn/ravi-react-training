import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import {Space, Card,Spin} from "antd";
import { Link } from "react-router-dom";


export default function Searchcakes(){
    var [matchedCakes, setAllMatchedCakes] = useState([]);
    var [query, setQuery] = useSearchParams();
    var name = query.get("q");
    const [loading, setLoading] = useState(true);


    //getting all the matched cakes from api (backend)
    useEffect(() => {
        // Simulate loading process
       const timeout = setTimeout(() => {
        setLoading(false);
      }, 2000); // Simulating a 3-second loading time

        axios({
            url:"http://apibyauw.eu-4.evennode.com/api"+"/searchcakes?q="+name,
            method: "get"
        }).then(
            (response) => {
                setAllMatchedCakes(response.data.data);
                console.log("all cakes = ",matchedCakes)
            }, (error) => {
                console.log("no cakes data found", error)
            }
        )
    },[matchedCakes])

    return (<>
    <Spin spinning={loading} size="large" />
    <div style={{ display: loading ? 'none' : 'block' }}></div>
    {!loading && matchedCakes.length > 0 &&
        matchedCakes.map((each) => {
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
    {loading && matchedCakes.length == 0 && <h1>No cakes found for name : {name}</h1>}
    </>);

}