export const projects = [
  {
    year: "2025",
    title: "Simulador de Deadlock",
    description:
      "Uma experiência interativa que utiliza um cruzamento de trânsito para demonstrar como processos concorrentes podem entrar em estado de espera circular. O projeto apresenta o problema, permite visualizar o deadlock acontecendo e demonstra estratégias de prevenção utilizando controle de acesso.",
    tags: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    link: "https://simulador-de-deadlock-em-transito.vercel.app/",
  },
  {
    year: "2026",
    title: "CidadeViva",
    description:
      "Sistema (em desenvolvimento) de mapeamento colaborativo de problemas urbanos. O cidadão reporta com foto e localização precisa; o gestor visualiza tudo em um dashboard com filtros por categoria, status e período. Arquitetura separada em frontend (Next.js), API REST (NestJS) e banco geoespacial (PostgreSQL + PostGIS), com deploy na nuvem e armazenamento de imagens via R2.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "PostGIS", "Leaflet", "Prisma"],
    link: "",
  },
  {
    year: "2025",
    title: "Sistema de Gestao de Estoque",
    description:
      "Sistema de controle de estoque para um cliente real, com autenticacao segura, arquitetura em camadas (DAL) e deploy em producao.",
    tags: ["Next.js", "PHP", "MySQL", "Docker"],
    link: "",
  },
];