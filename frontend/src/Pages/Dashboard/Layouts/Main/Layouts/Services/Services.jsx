import React from 'react'
import './Services.css'
import {Link} from 'react-router-dom'
const Services = () => {
  return (
    <div>
        <h1>Services</h1>
        <div className="service_card_container">
            {/* Add your service cards here */}
            <div className="card_services">
                <span><img src="/nutripulse1.png" alt="" /></span>
                <p>Intuitive Health Tech</p>
            </div>
            <div className="card_services">
                <span><img src="/netoracloud.png" alt="" /></span>
                <div>
                   <p>Cloud without Limits</p>
                </div>
            </div>
            <div className="card_services">
                 <span><img src="/netorasec2.png" alt="" /></span>
                <p>Defend . Armor . Your Data</p>
            </div>
            <div className="card_services">
                 <span><img src="/mannamails.png" alt="" /></span>
                <p>Send bulk mails ina click</p>
            </div>
              <div className="card_services">
                 <span><img src="/quixvine.png" alt="" /></span>
                <p>Love. Share. Information</p>
            </div>
        </div>
    </div>
  )
}

export default Services