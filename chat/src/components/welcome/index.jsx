import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export default () => {
  const [userName, setUserName] = useState("")

  const setUser = async () => {
    setUserName(await JSON.parse(localStorage.getItem('chat-app-user')).name)
  }

  useEffect(() => {
    setUser()
  }, [])

  return (
    <Container>
      <h1>
        Boas Vindas, <span>{userName}!</span>
      </h1>
      <h3>Por favor, selecione um chat.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;