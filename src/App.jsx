import { BrowserRouter as Router ,Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import HomePage from './Pages/HomePage';
// import CheckoutPage from './Pages/CheckoutPage';
import MenCategory from './Pages/MenCategory';
import WomenCategory from './Pages/WomenCategory';
import Electronics from './Pages/Electronics';
import AddProduct from './Pages/AddProduct';
import LoginSignup from './Pages/Login';
import SignUp from './Pages/SignUp';

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
      <Route path='electronics' element={<Electronics/>}/>
      <Route path='addProduct' element={<AddProduct/>}/>
    </Route>
  )
)

function App() {
  return(
    <RouterProvider router = {router} />
  )
}


// function App() {
//   return (
//     <Router>
//       <div>
//         <Navbar/>
//         <Routes>
//           <Route path='/' element={<HomePage/>}/>
//           <Route path='/product/:id' element={<Product/>}/>
//           <Route path='/cart' element={<Cart/>}/>
//           <Route path='/login' element={<LoginSignup/>}/>
//           <Route path='/men' element={<MenCategory/>}/>
//           <Route path='/women' element={<WomenCategory/>}/>
//           <Route path='/electronics' element={<Electronics/>}/>
//           <Route path='/addProduct' element={<AddProduct/>}/>
//         </Routes>
//       </div>
//     </Router>
//   );
// }

export default App;
