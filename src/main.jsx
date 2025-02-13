// react 시작점점
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Tailwind CSS 적용
import App from './App.jsx' // 로그인/메인 페이지를 관리하도록 설정

createRoot(document.getElementById('root')).render( // index.html의 <div id="root"/>안에 React를 렌더링
  <StrictMode>
    <App />
  </StrictMode>,
)
