import { Options } from './components/Options';
import { PropertyDocumentation } from './components/PropertyDocumentation';
import { CodeBlock } from './components/CodeBlock';

const installCode = `// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'react-side-panel/dist/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;

export default function App() {
  return (
    <section className="hero">
      <header className="hero-head">
        <nav className="navbar">
          <div className="navbar-inner">
            <a
              className="navbar-brand"
              href="https://github.com/headmandev/react-modal-view"
              target="_blank"
              rel="noreferrer"
            >
              <span className="icon" aria-hidden>📦</span>
            </a>
          </div>
        </nav>
      </header>
      <div className="hero-body">
        <div className="container">
          <div className="columns">
            <div className="column-left">
              <div className="fixed-block">
                <h1 className="hero-title">React Side Panel</h1>
                <p className="hero-subtitle">
                  Easy to use and flexible
                  <br />
                  screen-side modal component
                </p>
                <code className="install-cmd">npm i react-side-panel</code>
                <div className="editor-wrap">
                  <CodeBlock code={installCode} />
                </div>
              </div>
            </div>
            <div className="column-right">
              <Options />
              <PropertyDocumentation />
              <p className="github-link">
                <a href="https://github.com/headmandev" target="_blank" rel="noreferrer">
                  👉 Github
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
