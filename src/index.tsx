import { createRoot } from 'react-dom/client';

import App from './components/App/App.tsx';

import './styles/index.scss';

createRoot(document.getElementById('root')!).render(<App />);
