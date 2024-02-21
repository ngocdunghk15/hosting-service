import { Provider } from 'react-redux';
import { persistor, store } from '~/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouting from '~/routes';

import './styles/sass/style.scss';

function App() {
  return (
    <Provider store={store}>
      {/*TODO: Loading app screen*/}
      <PersistGate loading={<>Loading...</>} persistor={persistor}>
        <Router>
          <AppRouting />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
