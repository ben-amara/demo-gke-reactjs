import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import { Home, AddUser, EditUser } from "./pages/index";

function App() {
  return (
    <Router >
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/add' element={<AddUser/>}/>
          <Route path='/edit/:id' element={<EditUser/>}/>
        </Routes>     
    </Router>
  );
}

export default App;
