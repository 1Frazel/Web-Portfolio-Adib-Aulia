import React, { useEffect, useState } from 'react'
import Header from './components/header/Header'
import Nav from './components/nav/Nav'
import About from './components/about/About'
import Experience from './components/experience/Experience'
import Certificates from './components/certificates/Certificates'
import Service from './components/service/Service'
import Portfolio from './components/portfolio/Portfolio'
import Project from './components/project/Project'
import Creation from './components/creation/Creation'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'
import UiUxPage from './components/uiux/UiUxPage'

const checkIsUiUxRoute = () => {
  const path = window.location.pathname.replace(/\/+$/, '').toLowerCase()
  return path.endsWith('/ui-ux')
}

const App = () => {
  const [isUiUxRoute, setIsUiUxRoute] = useState(checkIsUiUxRoute)

  useEffect(() => {
    const handlePopState = () => {
      setIsUiUxRoute(checkIsUiUxRoute())
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigateToUiUx = () => {
    const base = import.meta.env.BASE_URL || '/'
    const targetUrl = `${base.replace(/\/+$/, '')}/ui-ux`
    window.history.pushState({}, '', targetUrl)
    setIsUiUxRoute(true)
  }

  const navigateToMain = () => {
    const base = import.meta.env.BASE_URL || '/'
    window.history.pushState({}, '', base)
    setIsUiUxRoute(false)
  }

  if (isUiUxRoute) {
    return <UiUxPage onNavigateMain={navigateToMain} />
  }

  return (
    <>
        <Header onNavigateUiUx={navigateToUiUx} />
        <Nav />
        <About />
        <Experience />
        <Certificates/>
        <Service />
        <Portfolio />
        <Project />
        <Creation/>
        <Contact />
        <Footer />
    </>
  )
}
    
export default App