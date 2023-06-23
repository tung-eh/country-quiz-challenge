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

const getChoices = (quizzes, index) => {
  const indexs = [...Array(quizzes.length).keys()].filter((i) => i !== index)
  shuffle(indexs)
  const result = [index, indexs[0], indexs[1], indexs[2]]
  shuffle(result)
  return result.map((index) => quizzes[index].country)
}

export default function App() {
  const quizzesRef = useRef([])
  const quizzes = quizzesRef.current
  const [quizIndex, setQuizIndex] = useState()

  const startGame = () => {
    quizzesRef.current = quizzesRef.current.map(({ country }) => ({
      country,
      quizType: Math.random() > 0.5 ? 'flag' : 'capital',
    }))
    shuffle(quizzesRef.current)
    setQuizIndex(0)
  }

  useEffect(() => {
    fetchAllCountries().then((countries) => {
      quizzesRef.current = countries.map((country) => ({ country }))
      startGame()
    })
  }, [])

  const [lose, setLose] = useState(false)
  const win = quizIndex === quizzes.length

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
              country={quizzes[quizIndex].country}
              quizType={quizzes[quizIndex].quizType}
              choices={getChoices(quizzes, quizIndex)}
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
