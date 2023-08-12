import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faMessage } from '@fortawesome/free-regular-svg-icons'

const ChatSidebar = () => {
    const [chatList, setChatList] = useState([])
    useEffect(() => {
        const loadChatList = async () => {
            const response = await fetch(`/api/chat/getChatList`, {
                method: 'POST',
            })
            const json = await response.json();
            console.log("Chat List: ", json)
            setChatList(json?.chats)
        }
        loadChatList()
    }, [])

    return (
        <div className='flex flex-col overflow-hidden text-white'>
            <button>
                <Link className='side-menu-item bg-teal-500 hover:bg-teal-700' href={'/chat'}>
                    <FontAwesomeIcon icon={faPlus} /> New Chat
                </Link>
            </button>
            <div className="flex-1 overflow-auto">
                {
                    chatList?.map((chat) => {
                        return (
                            <Link className='side-menu-item' key={chat._id} href={`/chat/${chat._id}`}>
                                <FontAwesomeIcon icon={faMessage} />    {chat.title}
                            </Link>
                        )
                    })
                }
            </div>
            <button>
                <Link className='side-menu-item bg-teal-500 hover:bg-teal-700' href={'/api/auth/logout'}>
                    <FontAwesomeIcon icon={faRightFromBracket} />Logout</Link>
            </button>
        </div>
    )
}

export default ChatSidebar