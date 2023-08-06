import React from 'react'
import Link from 'next/link'

const ChatSidebar = () => {
    return (
        <div>
            <button className='btn w-full'>
                <Link href={'/api/auth/logout'}>Logout</Link>
            </button>
        </div>
    )
}

export default ChatSidebar