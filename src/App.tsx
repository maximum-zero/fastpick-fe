import { QueryProvider } from '@/api/QueryProvider';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <QueryProvider>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/coupon/:id" element={<DetailPage />} />
        </Routes>
      </main>
    </QueryProvider>
  );
}

export default App;

