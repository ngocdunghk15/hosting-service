import { Provider } from 'react-redux';
import { persistor, store } from '~/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd-css-utilities/utility.min.css';

import AppRouting from '~/routes';
import ThemeProvider from '~/providers/ThemeProvider';
import './styles/sass/style.scss';

function App() {
  return (
    <Provider store={store}>
      {/*TODO: Loading app screen*/}
      <PersistGate loading={<>Loading...</>} persistor={persistor}>
        <ThemeProvider>
          <Router>
            <AppRouting />
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
