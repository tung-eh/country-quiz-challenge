import finishImage from './assets/undraw_winners_ao2o 2.svg'

const Result = ({ correctCount, win, onNext }) => {
  return (
    <div className="flex flex-col items-center gap-16 text-slate-700 mt-4">
      <img src={finishImage} />
      <div className="text-center text-lg">
        <h2 className="font-bold text-4xl mb-4">Results</h2>
        {win ? (
          <p>
            Wow! You have just
            <br />
            correctly answered all{' '}
            <span className="text-3xl text-green-400 font-bold">
              {correctCount}
            </span>{' '}
            quizzes
          </p>
        ) : (
          <p>
            You got{' '}
            <span className="text-3xl text-green-400 font-bold">
              {correctCount}
            </span>{' '}
            correct answers
          </p>
        )}
      </div>
      <button
        onClick={onNext}
        className="text-lg font-medium py-2.5 px-12 rounded-lg border-2 border-slate-700 hover:text-white hover:bg-amber-500 hover:border-amber-500"
      >
        Try again
      </button>
    </div>
  )
}

export default Result
