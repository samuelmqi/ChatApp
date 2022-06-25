import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { verifyOTPRoute, resendOTPRoute } from '../../services/api'

export default () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({})

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('chat-app-user'))
    if (user) {
      setValues({
        userId: user._id,
        email: user.email,
      })
    }
  }, [])

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (handleValidation()) {
      const { otp, userId } = values
      const data = await axios.post(verifyOTPRoute, {
        userId,
        otp
      })
      if (data.data.status === false) {
        toast.error(data.data.error, toastOptions)
      } else if (data.data.user.verified === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.data.user))
        localStorage.setItem('user-jwt', JSON.stringify(data.data.token))
        navigate('/chat')
      }
    }
  }

  const handleValidation = () => {
    const { otp } = values

    if (otp === '') {
      toast.error('Preencha o campo', toastOptions)
      return false
    }
    return true
  }

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    })
  }

  const handleResend = async () => {
    const {userId, email} = values
    const data = await axios.post(resendOTPRoute, {
      userId,
      email
    })
    if (data.data.status === false) {
      toast.error(data.data.error, toastOptions)
    }
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={event => handleSubmit(event)}>
          <div className="brand">
          </div>
          <input
            type="text"
            placeholder="Token"
            name="otp"
            onChange={e => handleChange(e)}
          />
          <button type="submit">Verificar</button>
          <span>
            Não recebeu um email ? 
            <span id="resend" onClick={e => handleResend()}>
              Reenviar
            </span>
          </span>
        </form>
      </FormContainer>
      <ToastContainer></ToastContainer>
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #241313;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #8b0000;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #a75454;
      outline: none;
    }
  }

  button {
    background-color: #8b0000;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #a75454;
    }
  }

  span {
    color: white;
    text-transform: uppercase;

    #resend {
      color: #8b0000;
      text-decoration: none;
      font-weight: bold;
      margin-left: 5px;
      cursor: pointer;
    }
  }
`
