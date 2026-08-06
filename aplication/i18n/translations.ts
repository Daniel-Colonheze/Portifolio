export const translations = {
  pt: {
    hero: {
      greeting: "// OLÁ, EU SOU",
      role: "Desenvolvedor Fullstack",
      description:
        "Estudante de Engenharia de Software com experiência prática em desenvolvimento web, focado em frontend e integração com APIs. Trabalho com React, Next.js, Nest.js e Node.js construindo interfaces responsivas e sistemas completos, do zero à produção.",
      explore: "↓ role para explorar",
    },

    stack: {
      label: "TECHNICAL STACK",
      title: "Tecnologias & Conhecimento",
      subtitle: "Nível de familiaridade",
      slideHint: "deslize para explorar",
    },

    computer: {
      label: "COMPUTADOR INTERATIVO",
      title: "Como utilizar",
      description:
        "Arraste o computador para rotacioná-lo, use o scroll do mouse para aproximar ou afastar e interaja com os elementos da tela para explorar o portfólio (digite help para ver os comandos).",
      drag: "↔ Arrastar",
      scroll: "↑↓ Scroll",
      interact: "🖱 Interagir",
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

    terminal: {
      system: "DANIEL OS v1.0 // SISTEMA INTERATIVO",
      systemLoaded: "Sistema Operacional v1.0.0 carregado.",
      help: "Digite 'help' para listar os comandos disponíveis.",
      aboutText:
        "Daniel Colonheze | Desenvolvedor Frontend\nEstudante de Engenharia de Software com foco em React, Next.js, Node.js e construção de interfaces 3D interativas.",
      commands: {
        title: "COMANDOS DISPONIVEIS:",
        help: "exibe esta lista de comandos",
        about: "resumo sobre o desenvolvedor",
        projects: "navega para a página de Projetos",
        contact: "navega para a página de Contato",
        github: "abre o perfil no GitHub",
        linkedin: "abre o perfil no LinkedIn",
        clear: "limpa a tela do terminal",
      },
      messages: {
        openingProjects: "Abrindo projetos...",
        openingContact: "Abrindo contato...",
        openingGithub: "Redirecionando para o GitHub...",
        openingLinkedin: "Redirecionando para o LinkedIn...",
        commandNotFound:
          "Comando '{command}' não encontrado. Digite 'help' para instruções.",
      },
    },
  },

  en: {
    hero: {
      greeting: "// HELLO, I'M",
      role: "Fullstack Developer",
      description:
        "Software Engineering student with practical experience in web development, focused on frontend development and API integration. I work with React, Next.js, Nest.js and Node.js, building responsive interfaces and complete systems from scratch to production.",
      explore: "↓ scroll to explore",
    },

    stack: {
      label: "TECHNICAL STACK",
      title: "Technologies & Knowledge",
      subtitle: "Familiarity level",
      slideHint: "swipe to explore",
    },

    computer: {
      label: "INTERACTIVE COMPUTER",
      title: "How to use",
      description:
        "Drag the computer to rotate it, use the mouse wheel to zoom in or out, and interact with the elements on the screen to explore the portfolio (type help for commands).",
      drag: "↔ Drag",
      scroll: "↑↓ Scroll",
      interact: "🖱 Interact",
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

    terminal: {
      system: "DANIEL OS v1.0 // INTERACTIVE SYSTEM",
      systemLoaded: "Operating System v1.0.0 loaded.",
      help: "Type 'help' to list available commands.",
      aboutText:
        "Daniel Colonheze | Frontend Developer\nSoftware Engineering student focused on React, Next.js, Node.js and building interactive 3D interfaces.",
      commands: {
        title: "AVAILABLE COMMANDS:",
        help: "display this list of commands",
        about: "about the developer",
        projects: "navigate to the Projects page",
        contact: "navigate to the Contact page",
        github: "open GitHub profile",
        linkedin: "open LinkedIn profile",
        clear: "clear the terminal",
      },
      messages: {
        openingProjects: "Opening projects...",
        openingContact: "Opening contact...",
        openingGithub: "Redirecting to GitHub...",
        openingLinkedin: "Redirecting to LinkedIn...",
        commandNotFound:
          "Command '{command}' not found. Type 'help' for instructions.",
      },
    },
  },
} as const;

export type Language = keyof typeof translations;