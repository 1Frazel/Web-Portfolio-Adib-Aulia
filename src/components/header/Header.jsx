import React from 'react'
import './header.css'
import CTA from './CTA'
import ME from '../../assets/adib.png'
import HeaderSocials from './HeaderSocials'

function Header({ onNavigateUiUx }) {
  return (
    <header>
      <div className="container header__container">
        <h5>Hello I'm</h5>
        <h1>M. Adib Aulia Nurkhafif</h1>
        <h5 className="text-light">
          Junior Front-End Developer & UI/UX Designer
        </h5>
        <CTA onNavigateUiUx={onNavigateUiUx} />
        <HeaderSocials />

        <div className="me">
          <img src={ME} alt="me" />
        </div>

        <a href="#contact" className='scroll__down'>Scroll Down</a>
      </div>
    </header>
  )
}

export default Header