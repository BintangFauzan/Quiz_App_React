import axios from "axios"
import { useState,useEffect, useRef } from "react"
import Modal from "./Modal"
import InputSub from "./subComponents/InputSub"
import ButtonSub from "./subComponents/ButtonSub"

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
    const [quizzStatus, setQuizzStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [isInputNama, setIsInputNama] = useState('')
    const [simpanNama, setSimpanNama] = useState([])
    const [isOpenModalName, setIsOpenModalName] = useState(true)
    const [timer, setTimer] = useState(50) // 5 menit dalam detik
    const [isTimerRunning, setIsTimerRunning] = useState(false) // State baru untuk mengontrol timer

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

    function handleChangeName(event) {
      setIsInputNama(event.target.value)
    }

    // Modifikasi handleSubmitNama untuk memulai timer
    function handleSubmitNama(){
      if(isInputNama.trim() === '') {
        alert('Nama tidak boleh kosong!')
        return
      }
      setSimpanNama(prev => [...prev, isInputNama])
      setIsOpenModalName(false)
      setIsTimerRunning(true) // Mulai timer setelah nama disimpan
      setQuizzStatus(false)
    }
    
    console.log('nama : ', isInputNama)
    console.log('simpan nama : ', simpanNama)

    // Timer useEffect yang dimodifikasi
    useEffect(() => {
      let interval = null;
      
      if (isTimerRunning && timer > 0 && !quizzStatus) {
        interval = setInterval(() => {
          setTimer((prevTimer) => {
            if (prevTimer <= 1) {
              console.log('Waktu Habis!')
              // Hitung skor terlebih dahulu sebelum modal muncul
              const totalScore = shuffledQuestions.reduce((sum, question, index) => {
                return sum + (userAnswer[index+1] === question.correct_answer ? 10 : 0)
              }, 0)
              setScore(totalScore)
              setIsOpenModal(true)
              setIsTimerRunning(false)
              return 0;
            }
            return prevTimer - 1;
          });
        }, 1000);
      } else if (quizzStatus) {
        // Hentikan timer jika quiz sudah selesai
        setIsTimerRunning(false)
      }
      
      return () => {
        if (interval) clearInterval(interval);
      };
    }, [isTimerRunning, timer, quizzStatus, shuffledQuestions, userAnswer]);

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
        // Validasi semua jawaban harus diisi
        const allAnswered = Object.values(userAnswer).every(answer => answer !== '')
        
        if(!allAnswered){
            setErrorMessage(true)
            setTimeout(() => {
                setErrorMessage(false)
            }, 3000)
            return // Jangan lanjutkan jika ada yang kosong
        }
        
        setDataAnswer((prevData) => [...prevData, newAnswerData])
        const totalScore = shuffledQuestions.reduce((sum, question, index) => {
          return sum + (userAnswer[index+1] === question.correct_answer ? 10 : 0)
        }, 0)
        setScore(totalScore)
        setQuizzStatus(true)
        setIsTimerRunning(false) // Hentikan timer ketika quiz selesai
    }

    function formatTimer(seconds){
      const m = String(Math.floor(seconds / 60)).padStart(2, '0')
      const s = String(seconds % 60).padStart(2, '0')
      return `${m}:${s}`;
    }

    console.log('Jawaban',dataAnswer)
    console.log("Skor", score)

    if(loading === true){
        return <div><h2>Loading</h2></div>
    }
    
    if(errorMessage){
        return (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded">
            Harap isi semua jawaban sebelum submit!
          </div>
        )
    }  

    // Jika quiz sudah selesai, tampilkan hasil
    if(quizzStatus) {
        return (
          <Modal word={'Quiz Selesai!!'} nama={'Nama'} namaUser={simpanNama[simpanNama.length - 1]} skor={'Skor Anda: '} nilaiSkor={score}/>
        )
    }
    
  return (
    <>
    {isOpenModalName ? (
      <Modal 
        component={
          <InputSub 
            label={'Nama'} 
            button={<ButtonSub onClick={handleSubmitNama}/>}
            onChange={handleChangeName}
            value={isInputNama}
          />
        }
      />
    ) : isOpenModal ? (
      <Modal 
        component={
          <div className="text-center p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">⏰ Waktu Habis!</h2>
            <p className="text-gray-700 mb-4">Maaf, waktu quiz telah berakhir.</p>
            <p className="text-lg mb-4">Nama: {simpanNama[simpanNama.length - 1]}</p>
            <p className="text-lg mb-6">Skor Akhir: {score}/100</p>
            <div className="space-y-3">
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full w-full"
                onClick={() => window.location.reload()}
              >
                Main Lagi
              </button>
              <button 
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-full w-full"
                onClick={() => setIsOpenModal(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        }
      />
    ) : (
      <div className="bg-gray-100 h-full flex items-center justify-center">
        <div className="p-8 rounded shadow-md w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <div className="text-sm text-gray-600">
              Nama: {simpanNama[simpanNama.length - 1] || 'Tidak ada nama'}
            </div>
            <div className="text-sm text-gray-600">
              Timer: <span id="timer" className={timer <= 30 ? 'text-red-500 font-bold' : ''}>{formatTimer(timer)}</span>
            </div>
          </div>
          <form onSubmit={(e) => {
              e.preventDefault()
              handleSubmitAnswer(userAnswer)
          }}>
            {shuffledQuestions.map((data, index) => {
              return(
                <div className="mb-6" key={index}>
                  <p className="text-lg font-semibold mb-2" dangerouslySetInnerHTML={{__html: data.question}}></p>
                  <div className="space-y-2">
                    {data.shuffledAnswers.map((answer, idx) => (
                      <label className="flex items-center" key={idx}>
                        <input 
                          type="radio" 
                          name={'answer'+(index+1)} 
                          value={answer} 
                          className="mr-2" 
                          onChange={() => handleAnswerChange(index+1, answer)}
                          checked={userAnswer[index + 1] === answer}
                        />
                        <span dangerouslySetInnerHTML={{__html: answer}}></span>
                      </label>
                    ))}
                  </div>
                </div>
              )
            })}
            <div className="text-sm text-gray-600 mt-2">
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full w-full">
                Simpan Jawaban
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  )
}