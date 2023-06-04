import Home from './components/Pages/Home';
import NotFound from './components/Pages/NotFound';
import Cart from './components/cart/cart';
import ItemCard from './components/ItemCard/ItemCard';
import MainLayout from './layouts/MainLayout';
import {
  Routes,
  Route,
} from "react-router-dom";

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}> 
      <Route path="" element={<Home />} />
      <Route path="cart" element={ <Cart />} />
      <Route path="itemcard/:id" element={ <ItemCard />} />
      <Route path="*" element={ <NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

