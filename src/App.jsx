import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import './App.css';

//Components
import Navbar from './Components/Navbar/Navbar';
import ProtectedRoute from './Components/Route Protection/ProtectedRoute';

//Pages
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import HomePage from './Pages/HomePage';
import CheckoutPage from './Pages/CheckoutPage';
import MenCategory from './Pages/MenCategory';
import WomenCategory from './Pages/WomenCategory';
import AddProduct from './Pages/AddProduct';
import LoginSignup from './Pages/Login';
import SignUp from './Pages/SignUp';
import MyProducts from './Pages/MyProducts';
import WishList from './Pages/WishList';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Navbar/>}>
      <Route index element={<HomePage/>} />
      <Route path='cart' element={<Cart/>} />
      <Route path='product/:id' element={<Product/>}/>
      <Route path='login' element={<LoginSignup/>}/>
      <Route path='signup' element={<SignUp/>}/>
      <Route path='men' element={<MenCategory/>}/>
      <Route path='women' element={<WomenCategory/>}/>
      <Route element={<ProtectedRoute allowedRoles={['buyer']}/>}>
        <Route path='wishList' element={<WishList/>}/>
        <Route path='checkout' element={<CheckoutPage/>}/>
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
        <Route path='addProduct' element={<AddProduct/>}/>
        <Route path='my-products' element={<MyProducts/>}/>
      </Route>
    </Route>
  )
)

function App() {
  return(
    <RouterProvider router = {router} />
  )
}

export default App;
