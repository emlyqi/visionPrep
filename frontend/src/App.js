import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([{}])

  useEffect (() => {
    fetch("/data1").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div/>
    // <div className="App">
    //   <p>Hi</p>
    // </div>
  );
}

export default App;
