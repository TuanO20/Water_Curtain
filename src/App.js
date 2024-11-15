import './App.css';
import './assets/styles/variables.css';
import AllRoutes from './components/AllRoutes';


function App() {
  console.log(process.env.REACT_APP_AUTH_DOMAIN);
  console.log(process.env.REACT_APP_API_KEY);

  return (
      <AllRoutes/>
  );
}

export default App;
