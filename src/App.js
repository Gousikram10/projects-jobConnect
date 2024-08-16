import logo from './logo.svg';
import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
// import './App.css'
import { Home } from './Components/Home/Home';
import { Login } from './Components/Pages/Login/Login';
import Register from './Components/Pages/Register/Register';
import Footer from './Components/Home/Footer';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { Search } from './Components/Pages/Search/Search';
import { Jobs } from './Components/Jobs/Jobs';
import Postjob from './Components/Postjob/Postjob';
import About from './Components/Home/About';
import { JobBox } from './Components/Jobs/JobBox';
import JobList from './Components/Jobs/JobList';
import { JobContext, TotalContext } from './Components/TotalContext.jsx/TotalContext';
import MCQList from './Components/Questions/MCQ';
import Help from './HelpAssistant';
import Chatbot from './HelpAssistant';
import HelpAssistant from './HelpAssistant';
import { Chatai } from './Components/Questions/Chatai';
import { Maps } from './Components/Maps/Maps';
import { Admin } from './Components/Admin/Admin';
import Update from './Components/Admin/Update.';
import { Resume } from './Components/Resume/Resume';
// import index from '../../Resume-Builder-master (2)/Resume-Builder-master/src/index'
// import Resources from './Components/Questions/ResourcesPage';
// import Resources, { ResourcesPage } from './Components/Questions/ResourcesPage';

// import ChatAi from './Components/Questions/Chatai';

// import { JobContext, TotalContext } from './Components/TotalContext.jsx/TotalContext';
// export const ListContext=React.createContext(null);
function App() {

  return (
    <div className="App">
      {/* <Postjob/> */}
      {/* <Jobs/> */}
      {/* <Search/> */}
      {/* <JobList/> */}
     {/* <Chatai/> */}
    {/* <Resources/> */}
      {/* <MCQList/> */}
      {/* <HelpAssistant/> */}
    {/* <Maps/> */}
    {/* <Resume/> */}
      <TotalContext>
      <BrowserRouter>
     
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/map' element={<Maps/>}></Route>
        <Route path='/chatai' element={<Chatai/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='post' element={<Postjob/>}></Route>
        <Route path='/jobsdetails' element={<Jobs/>}>
        </Route>
        <Route path='/jobs/:role' element={<JobBox/>}></Route>
        <Route path='/reg' element={<Register/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/list' element={<JobList/>}>
        <Route path=':jobid' element={<JobList/>}/>
        </Route>
        <Route path='/mcq' element={<MCQList/>}>
        <Route path=':id' element={<MCQList/>}/>
        </Route>
        <Route path='/admin' element={<Admin/>}></Route>
        <Route path='/updatepage' element={<Update/>}>
        <Route path=':id' element={<Update/>}/>
        </Route>

      </Routes>
      </BrowserRouter>
      </TotalContext>
    
    </div>
  );
}

export default App;

