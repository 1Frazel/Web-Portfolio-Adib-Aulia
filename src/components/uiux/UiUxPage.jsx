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
import { BsLinkedin, BsSunFill, BsMoonStarsFill } from 'react-icons/bs';
import {
  FaExternalLinkAlt,
  FaDownload,
  FaExpandAlt,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaGithub,
  FaFigma,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoLogoWhatsapp } from 'react-icons/io';

import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trackEvent, useSectionReadingTracker } from '../../utils/analytics';

const RESUMEEZ_BOARDS = [
  {
    src: RESUMEEZ_P1,
    title: 'Resumeez — Overview, Problem & Preventive Solution',
    tag: '01 / 04',
  },
  {
    src: RESUMEEZ_P2,
    title: "Resumeez — Design Decisions & Shneiderman's 8 Golden Rules",
    tag: '02 / 04',
  },
  {
    src: RESUMEEZ_P3,
    title: 'Resumeez — Testing (UAT, SUS, Blackbox QA) & UX Iterations',
    tag: '03 / 04',
  },
  {
    src: RESUMEEZ_P4,
    title: 'Resumeez at a Glance — Architecture & Metrics Summary',
    tag: '04 / 04',
  },
];

const KOMPAS_BOARDS = [
  {
    src: KOMPAS_P1,
    title: 'Kompas.com — Research & Discovery (3 Personas, Sitemap & Taskflow)',
    tag: '01 / 02',
  },
  {
    src: KOMPAS_P2,
    title: 'Kompas.com — UI Redesign & Architecture (Wireframes, Homepage & News Detail)',
    tag: '02 / 02',
  },
];

const RECIPEEZ_BOARDS = [
  {
    src: RECIPEEZ_P1,
    title: 'Recipeez — Discovery & Architecture (Competitive UX Audit & 5 Core User Flows)',
    tag: '01 / 02',
  },
  {
    src: RECIPEEZ_P2,
    title: 'Recipeez — Mobile UI & Execution (Homepage, 3-Tab Recipe View & 12-Week Android Build)',
    tag: '02 / 02',
  },
];

const RAISO_BOARDS = [
  {
    src: RAISO_IMG,
    title: 'RAiso — Stationery E-Commerce App (Java, Android Studio, Axure RP)',
    tag: '01 / 01',
  },
];

const WIZARD_STEPS = [
  { step: '01', name: 'Personal Information', active: false },
  { step: '02', name: 'Work Experience', active: false },
  { step: '03', name: 'Education', active: false },
  { step: '04', name: 'Areas of Expertise', active: true },
  { step: '05', name: 'Profile Summary', active: false },
  { step: '06', name: 'Additional Sections', active: false },
  { step: '07', name: 'Finish Up', active: false },
];

const KOMPAS_FIGMA_PROTO =
  'https://www.figma.com/proto/O7oRbA6cNiRxGkXuKVX9bB/Kompas-Wireframe-by-Adib-Aulia?node-id=1-2&p=f&t=OcjlrlyIwd5DUlij-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1';

const RECIPEEZ_FIGMA_PROTO =
  'https://www.figma.com/proto/k3CICS4F5GYnR0f3elBDGt/Recipeez-UI-Mockup?node-id=37-2&p=f&t=hcedQNNFzDes10JI-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A4';

function UiUxPage({ onNavigateMain }) {
  const [lightbox, setLightbox] = useState({
    open: false,
    items: [],
    index: 0,
    project: '',
  });
  const lightboxSessionRef = useRef({
    openedAt: 0,
    viewedIndices: new Set(),
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem('uiux-theme') === 'dark';
    } catch {
      return false;
    }
  });
  const formRef = useRef();

  // Case Study Reading & Dwell Trackers
  useSectionReadingTracker({
    sectionId: 'case-resumeez',
    sectionName: 'Resumeez',
    eventPrefix: 'case_study',
    milestones: [15, 30, 60],
    extraProps: { project: 'Resumeez' },
  });

  useSectionReadingTracker({
    sectionId: 'case-kompas',
    sectionName: 'Kompas.com',
    eventPrefix: 'case_study',
    milestones: [15, 30, 60],
    extraProps: { project: 'Kompas.com' },
  });

  useSectionReadingTracker({
    sectionId: 'case-recipeez',
    sectionName: 'Recipeez',
    eventPrefix: 'case_study',
    milestones: [15, 30, 60],
    extraProps: { project: 'Recipeez' },
  });

  useSectionReadingTracker({
    sectionId: 'uiux-more',
    sectionName: '99 Group & RAiso',
    eventPrefix: 'case_study',
    milestones: [15, 30, 60],
    extraProps: { project: '99 Group & RAiso' },
  });

  useSectionReadingTracker({
    sectionId: 'uiux-contact',
    sectionName: 'UI/UX Contact',
    eventPrefix: 'section',
    milestones: [10, 30],
  });

  // Track when the user scrolls to Resumeez's Testing, Metrics & Iteration Bento Grid
  useEffect(() => {
    const metricsEl = document.getElementById('resumeez-metrics-bento');
    if (!metricsEl || typeof IntersectionObserver === 'undefined') return;

    let hasFired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFired) {
            hasFired = true;
            trackEvent('case_study_metrics_viewed', {
              project: 'Resumeez',
              subsection: 'Testing, Metrics & Iteration',
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(metricsEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.add('uiux-mode');
    window.scrollTo({ top: 0, behavior: 'instant' });
    return () => {
      document.body.classList.remove('uiux-mode');
      document.body.classList.remove('uiux-dark');
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('uiux-dark', isDarkMode);
    try {
      localStorage.setItem('uiux-theme', isDarkMode ? 'dark' : 'light');
    } catch {
      // ignore storage errors
    }
  }, [isDarkMode]);

  const recordLightboxClose = (currentLightbox) => {
    if (!currentLightbox.open || currentLightbox.items.length === 0) return;
    const dwellSeconds = Math.max(
      1,
      Math.round((Date.now() - lightboxSessionRef.current.openedAt) / 1000)
    );
    const activeBoard = currentLightbox.items[currentLightbox.index];
    trackEvent('lightbox_close', {
      project: currentLightbox.project,
      last_board_title: activeBoard?.title,
      last_board_tag: activeBoard?.tag,
      dwell_seconds: dwellSeconds,
      slides_viewed_count: lightboxSessionRef.current.viewedIndices.size,
    });
  };

  useEffect(() => {
    function handleKeyDown(e) {
      if (!lightbox.open) return;
      if (e.key === 'Escape') {
        recordLightboxClose(lightbox);
        setLightbox((prev) => ({ ...prev, open: false }));
      } else if (e.key === 'ArrowRight' && lightbox.items.length > 1) {
        const nextIndex = (lightbox.index + 1) % lightbox.items.length;
        lightboxSessionRef.current.viewedIndices.add(nextIndex);
        trackEvent('lightbox_slide_change', {
          project: lightbox.project,
          from_index: lightbox.index,
          to_index: nextIndex,
          board_title: lightbox.items[nextIndex]?.title,
          board_tag: lightbox.items[nextIndex]?.tag,
          direction: 'next',
          method: 'keyboard',
        });
        setLightbox((prev) => ({
          ...prev,
          index: nextIndex,
        }));
      } else if (e.key === 'ArrowLeft' && lightbox.items.length > 1) {
        const prevIndex = (lightbox.index - 1 + lightbox.items.length) % lightbox.items.length;
        lightboxSessionRef.current.viewedIndices.add(prevIndex);
        trackEvent('lightbox_slide_change', {
          project: lightbox.project,
          from_index: lightbox.index,
          to_index: prevIndex,
          board_title: lightbox.items[prevIndex]?.title,
          board_tag: lightbox.items[prevIndex]?.tag,
          direction: 'prev',
          method: 'keyboard',
        });
        setLightbox((prev) => ({
          ...prev,
          index: prevIndex,
        }));
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  const openLightbox = (items, index, projectName) => {
    lightboxSessionRef.current = {
      openedAt: Date.now(),
      viewedIndices: new Set([index]),
    };
    const board = items[index];
    trackEvent('lightbox_open', {
      project: projectName,
      board_title: board?.title,
      board_tag: board?.tag,
      board_index: index,
    });
    setLightbox({ open: true, items, index, project: projectName });
  };

  const closeLightbox = () => {
    recordLightboxClose(lightbox);
    setLightbox((prev) => ({ ...prev, open: false }));
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    const nextIndex = (lightbox.index + 1) % lightbox.items.length;
    lightboxSessionRef.current.viewedIndices.add(nextIndex);
    trackEvent('lightbox_slide_change', {
      project: lightbox.project,
      from_index: lightbox.index,
      to_index: nextIndex,
      board_title: lightbox.items[nextIndex]?.title,
      board_tag: lightbox.items[nextIndex]?.tag,
      direction: 'next',
      method: 'button',
    });
    setLightbox((prev) => ({
      ...prev,
      index: nextIndex,
    }));
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    const prevIndex = (lightbox.index - 1 + lightbox.items.length) % lightbox.items.length;
    lightboxSessionRef.current.viewedIndices.add(prevIndex);
    trackEvent('lightbox_slide_change', {
      project: lightbox.project,
      from_index: lightbox.index,
      to_index: prevIndex,
      board_title: lightbox.items[prevIndex]?.title,
      board_tag: lightbox.items[prevIndex]?.tag,
      direction: 'prev',
      method: 'button',
    });
    setLightbox((prev) => ({
      ...prev,
      index: prevIndex,
    }));
  };

  const handleToggleTheme = () => {
    const nextDark = !isDarkMode;
    trackEvent('uiux_theme_toggle', {
      to_theme: nextDark ? 'dark' : 'light',
    });
    setIsDarkMode(nextDark);
  };

  const handleQuickJump = (sectionHash, label) => {
    trackEvent('uiux_quick_jump_click', {
      target_section: sectionHash,
      label,
    });
  };

  const handleDirectoryClick = (projectNum, projectName, targetSection) => {
    trackEvent('uiux_directory_card_click', {
      project_num: projectNum,
      project_name: projectName,
      target_section: targetSection,
    });
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    trackEvent('contact_form_submit', {
      source: 'uiux_contact',
    });
    emailjs
      .sendForm('service_1jjdsvk', 'template_83t6kxr', formRef.current, 'qkYHUAd9cmK7BjIFb')
      .then(
        () => {
          trackEvent('contact_form_success', {
            source: 'uiux_contact',
          });
          toast.success('Message sent successfully!', {
            position: 'top-center',
            autoClose: 3000,
          });
        },
        () => {
          trackEvent('contact_form_error', {
            source: 'uiux_contact',
          });
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
      {/* STICKY TOP BAR */}
      <div className="uiux-topbar" role="banner">
        <div className="uiux-container uiux-topbar__inner">
          <div className="uiux-brand">
            <span className="uiux-brand__badge">UI/UX &amp; Product Design</span>
            <span className="uiux-brand__title">M. Adib Aulia Nurkhafif</span>
          </div>

          <div className="uiux-quick-jump">
            <a href="#uiux-hero" onClick={() => handleQuickJump('#uiux-hero', 'Overview')}>
              Overview
            </a>
            <a
              href="#case-resumeez"
              onClick={() => handleQuickJump('#case-resumeez', '01. Resumeez')}
            >
              01. Resumeez
            </a>
            <a
              href="#case-kompas"
              onClick={() => handleQuickJump('#case-kompas', '02. Kompas.com')}
            >
              02. Kompas.com
            </a>
            <a
              href="#case-recipeez"
              onClick={() => handleQuickJump('#case-recipeez', '03. Recipeez')}
            >
              03. Recipeez
            </a>
            <a
              href="#uiux-more"
              onClick={() => handleQuickJump('#uiux-more', '99 Group & RAiso')}
            >
              99 Group &amp; RAiso
            </a>
            <a href="#uiux-contact" onClick={() => handleQuickJump('#uiux-contact', 'Contact')}>
              Contact
            </a>
          </div>

          <div className="uiux-topbar__actions">
            <button
              type="button"
              onClick={handleToggleTheme}
              className="uiux-theme-btn"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <BsSunFill /> : <BsMoonStarsFill />}
              <span>{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>
            <button type="button" onClick={onNavigateMain} className="uiux-switch-btn">
              <AiOutlineArrowLeft /> Main Dev Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          1. OPEN EDITORIAL HERO
          ===================================================================== */}
      <section id="uiux-hero" className="uiux-hero">
        <div className="uiux-container">
          <div className="uiux-hero__grid">
            <div>
              <span className="uiux-kicker">
                Frontend Development • UI/UX &amp; Product Design • Responsive Web Design
              </span>
              <h1 className="uiux-hero__headline">
                Develops user-centric web and mobile solutions by bridging interactive UI/UX design
                with responsive frontend engineering.
              </h1>
              <p className="uiux-hero__lead">
                Portfolio of works by <strong>M. Adib Aulia Nurkhafif</strong> — Computer Science
                undergraduate at <strong>BINUS University</strong> and former Frontend Engineer Intern
                at <strong>99 Group</strong>.
              </p>

              <div className="uiux-cta-row">
                <a
                  href="#case-resumeez"
                  className="uiux-btn uiux-btn--primary"
                  onClick={() =>
                    trackEvent('uiux_hero_cta_click', {
                      label: 'Explore Case Studies',
                      target_section: '#case-resumeez',
                    })
                  }
                >
                  Explore Case Studies
                </a>
                <a
                  href={LATEST_CV}
                  download
                  className="uiux-btn uiux-btn--secondary"
                  onClick={() =>
                    trackEvent('cv_download_click', {
                      source: 'uiux_hero',
                      file_name: 'CV M ADIB AULIA NURKHAFIF.pdf',
                    })
                  }
                >
                  <FaDownload /> Download CV
                </a>
                <a
                  href={PORTFOLIO_PDF}
                  download
                  className="uiux-btn uiux-btn--secondary"
                  onClick={() =>
                    trackEvent('portfolio_pdf_download_click', {
                      source: 'uiux_hero',
                      file_name: 'Portfolio of Projects_M Adib Aulia Nurkhafif.pdf',
                    })
                  }
                >
                  <FaDownload /> Portfolio of Works (PDF)
                </a>
              </div>
            </div>

            <aside className="uiux-hero__aside">
              <div className="uiux-author-row">
                <div className="uiux-author-avatar">
                  <img src={PROFILE_IMG} alt="M. Adib Aulia Nurkhafif" />
                </div>
                <div className="uiux-author-info">
                  <h2>M. Adib Aulia Nurkhafif</h2>
                  <p>Kab. Batang, Indonesia (51252)</p>
                  <p>adibnk11@gmail.com • +62 822-4103-3809</p>
                </div>
              </div>

              <dl className="uiux-meta-dl">
                <div>
                  <dt>Education</dt>
                  <dd>B.Sc. Computer Science, BINUS University (2022–2026)</dd>
                </div>
                <div>
                  <dt>Academic Standing</dt>
                  <dd>GPA 3.60 / 4.00</dd>
                </div>
                <div>
                  <dt>Latest Experience</dt>
                  <dd>Frontend Engineer Intern, 99 Group (02/2025–02/2026)</dd>
                </div>
                <div>
                  <dt>Profiles</dt>
                  <dd style={{ display: 'flex', gap: '0.85rem', marginTop: '0.15rem' }}>
                    <a
                      href="https://www.linkedin.com/in/m-adib-aulia-nurkhafif"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--uiux-blue-kicker)', fontWeight: 600 }}
                      onClick={() =>
                        trackEvent('social_click', {
                          platform: 'linkedin',
                          location: 'uiux_hero_aside',
                        })
                      }
                    >
                      LinkedIn ↗
                    </a>
                    <a
                      href="https://github.com/1Frazel"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--uiux-blue-kicker)', fontWeight: 600 }}
                      onClick={() =>
                        trackEvent('social_click', {
                          platform: 'github',
                          location: 'uiux_hero_aside',
                        })
                      }
                    >
                      GitHub ↗
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="uiux-tools-line">
                <h3>Tools &amp; Techniques</h3>
                <p>
                  Figma · Axure RP · Wireframing · Interactive Prototyping · Usability Testing · User
                  Acceptance Testing (UAT) · Responsive Web Design · TypeScript · JavaScript · React ·
                  Next.js · Vite · Tailwind CSS · Strapi (Headless CMS) · Java · Android Studio ·
                  RESTful API · SEO · Git &amp; GitHub
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* OPEN CASE STUDY DIRECTORY STRIP */}
      <div className="uiux-container">
        <div className="uiux-index-strip">
          <a
            href="#case-resumeez"
            className="uiux-index-item"
            onClick={() => handleDirectoryClick('Project 01', 'Resumeez', '#case-resumeez')}
          >
            <span className="uiux-index-item__num">Project 01</span>
            <strong>Resumeez</strong>
            <span>ATS Resume Builder &amp; Rule-Based Evaluator</span>
          </a>
          <a
            href="#case-kompas"
            className="uiux-index-item"
            onClick={() => handleDirectoryClick('Project 02', 'Kompas.com', '#case-kompas')}
          >
            <span className="uiux-index-item__num">Project 02</span>
            <strong>Kompas.com</strong>
            <span>UX Research &amp; News Portal Redesign</span>
          </a>
          <a
            href="#case-recipeez"
            className="uiux-index-item"
            onClick={() => handleDirectoryClick('Project 03', 'Recipeez', '#case-recipeez')}
          >
            <span className="uiux-index-item__num">Project 03</span>
            <strong>Recipeez</strong>
            <span>API-Driven Recipe Finder &amp; Smart Meal Planner</span>
          </a>
          <a
            href="#uiux-more"
            className="uiux-index-item"
            onClick={() =>
              handleDirectoryClick('Experience & More', '99 Group & RAiso', '#uiux-more')
            }
          >
            <span className="uiux-index-item__num">Experience &amp; More</span>
            <strong>99 Group &amp; RAiso</strong>
            <span>Frontend Engineering Internship &amp; Stationery App</span>
          </a>
        </div>
      </div>

      {/* =====================================================================
          2. PROJECT 01: RESUMEEZ — SUBTLE PROJECT SHELL + SPLIT SHOWCASE
          ===================================================================== */}
      <section id="case-resumeez" className="case-section">
        <div className="uiux-container">
          <div className="project-shell">
            <div className="case-header-row">
              <div>
                <span className="case-eyebrow">Project 01 • Overview</span>
                <h2 className="case-title">
                  Resumeez — ATS Resume Builder &amp; Rule-Based Evaluator
                </h2>
                <p className="case-pitch">
                  Helping job seekers create structured, ATS-readable resumes through guided CV
                  generation and consistent formatting.
                </p>
              </div>

              <div className="uiux-cta-row">
                <a
                  href="https://portfolio-thesis.firebaseapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uiux-btn uiux-btn--primary"
                  onClick={() =>
                    trackEvent('case_study_cta_click', {
                      project: 'Resumeez',
                      label: 'Live Web App',
                      target_url: 'https://portfolio-thesis.firebaseapp.com/',
                    })
                  }
                >
                  Live Web App <FaExternalLinkAlt />
                </a>
              </div>
            </div>

            {/* Metadata Strip */}
            <div className="case-specs-strip">
              <div className="case-spec">
                <span className="case-spec__label">Role</span>
                <span className="case-spec__val">UI/UX Designer &amp; QA Lead (Team of 3)</span>
              </div>
              <div className="case-spec">
                <span className="case-spec__label">Methods</span>
                <span className="case-spec__val">
                  R&amp;D (Hannafin &amp; Peck Model) &amp; Shneiderman&apos;s 8 Golden Rules
                </span>
              </div>
              <div className="case-spec">
                <span className="case-spec__label">Stack</span>
                <span className="case-spec__val">
                  Figma, React, Vite, TypeScript, Tailwind CSS, PDF.js, Firebase
                </span>
              </div>
            </div>

            {/* Split-Screen Showcase: Concise Narrative Left + Huge Product Boards Right */}
            <div className="resumeez-split">
              <div>
                <div className="open-block">
                  <span className="open-block__label">The Problem</span>
                  <h3>Flaws of Existing Campus CV Generators</h3>
                  <p>
                    Preparing for our university internship program revealed three structural flaws in
                    the auto-generated campus CV system:
                  </p>

                  <div className="open-numbered-list">
                    <div className="open-numbered-item">
                      <span className="open-numbered-item__num">01</span>
                      <span className="open-numbered-item__text">
                        <strong>Inefficient Spatial Layout:</strong> Content scattered across 5 pages.
                      </span>
                    </div>
                    <div className="open-numbered-item">
                      <span className="open-numbered-item__num">02</span>
                      <span className="open-numbered-item__text">
                        <strong>Rigid Structure:</strong> Lacks dedicated achievement sections.
                      </span>
                    </div>
                    <div className="open-numbered-item">
                      <span className="open-numbered-item__num">03</span>
                      <span className="open-numbered-item__text">
                        <strong>Zero ATS Feedback:</strong> No validation on PDF readability.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="open-block">
                  <span className="open-block__label">The Solution</span>
                  <h3>Preventive Formatting Meets Rule-Based Scoring</h3>
                  <div className="open-numbered-list">
                    <div className="open-numbered-item">
                      <span className="open-numbered-item__num">01</span>
                      <div className="open-numbered-item__text">
                        <strong>Standardized 6-Section CV Builder:</strong> Guides content into 6
                        consistent sections across 2 standardized templates to prevent scattered
                        formatting.
                      </div>
                    </div>
                    <div className="open-numbered-item">
                      <span className="open-numbered-item__num">02</span>
                      <div className="open-numbered-item__text">
                        <strong>Automated Regex &amp; PDF.js CV Checker:</strong> Extracts PDF text via
                        PDF.js and applies rule-based regex checks (&gt;5 valid words) across 6 ATS
                        categories.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="open-block">
                  <span className="open-block__label">Key Design Decisions</span>
                  <h3>Split-Screen Builder &amp; Explainable ATS Checker UI</h3>
                  <div className="open-numbered-list">
                    <div className="open-numbered-item">
                      <span className="open-numbered-item__num">01</span>
                      <div className="open-numbered-item__text">
                        <strong>Split-Screen Builder &amp; Error Prevention:</strong> Real-Time JSON
                        Live Preview (JSON-to-DOM) paired with mandatory field &amp; state-lock
                        validation.
                      </div>
                    </div>
                    <div className="open-numbered-item">
                      <span className="open-numbered-item__num">02</span>
                      <div className="open-numbered-item__text">
                        <strong>Explainable ATS Checker UI:</strong> Scores each section into{' '}
                        <strong>Complete (&ge;5 valid words)</strong>,{' '}
                        <strong>Header-Only Warning (&lt;5 words)</strong>, or{' '}
                        <strong>Missing Section</strong>.
                      </div>
                    </div>
                    <div className="open-numbered-item">
                      <span className="open-numbered-item__num">03</span>
                      <div className="open-numbered-item__text">
                        <strong>Universal Usability:</strong> Bilingual Support Toggle (ID | EN) and
                        responsive desktop-to-mobile layouts.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Huge Visual Showcase Frames */}
              <div className="resumeez-visual-stack">
                <div
                  className="showcase-stage"
                  onClick={() => openLightbox(RESUMEEZ_BOARDS, 0, 'Resumeez')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(RESUMEEZ_BOARDS, 0, 'Resumeez')}
                >
                  <img src={RESUMEEZ_P1} alt={RESUMEEZ_BOARDS[0].title} />
                  <div className="showcase-stage__bar">
                    <strong>{RESUMEEZ_BOARDS[0].title}</strong>
                    <span className="showcase-stage__zoom">
                      <FaExpandAlt /> Fullscreen
                    </span>
                  </div>
                </div>

                <div
                  className="showcase-stage"
                  onClick={() => openLightbox(RESUMEEZ_BOARDS, 1, 'Resumeez')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(RESUMEEZ_BOARDS, 1, 'Resumeez')}
                >
                  <img src={RESUMEEZ_P2} alt={RESUMEEZ_BOARDS[1].title} />
                  <div className="showcase-stage__bar">
                    <strong>{RESUMEEZ_BOARDS[1].title}</strong>
                    <span className="showcase-stage__zoom">
                      <FaExpandAlt /> Fullscreen
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Open 7-Step Wizard Strip */}
            <div className="open-wizard-strip">
              <span className="open-block__label">Applying Shneiderman&apos;s 8 Golden Rules</span>
              <p style={{ fontSize: '0.95rem', color: 'var(--uiux-text-body)', maxWidth: '720px' }}>
                Breaking 8 resume entities into a <strong>7-step guided wizard</strong> reduces
                short-term memory load so users focus on one section at a time:
              </p>
              <div className="open-wizard-steps">
                {WIZARD_STEPS.map((item) => (
                  <span
                    key={item.step}
                    className={`open-wizard-step ${item.active ? 'open-wizard-step--active' : ''}`}
                  >
                    <strong>{item.step}</strong>
                    <span>{item.name}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Intentional Bento Grid Strictly for Quick Impact / Metrics & Testing Summary */}
            <div id="resumeez-metrics-bento" className="open-block" style={{ marginBottom: 0 }}>
              <span className="open-block__label open-block__label--accent">
                Testing, Metrics &amp; Iteration
              </span>
              <h3>Turning 30% User Friction into Actionable UX Iterations</h3>
              <p>
                Visual clarity must work within rule-based parsing constraints, not compete with them.
              </p>

              <div className="metrics-bento">
                {/* 3 Quantitative Metric Bento Cards */}
                <div className="metrics-bento__card metrics-bento__span-4">
                  <span className="metric-tag">User Acceptance Testing (UAT)</span>
                  <div className="metric-big-num metric-big-num--accent">83.4%</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--uiux-text-body)', marginBottom: 0 }}>
                    of 30 respondents agreed Resumeez helped them build structured ATS-compliant CVs.
                  </p>
                </div>

                <div className="metrics-bento__card metrics-bento__card--blue metrics-bento__span-4">
                  <span className="metric-tag">System Usability Scale (SUS)</span>
                  <div className="metric-big-num">
                    69.83 <small style={{ fontSize: '1rem', fontWeight: 500 }}>(Grade C+)</small>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--uiux-text-body)', marginBottom: 0 }}>
                    Scored above the global benchmark average (68.0), rated Marginal High / Good.
                  </p>
                </div>

                <div className="metrics-bento__card metrics-bento__span-4">
                  <span className="metric-tag">Blackbox QA Reliability</span>
                  <div className="metric-big-num">18 / 18 Passed</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--uiux-text-body)', marginBottom: 0 }}>
                    100% pass rate across XSS sanitization, 10k-char stress tests, and 5MB limits.
                  </p>
                </div>

                {/* 3 UX Iterations alongside Slide 3 & Slide 4 Visuals */}
                <div className="metrics-bento__card metrics-bento__span-5">
                  <div>
                    <span className="metric-tag">3 Actionable UX Iterations</span>
                    <div className="open-numbered-list" style={{ marginTop: '0.85rem' }}>
                      <div className="open-numbered-item">
                        <span className="open-numbered-item__num">01</span>
                        <div className="open-numbered-item__text">
                          <strong>Fixing Accidental Double Downloads:</strong> Decoupled preview state
                          from auto-download trigger.
                        </div>
                      </div>
                      <div className="open-numbered-item">
                        <span className="open-numbered-item__num">02</span>
                        <div className="open-numbered-item__text">
                          <strong>Lexical Language Barrier:</strong> Added English ATS standard
                          onboarding tooltips.
                        </div>
                      </div>
                      <div className="open-numbered-item">
                        <span className="open-numbered-item__num">03</span>
                        <div className="open-numbered-item__text">
                          <strong>Input Ergonomics:</strong> Replaced manual date/city text inputs with
                          Dropdown Selectors.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="metrics-bento__span-7">
                  <div
                    className="showcase-stage"
                    onClick={() => openLightbox(RESUMEEZ_BOARDS, 2, 'Resumeez')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openLightbox(RESUMEEZ_BOARDS, 2, 'Resumeez')}
                  >
                    <img src={RESUMEEZ_P3} alt={RESUMEEZ_BOARDS[2].title} />
                    <div className="showcase-stage__bar">
                      <strong>{RESUMEEZ_BOARDS[2].title}</strong>
                      <span className="showcase-stage__zoom">
                        <FaExpandAlt /> Fullscreen
                      </span>
                    </div>
                  </div>
                </div>

                {/* Full-Width Bento Summary Board */}
                <div className="metrics-bento__span-12">
                  <div
                    className="showcase-stage"
                    onClick={() => openLightbox(RESUMEEZ_BOARDS, 3, 'Resumeez')}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openLightbox(RESUMEEZ_BOARDS, 3, 'Resumeez')}
                  >
                    <img src={RESUMEEZ_P4} alt={RESUMEEZ_BOARDS[3].title} />
                    <div className="showcase-stage__bar">
                      <strong>{RESUMEEZ_BOARDS[3].title}</strong>
                      <span className="showcase-stage__zoom">
                        <FaExpandAlt /> Fullscreen
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. PROJECT 02: KOMPAS.COM — DUAL VISUAL SHOWCASE + 3-COLUMN EDITORIAL
          ===================================================================== */}
      <section id="case-kompas" className="case-section">
        <div className="uiux-container">
          <div className="project-shell">
            <div className="case-header-row">
              <div>
                <span className="case-eyebrow">Project 02 • Research &amp; News Portal Redesign</span>
                <h2 className="case-title">Kompas.com — UX Research &amp; News Portal Redesign</h2>
                <p className="case-pitch">
                  Decluttering Indonesia&apos;s news portal by balancing ad slots with a clean reading
                  flow.
                </p>
              </div>

              <div className="uiux-cta-row">
                <a
                  href={KOMPAS_FIGMA_PROTO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uiux-btn uiux-btn--primary"
                  onClick={() =>
                    trackEvent('case_study_cta_click', {
                      project: 'Kompas.com',
                      label: 'Interactive Figma Prototype',
                      target_url: KOMPAS_FIGMA_PROTO,
                    })
                  }
                >
                  <FaFigma /> Interactive Figma Prototype <FaExternalLinkAlt />
                </a>
              </div>
            </div>

            <div className="case-specs-strip">
              <div className="case-spec">
                <span className="case-spec__label">Role</span>
                <span className="case-spec__val">UI Designer &amp; UX Researcher (Team of 5)</span>
              </div>
              <div className="case-spec">
                <span className="case-spec__label">Methods</span>
                <span className="case-spec__val">
                  Onsite User Interviews, Persona Mapping, Sitemap, Taskflow, Low-Fi Sketching
                </span>
              </div>
              <div className="case-spec">
                <span className="case-spec__label">Stack</span>
                <span className="case-spec__val">
                  Figma, Draw.io, Hand-Sketching Wireframe, Usability Testing
                </span>
              </div>
            </div>

            {/* Side-by-Side Visual Showcase Immediately Below Header (Consistent with Recipeez & Resumeez) */}
            <div className="dual-visual-stage">
              <div
                className="showcase-stage"
                onClick={() => openLightbox(KOMPAS_BOARDS, 0, 'Kompas.com')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(KOMPAS_BOARDS, 0, 'Kompas.com')}
              >
                <img src={KOMPAS_P1} alt={KOMPAS_BOARDS[0].title} />
                <div className="showcase-stage__bar">
                  <strong>{KOMPAS_BOARDS[0].title}</strong>
                  <span className="showcase-stage__zoom">
                    <FaExpandAlt /> Fullscreen
                  </span>
                </div>
              </div>

              <div
                className="showcase-stage"
                onClick={() => openLightbox(KOMPAS_BOARDS, 1, 'Kompas.com')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(KOMPAS_BOARDS, 1, 'Kompas.com')}
              >
                <img src={KOMPAS_P2} alt={KOMPAS_BOARDS[1].title} />
                <div className="showcase-stage__bar">
                  <strong>{KOMPAS_BOARDS[1].title}</strong>
                  <span className="showcase-stage__zoom">
                    <FaExpandAlt /> Fullscreen
                  </span>
                </div>
              </div>
            </div>

            {/* 3-Column Open Editorial Narrative Below Visuals */}
            <div className="kompas-editorial-columns">
              <div className="kompas-col open-block" style={{ marginBottom: 0 }}>
                <span className="open-block__label">01 • User Research (3 Personas)</span>
                <h3>TikTok/IG-to-Kompas Habit &amp; 3 Pain Points</h3>
                <p>
                  Interviews with <strong>Janice (20, Student)</strong>,{' '}
                  <strong>Aisha (31, Lecturer)</strong>, and <strong>Anton (39, Shopkeeper)</strong>{' '}
                  revealed 3 core friction points:
                </p>
                <div className="open-numbered-list">
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">01</span>
                    <span className="open-numbered-item__text">
                      <strong>Intrusive Ad Clutter</strong> disrupting article scanning.
                    </span>
                  </div>
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">02</span>
                    <span className="open-numbered-item__text">
                      <strong>Irrelevant Photos</strong> disconnecting headlines from visuals.
                    </span>
                  </div>
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">03</span>
                    <span className="open-numbered-item__text">
                      <strong>Reading Exhaustion</strong> from cramped multi-page layouts.
                    </span>
                  </div>
                </div>
              </div>

              <div className="kompas-col open-block" style={{ marginBottom: 0 }}>
                <span className="open-block__label">02 • Information Architecture</span>
                <h3>Balancing Ergonomics with Monetization</h3>
                <p>
                  Instead of removing ads, we restructured the hierarchy and whitespace to preserve
                  commercial slots alongside a calm reading flow:
                </p>
                <div className="open-numbered-list">
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">01</span>
                    <span className="open-numbered-item__text">
                      <strong>Sitemap Restructuring:</strong> Grouped Lifestyle, Health, Food, and
                      Education in the main navbar.
                    </span>
                  </div>
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">02</span>
                    <span className="open-numbered-item__text">
                      <strong>Streamlined Taskflow:</strong> Separated open reading/search from
                      login-gated comments and subscriptions.
                    </span>
                  </div>
                </div>
              </div>

              <div className="kompas-col open-block" style={{ marginBottom: 0 }}>
                <span className="open-block__label">03 • UI Redesign Decisions</span>
                <h3>Ad Zoning, Breathable Homepage &amp; News Detail</h3>
                <div className="open-numbered-list">
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">01</span>
                    <span className="open-numbered-item__text">
                      <strong>Utility Header &amp; Modular Grid:</strong> Dark/Light Mode toggle,
                      Trending Word, Search Bar, and isolated top/sidebar ad zones.
                    </span>
                  </div>
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">02</span>
                    <span className="open-numbered-item__text">
                      <strong>Breathable Homepage:</strong> Extra card whitespace with bounded{' '}
                      <code>1140&times;200</code> top &amp; <code>260&times;150</code> sidebar ads.
                    </span>
                  </div>
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">03</span>
                    <span className="open-numbered-item__text">
                      <strong>News Detail &amp; User Page:</strong> Top-to-bottom article flow with
                      clean profile, comment &amp; subscription views.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. PROJECT 03: RECIPEEZ — DUAL VISUAL SHOWCASE + CLEAN 2x2 TEXT GRID
          ===================================================================== */}
      <section id="case-recipeez" className="case-section">
        <div className="uiux-container">
          <div className="project-shell">
            <div className="case-header-row">
              <div>
                <span className="case-eyebrow">Project 03 • Discovery, Mobile UI &amp; Execution</span>
                <h2 className="case-title">
                  Recipeez — API-Driven Recipe Finder &amp; Smart Meal Planner
                </h2>
                <p className="case-pitch">
                  Simplifying daily cooking decisions by transforming complex Spoonacular API
                  nutritional and ingredient data into an intuitive mobile experience.
                </p>
              </div>

              <div className="uiux-cta-row">
                <a
                  href={RECIPEEZ_FIGMA_PROTO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uiux-btn uiux-btn--primary"
                  onClick={() =>
                    trackEvent('case_study_cta_click', {
                      project: 'Recipeez',
                      label: 'Interactive Figma Prototype',
                      target_url: RECIPEEZ_FIGMA_PROTO,
                    })
                  }
                >
                  <FaFigma /> Interactive Figma Prototype <FaExternalLinkAlt />
                </a>
                <a
                  href="https://github.com/1Frazel/Recipeez/releases/tag/v0.0.1-alpha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uiux-btn uiux-btn--secondary"
                  onClick={() =>
                    trackEvent('case_study_cta_click', {
                      project: 'Recipeez',
                      label: 'Early Access App',
                      target_url: 'https://github.com/1Frazel/Recipeez/releases/tag/v0.0.1-alpha',
                    })
                  }
                >
                  Early Access App <FaExternalLinkAlt />
                </a>
              </div>
            </div>

            <div className="case-specs-strip">
              <div className="case-spec">
                <span className="case-spec__label">Role</span>
                <span className="case-spec__val">Solo UI/UX Designer &amp; Android Developer</span>
              </div>
              <div className="case-spec">
                <span className="case-spec__label">Methods</span>
                <span className="case-spec__val">
                  Competitive Benchmarking, IA Flowcharts, Waterfall SDLC
                </span>
              </div>
              <div className="case-spec">
                <span className="case-spec__label">Stack</span>
                <span className="case-spec__val">
                  Figma, Java, XML, Android Studio, Spoonacular API, Retrofit, Glide, SQLite
                </span>
              </div>
            </div>

            {/* Huge Side-by-Side Showcase Frames Immediately Below Intro */}
            <div className="dual-visual-stage" style={{ marginBottom: 0 }}>
              <div
                className="showcase-stage"
                onClick={() => openLightbox(RECIPEEZ_BOARDS, 0, 'Recipeez')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(RECIPEEZ_BOARDS, 0, 'Recipeez')}
              >
                <img src={RECIPEEZ_P1} alt={RECIPEEZ_BOARDS[0].title} />
                <div className="showcase-stage__bar">
                  <strong>{RECIPEEZ_BOARDS[0].title}</strong>
                  <span className="showcase-stage__zoom">
                    <FaExpandAlt /> Fullscreen
                  </span>
                </div>
              </div>

              <div
                className="showcase-stage"
                onClick={() => openLightbox(RECIPEEZ_BOARDS, 1, 'Recipeez')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(RECIPEEZ_BOARDS, 1, 'Recipeez')}
              >
                <img src={RECIPEEZ_P2} alt={RECIPEEZ_BOARDS[1].title} />
                <div className="showcase-stage__bar">
                  <strong>{RECIPEEZ_BOARDS[1].title}</strong>
                  <span className="showcase-stage__zoom">
                    <FaExpandAlt /> Fullscreen
                  </span>
                </div>
              </div>
            </div>

            {/* Standardized 2x2 Grid Underneath Visual Showcase */}
            <div className="case-grid-2x2">
              {/* Cell 1: Top-Left */}
              <div className="case-grid-2x2__cell open-block">
                <span className="open-block__label">01 • Competitive UX Audit &amp; API Mapping</span>
                <h3>Auditing 5 Apps to Structure Spoonacular API Data</h3>
                <p>
                  Benchmarked <strong>Yummly, Mealime, Paprika, Whisk, and CookBook</strong> to map
                  three core mobile capabilities:
                </p>
                <div className="open-numbered-list">
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">01</span>
                    <span className="open-numbered-item__text">
                      <strong>Multi-Parameter Filtering:</strong> Calories, Macros, 14 Cuisines &amp; 7
                      Diets.
                    </span>
                  </div>
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">02</span>
                    <span className="open-numbered-item__text">
                      <strong>Fridge-First &amp; Tabbed Hierarchy:</strong> Ingredient-on-hand search
                      with scannable recipe tabs.
                    </span>
                  </div>
                </div>
              </div>

              {/* Cell 2: Top-Right */}
              <div className="case-grid-2x2__cell open-block">
                <span className="open-block__label">02 • Core Challenge &amp; 5 User Flows</span>
                <h3>Taming Data-Heavy API Responses on Mobile</h3>
                <p>
                  Applied progressive disclosure — 2-column grids, bottom sheets, and segmented tabs —
                  across 5 core user flows:
                </p>
                <div className="open-numbered-list">
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">01</span>
                    <span className="open-numbered-item__text">
                      <strong>Dual Search &amp; Bottom Sheet:</strong> Branches Name vs. Ingredient
                      search into a <code>filter_bottom_sheet</code>.
                    </span>
                  </div>
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">02</span>
                    <span className="open-numbered-item__text">
                      <strong>Smart Meal Planner:</strong> Calorie-based Surprise Meal Planning (3x
                      daily) &amp; manual slots linked to Cart.
                    </span>
                  </div>
                </div>
              </div>

              {/* Cell 3: Bottom-Left */}
              <div className="case-grid-2x2__cell open-block">
                <span className="open-block__label">03 • Mobile UI Decisions</span>
                <h3>Homepage Browser &amp; Segmented Cookbook</h3>
                <p>
                  Designed around a 5-tab bottom navigation (<em>Home, CookBook, Shopping Cart, Meal
                  Planner, Settings</em>):
                </p>
                <div className="open-numbered-list">
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">01</span>
                    <span className="open-numbered-item__text">
                      <strong>Homepage &amp; Recipe Browser:</strong> 2-Column dish cards with quick
                      Save/Cart actions and Dual Search filter sheets.
                    </span>
                  </div>
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">02</span>
                    <span className="open-numbered-item__text">
                      <strong>3-Tab Recipe View &amp; Cookbook:</strong> Segments{' '}
                      <em>Overview, Ingredients &amp; Directions</em> to prevent infinite scroll while
                      cooking.
                    </span>
                  </div>
                </div>
              </div>

              {/* Cell 4: Bottom-Right */}
              <div className="case-grid-2x2__cell open-block">
                <span className="open-block__label">04 • Engineering Execution</span>
                <h3>12-Week Solo Android Build</h3>
                <p>
                  Executed across a 5-stage Waterfall SDLC (Requirements Analysis, Design, Development,
                  Testing, Maintenance):
                </p>
                <div className="open-numbered-list">
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">01</span>
                    <span className="open-numbered-item__text">
                      <strong>Async Networking:</strong> Integrated <strong>Retrofit</strong> for JSON
                      parsing and <strong>Glide</strong> for smooth <code>RecyclerView</code>{' '}
                      pagination.
                    </span>
                  </div>
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">02</span>
                    <span className="open-numbered-item__text">
                      <strong>Offline Persistence:</strong> Built <strong>SQLite/Room</strong> schemas
                      for saved recipes alongside empty and error states.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. ADDITIONAL EXPERIENCE & WORK: 99 GROUP & RAISO
          ===================================================================== */}
      <section id="uiux-more" className="case-section">
        <div className="uiux-container">
          <div className="project-shell">
            <div className="more-work-split">
              {/* Left: 99 Group Professional Experience */}
              <div className="open-block" style={{ marginBottom: 0 }}>
                <span className="case-eyebrow">Professional Experience • 02/2025 – 02/2026</span>
                <h2 className="case-title" style={{ fontSize: '1.85rem' }}>
                  Frontend Engineer Intern — 99 Group (Rumah123.com)
                </h2>
                <p>
                  Operated across the Growth, Conversion, and Consumer teams within an Agile Scrum
                  environment using <strong>React, Next.js, TypeScript, and Strapi headless CMS</strong>
                  :
                </p>

                <div className="open-numbered-list">
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">01</span>
                    <span className="open-numbered-item__text">
                      <strong>Responsive UI &amp; Headless CMS:</strong> Engineered cross-device web
                      interfaces (<code>HeaderV2</code> navigation) and a dynamic property review
                      module with Strapi.
                    </span>
                  </div>
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">02</span>
                    <span className="open-numbered-item__text">
                      <strong>Property Discovery Flows:</strong> Built the{' '}
                      <strong>New Search Result Page (NSRP)</strong>, advanced filtering, Nearby POI,
                      and Matchmaker components.
                    </span>
                  </div>
                  <div className="open-numbered-item">
                    <span className="open-numbered-item__num">03</span>
                    <span className="open-numbered-item__text">
                      <strong>Performance, Analytics &amp; SEO:</strong> Resolved 120+ sprint/bug
                      tickets, added search debouncing, Segment SDK tracking, and SEO schemas.
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: RAiso Stationery E-Commerce App */}
              <div className="more-work-right open-block" style={{ marginBottom: 0 }}>
                <span className="case-eyebrow">Academic Project • Axure RP &amp; Android</span>
                <h2 className="case-title" style={{ fontSize: '1.85rem' }}>
                  RAiso — Stationery E-Commerce App
                </h2>
                <p style={{ marginBottom: '1.25rem' }}>
                  Designed and developed an Android e-commerce application for stationery products,
                  translating interactive <strong>Axure RP</strong> prototypes into functional mobile
                  views with <strong>Java and Android Studio</strong>.
                </p>

                <div
                  className="showcase-stage"
                  onClick={() => openLightbox(RAISO_BOARDS, 0, 'RAiso')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLightbox(RAISO_BOARDS, 0, 'RAiso')}
                >
                  <img src={RAISO_IMG} alt="RAiso Stationery E-Commerce App" />
                  <div className="showcase-stage__bar">
                    <strong>RAiso — Mobile Views &amp; Prototype</strong>
                    <span className="showcase-stage__zoom">
                      <FaExpandAlt /> Fullscreen
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. CONTACT & FOOTER (#uiux-contact)
          ===================================================================== */}
      <section id="uiux-contact" className="case-section">
        <div className="uiux-container">
          <div className="project-shell">
            <div className="contact-editorial-grid">
              <div>
                <span className="case-eyebrow">Contact</span>
                <h2 className="case-title">Get in touch</h2>
                <p className="case-pitch">
                  Available for UI/UX Designer, Product Designer, and Frontend Developer roles. Reach
                  out directly via email, WhatsApp, LinkedIn, or the form.
                </p>

                <div className="contact-links-list">
                  <a
                    href="mailto:adibnk11@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link-row"
                    onClick={() =>
                      trackEvent('contact_direct_click', {
                        source: 'uiux_contact',
                        channel: 'email',
                      })
                    }
                  >
                    <span>
                      <MdEmail style={{ color: 'var(--uiux-blue-kicker)', fontSize: '1.2rem' }} />
                      adibnk11@gmail.com
                    </span>
                    <small>Email ↗</small>
                  </a>

                  <a
                    href="https://wa.me/6282241033809"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link-row"
                    onClick={() =>
                      trackEvent('contact_direct_click', {
                        source: 'uiux_contact',
                        channel: 'whatsapp',
                      })
                    }
                  >
                    <span>
                      <IoLogoWhatsapp
                        style={{ color: 'var(--uiux-blue-kicker)', fontSize: '1.2rem' }}
                      />
                      +62 822-4103-3809
                    </span>
                    <small>WhatsApp ↗</small>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/m-adib-aulia-nurkhafif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link-row"
                    onClick={() =>
                      trackEvent('contact_direct_click', {
                        source: 'uiux_contact',
                        channel: 'linkedin',
                      })
                    }
                  >
                    <span>
                      <BsLinkedin style={{ color: 'var(--uiux-blue-kicker)', fontSize: '1.1rem' }} />
                      linkedin.com/in/m-adib-aulia-nurkhafif
                    </span>
                    <small>LinkedIn ↗</small>
                  </a>

                  <a
                    href="https://github.com/1Frazel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link-row"
                    onClick={() =>
                      trackEvent('contact_direct_click', {
                        source: 'uiux_contact',
                        channel: 'github',
                      })
                    }
                  >
                    <span>
                      <FaGithub style={{ color: 'var(--uiux-blue-kicker)', fontSize: '1.15rem' }} />
                      github.com/1Frazel
                    </span>
                    <small>GitHub ↗</small>
                  </a>
                </div>
              </div>

              <div>
                <form ref={formRef} onSubmit={handleSendEmail} className="uiux-contact-form">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Send a message
                  </h3>
                  <label htmlFor="uiux-name">Name</label>
                  <input
                    id="uiux-name"
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    required
                  />
                  <label htmlFor="uiux-email">Email</label>
                  <input
                    id="uiux-email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                  />
                  <label htmlFor="uiux-message">Message</label>
                  <textarea
                    id="uiux-message"
                    name="message"
                    rows="5"
                    placeholder="Your Message"
                    required
                  />
                  <div>
                    <button type="submit" className="uiux-btn uiux-btn--primary">
                      Send Message
                    </button>
                  </div>
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="uiux-footer" role="contentinfo">
        <div className="uiux-container">
          <p>
            <strong>M. Adib Aulia Nurkhafif</strong> — Portfolio of Works
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
