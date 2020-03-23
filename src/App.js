import React from 'react';
import './App.css';
import Tasks from './components/Tasks'
import { Container } from '@material-ui/core'

function App() {
  return (
    <div>
      <Container maxWidth="md" style={{paddingTop:'24px'}}>
        <Tasks />
      </Container>
    </div>
  );
}

export default App;
