import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'

export default function LoginCard() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [validationError, setValidationError] = useState([])
    const history = useNavigate()

     const loginHandler = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        await axios.post("http://localhost:8000/api/login", formData)
            .then(res => {
                localStorage.setItem("token", res.data.authorisation.token);
                history("/quiz_page")
                console.log("Token: ", res.data.authorisation.token);
            }).catch(err => {
                setValidationError(err.response.data)
                console.log("Error API",err.response.data)
            });
    }
      return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-blue-200">
  <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
    <form action="#" method="POST" onSubmit={loginHandler}>
      <div className="mb-6">
        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
          <i className="fas fa-user mr-2"></i>email
        </label>
        <input
          type="text"
          id="username"
          name="username" placeholder="username or email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required 
            onChange={(e) => setEmail(e.target.value)}
          />
      </div>
      <div>
            {validationError.email && (
                <div className="text-red-500">{validationError.message}</div>
            )}
        </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          <i className="fas fa-lock mr-2"></i>Password
        </label>
        <div className="relative">
          <input
            type="password"
            id="password"
            name="password" placeholder="create a strong password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
            required 
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div>
            {validationError.password && (
                <div className="text-red-500">{validationError.message}</div>
            )}
        </div>
        <a className="text-blue-500 text-sm hover:underline">Forgot password?</a>
      </div>

      <div className="flex items-center justify-between mt-6">
        <button
          className="bg-white border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-50 hover:text-blue-600 transition duration-200"
          type="button" >
          Sign up
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          type="submit">
          Log in
        </button>
      </div>
    </form>
    </div>
</div>    
</>
  )
}
