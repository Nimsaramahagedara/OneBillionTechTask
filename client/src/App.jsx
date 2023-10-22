import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom';
import Signin from './pages/signin';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ForgotPassword from './pages/ForgotPassword';
import { createContext, useContext, useState } from 'react';
import ChangePassword from './pages/ChangePassword';
import Spinner from './components/Spinner';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

export const UserContext = createContext();


function App() {

// TODO remove, this demo shouldn't need to reset the theme.

const redTheme = createTheme({
  palette: {
    primary: {
      main: '#ff0000', // Red color
    },
  },
});
const [user, setUser] = useState('');

const handleChangeUser = (user)=>{
  setUser(user);
}

  return (
    <>
    <UserContext.Provider value={{user, handleChangeUser}}>
      <ThemeProvider theme={redTheme}>
        {/* <Container component="main" maxWidth="xs"> */}
          <CssBaseline />
          {/* <Spinner/> */}
          <HashRouter>
            <Routes>
              <Route path='/' element={<Signin />} />
              <Route path='/register' element={<SignUp />} />
              <Route path='/home' element={<Home />} />
              <Route path='/reset' element={<ForgotPassword />} />
              <Route path='/passwordReset' element={<ChangePassword />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </HashRouter>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        {/* </Container> */}
      </ThemeProvider>
      </UserContext.Provider>
    </>
  )
}

export default App
