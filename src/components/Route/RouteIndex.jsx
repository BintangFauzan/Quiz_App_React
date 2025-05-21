import { Route, Routes } from "react-router"
import LoginCard from "../LoginCard"
import QuizPage from "../QuizPage"

export default function RouteIndex() {
  return (
    <Routes>
        <Route path="/" element={<LoginCard/>}/>
        <Route path="/quiz_page" element={<QuizPage/>}/>
    </Routes>
  )
}