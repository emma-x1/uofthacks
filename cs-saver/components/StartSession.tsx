import { MouseEvent } from "react"


export default function StartSession() {
  function handleSubmit(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    console.log('hi')
    // make fetch request to startSession
    fetch('/api/startSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleMouseEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Hei ererere");   
    // Do something
  };

  return (
    //<button onClick={handleSubmit}> Start Session </button>
    // <Button size="lg" className="w-full text-lg py-8" onClick={handleSubmit}> Start Session</Button>
    <button className="w-full text-lg py-8" onClick={handleMouseEvent}> Start Session</button>
  )
}

