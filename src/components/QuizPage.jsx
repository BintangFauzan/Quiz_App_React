import axios from "axios"
import { useState,useEffect } from "react"

export default function QuizPage() {
    const [dataQuestions, setDataQuestions] = useState([])
    const [userAnswer, setUserAnswer] = useState({
        1:'',
        2:'',
        3:'',
        4:'',
        5:'',
        6:'',
        7:'',
        8:'',
        9:'',
        10:'',
    })
    const [shuffledQuestions, setShuffledQuestions] = useState([])
    const [dataAnswer, setDataAnswer] = useState([])
    const [score, setScore] = useState(0)
    const [errorMessage, setErrorMessage] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      const fetchData =  async () => {
        setLoading(true)
        try{
            const response = await axios.get("https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple")
            const data = response.data.results
            setDataQuestions(data)
            // Proses acak jawaban untuk setiap soal
            const shuffled = data.map((question) => {
                const answers = [...question.incorrect_answers, question.correct_answer]
                answers.sort(() => Math.random() - 0.5)
                return {
                    ...question,
                    shuffledAnswers: answers
                }
            })
            setShuffledQuestions(shuffled)
        }catch(err) {
            console.error("Error fetching data:", err.response ? err.response.data : err.message);
        }finally{
            setLoading(false)
        }
      }
      fetchData()
    }, [])

    console.log("shuffled questions", shuffledQuestions)

    function handleAnswerChange(inputIdentifier, value){
        setUserAnswer((prevAnswer) => {
            return{
                ...prevAnswer,
                [inputIdentifier]: value
            }
        })
    }

    function handleSubmitAnswer(newAnswerData){
        if(!userAnswer[1] || !userAnswer[2] || !userAnswer[3] || !userAnswer[4] || !userAnswer[5] || !userAnswer[6] || !userAnswer[7] ||
        !userAnswer[8] || !userAnswer[9] ||!userAnswer[10]
    ){
        setErrorMessage(true)
        setTimeout(() => {
            setErrorMessage(false)
        },1000)
    }
        setDataAnswer((prevData) => [...prevData, newAnswerData])
        const totalScore = shuffledQuestions.reduce((sum, question, index) => {
          return sum + (userAnswer[index+1] === question.correct_answer ? 10 : 0)
        },0)
        setScore(totalScore)
    }
    console.log('Jawaban',dataAnswer)
    console.log("Skor", score)

    if(loading === true){
        return <div><h2>Loading</h2></div>
    }
    if(errorMessage){
        return console.log('harap isi semua data')
    }

    
  return (
    <>
    <div className="bg-gray-100 h-full flex items-center justify-center">
  <div className="p-8 rounded shadow-md w-full max-w-md">
    <div className="flex justify-between items-center mb-4">
      <div className="text-sm text-gray-600">
        Timer: <span id="timer">02:30</span>
      </div>
    </div>
    <form onSubmit={(e) =>{
        e.preventDefault()
        handleSubmitAnswer(userAnswer)
    }}>
         {shuffledQuestions.map((data, index) => {
        return(
            <div className="mb-6" key={index}>
      <p className="text-lg font-semibold mb-2">{data.question}</p>
      <div className="space-y-2">
        {data.shuffledAnswers.map((answer, idx) => (
            <label className="flex items-center" key={idx}>
          <input type="radio" name={'answer'+(index+1)} value={answer} className="mr-2" 
            onChange={() => handleAnswerChange(index+1, answer)}
            checked={userAnswer[index + 1] === answer}
          />
          {answer}
        </label>
        ))}
      </div>
    </div>
        )
        })}

    <div className="bg-gray-200 rounded-full h-4">
      <div className="bg-blue-500 h-4 rounded-full"></div>
    </div>
    <div className="text-sm text-gray-600 mt-2">
        <button className="bg-amber-500 rouded-full">Simpan</button>
    </div>
    </form>
  </div>
</div>
    </>
  )
}