import Course from './components/course/Course.jsx';
import RootLayout from './RootLayout.jsx';
import Search from './components/Search.jsx';
import Login from './components/Login.jsx';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Signup from './components/Signup.jsx';
import Profile from './components/Profile.jsx';
import CourseDetails from './components/course/CourseDetails.jsx';
import ManageUser from './components/admin/ManageUser.jsx';
import AddCourse from './components/admin/AddCourse.jsx';   
import MyCourse from './components/users/MyCourse.jsx';
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
       <Route path="/" element={<RootLayout/>}>
         <Route path="/" element={<Course/>}/>
         <Route path='/Search/:query' element={<Search/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/signup' element={<Signup/>}/>
         <Route path='/profile/:id' element={<Profile/>}/>
         <Route path='/course/:id' element={<CourseDetails/>}></Route>
         <Route path='/manage' element={<ManageUser/>}></Route>
         <Route path='/add' element={<AddCourse/>}></Route>
         <Route path='/mycourse' element={<MyCourse/>}></Route>
       </Route>
      </Routes>
    </Router>
    </QueryClientProvider>
  );
}

export default App;
