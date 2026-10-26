import React from 'react'
import CV from '../../assets/CV M ADIB AULIA NURKHAFIF.pdf'
import { trackEvent } from '../../utils/analytics'

const CTA = ({ onNavigateUiUx }) => {
  const uiuxHref = `${import.meta.env.BASE_URL}ui-ux`

  const handleUiUxClick = (e) => {
    trackEvent('cta_click', {
      label: 'UI/UX Portfolio',
      location: 'main_hero',
      target_url: uiuxHref,
    })
    if (onNavigateUiUx) {
      e.preventDefault()
      onNavigateUiUx()
    }
  }

  return (
    <div className='cta'>
        <a
          href={CV}
          download
          className='btn'
          onClick={() =>
            trackEvent('cv_download_click', {
              source: 'main_hero',
              file_name: 'CV M ADIB AULIA NURKHAFIF.pdf',
            })
          }
        >
          My CV
        </a>
        <a href={uiuxHref} onClick={handleUiUxClick} className='btn btn-primary'>UI/UX Portfolio</a>
        <a
          href="#contact"
          className='btn'
          onClick={() =>
            trackEvent('cta_click', {
              label: "Let's Talk!",
              location: 'main_hero',
              target_section: '#contact',
            })
          }
        >
          Let's Talk!
        </a>
    </div>
  )
}

export default CTA
