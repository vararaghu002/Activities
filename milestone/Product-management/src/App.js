// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ConfirmPage from './pages/ConfirmPage';
import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(135deg, #f3f7fa, #e5ebf0);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
`;

function App() {
  return (
    <AppContainer>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/confirm" element={<ConfirmPage />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

export default App;
