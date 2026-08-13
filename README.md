# Portfólio — Daniel Colonheze

Portfólio pessoal desenvolvido para apresentar meus projetos, conhecimentos, certificações e experiências de desenvolvimento por meio de uma experiência web interativa.

A proposta do projeto é combinar uma interface moderna com elementos 3D e interações utilizando tecnologias web atuais.

## Sobre o projeto

O portfólio foi desenvolvido com foco em:

* Desenvolvimento Front-end
* Experiências interativas
* Desenvolvimento 3D para Web
* Interface moderna e responsiva
* Componentização e organização de código
* Performance

Um dos principais elementos da aplicação é uma experiência 3D desenvolvida com React Three Fiber e Three.js, utilizada como parte da interação e navegação do portfólio.

## Tecnologias

* Next.js
* React
* TypeScript
* Three.js
* React Three Fiber
* React Three Drei
* Tailwind CSS
* Framer Motion
* Vercel

## Funcionalidades

* Interface responsiva
* Navegação entre seções
* Experiência 3D interativa
* Modelos 3D utilizando GLB/GLTF
* Animações e transições
* Seção de projetos
* Seção de tecnologias
* Certificações
* Formas de contato
* Suporte a diferentes idiomas

## Arquitetura

O projeto utiliza o App Router do Next.js e mantém uma separação entre páginas, componentes de interface e elementos relacionados à experiência 3D.

```text
app/
├── layout.tsx
├── page.tsx
├── projetos/
│   └── page.tsx
└── contato/
    └── page.tsx

components/
├── layout/
├── sections/
└── three/

public/
├── models/
├── images/
└── ...
```

Essa organização facilita a manutenção do projeto e permite que a interface e os elementos 3D sejam desenvolvidos de forma independente.

## Experiência 3D

A experiência 3D utiliza React Three Fiber sobre Three.js.

Entre os recursos utilizados estão:

* Modelos 3D
* Iluminação
* Câmera
* OrbitControls
* Animações
* Interação com mouse
* Zoom
* Elementos HTML integrados à cena 3D

O objetivo é utilizar o 3D não apenas como elemento visual, mas também como parte da experiência de navegação.

## Performance

A aplicação foi desenvolvida buscando manter uma experiência fluida mesmo utilizando elementos 3D e animações.

Algumas das estratégias consideradas no desenvolvimento incluem:

* Componentização
* Controle da quantidade de partículas
* Uso consciente de animações
* Separação dos componentes 3D
* Interface responsiva
* Organização dos recursos estáticos

## Deploy

O projeto está hospedado na Vercel.

**Portfólio:**
https://portifolio-chi-beryl.vercel.app/

## Objetivo

Além de funcionar como meu portfólio pessoal, este projeto também serve como um espaço para explorar e aplicar tecnologias relacionadas a:

* Front-end
* React
* Next.js
* TypeScript
* Three.js
* WebGL
* UI/UX
* Animações
* Experiências interativas

A ideia é demonstrar como diferentes tecnologias podem ser combinadas para criar experiências web interativas, mantendo uma interface intuitiva e uma estrutura organizada.

## Autor

**Daniel Colonheze**

Estudante de Engenharia de Software e desenvolvedor interessado em desenvolvimento Full Stack, aplicações web, computação em nuvem e experiências interativas com tecnologias 3D.
