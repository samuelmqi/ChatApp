import React, { useState } from "react"
import styled from "styled-components"
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'

export default ({handleSendMsg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [msg, setMsg] = useState("")

  const sendChat = (event) => {
    event.preventDefault()
    if(msg.length > 0) {
      handleSendMsg(msg)
      setMsg('')
    }
  }

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message)
  }

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {
            showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
          }
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)} >
        <input
          type="text"
          placeholder="Digite sua mensagem"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="sub">
          <IoMdSend />
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #131324;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #131324;
        box-shadow: 0 5px 10px #8b0000;
        border-color: #8b0000;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #130a0a;
          width: 5px;
          &-thumb {
            background-color: #131324;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #131324;
        }
        .emoji-group:before {
          background-color: #131324;;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #131324;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #131364;
      cursor: pointer;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`