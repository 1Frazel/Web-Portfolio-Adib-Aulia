import React from 'react'
import './certificates.css'
import { FaDotCircle } from "react-icons/fa";
import { useSectionReadingTracker } from '../../utils/analytics'

function Certificates () {
    useSectionReadingTracker({
        sectionId: 'certificates',
        sectionName: 'Certifications',
    })

    return(
        <section id='certificates'>
            <h5>My Accomplishment</h5>
            <h2>Certifications</h2>

            <div className='container certificates__container'>
                <div className='certificates__active'>
                    <h3>Active Certifications</h3>
                    <div className='certificates__content'>
                        <article className='certificates__detail'>
                        <FaDotCircle className='certificates__detail-icon'/>
                        <div>
                            <h4>IT Support Google</h4>
                            <small>Lifetime</small>
                        </div>
                        </article>
                    </div>
                </div>
                {/*END OF ACTIVE*/}
                <div className='certificates__expired'>
                    <h3>Expired Certifications</h3>
                    <div className='certificates__content'>
                        <h4 className='certificates__year'>Expires 2025</h4>
                        <article className='certificates__detail'>
                            <FaDotCircle className='certificates__detail-icon'/>
                            <div>
                                <h4>D-Link Certified Network Design Associate (DCNA)</h4>
                                <small>2023-2025</small>
                            </div>
                        </article>
                        <h4 className='certificates__year'>Expires 2024</h4>
                        <article className='certificates__detail'>
                            <FaDotCircle className='certificates__detail-icon'/>
                            <div>
                                <h4>Ubiquiti Broadband Wireless Admin (UBWA)</h4>
                                <small>2022-2024</small>
                            </div>
                        </article>
                        <article className='certificates__detail'>
                            <FaDotCircle className='certificates__detail-icon'/>
                            <div>
                                <h4>MikroTik Certified Traffic Control Engineer (MTCTCE)</h4>
                                <small>2021-2024</small>
                            </div>
                        </article>
                        <article className='certificates__detail'>
                            <FaDotCircle className='certificates__detail-icon'/>
                            <div>
                                <h4>MikroTik Certified Inter-Networking Engineer (MTCINE)</h4>
                                <small>2021-2024</small>
                            </div>
                        </article>
                        <article className='certificates__detail'>
                            <FaDotCircle className='certificates__detail-icon'/>
                            <div>
                                <h4>Ubiquiti Enterprise Wireless Admin (UEWA)</h4>
                                <small>2021-2024</small>
                            </div>
                        </article>
                        <h4 className='certificates__year'>Expires 2023</h4>
                        <article className='certificates__detail'>
                            <FaDotCircle className='certificates__detail-icon'/>
                            <div>
                                <h4>NSE 1 Network Security Associate (Fortinet)</h4>
                                <small>2021-2023</small>
                            </div>
                        </article>
                        <article className='certificates__detail'>
                            <FaDotCircle className='certificates__detail-icon'/>
                            <div>
                                <h4>NSE 2 Network Security Associate (Fortinet)</h4>
                                <small>2021-2023</small>
                            </div>
                        </article>
                        <article className='certificates__detail'>
                            <FaDotCircle className='certificates__detail-icon'/>
                            <div>
                                <h4>NSE 3 Network Security Associate (Fortinet)</h4>
                                <small>2021-2023</small>
                            </div>
                        </article>
                        <article className='certificates__detail'>
                            <FaDotCircle className='certificates__detail-icon'/>
                            <div>
                                <h4>MikroTik Certified Network Associate (MTCNA)</h4>
                                <small>2020-2023</small>
                            </div>
                        </article>
                        <article className='certificates__detail'>
                            <FaDotCircle className='certificates__detail-icon'/>
                            <div>
                                <h4>MikroTik Certified Routing Engineer (MTCRE)</h4>
                                <small>2020-2023</small>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Certificates
