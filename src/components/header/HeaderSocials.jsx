import React from 'react'
import {BsLinkedin} from 'react-icons/bs'
import {BsInstagram} from 'react-icons/bs'
import {BsFacebook} from 'react-icons/bs'
import { FaGithub } from "react-icons/fa";
import './header.css'
import { trackEvent } from '../../utils/analytics'


const HeaderSocials = () => {
  return (
    <div className='header__socials'>
        <a
          href="https://www.linkedin.com/in/m-adib-aulia-nurkhafif"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('social_click', {
              platform: 'linkedin',
              location: 'header',
            })
          }
        >
          <BsLinkedin/>
        </a>
        <a
          href="https://instagram.com/adib_nk?igshid=MmIzYWVlNDQ5Yg=="
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('social_click', {
              platform: 'instagram',
              location: 'header',
            })
          }
        >
          <BsInstagram/>
        </a>
        <a
          href="https://www.facebook.com/AdibNK11/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('social_click', {
              platform: 'facebook',
              location: 'header',
            })
          }
        >
          <BsFacebook/>
        </a>
        <a
          href="https://github.com/1Frazel"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('social_click', {
              platform: 'github',
              location: 'header',
            })
          }
        >
          <FaGithub/>
        </a>
    </div>
  )
}

export default HeaderSocials
