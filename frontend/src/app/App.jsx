import { RouterProvider } from 'react-router'
import { routes } from './App.route'
import { Provider } from 'react-redux'
import { store } from './App.store'


import './App.css'
import { useEffect } from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'

function AppContent() {
  const { handleGetMe } = useAuth();

  useEffect(() => {
    handleGetMe();
  }, []);

  return <RouterProvider router={routes} />;
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App
