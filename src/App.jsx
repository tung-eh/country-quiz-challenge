import { useState, useEffect, useRef } from 'react'
import bgImage from './assets/background.png'
import Quiz from './Quiz'
import Result from './Result'

const fetchAllCountries = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all')
  const result = await response.json()
  return result
}

const shuffle = (array) => {
  const length = array.length

  for (let i = 0; i < length; i++) {
    const j = Math.floor(Math.random() * length)
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

const getChoices = (list, index) => {
  const indexs = [...Array(list.length).keys()].filter((i) => i !== index)
  shuffle(indexs)
  const result = [index, indexs[0], indexs[1], indexs[2]]
  shuffle(result)
  return result.map((index) => list[index])
}

export default function App() {
  const countriesRef = useRef([])
  const countries = countriesRef.current
  const [quizIndex, setQuizIndex] = useState()

  const startGame = () => {
    shuffle(countriesRef.current)
    setQuizIndex(0)
  }

  useEffect(() => {
    fetchAllCountries().then((countries) => {
      countriesRef.current = countries
      startGame()
    })
  }, [])

  const [lose, setLose] = useState(false)
  const win = quizIndex === countries.length

  return (
    <div
      className="min-h-screen w-full p-4 flex flex-col"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="flex-1 max-w-lg mx-auto p-6 mx-auto my-20 w-full">
        <h1 className="uppercase font-bold text-zinc-200 text-4xl mb-3">
          Country quiz
        </h1>
        <div className="relative w-full bg-white text-slate-600 p-8 rounded-3xl">
          {!lose && quizIndex !== undefined && (
            <Quiz
              country={countries[quizIndex]}
              choices={getChoices(countries, quizIndex)}
              onNext={(result) =>
                result ? setQuizIndex((i) => i + 1) : setLose(true)
              }
            />
          )}
          {(lose || win) && (
            <Result
              correctCount={quizIndex}
              win={win}
              onNext={() => {
                setLose(false)
                startGame()
              }}
            />
          )}
        </div>
      </div>
      <footer className="text-center text-sm text-zinc-200">
        created by <span className="font-bold underline">Tung Teng</span> -
        devChallenges.io
      </footer>
    </div>
  )
}
