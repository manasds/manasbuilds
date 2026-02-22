import { Container } from '@/components/container'
import { Noise } from '@/components/noise'
import React from 'react'

export default function Home() {
  return (
    <div className='min-h-screen relative font-mono'>
        <Noise />
        <Container className='relative z-20  h-screen pt-16 max-w-3xl mx-auto'>
            <div>here i am gonna yap so much that your ears gonna bleed ,
              nah just joking its gonna be some quality stuff 
            </div>
        </Container>
    </div>
  )
}
