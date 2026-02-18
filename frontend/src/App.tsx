import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Learn } from './pages/Learn';
import { History } from './pages/History';
import { Admin } from './pages/Admin';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/history" element={<History />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
