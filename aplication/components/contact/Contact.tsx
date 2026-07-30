export function Contact() {
  return (
    <section id="contato" className="px-6 md:px-16 py-24 bg-black">
      <p className="text-purple-400 font-mono text-sm mb-4">03 / CONTATO</p>
      <h2 className="text-5xl md:text-6xl font-serif text-white mb-4">
        Vamos Conversar<span className="text-purple-400">.</span>
      </h2>
      <p className="text-gray-400 mb-16">
        Tem um projeto em mente? Adoraria ouvir sobre ele.
      </p>

      <div className="flex flex-col gap-6 max-w-md">
        <a
          href="mailto:danielcolonhze@gmail.com"
          className="flex items-center justify-between border-b border-purple-900/30 pb-4 text-gray-300 hover:text-purple-400 transition-colors"
        >
          <span>E-mail</span>
          <span>danielcolonhze@gmail.com</span>
        </a>

        <a
          href="https://github.com/Daniel-Colonheze"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between border-b border-purple-900/30 pb-4 text-gray-300 hover:text-purple-400 transition-colors"
        >
          <span>GitHub</span>
          <span>github.com/Daniel-Colonheze</span>
        </a>

        <a
          href="https://www.linkedin.com/in/daniel-colonheze/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between border-b border-purple-900/30 pb-4 text-gray-300 hover:text-purple-400 transition-colors"
        >
          <span>LinkedIn</span>
          <span>linkedin.com/in/daniel-colonheze</span>
        </a>
      </div>
    </section>
  );
}