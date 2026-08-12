export const translations = {
  pt: {
    hero: {
      greeting: "// OLÁ, EU SOU",
      role: "Desenvolvedor Fullstack",
      description:
        "Estudante do terceiro período de Engenharia de Software na Universidade Tecnológica Federal do Paraná, com experiência prática em desenvolvimento web, focado em frontend e integração com APIs. \n\nTrabalho com React, Next.js, Nest.js e Node.js construindo interfaces responsivas e sistemas completos, do zero à produção. \n\nTambém possuo conhecimento em áreas como cloud (AWS) e banco de dados (PostgreSQL, MySQL), além de experiência com metodologias ágeis e possuir uma boa comunicação. \n\nAtualmente estou aprofundando meus conhecimentos em fullstack estudando NestJS, AWS e arquitetura de software.",
      explore: "↓ role para explorar",
    },

    certifications: {
      label: "04 / CERTIFICAÇÕES",
      title: "Certificações & Badges",
      description:
        "Credenciais que representam minha formação, conhecimentos técnicos e evolução profissional.",
      certificationsTitle: "Certificações",
      badgesTitle: "Badges",
      viewCertificate: "Ver certificado",
      viewBadge: "Ver badge",
    },

    cube: {
      label: "Interativo 3D",
      titleLine1: "Cubo Mágico",
      titleHighlight: "3D.",
      description:
        "Gosto de criar experiências interativas usando tecnologias como Three.js e Blender, transformando ideias em interfaces dinâmicas, simples e interessantes de explorar. (Ctrl + Scroll para dar zoom no cubo.)",
    },

    header: {
      about: "Sobre",
      stack: "Stack",
      projects: "Projetos",
      certificates: "Certificações",
      cube: "Cubo",
      contact: "Contato",
      downloadCV: "Baixar currículo",
      back: "Voltar",
    },

    stack: {
      label: "TECHNICAL STACK",
      title: "Tecnologias & Conhecimento",
      subtitle: "Nível de familiaridade",
      slideHint: "deslize para explorar",

      categories: {
        all: "Todos",
        frontend: "Frontend",
        backend: "Backend",
        tools: "Ferramentas",
      },
    },

    mobileNavigation: {
      label: "NAVEGAÇÃO",
      title: "Explore meu portfólio",
      description:
        "Acesse meus projetos ou entre em contato comigo para conhecer mais sobre meu trabalho.",
      projects: "Projetos",
      contact: "Contato",
    },

    projects: {
      label: "02 / TRABALHOS",
      title: "Projetos",
      description:
        "Uma seleção de projetos que representam minha experiência prática no desenvolvimento de aplicações web, interfaces responsivas e soluções completas.",
      viewProject: "Ver projeto",
      projectLabel: "Projeto",
      technologies: "Tecnologias",
      privateProject: "Projeto privado",
      youAreHere: "Você está aqui",
    },

    contact: {
      label: "03 / CONTATO",
      title: "Vamos conversar",
      description:
        "Tem um projeto em mente, uma oportunidade ou simplesmente quer trocar uma ideia? Estou disponível para conversar.",
      email: "E-mail",
      whatsapp: "WhatsApp",
      github: "GitHub",
      linkedin: "LinkedIn",
      sendMessage: "Enviar uma mensagem",
      whatsappGreeting:
        "Olá Daniel! Vi seu portfólio e gostaria de conversar sobre um projeto.",
      availableForWork: "Disponível para novas oportunidades",
    },

    footer: {
      description:
        "Desenvolvedor Fullstack focado em criar aplicações web modernas, responsivas e escaláveis.",
      navigation: "Navegação",
      rights: "Todos os direitos reservados.",
    },
  },

  en: {
    hero: {
      greeting: "// HELLO, I'M",
      role: "Fullstack Developer",
      description:
        "Third-semester Software Engineering student at the Federal University of Technology – Paraná, with practical experience in web development, focused on frontend development and API integration.\n\nI work with React, Next.js, Nest.js, and Node.js, building responsive interfaces and complete systems from scratch to production.\n\nI also have knowledge of cloud computing (AWS) and databases (PostgreSQL, MySQL), along with experience with agile methodologies and strong communication skills.\n\nCurrently, I am deepening my knowledge of fullstack development, studying NestJS, AWS, and software architecture.",
      explore: "↓ scroll to explore",
    },

    cube: {
      label: "3D Interactive",
      titleLine1: "Magic Cube",
      titleHighlight: "3D.",
      description:
        "I enjoy creating interactive experiences using technologies like Three.js and Blender, turning ideas into dynamic interfaces that are simple and interesting to explore. (Ctrl + Scroll to zoom the cube.)",
    },

    header: {
      about: "About",
      stack: "Stack",
      projects: "Projects",
      certificates: "Certificates",
      cube: "Cube",
      contact: "Contact",
      downloadCV: "Download resume",
      back: "Back",
    },

    certifications: {
      label: "04 / CERTIFICATIONS",
      title: "Certifications & Badges",
      description:
        "Credentials that represent my education, technical knowledge, and professional growth.",
      certificationsTitle: "Certifications",
      badgesTitle: "Badges",
      viewCertificate: "View certificate",
      viewBadge: "View badge",
    },

    stack: {
      label: "TECHNICAL STACK",
      title: "Technologies & Knowledge",
      subtitle: "Familiarity level",
      slideHint: "swipe to explore",

      categories: {
        all: "All",
        frontend: "Frontend",
        backend: "Backend",
        tools: "Tools",
      },
    },

    mobileNavigation: {
      label: "NAVIGATION",
      title: "Explore my portfolio",
      description:
        "Explore my projects or get in touch with me to learn more about my work.",
      projects: "Projects",
      contact: "Contact",
    },

    projects: {
      label: "02 / WORK",
      title: "Projects",
      description:
        "A selection of projects that represent my hands-on experience building web applications, responsive interfaces, and complete solutions.",
      viewProject: "View project",
      projectLabel: "Project",
      technologies: "Technologies",
      privateProject: "Private project",
      youAreHere: "You are here",
    },

    contact: {
      label: "03 / CONTACT",
      title: "Let's talk",
      description:
        "Have a project in mind, an opportunity, or just want to chat? I'm available to talk.",
      email: "E-mail",
      whatsapp: "WhatsApp",
      github: "GitHub",
      linkedin: "LinkedIn",
      sendMessage: "Send a message",
      whatsappGreeting:
        "Hi Daniel! I saw your portfolio and would like to talk about a project.",
      availableForWork: "Available for new opportunities",
    },

    footer: {
      description:
        "Fullstack Developer focused on building modern, responsive, and scalable web applications.",
      navigation: "Navigation",
      rights: "All rights reserved.",
    },
  },
} as const;

export type Language = keyof typeof translations;