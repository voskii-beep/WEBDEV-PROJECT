import { HashRouter, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { About } from './components/About';

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;