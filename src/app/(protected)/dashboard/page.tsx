'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'

const Dashboard = () => {
    const { user } = useUser()
    return (
        <div>
            Hello
        </div>
    )
}

export default Dashboard