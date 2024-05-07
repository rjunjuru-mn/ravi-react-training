import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Cakelist from './Cakelist';
import Navbar from './Navbar';
import Cakedetail from './Cakedetail';
import Searchcakes from './Searchcakes';
import Login from './Login';
import Signup from './Signup';
import Cartpage from './Cartpage';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Cakelist />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/search" element={<Searchcakes />} />
        <Route path="/detail/:cakeid" element={<Cakedetail />} />
        <Route path="/cartpage" element={<Cartpage />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
