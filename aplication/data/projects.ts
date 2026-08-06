export const projects = [
  {
    year: "2025",
    title: {
      pt: "Simulador de Deadlock",
      en: "Deadlock Simulator",
    },
    description: {
      pt: "Uma experiência interativa que utiliza um cruzamento de trânsito para demonstrar como processos concorrentes podem entrar em estado de espera circular. O projeto apresenta o problema, permite visualizar o deadlock acontecendo e demonstra estratégias de prevenção utilizando controle de acesso.",
      en: "An interactive experience that uses a traffic intersection to demonstrate how concurrent processes can enter a circular wait state. The project explains the problem, allows users to visualize the deadlock happening, and demonstrates prevention strategies using access control.",
    },
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    image: "/images/projects/deadlock.png",
    link: "https://simulador-de-deadlock-em-transito.vercel.app/",
    repository:
      "https://github.com/Daniel-Colonheze/Simulador-de-Deadlock-em-Transito",
  },

  {
    year: "2026",
    title: {
      pt: "CidadeViva",
      en: "CidadeViva",
    },
    description: {
      pt: "Sistema (em desenvolvimento) de mapeamento colaborativo de problemas urbanos. O cidadão reporta com foto e localização precisa; o gestor visualiza tudo em um dashboard com filtros por categoria, status e período. Arquitetura separada em frontend (Next.js), API REST (NestJS) e banco geoespacial (PostgreSQL + PostGIS), com deploy na nuvem e armazenamento de imagens via R2.",
      en: "A system (currently in development) for collaborative mapping of urban problems. Citizens can submit reports with photos and precise locations, while managers can monitor everything through a dashboard with filters by category, status, and date range. The architecture is separated into a frontend (Next.js), REST API (NestJS), and geospatial database (PostgreSQL + PostGIS), with cloud deployment and image storage through R2.",
    },
    tags: [
      "Next.js",
      "NestJS",
      "PostgreSQL",
      "PostGIS",
      "Leaflet",
      "Prisma",
    ],
    image: "",
    link: "",
    repository: "",
  },

  {
    year: "2026",
    title: {
      pt: "Portfólio Pessoal",
      en: "Personal Portfolio",
    },
    description: {
      pt: "Portfólio pessoal desenvolvido com Next.js, combinando uma interface moderna com animações, interações em Three.js e uma experiência visual focada em apresentar meus projetos, conhecimentos e trajetória como desenvolvedor.",
      en: "Personal portfolio built with Next.js, combining a modern interface with animations, Three.js interactions, and a visual experience focused on showcasing my projects, skills, and journey as a developer.",
    },
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Three.js",
    ],
    image: "/images/projects/portfolio.png",
    link: "",
    repository: "https://github.com/Daniel-Colonheze/Portifolio",
  },
];