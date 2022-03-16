import React from 'react';
import MainPage from './app/modules/MainPage';
import { store } from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <MainPage />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  );
}

export default App;
