import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // 스타일 파일이 있으면 가져옵니다.
import App from './App'; // App 컴포넌트를 가져옵니다.

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // 'root' ID를 가진 div에 렌더링합니다.
);
