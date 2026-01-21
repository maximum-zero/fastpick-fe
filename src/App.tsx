import { QueryProvider } from '@/api/QueryProvider';
import TestPage from '@/pages/TestPage';

function App() {
  return (
    <QueryProvider>
      <TestPage />
    </QueryProvider>
  );
}

export default App;

