import { Provider } from 'react-redux';
import { persistor, store } from '~/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd-css-utilities/utility.min.css';

import AppRouting from '~/routes';
import ThemeProvider from '~/providers/ThemeProvider';
import './styles/sass/style.scss';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <Provider store={store}>
      {/*TODO: Loading app screen*/}
      <PersistGate loading={<>Loading...</>} persistor={persistor}>
        <SnackbarProvider>
          <ThemeProvider>
            <Router>
              <AppRouting />
            </Router>
          </ThemeProvider>
        </SnackbarProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
