import React from 'react';
import logo from './logo.png';
import './App.css';
import { useId, useState, useEffect } from 'react';



function Interface() {
  const [state, setState] = useState("auth");
  const [data, setData] = useState({});
  const [input, setInput] = useState("");

  return (
    <div>
  {state == "auth" || state == "auth_retry" ? <Auth state={state} setState={setState}/> : ""}
  {state == "input" ? <UserInput value="" setState={setState} setInput={setInput}/> : ""}
  {state == "loading" ? <Loading setState={setState} setData={setData} input={input}/> : ""}
   {state == "results" ? <Results setState={setState} data={data}/> : ""}   
  </div>
  )
}

function Auth(props: any) {
  let pass = process.env.REACT_APP_RECIPE_PASSWORD;
  return (
    <div>
      <p>
        {props.state == "auth" ? "Please enter the password."  : "Incorrect password. Please try again."}
      </p>
      <input type="password" id="password" name="password" />
      <br/>
      <input type="submit" value="Submit" onClick={() => {
        if ((document.getElementById("password") as HTMLInputElement).value == pass) {
          props.setState("input");
        } else {
          props.setState("auth_retry");
        }
      }}/>
    </div>
  )
}

function Results(props: any) {
  const text = props.data.choices ? props.data.choices[0].message.content : "No results found.";
  const newText = text.split('\n').map((x: string) => <p>{x}</p>);
  
  return (
    <div>
      <p>
        Here are your results!
      </p>
      <p>
        {newText}
      </p>
      <input type="submit" value="Try Again" onClick={() => {props.setState("input")}}/>
    </div>
  )
}
function Loading(props: any) {
  const api_key = process.env.REACT_APP_OPENAI;
  const prompt = "I will describe what ingredients I have. Generate a bullet list with short, concise ideas on what I could make with these ingredients. Keep the list to three items max. Here are the ingredients I have: "
  useEffect( () => {
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + api_key
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt + props.input}],
        temperature: 0.7,
        max_tokens: 100,
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        props.setData(data);
        props.setState("results");
      });
  }, [api_key, props]);

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
          props.setInput(input);
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
