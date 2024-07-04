
import { ToastWrapper } from 'keep-react';
import './App.css';
import NavbarComponent from './components/Navbar';
import { Comercio } from './pages/Comercio';
import { useState } from 'react';
import { Login } from './pages/Login';
import Cookies from 'universal-cookie';



function App() {

  const cookies = new Cookies();
  const [usuario, setUsuario] = useState(cookies.get('usuario'));


  const handleUsuario = (usuario) => {
    setUsuario(usuario);
  }



  return (
    <div className=''>
      {usuario && <NavbarComponent handleUsuario={handleUsuario} usuario={usuario}/>}
      {usuario && <Comercio /> }

      {!usuario && <Login handleUsuario={handleUsuario}></Login>}

      
      <ToastWrapper
        toastOptions={{
          classNames: {
            toast: 'dark:bg-metal-900 border dark:border-metal-800 border-white bg-white',
            title: 'text-metal-900 dark:text-white',
            description: 'dark:text-metal-300 text-metal-600',
            actionButton: 'dark:bg-metal-800 bg-metal-900 text-white',
            cancelButton: 'dark:bg-metal-800 bg-metal-900 text-white',
            closeButton: 'dark:bg-metal-800 bg-metal-900 text-white',
            error: 'text-error-500',
            success: 'text-success-500',
            warning: 'text-warning-500',
            info: 'text-primary-500',
          },
        }}
      />
    </div>

  );
}

export default App;
