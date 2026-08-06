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
    link: "https://simulador-de-deadlock-em-transito.vercel.app/",
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
    link: "",
  },

  {
    year: "2025",
    title: {
      pt: "Sistema de Gestão de Estoque",
      en: "Inventory Management System",
    },
    description: {
      pt: "Sistema de controle de estoque desenvolvido para um cliente real, com autenticação segura, arquitetura em camadas (DAL) e deploy em produção.",
      en: "Inventory management system developed for a real client, featuring secure authentication, a layered architecture (DAL), and production deployment.",
    },
    tags: ["Next.js", "PHP", "MySQL", "Docker"],
    link: "",
  },
];