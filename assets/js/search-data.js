// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-publications",
          title: "publications",
          description: "Peer-reviewed papers and preprints, newest first. See also my Google Scholar.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/publications/";
          },
        },{id: "nav-research",
          title: "research",
          description: "What I work on, organised by thread rather than by paper.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/research/";
          },
        },{id: "nav-news",
          title: "news",
          description: "Updates on papers, talks, and travel.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "nav-gallery",
          title: "gallery",
          description: "Life outside the lab — running, lifting, hoops, and the occasional good view.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/gallery/";
          },
        },{id: "nav-repositories",
          title: "repositories",
          description: "Code and open-source work.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/repositories/";
          },
        },{id: "news-our-paper-on-the-resolution-limit-of-single-photon-lidar-appeared-at-cvpr-2024-tada",
          title: 'Our paper on the resolution limit of single-photon LiDAR appeared at CVPR 2024....',
          description: "",
          section: "News",},{id: "news-two-papers-accepted-to-mmsp-2024-a-parametric-dead-time-forward-model-for-photon-registrations-and-an-analysis-of-the-rank-ordered-mean-estimator",
          title: 'Two papers accepted to MMSP 2024 — a parametric dead-time forward model for...',
          description: "",
          section: "News",},{id: "news-ultrafast-high-flux-single-photon-lidar-simulator-via-neural-mapping-accepted-to-icip-2025",
          title: 'Ultrafast High-Flux Single-Photon LiDAR Simulator via Neural Mapping accepted to ICIP 2025.',
          description: "",
          section: "News",},{id: "news-new-preprint-markov-renewal-single-photon-lidar-simulator-the-first-analytic-prediction-of-photon-count-mean-and-variance-under-dead-time",
          title: 'New preprint: Markov-Renewal Single-Photon LiDAR Simulator — the first analytic prediction of photon-count...',
          description: "",
          section: "News",},{id: "news-real-time-markov-modeling-for-single-photon-lidar-accepted-to-icassp-2026-a-1000-acceleration-with-convergence-guarantees",
          title: 'Real-Time Markov Modeling for Single-Photon LiDAR accepted to ICASSP 2026 — a 1000×...',
          description: "",
          section: "News",},{id: "news-i-am-on-the-market-for-a-summer-2027-internship-in-lidar-depth-sensing-and-computational-imaging-get-in-touch",
          title: 'I am on the market for a Summer 2027 internship in LiDAR, depth...',
          description: "",
          section: "News",},{id: "projects-dead-time-aware-forward-models",
          title: 'Dead-Time-Aware Forward Models',
          description: "What a single-photon detector actually records when photons arrive faster than it can reset — and how to invert it.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_deadtime_models/";
            },},{id: "projects-fast-physically-faithful-sp-lidar-simulation",
          title: 'Fast, Physically Faithful SP-LiDAR Simulation',
          description: "Generating training data that is both correct and cheap — breaking the fidelity-versus-speed dilemma in single-photon LiDAR simulation.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_simulators/";
            },},{id: "projects-real-time-markov-modeling",
          title: 'Real-Time Markov Modeling',
          description: "A 1000x acceleration for asynchronous single-photon LiDAR timestamp modeling, with convergence guarantees.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_realtime_markov/";
            },},{id: "projects-robust-depth-and-reflectivity-estimation",
          title: 'Robust Depth and Reflectivity Estimation',
          description: "Getting reliable geometry out of photon-starved, background-heavy measurements.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_robust_estimation/";
            },},{id: "projects-optical-coherence-tomography-systems",
          title: 'Optical Coherence Tomography Systems',
          description: "Undergraduate work on OCT system development at UESTC.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_oct/";
            },},{id: "projects-non-fullerene-organic-solar-cells",
          title: 'Non-Fullerene Organic Solar Cells',
          description: "Undergraduate materials work on solvent treatment for organic photovoltaics.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_solar/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%7A%68%61%6E%35%30%35%36@%70%75%72%64%75%65.%65%64%75", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/wjzhang5464", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/wjzhang64", "_blank");
        },
      },{
        id: 'social-scholar',
        title: 'Google Scholar',
        section: 'Socials',
        handler: () => {
          window.open("https://scholar.google.com/citations?user=KjVw0dsAAAAJ", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
