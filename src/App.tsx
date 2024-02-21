import { Provider } from 'react-redux';
import { persistor, store } from '~/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      // TODO: Loading app screen
      <PersistGate loading={<>Loading...</>} persistor={persistor}></PersistGate>
    </Provider>
  );
}

export default App;
