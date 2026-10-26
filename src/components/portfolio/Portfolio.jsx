import React, { useState } from "react";

import './portfolio.css'
import SwiperNav from '../swiper/SwiperNav';
import IMG1 from '../../assets/Project-1.png'
import IMG2 from '../../assets/Project-2.png'
import IMG3 from '../../assets/Project-3.png'
import IMG4 from '../../assets/Project-4.png'
import IMG5 from '../../assets/Project-5.png'
import IMG6 from '../../assets/Project-6.png'
import IMG7 from '../../assets/Project-7.png'
import IMG8 from '../../assets/Project-8.png'
import IMG9 from '../../assets/Project-9.png'

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  trackEvent,
  useCarouselSlideTracker,
  useSectionReadingTracker,
} from '../../utils/analytics';

import 'swiper/css';
import 'swiper/css/pagination';


const data = [
  {
    image: IMG1,
    title: 'Replacement Firewall Palo Alto PT. Mega Eltra (2021)',
    job: 'Network Engineer Intern',
    corporation: 'PT. Mitra Visindo Teknologi',
    info: 'My first project was a firewall replacement, where my senior and I went to PT Mega Eltra Pupuk Indonesia in the Jatiwaringin area, East Jakarta, for installation and replacement of devices. The device to be replaced is the Palo Alto 3200 series firewall. My job during the project was to configure the Mikrotik device to be integrated with the Palo Alto firewall device that we had just installed. The configuration I did was integration of IP Addresses, then mapping VLANs so that Palo Alto could be integrated on all switches throughout the floor and stabilizing the VPN line.'  },
  {
    image: IMG2,
    title: 'Access Point Installation and Fiber Optic Survey PT. ASDP Merak (2021)',
    job: 'Network Engineer Intern',
    corporation: 'PT. Mitra Visindo Teknologi',
    info: 'My second project is in the Merak Port area in Cilegon. This time I was going to install the Ruckus Wireless Zoneflex R320 on a ferry traveling to Lampung at the Merak Exclusive Pier. So my boss and I went up to the ferry while installing network devices, after finishing in the afternoon because we had to follow the Merak-Lampung round trip, that night we went to the PT ASDP Indonesia Ferry office to do topology mapping and Fiber Optic surveys by remote until late at night, and continued to stay at the hotel. Then the next morning, we continued the Fiber Optic survey by going directly to the field, until the afternoon. After completion, we returned to Jakarta.'  },
  {
    image: IMG3,
    title: 'Installation Upgrade Switch Ruckus PT. ASDP Bitung (2021)',
    job: 'Network Engineer Intern',
    corporation: 'PT. Mitra Visindo Teknologi',
    info: 'My third project was done by remote, I was given directions by my boss to upgrade the Ruckus ICX Series devices that would be sent to Bitung, the configuration I did was to upgrade the firmware, and configure the VLAN according to the directions given, I did this configuration on the same 8 devices, after completing the configuration the devices were wrapped again before being sent to their destination.'  },
  {
    image: IMG4,
    title: 'Installation Upgrade Switch Ruckus and MikroTik CCR PT. Rajawali Nusindo (2021)',
    job: 'Network Engineer Intern',
    corporation: 'PT. Mitra Visindo Teknologi',
    info: 'My fourth project was done by remote, I was assigned by my boss to upgrade the Ruckus ICX Series and Mikrotik CCR devices, the configuration I did was only upgrading the firmware, and configuring the VLAN according to the directions given, I did this configuration on the same 6 devices. after completing the configuration, the device was wrapped again before being sent to its destination.'  },
  {
    image: IMG5,
    title: 'Installation Upgrade Switch and Access Point Ruckus DPR RI (2021)',
    job: 'Network Engineer Intern',
    corporation: 'PT. Mitra Visindo Teknologi',
    info: 'My fifth project was divided into 2 stages. First, my supervisor and I upgraded and configured VLANs on Ruckus ICX series devices before sending them to DPR RI for installation. Secondly, after completing the upgrade, we then carried out the installation by going directly to DPR RI. After a briefing with DPR IT, we replaced Juniper devices with Ruckus ICX devices in several data boxes scattered in the DPR building, and after that, we also installed Ruckus Wireless Zoneflex in various departments in the DPR building.'  },
  {
    image: IMG6,
    title: 'Preventive Maintenance Switch Ruckus and Avaya Kemenhub RI (2021)',
    job: 'Network Engineer Intern',
    corporation: 'PT. Mitra Visindo Teknologi',
    info: 'The sixth project I only did maintenance on network devices at the Indonesian Ministry of Transportation, there I checked the condition of the devices at the Ministry, there were Ruckus switches and Avaya switches, I checked the physical condition of the router, such as temperature, LED lights. Then check the configuration if there is anything changed or missing, then make sure the device remains integrated, and then testing on end-users to ensure there are no problems.'  },
  {
    image: IMG7,
    title: 'SD-WAN Alfamart (2021)',
    job: 'Network Engineer Intern',
    corporation: 'PT. Media Telekomunikasi Mandiri (MTM)',
    info: 'SD-WAN Alfa is a megaproject that was being worked on by the MTM company when I interned there, because in this project, MTM collaborated with ICON + in terms of MPLS infrastructure. And in this megaproject, we installed 3000+ Alfamart stores and hundreds of Alfamidi stores throughout Indonesia. During the project, I worked on 3 things: Pre-Config: Perform fresh configuration on Fortigate products in accordance with the provisions, such as MPLS configuration, GSM, etc. Before finally the device is sent to Alfa stores throughout Indonesia Remote Installation: After the device finally arrives, we will do a remote installation with the ICON + Onsite Team, so that the Fortigate device can be connected to the Alfa Server, and SD-WAN can run smoothly Optimization: Optimization is only done if there are problems with SD-WAN, so that SD-WAN can run smoothly again. '  },
  {
    image: IMG8,
    title: 'Security Branch Implementation BRI (2022)',
    job: 'Network Engineer (Contract)',
    corporation: 'PT. Info Solusindo Data Utama',
    info: <p> This project is an implementation in improving network security at BRI offices.
          <br />
          BRI itself has 3 types of offices, there are KCP (Branch Office) at the lowest level, then there is KC (Branch Office) at the middle level, and there is KK (Regional Office) which is the center of the BRI network in the area. And in this project, my team and I were assigned to install Fortigate in several KCP and KC offices spread across Jabodetabek and Banten, and while I got an allotment to install in 9 KCP, and 1 KC.
          <br />
          <br />
          In this project, I did 3 things during the installation:  
          <br />
          1. When I first arrived at the site, what I did was survey the topology of the BRI office. There are 2 types of BRI networks, Intranet and Internet, and we must know in detail the topology of the two networks. 
          <br />
          2. Start Intranet / Internet Installation After completing the survey and analyzing the topology, then we start to start adding Fortigate devices to the network, which will later become the office's Intranet and Internet network firewall. 
          <br />
          3. Documentation after completing the installation, I check all BRI facilities, systems, and applications, as well as the internet there, whether they can be used again and the traffic has passed through Fortigate, if so then the implementation has been successful.'</p> 
  },
  {
    image: IMG9,
    title: 'Front End Engineer Internship 99 Group (2025-2026)',
    job: 'Front End Engineer Intern',
    corporation: '99 Group Indonesia',
    info: <p>
          During my a year tenure as a Frontend Engineer Intern at 99 Group (Rumah123.com), I played an integral role in the complete software development lifecycle within a fast-paced Agile Scrum environment. Operating across the Growth, Conversion, and Consumer teams, I engineered responsive, user-centric web applications utilizing Next.js and Server-Side Rendering (SSR). My core project contributions included architecting a highly scalable cross-device navigation system (HeaderV2), developing a dynamic property review section integrated with a Strapi headless CMS, and building strategic components for the New Search Result Page (NSRP) and Matchmaker tool.
          <br />
          <br />
          Beyond new feature development, I actively managed technical debt and system optimization by resolving over 120 sprint and bug tickets related to complex state management, UI inconsistencies, and advanced search filtering logic. I also spearheaded critical infrastructure and performance improvements, such as migrating visual assets to Tencent Cloud, optimizing search bar response times through debouncing, and implementing granular event-driven tracking via Segment SDK. By refining SEO breadcrumb schemas and metadata, I directly supported the platform's discoverability and technical health, ultimately delivering robust frontend solutions for one of Southeast Asia's leading property marketplaces.
          <br />
          <br />
          There isn't much documentation due to the company's policy.
          </p>
  }
]

function Portfolio() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useSectionReadingTracker({
    sectionId: 'portfolio',
    sectionName: 'Professional Experiences',
  });

  useCarouselSlideTracker({
    sectionId: 'portfolio',
    category: 'experience',
    items: data,
    activeIndex,
    engagedThresholdSec: 6,
  });

  const handlePrev = () => {
    trackEvent('carousel_nav_click', {
      carousel: 'professional_experiences',
      direction: 'prev',
      current_slide_title: data[activeIndex]?.title,
    });
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    trackEvent('carousel_nav_click', {
      carousel: 'professional_experiences',
      direction: 'next',
      current_slide_title: data[activeIndex]?.title,
    });
    swiperInstance?.slideNext();
  };

  return (
    <section id='portfolio'>
      <h5>My Work Experiences</h5>
      <h2>Professional Experiences</h2>
      
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        modules={[Pagination]}

        className="container portfolio__container">
          <SwiperNav
            onPrev={handlePrev}
            onNext={handleNext}
            slot="container-start"
          />
          {
          data.map(({image, title, job, corporation, info}, index) => {
            return (
              <SwiperSlide key={index} className='portfolio__item '>
          <div className="portfolio__item-image">
            <img src={image}/>
          </div>
          <div className="portfolio__desc">
            <h3 className='portfolio__title'>{title}</h3>
            <div className='portfolio__job-container'>
              <h4 className='portfolio__job'>{job}</h4>
              <h4 className='portfolio__job'>{corporation}</h4>
            </div>
            <p className='portfolio__info'>{info}</p>
          </div>
        </SwiperSlide>
            )
          })
        }
      </Swiper>
    </section>
  )
}

export default Portfolio
