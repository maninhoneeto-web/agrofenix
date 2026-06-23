import React from 'react';

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
      
      {/* Floating button with the official WhatsApp emblem */}
      <a
        href="https://wa.me/556134599455?text=Olá! Gostaria de fazer um pedido ou tirar dúvidas sobre os produtos da Agropecuária Fênix."
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#20ba5a] active:scale-95 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 border-2 border-white pointer-events-auto hover:rotate-6 group relative"
        title="Fale conosco no WhatsApp"
        id="btn-whatsapp-floating"
      >
        {/* Official WhatsApp SVG emblem instead of MessageCircle */}
        <svg
          viewBox="0 0 448 512"
          className="w-8 h-8 fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 472l111-29.1c32.6 17.8 69 27.2 106.6 27.2 122.4 0 222-99.6 222-222 0-59.3-23.2-115-65.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-65.6 17.2 17.5-64-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
        </span>
      </a>
    </div>
  );
}

