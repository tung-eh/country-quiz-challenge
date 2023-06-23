import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import CheckCircle from './CheckCircle'
import XCircle from './XCircle'
import adventureImage from './assets/undraw_adventure_4hum 1.svg'

const ChoiceButton = (props) => {
  return (
    <button
      className="text-slate-400 border-2 border-slate-400 text-lg font-medium rounded-lg py-2 px-4 flex items-center text-left transition duration-300 hover:text-white hover:bg-amber-500 hover:border-amber-500"
      {...props}
    />
  )
}

const ChoiceResult = ({ selected, correct, children }) => {
  return (
    <div
      className={twMerge(
        'text-slate-400 border-2 border-slate-400 text-lg font-medium rounded-lg py-2 px-4 flex items-center gap-2 text-left transition duration-300',
        correct && 'bg-green-400 border-green-400 text-white',
        selected && !correct && 'bg-red-400 border-red-400 text-white'
      )}
    >
      {children}
      {selected && correct && <CheckCircle className="w-7 h-7" />}
      {selected && !correct && <XCircle className="w-7 h-7" />}
    </div>
  )
}

const getId = (country) => country.name.common

const Quiz = ({ country, choices, onNext }) => {
  const [chosenIndex, chooseIndex] = useState()
  const chosenChoice = chosenIndex !== undefined && choices[chosenIndex]

  return (
    <div className="mt-8">
      <img className="absolute right-0 -top-[4.5rem]" src={adventureImage} />
      <h2 className="font-bold text-2xl">
        {country.capital[0]} is the capital of
      </h2>
      <div className="flex flex-col gap-6 my-8">
        {choices.map((choice, index) => {
          const text = (
            <>
              <span className="text-2xl mr-8">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="w-full">{choice.name.common}</span>
            </>
          )

          return chosenChoice ? (
            <ChoiceResult
              key={getId(choice)}
              selected={getId(chosenChoice) === getId(choice)}
              correct={getId(country) === getId(choice)}
            >
              {text}
            </ChoiceResult>
          ) : (
            <ChoiceButton
              key={getId(choice)}
              onClick={() => chooseIndex(index)}
            >
              {text}
            </ChoiceButton>
          )
        })}
      </div>
      {chosenChoice && (
        <div className="text-right">
          <button
            className="text-white bg-amber-500 py-2.5 px-12 font-medium rounded-lg text-lg hover:bg-amber-600/90"
            onClick={() => {
              chooseIndex(undefined)
              onNext(getId(chosenChoice) === getId(country))
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Quiz
