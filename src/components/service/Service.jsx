import React from 'react'
import './service.css'
import { FaRegCheckCircle } from "react-icons/fa";
import { useSectionReadingTracker } from '../../utils/analytics'

const Service = () => {
  useSectionReadingTracker({
    sectionId: 'service',
    sectionName: 'Services',
  })

  return (
    <section id='service'>
      <h5>Things That I will do</h5>
      <h2>Services</h2>

        <div className="container service__container">
          <div className="service__networking">
            <h3>Networking Services</h3>
            <div className="service__content">
              <article className='service__detail'>
                <ul className='service__list'>
                  <li className='service__item'>
                    <FaRegCheckCircle className='service__detail-icon'/>
                    <span>Network design and configuration using Cisco, MikroTik, Fortinet, Ruckus, Ubiquiti, and other devices.</span>
                  </li>
                  <li className='service__item'>
                    <FaRegCheckCircle  className='service__detail-icon'/>
                    <span>Installation and maintenance of network devices.</span>
                  </li>
                  <li className='service__item'>
                    <FaRegCheckCircle className='service__detail-icon'/>
                    <span>Network performance and security improvement.</span>
                  </li>
                  <li className='service__item'>
                    <FaRegCheckCircle  className='service__detail-icon'/>
                    <span>Network troubleshooting.</span>
                  </li>
                </ul>
              </article>
            </div>
          </div>

          <div className="service__programming">
            <h3>Front End & UI/UX Services</h3>
            <div className="service__content">
              <article className='service__detail'>
                <ul className='service__list'>
                  <li className='service__item'>
                    <FaRegCheckCircle className='service__detail-icon'/>
                    <span>Responsive front end development with TypeScript and modern frameworks (Vite/NextJS).</span>
                  </li>
                  <li className='service__item'>
                    <FaRegCheckCircle className='service__detail-icon'/>
                    <span>UI design, wireframing, and prototyping in Figma.</span>
                  </li>
                  <li className='service__item'>
                    <FaRegCheckCircle className='service__detail-icon'/>
                    <span>Performance optimization for fast, smooth interfaces.</span>
                  </li>
                  <li className='service__item'>
                    <FaRegCheckCircle className='service__detail-icon'/>
                    <span>State management and scalable component architecture.</span>
                  </li>
                  <li className='service__item'>
                    <FaRegCheckCircle className='service__detail-icon'/>
                    <span>Basic UX research through interviews and feedback.</span>
                  </li>
                  <li className='service__item'>
                    <FaRegCheckCircle className='service__detail-icon'/>
                    <span>Clean delivery workflow using SDLC and GitHub.</span>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Service
