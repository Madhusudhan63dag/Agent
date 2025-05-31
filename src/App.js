import React, { useState, useEffect } from 'react'
import Agent from './page/Agent';
import {Routes, BrowserRouter, Route} from 'react-router-dom';

const App = () => {

  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Agent />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App




