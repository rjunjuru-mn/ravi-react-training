import {Alert, Button} from 'antd'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

function Login(){
   var user={}
   var [error, setError] = useState("");
   var navigate = useNavigate()// navigation function to navigate to other page
    
   //these function stores the value of that we have enetered in input box
    function changeEmail(event){
        user.email = event.target.value;
    }
    function changePassword(event){
        user.password = event.target.value;
    }

    //checking that given user details are present, if present we are going to home page or
    // else we are provding sign up button in UI
    function signIn(){
        axios({
            url:"http://apibyauw.eu-4.evennode.com/api"+"/login",
            method:"post",
            data:user
        }).then((response) => {console.log("response = ",response);
        if(response.status == 200){
            localStorage.token = response.data.token;
            navigate("/");
        } else {
            localStorage.token = undefined;
            setError("********No user found**********");
        }
    }, (errors) => {console.log("error = ",errors);})
    }

    return (<>
    {error && <Alert type="error" message={error}/>}
    Email = <input type="text" placeholder="Email" onChange={changeEmail}/><br/>
    Password = <input type="text" placeholder="Password" onChange={changePassword}/><br/>
    <Button type="primary" onClick={signIn}>Login</Button> <br/>
    Create new Account: <Link to="/signup"><Button type="primary">Sign up</Button></Link> 
    </>);
}

export default Login;