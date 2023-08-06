import { useUser } from '@auth0/nextjs-auth0/client'
import React from 'react'
import Image from 'next/image';
import logo from '../assets/logo.png'
import ReactMarkdown from 'react-markdown';

const Message = ({ role, content }) => {
    const { user } = useUser();
    return (
        <div className={`grid grid-cols-[30px_1fr] gap-5 p-5 ${role === "assistant" ? 'bg-zinc-500' : ''}`}>
            <div>
                {
                    role === 'user' && user && (
                        <Image src={user.picture} width={30} height={30} alt='User Avatar' className='rounded-sm shadow-md shadow-black/50' />
                    )
                }
                {
                    role === 'assistant' && (
                        <Image src={logo} width={30} height={30} alt='User Avatar' className='rounded-sm shadow-md shadow-black/50' />
                    )
                }
            </div>
            <div className='prose prose-invert'>
                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
            </div>

        </div>
    )
}

export default Message