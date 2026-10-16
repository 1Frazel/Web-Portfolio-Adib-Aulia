import React, { useEffect, useRef, useState } from 'react';
import './uiux.css';

import PROFILE_IMG from '../../assets/IMG_PP-edit-bg.png';
import LATEST_CV from '../../assets/CV M ADIB AULIA NURKHAFIF.pdf';
import PORTFOLIO_PDF from '../../assets/Portfolio of Projects_M Adib Aulia Nurkhafif.pdf';

import RESUMEEZ_P1 from '../../assets/ui-ux/Resumeez - page 1.png';
import RESUMEEZ_P2 from '../../assets/ui-ux/Resumeez - page 2.png';
import RESUMEEZ_P3 from '../../assets/ui-ux/Resumeez - page 3.png';
import RESUMEEZ_P4 from '../../assets/ui-ux/Resumeez - page 4.png';

import KOMPAS_P1 from '../../assets/ui-ux/kompas - page 1.png';
import KOMPAS_P2 from '../../assets/ui-ux/kompas - page 2.png';

import RECIPEEZ_P1 from '../../assets/ui-ux/Recipeez - page 1.png';
import RECIPEEZ_P2 from '../../assets/ui-ux/Recipeez - page 2.png';

import RAISO_IMG from '../../assets/RAISO.png';

import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsLinkedin } from 'react-icons/bs';
import {
  FaRegCheckCircle,
  FaExternalLinkAlt,
  FaDownload,
  FaExpandAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaGithub,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io';

import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RESUMEEZ_BOARDS = [
  {
    src: RESUMEEZ_P1,
    title: 'Resumeez — Overview, Problem & Preventive Solution',
    tag: 'Slide 01 / 04',
  },
  {
    src: RESUMEEZ_P2,
    title: "Resumeez — Design Decisions & Shneiderman's 8 Golden Rules",
    tag: 'Slide 02 / 04',
  },
  {
    src: RESUMEEZ_P3,
    title: 'Resumeez — Usability Testing (UAT, SUS, QA) & UX Iterations',
    tag: 'Slide 03 / 04',
  },
  {
    src: RESUMEEZ_P4,
    title: 'Resumeez at a Glance — Architecture & Metrics Bento',
    tag: 'Slide 04 / 04',
  },
];

const KOMPAS_BOARDS = [
  {
    src: KOMPAS_P1,
    title: 'Kompas.com — UX Research, 3 Personas, Sitemap & Taskflow',
    tag: 'Slide 01 / 02',
  },
  {
    src: KOMPAS_P2,
    title: 'Kompas.com — Low-Fi Wireframes, Ad Zoning & Breathable UI',
    tag: 'Slide 02 / 02',
  },
];

const RECIPEEZ_BOARDS = [
  {
    src: RECIPEEZ_P1,
    title: 'Recipeez — Competitive UX Audit, API Mapping & 5 User Flows',
    tag: 'Slide 01 / 02',
  },
  {
    src: RECIPEEZ_P2,
    title: 'Recipeez — Mobile UI Execution, 3-Tab View & 12-Week Android Build',
    tag: 'Slide 02 / 02',
  },
];

const WIZARD_STEPS = [
  { step: '01', name: 'Personal Info', state: 'done' },
  { step: '02', name: 'Work Experience', state: 'done' },
  { step: '03', name: 'Education', state: 'done' },
  { step: '04', name: 'Areas of Expertise', state: 'active' },
  { step: '05', name: 'Profile Summary', state: 'pending' },
  { step: '06', name: 'Additional Sections', state: 'pending' },
  { step: '07', name: 'Finish Up', state: 'pending' },
];

const CV_TOOLS_AND_TECHNIQUES = [
  'Figma',
  'Axure RP',
  'Wireframing',
  'Interactive Prototyping',
  'Usability Testing',
  'User Acceptance Testing (UAT)',
  'Responsive Web Design',
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Tailwind CSS',
  'Vite',
  'HTML & CSS',
  'Strapi (Headless CMS)',
  'Java',
  'Android Studio',
  'RESTful API',
  'Search Engine Optimization (SEO)',
  'Git & GitHub',
];

function UiUxPage({ onNavigateMain }) {
  const [lightbox, setLightbox] = useState({ open: false, items: [], index: 0 });
  const formRef = useRef();

  useEffect(() => {
    document.body.classList.add('uiux-mode');
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      document.body.classList.remove('uiux-mode');
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (!lightbox.open) return;
      if (e.key === 'Escape') {
        setLightbox((prev) => ({ ...prev, open: false }));
      } else if (e.key === 'ArrowRight') {
        setLightbox((prev) => ({
          ...prev,
          index: (prev.index + 1) % prev.items.length,
        }));
      } else if (e.key === 'ArrowLeft') {
        setLightbox((prev) => ({
          ...prev,
          index: (prev.index - 1 + prev.items.length) % prev.items.length,
        }));
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.open]);

  const openLightbox = (items, index) => {
    setLightbox({ open: true, items, index });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, open: false }));
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.items.length,
    }));
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.items.length) % prev.items.length,
    }));
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('service_1jjdsvk', 'template_83t6kxr', formRef.current, 'qkYHUAd9cmK7BjIFb')
      .then(
        () => {
          toast.success('Message sent successfully!', {
            position: 'top-center',
            autoClose: 3000,
          });
        },
        () => {
          toast.error('Failed to send the message. Please try again.', {
            position: 'top-center',
            autoClose: 3000,
          });
        }
      );
    e.target.reset();
  };

  return (
    <div className="uiux-page">
      {/* STICKY TOP BAR (uses <div> instead of <header> to avoid global header { height: 100vh } from header.css) */}
      <div className="uiux-topbar" role="banner">
        <div className="uiux-container uiux-topbar__inner">
          <div className="uiux-brand">
            <span className="uiux-brand__badge">UI/UX &amp; Product Design</span>
            <span className="uiux-brand__title">M. Adib Aulia Nurkhafif</span>
          </div>

          <div className="uiux-quick-jump">
            <a href="#uiux-hero">Overview</a>
            <a href="#case-resumeez">01. Resumeez</a>
            <a href="#case-kompas">02. Kompas.com</a>
            <a href="#case-recipeez">03. Recipeez</a>
            <a href="#uiux-more">99 Group &amp; RAiso</a>
            <a href="#uiux-contact">Contact</a>
          </div>

          <div className="uiux-topbar__actions">
            <button type="button" onClick={onNavigateMain} className="uiux-switch-btn">
              <AiOutlineArrowLeft /> Main Dev Portfolio
            </button>
          </div>
        </div>
      </div>

      <main className="uiux-container">
        {/* =====================================================================
            SECTION 1: BENTO HERO & DESIGNER POSITIONING (#uiux-hero)
            ===================================================================== */}
        <section id="uiux-hero" className="uiux-section uiux-section--hero">
          <div className="bento-grid">
            {/* Hero Main Card (Span 8) */}
            <article className="bento-card bento-card--soft-blue bento-span-8">
              <div>
                <span className="uiux-eyebrow">UI/UX Case Study Portfolio</span>
                <h1 className="uiux-hero-title">
                  Bridging Interactive <span>UI/UX Design</span> with Responsive{' '}
                  <span>Frontend Engineering</span>
                </h1>
                <p className="uiux-hero-lead">
                  Develops user-centric web and mobile solutions by bridging interactive UI/UX design
                  with responsive frontend engineering in cross-functional teams.
                </p>

                <div className="uiux-pill-group">
                  <span className="uiux-pill uiux-pill--orange">UI/UX &amp; Product Design</span>
                  <span className="uiux-pill">Frontend Development</span>
                  <span className="uiux-pill">Responsive Web Design</span>
                  <span className="uiux-pill">Cross-Functional Collaboration</span>
                </div>

                <div style={{ marginBottom: '1.35rem' }}>
                  <small
                    style={{
                      display: 'block',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: 'var(--uiux-text-muted)',
                      marginBottom: '0.45rem',
                    }}
                  >
                    Tools &amp; Techniques (From CV)
                  </small>
                  <div className="uiux-pill-group" style={{ marginBottom: 0 }}>
                    {CV_TOOLS_AND_TECHNIQUES.map((tool) => (
                      <span
                        key={tool}
                        className="uiux-pill"
                        style={{ padding: '0.26rem 0.68rem', fontSize: '0.75rem', background: '#fff' }}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="uiux-cta-row">
                <a href="#case-resumeez" className="uiux-btn uiux-btn--orange">
                  Explore Case Studies
                </a>
                <a href={LATEST_CV} download className="uiux-btn uiux-btn--blue">
                  <FaDownload /> Download Latest CV
                </a>
                <a href={PORTFOLIO_PDF} download className="uiux-btn uiux-btn--outline">
                  <FaDownload /> Portfolio Deck (PDF)
                </a>
              </div>
            </article>

            {/* Profile & Credentials Card (Span 4) */}
            <article className="bento-card bento-card--blue bento-span-4">
              <div className="uiux-profile-card">
                <div className="uiux-profile-avatar">
                  <img src={PROFILE_IMG} alt="M. Adib Aulia Nurkhafif" />
                </div>
                <div className="uiux-profile-meta">
                  <h3>M. Adib Aulia Nurkhafif</h3>
                  <p>Frontend Engineer Intern @ 99 Group (02/2025 – 02/2026)</p>
                  <p>B.Sc. Computer Science @ BINUS University</p>
                </div>

                <div className="uiux-profile-badges">
                  <div className="uiux-mini-stat">
                    <strong>3.60 / 4.00</strong>
                    <span>BINUS GPA (2022–2026)</span>
                  </div>
                  <div className="uiux-mini-stat">
                    <strong>1+ Year</strong>
                    <span>Frontend &amp; UI Industry Exp</span>
                  </div>
                </div>

                <div className="uiux-cta-row" style={{ justifyContent: 'center', marginTop: '0.25rem' }}>
                  <a
                    href="https://www.linkedin.com/in/m-adib-aulia-nurkhafif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uiux-pill uiux-pill--white"
                  >
                    <BsLinkedin /> LinkedIn
                  </a>
                  <a
                    href="https://github.com/1Frazel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uiux-pill uiux-pill--white"
                  >
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>
            </article>

            {/* Row 2: 4 Portfolio-Wide Case Study & Experience Pillar Cards */}
            <a href="#case-resumeez" className="bento-card bento-card--link bento-span-3">
              <div>
                <span className="uiux-eyebrow uiux-eyebrow--blue">01 • SaaS Web App</span>
                <div className="bento-metric__value" style={{ fontSize: '1.45rem' }}>
                  Resumeez
                </div>
                <div className="bento-metric__label">ATS Builder &amp; Rule-Based Evaluator</div>
              </div>
              <p className="bento-metric__desc">
                UI/UX Designer &amp; QA Lead — 7-step guided wizard, PDF.js parser, 83.4% UAT &amp; 69.83
                SUS score.
              </p>
            </a>

            <a href="#case-kompas" className="bento-card bento-card--link bento-span-3">
              <div>
                <span className="uiux-eyebrow">02 • News Portal Redesign</span>
                <div className="bento-metric__value" style={{ fontSize: '1.45rem' }}>
                  Kompas.com
                </div>
                <div className="bento-metric__label">UX Research &amp; Information Hierarchy</div>
              </div>
              <p className="bento-metric__desc">
                UI Designer &amp; UX Researcher — 3 persona interviews, consolidated sitemap &amp;
                breathable ad zoning.
              </p>
            </a>

            <a href="#case-recipeez" className="bento-card bento-card--link bento-span-3">
              <div>
                <span className="uiux-eyebrow uiux-eyebrow--blue">03 • Mobile App UI/UX</span>
                <div className="bento-metric__value" style={{ fontSize: '1.45rem' }}>
                  Recipeez
                </div>
                <div className="bento-metric__label">API Recipe Finder &amp; Meal Planner</div>
              </div>
              <p className="bento-metric__desc">
                Solo UI/UX Designer &amp; Android Dev — 5-app UX audit, progressive disclosure &amp;
                Spoonacular API build.
              </p>
            </a>

            <a href="#uiux-more" className="bento-card bento-card--orange bento-card--link bento-span-3">
              <div>
                <span
                  className="uiux-eyebrow"
                  style={{ background: 'rgba(255,255,255,0.22)', color: '#fff', borderColor: 'transparent' }}
                >
                  04 • Industry &amp; E-Commerce
                </span>
                <div className="bento-metric__value" style={{ fontSize: '1.45rem' }}>
                  99 Group &amp; RAiso
                </div>
                <div className="bento-metric__label">Production Frontend &amp; Axure RP</div>
              </div>
              <p className="bento-metric__desc">
                1-Yr Frontend Intern @ Rumah123.com (Next.js/TS) + RAiso Android stationery e-commerce
                prototype.
              </p>
            </a>
          </div>
        </section>

        {/* =====================================================================
            SECTION 2: CASE STUDY 01 — RESUMEEZ (#case-resumeez)
            ===================================================================== */}
        <section id="case-resumeez" className="uiux-section">
          <div className="bento-grid">
            {/* Case Study 01 Header Banner (Span 12) */}
            <article className="bento-card bento-card--soft-blue bento-span-12">
              <div className="case-header-card">
                <div>
                  <span className="uiux-eyebrow">PROJECT 01 | OVERVIEW &amp; WEB APP CASE STUDY</span>
                  <h2 className="case-header__title">
                    Resumeez — ATS Resume Builder &amp; Rule-Based Evaluator
                  </h2>
                  <p className="case-header__pitch">
                    Helping job seekers create structured, ATS-readable resumes through guided CV generation,
                    preventive formatting, and explainable rule-based PDF evaluation.
                  </p>
                  <div className="uiux-cta-row">
                    <a
                      href="https://portfolio-thesis.firebaseapp.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="uiux-btn uiux-btn--orange"
                    >
                      Live Web App <FaExternalLinkAlt />
                    </a>
                    <button
                      type="button"
                      onClick={() => openLightbox(RESUMEEZ_BOARDS, 0)}
                      className="uiux-btn uiux-btn--outline"
                    >
                      <FaExpandAlt /> View All 4 Presentation Boards
                    </button>
                  </div>
                </div>

                <div className="case-meta-box">
                  <span className="case-meta-box__label">PROJECT DETAILS</span>
                  <div className="case-meta-item">
                    <strong>Role:</strong> UI/UX Designer &amp; QA Lead (Team of 3)
                  </div>
                  <div className="case-meta-item">
                    <strong>Methods:</strong> R&amp;D (Hannafin &amp; Peck Model) &amp; Shneiderman&apos;s 8
                    Golden Rules
                  </div>
                  <div className="case-meta-item">
                    <strong>Stack:</strong> Figma, React, Vite, TypeScript, Tailwind CSS, PDF.js, Firebase
                  </div>
                </div>
              </div>
            </article>

            {/* The Problem (Span 5) */}
            <article className="bento-card bento-span-5">
              <div>
                <span className="uiux-eyebrow uiux-eyebrow--blue">The Problem</span>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.45rem' }}>
                  Flaws of Existing Campus CV Generators
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--uiux-text-secondary)' }}>
                  While preparing for our university internship program, we identified three critical UX and
                  structural flaws in the auto-generated campus CV system:
                </p>

                <div className="pain-point-list">
                  <div className="pain-point-bar">
                    <span className="pain-point-bar__num">1</span>
                    <span>Inefficient Spatial Layout (scattered across 5 pages)</span>
                  </div>
                  <div className="pain-point-bar">
                    <span className="pain-point-bar__num">2</span>
                    <span>Rigid Structure (lacks achievement sections)</span>
                  </div>
                  <div className="pain-point-bar">
                    <span className="pain-point-bar__num">3</span>
                    <span>Zero ATS Feedback on PDF readability</span>
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--uiux-text-muted)', marginTop: '0.9rem' }}>
                Goal: Transform a fragmented 5-page campus printout into a structured, single-page
                ATS-compliant resume.
              </p>
            </article>

            {/* The Solution (Span 7) */}
            <article className="bento-card bento-card--navy bento-span-7">
              <div>
                <span className="uiux-eyebrow uiux-eyebrow--dark">The Solution</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.35rem' }}>
                  Preventive Formatting Meets Rule-Based Scoring
                </h3>
                <p style={{ fontSize: '0.88rem' }}>
                  Instead of only grading broken resumes after the fact, Resumeez combines guided creation
                  at the source with transparent client-side PDF evaluation:
                </p>

                <div className="solution-split">
                  <div className="solution-box">
                    <h4>1. Standardized 6-Section CV Builder</h4>
                    <p>
                      Guides user content into <strong>6 consistent ATS sections</strong> across{' '}
                      <strong>2 standardized templates</strong> with a structured hierarchy, eliminating
                      scattered multi-page formatting at the source.
                    </p>
                  </div>
                  <div className="solution-box">
                    <h4>2. Automated Regex &amp; PDF.js CV Checker</h4>
                    <p>
                      Parses uploaded PDF files client-side with <strong>PDF.js</strong> and applies
                      rule-based regex checks (<strong>&ge; 5 valid words</strong> threshold) to evaluate
                      completeness across 6 standard ATS categories.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Applying Shneiderman's 8 Golden Rules & 7-Step Wizard (Span 12) */}
            <article className="bento-card bento-span-12">
              <div>
                <span className="uiux-eyebrow uiux-eyebrow--blue">PROJECT 01 | DESIGN DECISIONS</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.3rem' }}>
                  Applying Shneiderman&apos;s 8 Golden Rules: 7-Step Guided Wizard
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--uiux-text-secondary)' }}>
                  Breaking 8 complex resume entities into a <strong>7-step guided wizard</strong> reduces
                  short-term memory load, helping users focus on one logical section at a time while
                  maintaining clear progress feedback.
                </p>

                <div className="wizard-stepper">
                  {WIZARD_STEPS.map((item) => (
                    <div
                      key={item.step}
                      className={`wizard-step ${
                        item.state === 'done'
                          ? 'wizard-step--done'
                          : item.state === 'active'
                          ? 'wizard-step--active'
                          : ''
                      }`}
                    >
                      <span className="wizard-step__badge">
                        {item.state === 'done' ? '✓' : item.step}
                      </span>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Key Decision #1 & #2 + Universal Usability (Span 6 + Span 6) */}
            <article className="bento-card bento-card--blue bento-span-6">
              <div>
                <span
                  className="uiux-eyebrow"
                  style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderColor: 'transparent' }}
                >
                  KEY DECISION #1 &amp; UNIVERSAL USABILITY
                </span>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  Split-Screen Builder, Error Prevention &amp; Bilingual UI
                </h3>
                <ul className="uiux-bullet-list">
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" style={{ color: '#FFE0C2' }} />
                    <span>
                      <strong>Real-Time JSON-to-DOM Live Preview:</strong> Instant side-by-side CV rendering
                      as users type.
                    </span>
                  </li>
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" style={{ color: '#FFE0C2' }} />
                    <span>
                      <strong>Proactive Mandatory Field &amp; State-Lock Validation:</strong> Blocks
                      incomplete steps and non-PDF uploads (<em>&quot;Only valid PDF files are allowed&quot;</em>).
                    </span>
                  </li>
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" style={{ color: '#FFE0C2' }} />
                    <span>
                      <strong>Bilingual Support Toggle (Indonesia | English):</strong> Instant ID/EN
                      localization toggle and adaptive desktop-to-mobile layouts.
                    </span>
                  </li>
                </ul>
              </div>
            </article>

            <article className="bento-card bento-card--soft-orange bento-span-6">
              <div>
                <span className="uiux-eyebrow">KEY DECISION #2</span>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>
                  Explainable ATS Checker UI
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--uiux-text-secondary)' }}>
                  Rather than giving an opaque percentage score, the evaluator explains section-by-section
                  readability using 3 clear diagnostic states:
                </p>

                <div className="ats-states-list">
                  <div className="ats-state-pill">
                    <span>
                      <i className="ats-dot ats-dot--green" />
                      <strong>Complete (&ge; 5 valid words)</strong>
                    </span>
                    <small style={{ color: '#16A34A', fontWeight: 600 }}>Section Verified ✓</small>
                  </div>
                  <div className="ats-state-pill">
                    <span>
                      <i className="ats-dot ats-dot--orange" />
                      <strong>Header-Only Warning (&lt; 5 words)</strong>
                    </span>
                    <small style={{ color: '#D97706', fontWeight: 600 }}>Content Not Detected !</small>
                  </div>
                  <div className="ats-state-pill">
                    <span>
                      <i className="ats-dot ats-dot--red" />
                      <strong>Missing Section</strong>
                    </span>
                    <small style={{ color: '#DC2626', fontWeight: 600 }}>Section Not Found ✕</small>
                  </div>
                </div>
              </div>
            </article>

            {/* Resumeez Validation Metrics Trio (Matching Slide 4 of Portfolio Deck) */}
            <article className="bento-card bento-span-4">
              <div>
                <span className="uiux-eyebrow uiux-eyebrow--blue">PROJECT 01 | VALIDATED IMPACT</span>
                <div className="bento-metric__value">
                  83.4% <span className="bento-metric__badge">UAT</span>
                </div>
                <div className="bento-metric__label">User Acceptance Testing</div>
              </div>
              <p className="bento-metric__desc">
                Of 30 respondents agreed Resumeez helped them build structured ATS-compliant CVs.
              </p>
            </article>

            <article className="bento-card bento-span-4">
              <div>
                <span className="uiux-eyebrow uiux-eyebrow--blue">USABILITY BENCHMARK</span>
                <div className="bento-metric__value">
                  69.83 <span className="bento-metric__badge">Grade C+</span>
                </div>
                <div className="bento-metric__label">System Usability Scale (SUS)</div>
              </div>
              <p className="bento-metric__desc">
                Scored above the global benchmark average (68.0), rated Marginal High / Good.
              </p>
            </article>

            <article className="bento-card bento-card--orange bento-span-4">
              <div>
                <span
                  className="uiux-eyebrow"
                  style={{ background: 'rgba(255,255,255,0.22)', color: '#fff', borderColor: 'transparent' }}
                >
                  BLACKBOX QA RELIABILITY
                </span>
                <div className="bento-metric__value">18 / 18</div>
                <div className="bento-metric__label">100% QA Pass Rate</div>
              </div>
              <p className="bento-metric__desc">
                100% pass rate across XSS sanitization, 10k-char stress tests, and 5MB limits.
              </p>
            </article>

            {/* Testing & Iteration (Span 12: 3 UX Iterations) */}
            <article className="bento-card bento-span-12">
              <div>
                <span className="uiux-eyebrow">PROJECT 01 | TESTING &amp; ITERATION</span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                  What Testing Revealed: Turning 30% User Friction into Actionable UX Iterations
                </h3>

                <div className="bento-grid" style={{ gap: '1rem' }}>
                  <div className="bento-card bento-card--soft-blue bento-span-4" style={{ padding: '1.25rem' }}>
                    <span className="uiux-eyebrow uiux-eyebrow--blue">Iteration 01</span>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>
                      Fixing Accidental Double Downloads
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: 'var(--uiux-text-secondary)' }}>
                      Decoupled the resume preview state from the auto-download trigger, providing explicit{' '}
                      <strong>Edit</strong>, <strong>Download</strong>, and <strong>Delete</strong> action
                      buttons on saved template cards.
                    </p>
                  </div>

                  <div className="bento-card bento-card--soft-orange bento-span-4" style={{ padding: '1.25rem' }}>
                    <span className="uiux-eyebrow">Iteration 02</span>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>
                      Lexical Language Barrier
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: 'var(--uiux-text-secondary)' }}>
                      Added English ATS standard onboarding tooltips &amp; warning banners explaining that
                      multinational ATS NLP engines are trained on English for maximum parsing accuracy.
                    </p>
                  </div>

                  <div className="bento-card bento-card--soft-blue bento-span-4" style={{ padding: '1.25rem' }}>
                    <span className="uiux-eyebrow uiux-eyebrow--blue">Iteration 03</span>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.35rem' }}>
                      Browser Autofill &amp; Input Ergonomics
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: 'var(--uiux-text-secondary)' }}>
                      Replaced error-prone manual date and city text inputs with structured{' '}
                      <strong>Dropdown Selectors</strong> and Month/Year pickers.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Resumeez Case Study Boards Gallery (Span 12) */}
            <article className="bento-card bento-span-12">
              <div>
                <div className="uiux-section__header" style={{ marginBottom: '0.5rem' }}>
                  <div>
                    <span className="uiux-eyebrow uiux-eyebrow--blue">Case Study Visual Boards</span>
                    <h3 style={{ fontSize: '1.2rem' }}>
                      Resumeez — Presentation Deck &amp; Bento Summary (Click to Enlarge)
                    </h3>
                  </div>
                </div>

                <div className="board-gallery-grid">
                  {RESUMEEZ_BOARDS.map((board, idx) => (
                    <div
                      key={board.title}
                      className="board-card"
                      onClick={() => openLightbox(RESUMEEZ_BOARDS, idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && openLightbox(RESUMEEZ_BOARDS, idx)}
                    >
                      <div className="board-card__img-wrap">
                        <img src={board.src} alt={board.title} loading="lazy" />
                        <span className="board-card__zoom-badge">
                          <FaExpandAlt /> Click to Zoom
                        </span>
                      </div>
                      <div className="board-card__caption">
                        <strong>{board.title}</strong>
                        <span>{board.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* =====================================================================
            SECTION 3: CASE STUDY 02 — KOMPAS.COM REDESIGN (#case-kompas)
            ===================================================================== */}
        <section id="case-kompas" className="uiux-section">
          <div className="bento-grid">
            {/* Case Study 02 Header Banner (Span 12) */}
            <article className="bento-card bento-card--soft-orange bento-span-12">
              <div className="case-header-card">
                <div>
                  <span className="uiux-eyebrow">PROJECT 02 | UX RESEARCH &amp; NEWS PORTAL REDESIGN</span>
                  <h2 className="case-header__title">
                    Kompas.com — UX Research &amp; News Portal Redesign
                  </h2>
                  <p className="case-header__pitch">
                    Decluttering Indonesia&apos;s leading news portal by balancing commercial ad slots with a
                    calm, ergonomic reading flow and restructured information hierarchy.
                  </p>
                  <div className="uiux-cta-row">
                    <button
                      type="button"
                      onClick={() => openLightbox(KOMPAS_BOARDS, 0)}
                      className="uiux-btn uiux-btn--orange"
                    >
                      <FaExpandAlt /> View Full UX Research &amp; Redesign Boards
                    </button>
                  </div>
                </div>

                <div className="case-meta-box">
                  <span className="case-meta-box__label">PROJECT DETAILS</span>
                  <div className="case-meta-item">
                    <strong>Role:</strong> UI Designer &amp; UX Researcher (Team of 5)
                  </div>
                  <div className="case-meta-item">
                    <strong>Methods:</strong> Onsite User Interviews, Persona Mapping, Sitemap, Taskflow,
                    Low-Fi Sketching
                  </div>
                  <div className="case-meta-item">
                    <strong>Stack:</strong> Figma, Draw.io, Hand-Sketching Wireframe
                  </div>
                </div>
              </div>
            </article>

            {/* User Research: 3 Personas & Pain Points (Span 5) */}
            <article className="bento-card bento-span-5">
              <div>
                <span className="uiux-eyebrow">User Research (3 Personas)</span>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.45rem' }}>
                  Uncovering the &quot;TikTok/IG-to-Kompas&quot; Habit
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--uiux-text-secondary)' }}>
                  Onsite interviews with <strong>Janice (20, Student)</strong>,{' '}
                  <strong>Aisha (31, Lecturer)</strong>, and <strong>Anton (39, Shopkeeper)</strong>{' '}
                  revealed that users discover news on social media and visit Kompas to verify facts, but
                  face 3 major pain points:
                </p>

                <div className="pain-point-list">
                  <div className="pain-point-bar pain-point-bar--orange">
                    <span className="pain-point-bar__num">1</span>
                    <span>Intrusive Ad Clutter disrupting article body</span>
                  </div>
                  <div className="pain-point-bar pain-point-bar--orange">
                    <span className="pain-point-bar__num">2</span>
                    <span>Irrelevant Photos &amp; visual noise</span>
                  </div>
                  <div className="pain-point-bar pain-point-bar--orange">
                    <span className="pain-point-bar__num">3</span>
                    <span>Reading Exhaustion from cramped hierarchy</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Core Challenge + Sitemap & Taskflow (Span 7) */}
            <article className="bento-card bento-card--navy bento-span-7">
              <div>
                <span className="uiux-eyebrow uiux-eyebrow--dark">
                  Core Challenge: Ergonomics + Monetization
                </span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>
                  Restructuring Information Hierarchy Without Removing Commercial Ads
                </h3>
                <p style={{ fontSize: '0.88rem' }}>
                  Removing advertisements completely is unrealistic for a media company. Our goal was to
                  redesign the information architecture and whitespace distribution so readers enjoy a calm,
                  structured reading flow while preserving commercial ad inventory.
                </p>

                <div className="solution-split">
                  <div className="solution-box">
                    <h4>Category Sitemap Consolidation</h4>
                    <p>
                      Grouped fragmented topics (<strong>Lifestyle, Health, Food, and Education</strong>)
                      cleanly within the primary navigation bar to reduce cognitive clutter.
                    </p>
                  </div>
                  <div className="solution-box">
                    <h4>Streamlined Reader Taskflow</h4>
                    <p>
                      Separated core article reading and search flows from login-gated comments and
                      subscriptions so casual readers face zero friction.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Key UI Decisions (3 × Span 4 Cards) */}
            <article className="bento-card bento-span-4">
              <div>
                <span className="uiux-eyebrow uiux-eyebrow--blue">Low-Fi Wireframes &amp; Ad Zoning</span>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                  Utility Header &amp; Isolated Ad Slots
                </h3>
                <ul className="uiux-bullet-list">
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" />
                    <span>
                      <strong>Utility Header:</strong> Integrated Dark/Light Mode toggle, Trending Word
                      ticker, Subscribe CTA, and Search Bar.
                    </span>
                  </li>
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" />
                    <span>
                      <strong>Modular Grid:</strong> Structured Headline, Popular/Relevant News &amp; Video
                      Carousels.
                    </span>
                  </li>
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" />
                    <span>
                      <strong>Isolated Ads:</strong> Confined strictly to top banners and sidebars.
                    </span>
                  </li>
                </ul>
              </div>
            </article>

            <article className="bento-card bento-card--blue bento-span-4">
              <div>
                <span
                  className="uiux-eyebrow"
                  style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderColor: 'transparent' }}
                >
                  KEY DECISION #1
                </span>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>Breathable Homepage</h3>
                <ul className="uiux-bullet-list">
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" style={{ color: '#FFE0C2' }} />
                    <span>
                      <strong>Extra Whitespace:</strong> Reduced visual clutter across news cards.
                    </span>
                  </li>
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" style={{ color: '#FFE0C2' }} />
                    <span>
                      <strong>Manageable Ad Slots:</strong> Strictly bounded <code>1140&times;200</code> top
                      banner &amp; <code>260&times;150</code> sidebar ads.
                    </span>
                  </li>
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" style={{ color: '#FFE0C2' }} />
                    <span>
                      <strong>Clear Hierarchy:</strong> Prioritized main breaking headlines.
                    </span>
                  </li>
                </ul>
              </div>
            </article>

            <article className="bento-card bento-span-4">
              <div>
                <span className="uiux-eyebrow">KEY DECISION #2 &amp; IMPACT</span>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                  News Detail &amp; User Page
                </h3>
                <ul className="uiux-bullet-list">
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" />
                    <span>
                      <strong>Top-to-Bottom Flow:</strong> Reorganized News Detail Page with generous
                      whitespace to eliminate reading exhaustion.
                    </span>
                  </li>
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" />
                    <span>
                      <strong>Desktop User Page:</strong> Clean profile, comment history &amp; subscription
                      view.
                    </span>
                  </li>
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" />
                    <span>
                      <strong>Impact:</strong> Translated 3 persona interviews into an ergonomic layout
                      within a 5-person design team.
                    </span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Kompas Visual Boards Gallery (Span 12) */}
            <article className="bento-card bento-span-12">
              <div>
                <span className="uiux-eyebrow">Case Study Visual Boards</span>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  Kompas.com — Research, Wireframes &amp; High-Fidelity Redesign (Click to Enlarge)
                </h3>

                <div className="board-gallery-grid">
                  {KOMPAS_BOARDS.map((board, idx) => (
                    <div
                      key={board.title}
                      className="board-card"
                      onClick={() => openLightbox(KOMPAS_BOARDS, idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && openLightbox(KOMPAS_BOARDS, idx)}
                    >
                      <div className="board-card__img-wrap">
                        <img src={board.src} alt={board.title} loading="lazy" />
                        <span className="board-card__zoom-badge">
                          <FaExpandAlt /> Click to Zoom
                        </span>
                      </div>
                      <div className="board-card__caption">
                        <strong>{board.title}</strong>
                        <span>{board.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* =====================================================================
            SECTION 4: CASE STUDY 03 — RECIPEEZ (#case-recipeez)
            ===================================================================== */}
        <section id="case-recipeez" className="uiux-section">
          <div className="bento-grid">
            {/* Case Study 03 Header Banner (Span 12) */}
            <article className="bento-card bento-card--soft-blue bento-span-12">
              <div className="case-header-card">
                <div>
                  <span className="uiux-eyebrow uiux-eyebrow--blue">
                    PROJECT 03 | MOBILE UI/UX &amp; ANDROID EXECUTION
                  </span>
                  <h2 className="case-header__title">
                    Recipeez — API-Driven Recipe Finder &amp; Smart Meal Planner
                  </h2>
                  <p className="case-header__pitch">
                    Simplifying daily cooking decisions by transforming complex Spoonacular API nutritional
                    and ingredient payloads into an intuitive, scannable Android mobile experience.
                  </p>
                  <div className="uiux-cta-row">
                    <a
                      href="https://github.com/1Frazel/Recipeez/releases/tag/v0.0.1-alpha"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="uiux-btn uiux-btn--orange"
                    >
                      Early Access App (APK) <FaExternalLinkAlt />
                    </a>
                    <button
                      type="button"
                      onClick={() => openLightbox(RECIPEEZ_BOARDS, 0)}
                      className="uiux-btn uiux-btn--outline"
                    >
                      <FaExpandAlt /> View Full Mobile UI Boards
                    </button>
                  </div>
                </div>

                <div className="case-meta-box">
                  <span className="case-meta-box__label">PROJECT DETAILS</span>
                  <div className="case-meta-item">
                    <strong>Role:</strong> Solo UI/UX Designer &amp; Android Developer
                  </div>
                  <div className="case-meta-item">
                    <strong>Methods:</strong> Competitive Benchmarking, IA Flowcharts, 5-Stage Waterfall
                    SDLC
                  </div>
                  <div className="case-meta-item">
                    <strong>Stack:</strong> Figma, Java, XML, Android Studio, Spoonacular API, Retrofit,
                    Glide, SQLite
                  </div>
                </div>
              </div>
            </article>

            {/* Competitive UX Audit (Span 5) */}
            <article className="bento-card bento-span-5">
              <div>
                <span className="uiux-eyebrow uiux-eyebrow--blue">Competitive UX Audit &amp; API Mapping</span>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.45rem' }}>
                  Auditing 5 Market Leaders to Structure Spoonacular Data
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--uiux-text-secondary)' }}>
                  Audited <strong>Yummly, Mealime, Paprika, Whisk, and CookBook</strong> to translate dense
                  REST API parameters into 3 core UX pillars:
                </p>

                <div className="pain-point-list">
                  <div className="pain-point-bar">
                    <span className="pain-point-bar__num">1</span>
                    <span>Multi-Parameter Filtering (Calories, Macros, 14 Cuisines, 7 Diets)</span>
                  </div>
                  <div className="pain-point-bar">
                    <span className="pain-point-bar__num">2</span>
                    <span>Tabbed Hierarchy to prevent mobile scroll fatigue</span>
                  </div>
                  <div className="pain-point-bar">
                    <span className="pain-point-bar__num">3</span>
                    <span>Fridge-First Ingredient Search for home cooks</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Core Challenge & 5 User Flows (Span 7) */}
            <article className="bento-card bento-card--navy bento-span-7">
              <div>
                <span className="uiux-eyebrow uiux-eyebrow--dark">
                  Core Challenge: Taming Data-Heavy API Responses on Mobile
                </span>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>
                  Progressive Disclosure Across 5 Core User Flows
                </h3>
                <p style={{ fontSize: '0.88rem' }}>
                  Used progressive disclosure — <strong>2-column visual grids, modal bottom sheets, and
                  segmented tabs</strong> — to keep dense nutritional breakdowns and cooking instructions
                  scannable on small screens.
                </p>

                <div className="solution-split">
                  <div className="solution-box">
                    <h4>Dual Search &amp; Filter Bottom Sheet</h4>
                    <p>
                      Branches <strong>Dish Name Search</strong> vs.{' '}
                      <strong>Comma-Separated Ingredient Search</strong> cleanly into a unified{' '}
                      <code>filter_bottom_sheet</code> with quick Cuisine &amp; Diet chips.
                    </p>
                  </div>
                  <div className="solution-box">
                    <h4>Smart Meal Planner &amp; Cart</h4>
                    <p>
                      Supports calorie-based <strong>Surprise Meal Planning (3x daily)</strong> and manual
                      meal slots directly linked to the <strong>Ingredients Shopping Cart</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Key Mobile Decisions & Engineering Execution (3 × Span 4) */}
            <article className="bento-card bento-span-4">
              <div>
                <span className="uiux-eyebrow">KEY DECISION #1</span>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                  Homepage &amp; Recipe Browser
                </h3>
                <ul className="uiux-bullet-list">
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" />
                    <span>
                      <strong>Visual 2-Column Grid:</strong> High-contrast dish cards with one-tap{' '}
                      <strong>Save</strong> &amp; <strong>Cart</strong> actions.
                    </span>
                  </li>
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" />
                    <span>
                      <strong>Dual Search Toggle:</strong> Switch seamlessly between recipe names or
                      available fridge ingredients.
                    </span>
                  </li>
                </ul>
              </div>
            </article>

            <article className="bento-card bento-card--blue bento-span-4">
              <div>
                <span
                  className="uiux-eyebrow"
                  style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderColor: 'transparent' }}
                >
                  KEY DECISION #2
                </span>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                  Segmented Details &amp; Cookbook
                </h3>
                <ul className="uiux-bullet-list">
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" style={{ color: '#FFE0C2' }} />
                    <span>
                      <strong>Eliminating Infinite Scroll:</strong> 3-tab view (
                      <em>Overview, Ingredients, Directions</em>) keeps measurements accessible while
                      cooking.
                    </span>
                  </li>
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" style={{ color: '#FFE0C2' }} />
                    <span>
                      <strong>Personalized Cookbook:</strong> Groups saved dishes into{' '}
                      <em>Breakfast, Lunch, Dinner &amp; Meal Plan</em> across a 5-tab bottom nav.
                    </span>
                  </li>
                </ul>
              </div>
            </article>

            <article className="bento-card bento-span-4">
              <div>
                <span className="uiux-eyebrow uiux-eyebrow--blue">ENGINEERING EXECUTION</span>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>
                  12-Week Solo Android Build
                </h3>
                <ul className="uiux-bullet-list">
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" />
                    <span>
                      <strong>Async Pipeline:</strong> Integrated <strong>Retrofit</strong> for REST JSON
                      parsing and <strong>Glide</strong> for smooth <code>RecyclerView</code> pagination.
                    </span>
                  </li>
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" />
                    <span>
                      <strong>Offline &amp; Edge Cases:</strong> Built <strong>SQLite / Room</strong>{' '}
                      schemas for saved recipes and handled empty/error API states.
                    </span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Recipeez Visual Boards Gallery (Span 12) */}
            <article className="bento-card bento-span-12">
              <div>
                <span className="uiux-eyebrow uiux-eyebrow--blue">Case Study Visual Boards</span>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  Recipeez — UX Benchmarking, Flowcharts &amp; Android UI Screens (Click to Enlarge)
                </h3>

                <div className="board-gallery-grid">
                  {RECIPEEZ_BOARDS.map((board, idx) => (
                    <div
                      key={board.title}
                      className="board-card"
                      onClick={() => openLightbox(RECIPEEZ_BOARDS, idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && openLightbox(RECIPEEZ_BOARDS, idx)}
                    >
                      <div className="board-card__img-wrap">
                        <img src={board.src} alt={board.title} loading="lazy" />
                        <span className="board-card__zoom-badge">
                          <FaExpandAlt /> Click to Zoom
                        </span>
                      </div>
                      <div className="board-card__caption">
                        <strong>{board.title}</strong>
                        <span>{board.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* =====================================================================
            SECTION 5: INDUSTRY EXPERIENCE & ADDITIONAL UI/UX WORK (#uiux-more)
            ===================================================================== */}
        <section id="uiux-more" className="uiux-section">
          <div className="uiux-section__header">
            <div>
              <span className="uiux-eyebrow">Industry &amp; Mobile Prototyping</span>
              <h2 className="uiux-section__title">
                Additional Product Design &amp; Frontend Engineering Work
              </h2>
            </div>
          </div>

          <div className="bento-grid">
            {/* 99 Group Frontend Engineer Intern (Span 7) */}
            <article className="bento-card bento-card--navy bento-span-7">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <span className="uiux-eyebrow uiux-eyebrow--dark">
                    PROFESSIONAL EXPERIENCE | 02/2025 – 02/2026
                  </span>
                  <span className="uiux-pill uiux-pill--white">React • Next.js • TypeScript • Strapi CMS</span>
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.45rem' }}>
                  Frontend Engineer Intern — 99 Group (Rumah123.com)
                </h3>
                <p style={{ fontSize: '0.88rem', marginBottom: '0.8rem' }}>
                  Operated across Growth, Conversion, and Consumer Agile Scrum teams to engineer responsive,
                  user-centric property discovery interfaces for one of Southeast Asia&apos;s leading real
                  estate marketplaces:
                </p>

                <ul className="uiux-bullet-list">
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" />
                    <span>
                      Engineered cross-device responsive web interfaces (including scalable{' '}
                      <code>HeaderV2</code> navigation) and a dynamic <strong>Property Review Module</strong>{' '}
                      integrated with a <strong>Strapi headless CMS</strong>.
                    </span>
                  </li>
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" />
                    <span>
                      Developed the <strong>New Search Result Page (NSRP)</strong>, advanced filtering
                      logic, debounced search bar ergonomics, and <strong>Nearby Point of Interest (POI)</strong>{' '}
                      components to streamline property discovery.
                    </span>
                  </li>
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" />
                    <span>
                      Resolved <strong>120+ sprint &amp; UI bug tickets</strong>, implemented Segment SDK
                      event tracking, and optimized SEO metadata/breadcrumb schemas.
                    </span>
                  </li>
                </ul>
              </div>
            </article>

            {/* RAiso Stationery E-Commerce App (Span 5) */}
            <article className="bento-card bento-card--soft-orange bento-span-5">
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <span className="uiux-eyebrow">ACADEMIC UI/UX PROJECT</span>
                  <span className="uiux-pill uiux-pill--orange">Axure RP • Java • Android Studio</span>
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.45rem' }}>
                  RAiso — Stationery E-Commerce Mobile App
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--uiux-text-secondary)', marginBottom: '0.85rem' }}>
                  Designed and developed an end-to-end Android e-commerce application for stationery
                  products, translating high-fidelity interactive prototypes in <strong>Axure RP</strong>{' '}
                  into functional mobile views.
                </p>

                <div
                  style={{
                    borderRadius: '0.85rem',
                    overflow: 'hidden',
                    border: '1px solid var(--uiux-orange-border)',
                    maxHeight: '165px',
                    marginBottom: '0.75rem',
                  }}
                >
                  <img
                    src={RAISO_IMG}
                    alt="RAiso Stationery E-Commerce App"
                    style={{ width: '100%', height: '165px', objectFit: 'cover' }}
                  />
                </div>

                <ul className="uiux-bullet-list">
                  <li>
                    <FaRegCheckCircle className="uiux-bullet-icon" />
                    <span>Product catalog browsing, cart management, and multi-step checkout flows.</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        {/* =====================================================================
            SECTION 6: BENTO CONTACT & FOOTER (#uiux-contact)
            ===================================================================== */}
        <section id="uiux-contact" className="uiux-section">
          <div className="uiux-section__header">
            <div>
              <span className="uiux-eyebrow">Let&apos;s Collaborate</span>
              <h2 className="uiux-section__title">Get In Touch for UI/UX &amp; Frontend Roles</h2>
            </div>
          </div>

          <div className="bento-grid">
            {/* Direct Contact Channels (Span 5) */}
            <article className="bento-card bento-card--blue bento-span-5">
              <div>
                <span
                  className="uiux-eyebrow"
                  style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', borderColor: 'transparent' }}
                >
                  Direct Channels
                </span>
                <h3 style={{ fontSize: '1.35rem', marginBottom: '0.4rem' }}>
                  Open for UI/UX Designer, Product Designer &amp; Frontend Engineer Opportunities
                </h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                  Based in Kab. Batang, Indonesia. Feel free to reach out via Email, WhatsApp, or LinkedIn!
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <a
                    href="mailto:adibnk11@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ats-state-pill"
                    style={{ textDecoration: 'none' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <MdEmail style={{ fontSize: '1.25rem', color: 'var(--uiux-orange)' }} />
                      <strong>adibnk11@gmail.com</strong>
                    </span>
                    <small style={{ color: 'var(--uiux-blue-deep)', fontWeight: 600 }}>Send Email ↗</small>
                  </a>

                  <a
                    href="https://wa.me/6282241033809"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ats-state-pill"
                    style={{ textDecoration: 'none' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <IoLogoWhatsapp style={{ fontSize: '1.25rem', color: '#16A34A' }} />
                      <strong>+62 822-4103-3809</strong>
                    </span>
                    <small style={{ color: 'var(--uiux-blue-deep)', fontWeight: 600 }}>WhatsApp ↗</small>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/m-adib-aulia-nurkhafif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ats-state-pill"
                    style={{ textDecoration: 'none' }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <BsLinkedin style={{ fontSize: '1.15rem', color: 'var(--uiux-blue-deep)' }} />
                      <strong>linkedin.com/in/m-adib-aulia-nurkhafif</strong>
                    </span>
                    <small style={{ color: 'var(--uiux-blue-deep)', fontWeight: 600 }}>Connect ↗</small>
                  </a>
                </div>
              </div>
            </article>

            {/* EmailJS Contact Form (Span 7) */}
            <article className="bento-card bento-span-7">
              <form ref={formRef} onSubmit={handleSendEmail} className="uiux-contact-form">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Send a Direct Message</h3>
                <label htmlFor="uiux-name">Full Name</label>
                <input
                  id="uiux-name"
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  required
                />
                <label htmlFor="uiux-email">Email Address</label>
                <input
                  id="uiux-email"
                  type="email"
                  name="email"
                  placeholder="your.email@company.com"
                  required
                />
                <label htmlFor="uiux-message">Message</label>
                <textarea
                  id="uiux-message"
                  name="message"
                  rows="5"
                  placeholder="Tell me about your team, project, or role..."
                  required
                />
                <div>
                  <button type="submit" className="uiux-btn uiux-btn--orange">
                    Send Message
                  </button>
                </div>
              </form>
              <ToastContainer />
            </article>
          </div>
        </section>
      </main>

      {/* FOOTER (uses <div> instead of <footer> to avoid global footer styles from footer.css) */}
      <div className="uiux-footer" role="contentinfo">
        <div className="uiux-container">
          <p>
            <strong>M. Adib Aulia Nurkhafif</strong> — UI/UX &amp; Product Design Portfolio (
            <code>/ui-ux</code>)
          </p>
          <p style={{ marginTop: '0.35rem' }}>
            &copy; {new Date().getFullYear()} Adib Aulia. Built with React &amp; Vite.
          </p>
        </div>
      </div>

      {/* LIGHTBOX MODAL FOR FULL-SCREEN CASE STUDY BOARDS */}
      {lightbox.open && lightbox.items.length > 0 && (
        <div className="uiux-lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="uiux-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <div className="uiux-lightbox__header">
              <h4>
                {lightbox.items[lightbox.index].title} ({lightbox.items[lightbox.index].tag})
              </h4>
              <div className="uiux-lightbox__controls">
                {lightbox.items.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="uiux-lightbox__btn"
                      onClick={prevSlide}
                      title="Previous Slide"
                      aria-label="Previous Slide"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      type="button"
                      className="uiux-lightbox__btn"
                      onClick={nextSlide}
                      title="Next Slide"
                      aria-label="Next Slide"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  className="uiux-lightbox__btn"
                  onClick={closeLightbox}
                  title="Close Lightbox"
                  aria-label="Close Lightbox"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="uiux-lightbox__body">
              <img
                src={lightbox.items[lightbox.index].src}
                alt={lightbox.items[lightbox.index].title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UiUxPage;
