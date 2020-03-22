import React from 'react';
import './App.css';
import Tasks from './components/Tasks'
import Navbar from './components/Navbar'
import { Container } from '@material-ui/core'

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Container maxWidth="md" style={{paddingTop:'24px'}}>
        <Tasks />
      </Container>
    </div>
  );
}

export default App;
