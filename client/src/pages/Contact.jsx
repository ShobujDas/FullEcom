import React from 'react'
import Layout from '../components/Layout/Layout'
import {BiVoicemail,BiPhoneCall,BiSupport} from 'react-icons/bi'


function Contact() {
  return (
    <Layout title={'Contact Page'}>
      <div className="row contactus">
        <div className="col-md-6">
          <img 
          src="/image/me.jpg" 
          alt=""
          style={{width:"100%"}}
          />

        </div>
        <div className="col-md-4">
          <h2 className="bg-dark p-2 text-white text-center">Contact Us</h2>
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
          
        </div>
      </div>
    </Layout>
  )
}

export default Contact