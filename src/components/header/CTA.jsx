import React from 'react'
import CV from '../../assets/CV M ADIB AULIA NURKHAFIF.pdf'

const CTA = ({ onNavigateUiUx }) => {
  const uiuxHref = `${import.meta.env.BASE_URL}ui-ux`

  const handleUiUxClick = (e) => {
    if (onNavigateUiUx) {
      e.preventDefault()
      onNavigateUiUx()
    }
  }

  return (
    <div className='cta'>
        <a href={CV} download className='btn'>My CV</a>
        <a href={uiuxHref} onClick={handleUiUxClick} className='btn btn-primary'>UI/UX Portfolio</a>
        <a href="#contact" className='btn'>Let's Talk!</a>
    </div>
  )
}

export default CTA