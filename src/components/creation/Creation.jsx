import React, { useState } from 'react'
import './creation.css'
import SwiperNav from '../swiper/SwiperNav'
import myPortfolio from '../../assets/B INDO PORTO MUHAMMAD AULIA NURKHAFIF_3.pdf'


import buku1 from '../../assets/HOW TO BASIC MTCNA 100 FIX.pdf'
import buku2 from '../../assets/HOW TO BASIC-MTCRE 100_ FIX.pdf'
import buku3 from '../../assets/HOW TO BASIC CCNA ENTERPRISE.pdf'
import buku4 from '../../assets/FORBIDDEN REDHAT.pdf'
import buku5 from '../../assets/NETWORK FUNDAMENTAL E-MODUL.pdf'
import buku6 from '../../assets/Subnetting Modul.pdf'

import { Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  trackEvent,
  useCarouselSlideTracker,
  useSectionReadingTracker,
} from '../../utils/analytics'

import 'swiper/css'
import 'swiper/css/pagination'

const data = [
    {
        title: 'How To Basic: MTCNA',
        buku: buku1,
        desc: 'A complete book explaining all MTCNA material, from MikroTik basic access, Firewall Basics, Wireless Basics to hotspots etc. There are more than 50+ MTCNA labs!',
    },
    {
        title: 'How To Basic: MTCRE',
        buku: buku2,
        desc: 'A complete book explaining all MTCRE material, starting from routing concepts, then static routing, dynamic routing to tunnels etc. There are more than 35+ MTCRE Labs!'    },
    {
        title: 'How To Basic: CCNA Enterprise',
        buku: buku3,
        desc: 'A complete book explaining all the CCNA Enterprise material, the latest version of CCNA, starting from switching, then routing and also there is IPv6 basic, and others. There are more than 50+ CCNA Enterprise Labs!',     },
    {
        title: 'Forbidden Redhats',
        buku: buku4,
        desc: 'A book that discusses the Redhat server, from installing the server, to adding some of the services available on the Redhat server, all covered here!',    },
    {
        title: 'Network Fundamental Modul',
        buku: buku5,
        desc: 'This module discusses the fundamentals of networks, such as explaining what networks are, how their history and origins are, and discussing many terms in the network world'    },
    {
        title: 'Subnetting Modul',
        buku: buku6,
        desc: 'This module discusses an important topic in the world of networking, namely Subnetting, regarding its explanation, how to calculate and the most effective techniques'    }
]

function creation()  {
    const [swiperInstance, setSwiperInstance] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useSectionReadingTracker({
      sectionId: 'creation',
      sectionName: 'Creations',
    })

    useCarouselSlideTracker({
      sectionId: 'creation',
      category: 'creation',
      items: data,
      activeIndex,
      engagedThresholdSec: 5,
    })

    const handlePrev = () => {
      trackEvent('carousel_nav_click', {
        carousel: 'creations',
        direction: 'prev',
        current_slide_title: data[activeIndex]?.title,
      })
      swiperInstance?.slidePrev()
    }

    const handleNext = () => {
      trackEvent('carousel_nav_click', {
        carousel: 'creations',
        direction: 'next',
        current_slide_title: data[activeIndex]?.title,
      })
      swiperInstance?.slideNext()
    }

    return (
      <section id='creation'>
        <h5>What I've Wrote</h5>
        <h2>Creations</h2>

        <div className='container creation__introduction'>
          <h3>This section is about all the books I wrote based back when I still study on Vocational High School</h3>
        </div>
        
        <Swiper 
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable:true
        }}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Pagination]}
        className="container creation__container">
          <SwiperNav
            onPrev={handlePrev}
            onNext={handleNext}
            slot="container-start"
          />
          {
            data.map(({image, title, buku, desc}, index) => {
              return(
                <SwiperSlide key={index} className='creation__item'>
                  <div className='creation__item-image'>
                    <img src={image} alt="" />
                  </div>
                  <div className='creation__detail'>
                    <h3 className='creation__detail-title'>{title}</h3>
                    <p className='creation__detail-desc'>{desc}</p>
                    <div className='creation__detail-btn'>
                        <a
                          href={buku}
                          className='btn'
                          onClick={() =>
                            trackEvent('book_download_click', {
                              book_title: title,
                              slide_index: index,
                            })
                          }
                        >
                          Download Book
                        </a>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })
          }
        </Swiper>
      </section>
      
    )
  }
  export default creation
