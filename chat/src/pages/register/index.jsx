import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { registerRoute } from '../../services/api'

export default () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

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
      const { password, name, email } = values
      const data = await axios.post(registerRoute, {
        name,
        email,
        password
      })
      if (data.data.status === false) {
        toast.error(data.data.error, toastOptions)
      } else if (data.data.user.verified === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.data.user))
        localStorage.setItem('user-jwt', JSON.stringify(data.data.token))
        navigate('/setAvatar')
      }
    }
  }

  const handleValidation = () => {
    const { password, confirmPassword, name, email } = values

    if (
      email === '' ||
      name === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      toast.error('Preencha todos os campos', toastOptions)
      return false
    } else if (password !== confirmPassword) {
      toast.error('As senhas inseridas são diferentes', toastOptions)
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

  return (
    <>
      <FormContainer>
        <form onSubmit={event => handleSubmit(event)}>
          <div className="brand">
          </div>
          <input
            type="text"
            placeholder="Nome"
            name="name"
            onChange={e => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={e => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Senha"
            name="password"
            onChange={e => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirme sua senha"
            name="confirmPassword"
            onChange={e => handleChange(e)}
          />
          <button type="submit">Cadastrar</button>
          <span>
            Você já possui conta ? <Link to="/login">Login</Link>{' '}
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
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
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
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;