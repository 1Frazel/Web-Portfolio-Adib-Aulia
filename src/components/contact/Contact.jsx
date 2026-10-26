import React, { useRef } from 'react';
import './contact.css';
import { MdEmail } from 'react-icons/md';
import { BsLine } from 'react-icons/bs';
import { IoLogoWhatsapp } from 'react-icons/io';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trackEvent, useSectionReadingTracker } from '../../utils/analytics';

export const Contact = () => {
  const form = useRef();

  useSectionReadingTracker({
    sectionId: 'contact',
    sectionName: 'Contact Me On',
  });

  const sendEmail = (e) => {
    e.preventDefault();

    trackEvent('contact_form_submit', {
      source: 'main_contact',
    });

    emailjs.sendForm('service_1jjdsvk', 'template_83t6kxr', form.current, 'qkYHUAd9cmK7BjIFb')
      .then((result) => {
        console.log(result.text);
        trackEvent('contact_form_success', {
          source: 'main_contact',
        });
        // Show success toast notification
        toast.success('Message sent successfully!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }, (error) => {
        console.log(error.text);
        trackEvent('contact_form_error', {
          source: 'main_contact',
        });
        // Show failure toast notification
        toast.error('Failed to send the message. Please try again.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });

    e.target.reset();
  };

  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Me On</h2>

      <div className="container contact__container">
        <div className="contact__options">
          <article className='contact__option'>
            <MdEmail className='contact__option-icon'/>
            <h4>Email</h4>
            <h5>adibnk11@gmail.com</h5>
            <a
              href="mailto:adibnk11@gmail.com"
              target='_blank'
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('contact_direct_click', {
                  source: 'main_contact',
                  channel: 'email',
                })
              }
            >
              Send a message
            </a>
          </article>

          <article className='contact__option'>
            <BsLine className='contact__option-icon'/>
            <h4>Line</h4>
            <h5>adibnk11</h5>
            <a
              href="https://line.me/ti/p/ldL_KNuTsq"
              target='_blank'
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('contact_direct_click', {
                  source: 'main_contact',
                  channel: 'line',
                })
              }
            >
              Send a message
            </a>
          </article>

          <article className='contact__option'>
            <IoLogoWhatsapp className='contact__option-icon'/>
            <h4>WhatsApp</h4>
            <h5>+6282241033809</h5>
            <a
              href="https://wa.me/6282241033809"
              target='_blank'
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('contact_direct_click', {
                  source: 'main_contact',
                  channel: 'whatsapp',
                })
              }
            >
              Send a message
            </a>
          </article>
        </div>

        <form ref={form} onSubmit={sendEmail}>
          <label>Name</label>
          <input type="text" name='name' placeholder='Your Full Name' required/>
          <label>Email</label>
          <input type="email" name='email' placeholder='Your Email' required/>
          <label>Messages</label>
          <textarea name="message" rows="7" placeholder='Your Message' required></textarea>
          <button type="submit" value="Send" className='btn btn-primary'>Send Message</button>
        </form>

        {/* Toast container to display the notifications */}
        <ToastContainer />
      </div>
    </section>
  );
}

export default Contact;
