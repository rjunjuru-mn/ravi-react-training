import {Button} from 'antd'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Signup(){
    var user = {}
    var navigate = useNavigate(); // navigation function to navigate to other page
    
    //these function stores the value of that we have enetered in input box
    function changeName(event){
        user.name = event.target.value;
    }
    function changeEmail(event){
        user.email = event.target.value;
    }
    function changePassword(event){
        user.password = event.target.value;
    }

    //creating account in backend api and after successful creation we are going to login page
    function createAccount(){
        axios({
            url:"http://apibyauw.eu-4.evennode.com/api"+"/register",
            method:"post",
            data:user
        }).then((response) => 
        { console.log("response = ",response);
        navigate("/login")
    }, (error) => {console.log("error = ",error)})
    }

    return (<>
    Username = <input type="text" placeholder="User name" onChange={changeName}/><br/>
    Email = <input type="text" placeholder="Email" onChange={changeEmail}/><br/>
    Password = <input type="text" placeholder="Password" onChange={changePassword}/><br/>
    <Button type="primary" onClick={createAccount}>Sign up</Button><br/>
    Go to login = <Link to="/login"><Button type="primary">Login</Button></Link>
    </>);
}

export default Signup;