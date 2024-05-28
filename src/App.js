import './App.css';
import { useState } from "react";
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import About from './components/About';
import Index from "./components/index";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PostState from './context/posts/PostState';
import Posts from './components/Posts';
import AddPost from './components/AddPost';
import Buy from './components/Buy';
import Carousel from './components/Carousel';
import Categories from './components/Categories';
import BuyCategories from './components/BuyCategories';
import Vegetables from './components/Vegetables';
import Fruits from './components/Fruits';
import Crops from './components/Crops';
import Pulses from './components/Pulses';
import Grains from './components/Grains';
import Oils from './components/Oils';
import DairyFarm from './components/DairyFarm';
import DryFruits from './components/DryFruits';
import Masalas from './components/Masalas';
import VillageStaples from './components/VillageStaples';
import VillageSpecials from './components/VillageSpecials';
import Sweets from './components/Sweets';
import WhatsAppLinks from './components/WhatsappLinks';
import AiRentals from './components/AiRentals';
import VillageGoods from './components/VillageGoods';
import AgricultureTools from './components/AgricultureTools';
function App() {
  
  const [alert, setAlert] = useState(null)
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type 
      
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  // eslint-disable-next-line
  return (
    <>
    <PostState>
        <Router>
        {/* <Alert alert={alert}/> */}
        <Routes>
        <Route exact path="/" element={<Index/>} />
        <Route exact path="/nav" element={<Navbar showAlert={showAlert}/> } />
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
        <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
        <Route exact path="/addpost" element={<AddPost/>} />
        <Route exact path="/posts" element={<Posts/>} />
        <Route exact path="/buy" element={<Buy/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/carousel" element={<Carousel/>} />
        <Route exact path="/categories" element={<Categories/>} />
        <Route exact path="/buycategories" element={<BuyCategories/>} />
        <Route exact path="/vegetables" element={<Vegetables/>} />
        <Route exact path="/fruits" element={<Fruits/>} />
        <Route exact path="/crops" element={<Crops/>} />
        <Route exact path="/pulses" element={<Pulses/>} />
        <Route exact path="/grains" element={<Grains/>} />
        <Route exact path="/oils" element={<Oils/>} />
        <Route exact path="/dairyfarm" element={<DairyFarm/>} />
        <Route exact path="/dryfruits" element={<DryFruits/>} />
        <Route exact path="/masalas" element={<Masalas/>} />
        <Route exact path="/villagestaples" element={<VillageStaples/>} />
        <Route exact path="/villagespecials" element={<VillageSpecials/>} />
        <Route exact path="/sweets" element={<Sweets/>} />
        <Route exact path="/airentals" element={<AiRentals/>} />
        <Route exact path="/villagegoods" element={<VillageGoods/>} />
        <Route exact path="/agriculturetools" element={<AgricultureTools/>} />
        <Route exact path="/whatsapplinks" element={<WhatsAppLinks/>} /> 
        </Routes>
      </Router>
    </PostState>
      </>
  );
}

export default App;



