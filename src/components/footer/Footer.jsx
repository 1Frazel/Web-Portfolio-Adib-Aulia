import React from 'react'
import './footer.css'
import {AiFillFacebook,AiFillInstagram,AiFillTwitterSquare} from 'react-icons/ai'
import LOGO1 from '../../assets/Logo-adib.png'
import { trackEvent } from '../../utils/analytics'

function Footer() {
  const handleNavClick = (sectionHash, label) => {
    trackEvent('footer_nav_click', {
      target_section: sectionHash,
      label,
    })
  }

  return (
    <footer>
      <a href="#" className='footer__logo' onClick={() => handleNavClick('#', 'Logo Home')}> <img src={LOGO1} alt="logo" /></a>

      <ul className='permalinks'>
         <li><a href="#" onClick={() => handleNavClick('#', 'Home')}>Home</a></li>
         <li><a href="#about" onClick={() => handleNavClick('#about', 'About')}>About</a></li>
         <li><a href="#experience" onClick={() => handleNavClick('#experience', 'Skills')}>Skills</a></li>
         <li><a href="#certificates" onClick={() => handleNavClick('#certificates', 'Certification')}>Certification</a></li>
         <li><a href="#service" onClick={() => handleNavClick('#service', 'Service')}>Service</a></li>
         <li><a href="#portfolio" onClick={() => handleNavClick('#portfolio', 'Professional Experience')}>Professional Experience</a></li>
         <li><a href="#project" onClick={() => handleNavClick('#project', 'Project')}>Project</a></li>
         <li><a href="#creation" onClick={() => handleNavClick('#creation', 'Creation')}>Creation</a></li>
         <li><a href="#contact" onClick={() => handleNavClick('#contact', 'Contact')}>Contact</a></li>
      </ul>
      <div className="footer__socials">
        <a
          href="https://www.facebook.com/AdibNK11/"
          target='_blank'
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('footer_social_click', {
              platform: 'facebook',
              location: 'footer',
            })
          }
        >
          <AiFillFacebook/>
        </a>
        <a
          href="https://instagram.com/adib_nk?igshid=MmIzYWVlNDQ5Yg=="
          target='_blank'
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('footer_social_click', {
              platform: 'instagram',
              location: 'footer',
            })
          }
        >
          <AiFillInstagram/>
        </a>
        <a
          href="https://twitter.com/nk_adib"
          target='_blank'
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent('footer_social_click', {
              platform: 'twitter',
              location: 'footer',
            })
          }
        >
          <AiFillTwitterSquare/>
        </a>
      </div>
      <div className="footer__copyright">
        <small>&copy; Adib Aulia. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer
