import React from 'react';
import Navbar from './component/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Footer from './component/Footer/Footer';
import About from './Pages/About/About';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Service from './Pages/Service/Service';
import Track from './Pages/Track/Track';
import CreateShipment from './Pages/CreateShipment/CreateShipment';
import Contact from './Pages/ContactPage/Contact';
import Login from "./Pages/Auth/Login";
import Register from './Pages/Auth/Register';
import PackageDetailPage from './Pages/Track/PackageDetailPage';
import Profile from './Pages/ProfilePage/Profile';
import "./index.css"
import "./App.css"
import 'leaflet/dist/leaflet.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // ✅ Required
import ProtectedRoute from './Pages/Auth/ProtectedRoute';


const App: React.FC = () => {
  return (
    <div className=''>
      <Router>
        <Navbar />
        <ToastContainer autoClose={2000} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/register' element={ <Register/> } />
          <Route path='/about' element={< About/> } />
          <Route path='/service' element={ <Service/> } />
          <Route path='/contact' element={ <Contact/> }/>


          {/* protected routes */}
          <Route element={<ProtectedRoute />} >
            <Route path='/create-shipment' element={ <CreateShipment/>} />
            <Route path='/track' element={<Track />} />
            <Route path='/package-details' element={<PackageDetailPage />} />
            <Route path='/profile' element={ <Profile/> } />
          </Route>
        </Routes>
      </Router>
    
      <div className='mt-20'>
        <Footer/>
      </div>
    </div>
  )
}

export default App
