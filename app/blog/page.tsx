import { Container } from '@/components/container'
import { Noise } from '@/components/noise'
import React from 'react'

export default function Home() {
  return (
    <div className='min-h-screen relative font-mono'>
        <Noise />
        <Container className='relative z-20 flex justify-center items-center h-screen'>
            <h1 className='text-6xl font-normal tracking-wide'>This is Blog Page</h1>
        </Container>
    </div>
  )
}
