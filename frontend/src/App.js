import {BrowserRouter as Router , Route} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';


function App() {
  return (
    <Router>
      <Header/>
      <Route exact path = '/' component = {HomeScreen}/>
      <Route exact path = '/product/:id' component = {ProductScreen} />
      <Route exact path = '/product/this' component = {ProductScreen} />
      <Route exact path = '/cart/:id?'    component = {CartScreen}/>

      <Footer/>
     
  </Router>
  );
}

export default App;
