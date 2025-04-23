'use client'
import { useUser } from '@clerk/nextjs'
import React from 'react'

const Dashboard = () => {
    const { user } = useUser()
    return (
        <div>
            <h1 className="text-3xl font-bold underline">Dashboard</h1>
            <p className="text-xl">Welcome, {user?.fullName}!</p>
            <p className="text-lg">Your email: {user?.emailAddresses[0]?.emailAddress}</p>
        </div>
    )
}

export default Dashboard