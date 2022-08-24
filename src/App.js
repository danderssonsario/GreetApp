import { useEffect, useRef, useState } from 'react'
import './index.css'

/* TODO: FIXA BARA SÅ ATT HÄLSNINGEN BLINKAR. */
function App() {
  const [name, setName] = useState('')
  const [joke, setJoke] = useState('')
  const [punchline, setPunchline] = useState('')
  const [isGreet, setIsGreet] = useState(false)
  const [isReveal, setIsReveal] = useState(false)

  const greeting = useRef(0)

  const handleClear = () => {
    setName('')
    setIsGreet(false)
    setIsReveal(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'de50e389e0msh2bb14fd35b0f2d6p1a29e1jsn68380abc0596',
        'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
      }
    }
    const res = await fetch('https://dad-jokes.p.rapidapi.com/random/joke', options)
    const data = await res.json()

    const { setup, punchline } = data.body[0]

    setJoke(setup)
    setPunchline(punchline)
    setIsGreet(true)

  }

  //Funkar!!!
  useEffect(() => {
    if(isGreet){
    setInterval(() => {
      greeting.current.toggleAttribute('blink')
    }, 1000);
  }
  }, [isGreet])

  return (
    <div className='app'>
      <form onSubmit={handleSubmit}>
        <label>Enter your name</label>
        <input
          required='required'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button type='submit'>Greet</button>
      </form>
      {isGreet ? (
        <div>
          <div ref={greeting}>Hello {name} !</div>
          <div>{joke}</div>
          <button onClick={() => setIsReveal(!isReveal)}>Punchline</button>
          <div>{isReveal ? punchline : ''}</div>
        </div>
      ) : (
        ''
      )}
      {isReveal ? <button onClick={() => handleClear()}>Clear</button> : ''}
    </div>
  )
}

export default App
