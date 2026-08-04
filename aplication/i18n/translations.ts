export const translations = {
  pt: {
    hero: {
      greeting: "// OLÁ, EU SOU",
      role: "Desenvolvedor Frontend",
      description:
        "Estudante de Engenharia de Software com experiência prática em desenvolvimento web, focado em frontend e integração com APIs. Trabalho com React, Next.js e Node.js construindo interfaces responsivas e sistemas completos, do zero à produção.",
      explore: "↓ role para explorar",
    },

    stack: {
      label: "TECHNICAL STACK",
      title: "Tecnologias & Conhecimento",
      subtitle: "Nível de familiaridade",
    },

    computer: {
      label: "COMPUTADOR INTERATIVO",
      title: "Como utilizar",
      description:
        "Arraste o computador para rotacioná-lo, use o scroll do mouse para aproximar ou afastar e interaja com os elementos da tela para explorar o portfólio.",
      drag: "↔ Arrastar",
      scroll: "↑↓ Scroll",
      interact: "🖱 Interagir",
    },

    projects: {
      label: "02 / TRABALHOS",
      title: "Projetos",
      description:
        "Uma seleção de projetos que me orgulho de ter construído.",
      viewProject: "Ver projeto →",
    },

    contact: {
      label: "03 / CONTATO",
      title: "Vamos Conversar",
      description:
        "Tem um projeto em mente? Adoraria ouvir sobre ele.",
      email: "E-mail",
      whatsapp: "WhatsApp",
      github: "GitHub",
      linkedin: "LinkedIn",
      sendMessage: "Enviar mensagem",
    },

    terminal: {
      system: "DANIEL OS v1.0 // SISTEMA INTERATIVO",
      help:
        "Digite 'help' para listar os comandos disponíveis.",
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
      role: "Frontend Developer",
      description:
        "Software Engineering student with practical experience in web development, focused on frontend development and API integration. I work with React, Next.js and Node.js, building responsive interfaces and complete systems from scratch to production.",
      explore: "↓ scroll to explore",
    },

    stack: {
      label: "TECHNICAL STACK",
      title: "Technologies & Knowledge",
      subtitle: "Familiarity level",
    },

    computer: {
      label: "INTERACTIVE COMPUTER",
      title: "How to use",
      description:
        "Drag the computer to rotate it, use the mouse wheel to zoom in or out, and interact with the elements on the screen to explore the portfolio.",
      drag: "↔ Drag",
      scroll: "↑↓ Scroll",
      interact: "🖱 Interact",
    },

    projects: {
      label: "02 / WORK",
      title: "Projects",
      description:
        "A selection of projects I'm proud to have built.",
      viewProject: "View project →",
    },

    contact: {
      label: "03 / CONTACT",
      title: "Let's Talk",
      description:
        "Have a project in mind? I'd love to hear about it.",
      email: "E-mail",
      whatsapp: "WhatsApp",
      github: "GitHub",
      linkedin: "LinkedIn",
      sendMessage: "Send message",
    },

    terminal: {
      system: "DANIEL OS v1.0 // INTERACTIVE SYSTEM",
      help:
        "Type 'help' to list available commands.",
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