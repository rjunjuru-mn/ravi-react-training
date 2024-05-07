import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Space,Button } from "antd";

export default function Cakedetail(){
    var params = useParams() //using params hook function to get parameter values from link
    var cakeid = params.cakeid;
    var [cake, setCake] = useState({});

    // we are taking cake details from backend using cakeid
    useEffect(() => {
        axios({
            url:"http://apibyauw.eu-4.evennode.com/api"+"/cake/"+cakeid,
            method: "get"
        }).then(
            (response) => {
                setCake(response.data.data);
            }, (error) => {
                console.log("no cake data found", error)
            }
        )
    },[])

    var cartcake = {cakeid : cake?.cakeid , 
        name : cake?.name , 
        price : cake?.price , 
        image : cake ?.image , 
        weight : cake?.weight
    }

    function addToCart(){
        if (!localStorage.token){
            alert("You have not logged in, please login")
            return;
        }
        axios({
            url:"http://apibyauw.eu-4.evennode.com/api"+"/addcaketocart",
            method:"post",
            data:cartcake,
            headers : {
                Authorization: localStorage.token
            }
        }).then((respone) => {
            console.log("cake is added in cart");
            alert("cake is added to cart")
            }, (error) => {
            console.log("cake is not added in cart")
            alert("cake is not added")
        })
    }

    return (
        <>
        <Space direction="horizontal" style={{paddingLeft:50 , paddingTop:50}}>
            <img src={cake?.image} style={{height:250 , width:250}}/>
            <ul>
                <li>Name : {cake?.name}</li>
                <li>Price : {cake?.price}</li>
                <li>Rating : {cake?.ratings}</li>
                <li>Description : {cake?.description}</li>
                <li>Likes : {cake?.likes}</li>
                <li><Button type="primary" onClick={addToCart}>Add to Cart</Button></li>
            </ul>
        </Space>
        </>
    );
}