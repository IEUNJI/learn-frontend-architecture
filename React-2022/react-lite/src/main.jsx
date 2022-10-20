import { createRoot } from 'react-dom/client';

const element = (
  <h1 id="container">
    hello <span style={{ color: 'red' }}>world</span>
  </h1>
);

const root = createRoot(document.getElementById('root'));

root.render(element);
