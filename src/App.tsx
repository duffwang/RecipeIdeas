import React from 'react';
import logo from './logo.png';
import './App.css';
import { useId, useState } from 'react';

function Interface(props: any) {
  const [state, setState] = useState("input");

  return (
    <div>
  {state == "input" ? <UserInput value="" setState={setState}/> : ""}
  {state == "loading" ? <Loading /> : ""}
   {state == "results" ? <Results setState={setState}/> : ""}   
  </div>
  )
}

function Results(props: any) {
  return (
    <div>
      <p>
        Here are your results!
      </p>
      <p>
        You can make a sandwich!
      </p>
      <input type="submit" value="Try Again" onClick={() => {props.setState("input")}}/>
    </div>
  )
}

function Loading() {
  return (
    <div>
      <p>
        Getting results...
      </p>
    </div>
  )
}

function UserInput(props: any) {
  const id = useId();
  const [input, setInput] = useState(props?.value ?? '');
  return (
    <div> 
        <p>
          Describe what ingredients you have and I'll tell you what you can make!
        </p>
      <div>
    <textarea className="UserInput" cols={60} rows={10} id={id} value={input} onInput={e => setInput((e.target as HTMLTextAreaElement).value)}/>
    </div>
      <input 
          type='submit' 
          value='Submit' 
        onClick={() => { 
          props.setState("loading");
          setTimeout(() => {props.setState("results")}, 2000);
        }}
        />
    </div>
  );
}



function App() {
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Interface/>
        
      </header>
    </div>
  );
}

export default App;
