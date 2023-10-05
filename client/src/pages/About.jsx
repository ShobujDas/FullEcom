import React from 'react'
import Layout from '../components/Layout/Layout'

function About() {
  return (
    <Layout title={'About us'}>
      <div className="row contactus">
        <div className="col-md-6">
          <img 
          src="/image/me.jpg" 
          alt=""
          style={{width:"100%"}}
          />

        </div>
        <div className="col-md-4">
          <h2 className="bg-dark p-2 text-white text-center">About Us </h2>
          <p className='text-justify mt-2'>
            any query and info about product feel to call anytime we 24X7 abailable
          </p>
          
          
        </div>
      </div>
    </Layout>
  )
}

export default About