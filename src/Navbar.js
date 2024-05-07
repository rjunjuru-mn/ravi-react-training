import { Link, useNavigate } from "react-router-dom";
import { Button, Menu } from "antd";
export default function Navbar(){
    const items =[
        {label : (<Link to="/"><Button type="primary">All Cakes</Button></Link>)},
        {label : (<Link to="/login"><Button type="primary">Login</Button></Link>)},
        {label : (<Link to="/signup"><Button type="primary">Sign up</Button></Link>)},
        {label : (<input type="text" placeholder="search for cakes" onChange={getSearchText} />)},
        {label : (<Button type="primary" onClick={searchCake}>search</Button>)},
        {label : (<Link to="/cartpage"><Button type="primary">cart</Button></Link>)}
    ]

    var searchText="";
    var navigate = useNavigate();
    function getSearchText(event){
        searchText = event.target.value;
    }
    function searchCake(){
        var url = "/search?q="+searchText;
        navigate(url);
    }

    return (
        <>
        <Menu style={{backgroundColor:"yellow"}} mode="horizontal" items={items}/>
        </>
    );
}