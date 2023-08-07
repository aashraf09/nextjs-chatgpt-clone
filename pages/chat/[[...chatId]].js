import React from 'react'
import Head from 'next/head'
import { streamReader } from "openai-edge-stream";
import ChatSidebar from '@/components/ChatSidebar'
import { useState } from 'react'
import { v4 as uuid } from 'uuid';
import Message from '@/components/Message';

const chat = () => {
  const [messageText, setMessageText] = useState("")
  const [incomingMessage, setIncomingMessage] = useState("")
  const [newChatMessages, setNewChatMessages] = useState([])
  const [generatingResponse, setGeneratingResponse] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneratingResponse(true)
    setNewChatMessages(prev => {
      const newChatMessage = [...prev, {
        _id: uuid(),
        role: 'user',
        content: messageText,
      }]
      return newChatMessage
    })
    setMessageText("")
    const response = await fetch(`/api/chat/createNewChat`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        message: messageText
      })
    })
    const json = await response.json()
    console.log("New Chat: ", json);
    // console.log(messageText);
    // console.log(newChatMessages);
    // const response = await fetch(`/api/chat/sendMessage`, {
    //   method: "POST",
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify({ message: messageText }),
    // })
    // const data = response.body;
    // // console.log("Response: ", response);
    // // console.log("Data: ", data);
    // if (!data) {
    //   console.log('No response from server');
    // }
    // const reader = data.getReader()
    // await streamReader(reader, (message) => {
    //   // console.log("message: ", message);
    //   setIncomingMessage((prev) => `${prev}${message.content}`)
    // })
    setGeneratingResponse(false)
    // console.log('I reached bottom of stream');
  }


  return (
    <>
      <Head>
        <title>IntellectoBot - Chat</title>
      </Head>
      <div className="grid h-screen grid-cols-[260px_1fr] bg-zinc-600">
        <ChatSidebar />
        <div className="chat-window bg-zinc-700 flex overflow-hidden flex-col">
          <div className='flex-1 overflow-auto text-white'>
            {
              newChatMessages.map((message) => {
                return (
                  <Message
                    key={message._id}
                    role={message.role}
                    content={message.content}
                  />
                )
              })
            }
            {
              incomingMessage &&
              <Message role="assistant" content={incomingMessage} />
            }
          </div>
          <footer className='bg-zinc-500 p-10'>
            <form onSubmit={handleSubmit}>
              <fieldset className='flex gap-2' disabled={generatingResponse}>
                <textarea
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)} className='w-full resize-none rounded-md bg-gray-700 p-2 text-white focus:border-emerald-500 focus:bg-gray-600 focus:outline focus:outline-emerald-500'
                  placeholder={generatingResponse ? "Generating Response..." : "Send a message..."}>
                </textarea>
                <button type='submit' className='btn'>
                  Send
                </button>
              </fieldset>
            </form>
          </footer>
        </div>
      </div>
    </>
  )
}

export default chat