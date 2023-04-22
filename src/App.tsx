import React from 'react';
import logo from './logo.png';
import './App.css';
import { useId, useState } from 'react';

function UserInput(props: any) {
  const id = useId();
  const [input, setInput] = useState(props?.value ?? '');
  return (
    <div> 
      <div>
    <textarea className="UserInput" cols={60} rows={10} id={id} value={input} onInput={e => setInput((e.target as HTMLTextAreaElement).value)}/>
    </div>
      <input 
          type='submit' 
          value='Submit' 
        />
    </div>
  );
}



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Describe what ingredients you have and I'll tell you what you can make!
        </p>
        <UserInput value=""/>
        
      </header>
    </div>
  );
}

export default App;
