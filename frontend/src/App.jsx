import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {

  const [info, setInfo] = useState(null);

  useEffect(() => {

    axios.get('http://localhost:5000/info')
    .then((res) => {
      setInfo(res.data);  
    })
    .catch((err) => {
      console.log(`❌ Error: ${err}`);
    })
  }, []); 

  return (
    <>
      <h1>Skill Sync</h1>
      {
        <div>
          <p>Name: {info?.name}</p>
          <p>Age: {info?.age}</p>
        </div>
      }
    </>
  )
}

export default App
