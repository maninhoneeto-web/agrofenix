import React from 'react';
import { Phone, MapPin, Clock, MessageSquare, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-yellow-400 text-slate-900 border-t-4 border-red-600 font-sans" id="footer-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Store Intro */}
          <div className="space-y-4">
            <h3 className="text-lg font-black tracking-tight text-red-950 flex items-center gap-2">
              <span className="bg-red-600 text-white rounded-lg p-1.5 w-8 h-8 flex items-center justify-center font-black text-sm">F</span>
              Agropecuária Fênix
            </h3>
            <p className="text-sm leading-relaxed text-slate-850 font-medium">
              Sua parceira de confiança no Distrito Federal. Oferecemos o melhor em rações premium, medicamentos veterinários certificados, sementes selecionadas e artigos completos de avicultura e gaiolas ornamentais.
            </p>
            <div className="flex items-center gap-2 text-red-750 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-red-750" />
              <span>Garantia de Qualidade e Atendimento Familiar</span>
            </div>
          </div>

          {/* Column 2: Hours & Local */}
          <div className="space-y-4">
            <h4 className="text-md font-extrabold text-red-950 tracking-wide border-b border-yellow-500 pb-2">
              Informações & Expediente
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5 text-slate-800">
                <Clock className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                <div>
                  <strong className="text-red-950 block font-bold">Horário de Funcionamento:</strong>
                  Segunda a Sábado: 08:00 às 20:00
                  <br />
                  Domingo: 08:00 às 13:00
                </div>
              </li>
              <li className="flex items-start gap-2.5 text-slate-800">
                <MapPin className="w-4 h-4 text-red-600 mt-1 shrink-0" />
                <div>
                  <strong className="text-red-950 block font-bold">Endereço de Atendimento:</strong>
                  Ceilândia P Norte, Ceilândia - DF, Brasil (Sinalizada na entrada)
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-extrabold text-red-950 tracking-wide border-b border-yellow-500 pb-2">
              Fale Conosco
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-600" />
                <span>
                  Fixo: <a href="tel:6134599455" className="hover:text-red-800 font-extrabold text-red-700 transition-colors underline underline-offset-2">(61) 3459-9455</a>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-red-600" />
                <span>
                  WhatsApp: <a href="https://wa.me/556134599455" target="_blank" rel="noopener noreferrer" className="hover:text-red-800 font-extrabold text-red-700 transition-colors underline underline-offset-2">(61) 3459-9455</a>
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-800 text-xs font-medium">
                📲 Ligue ou envie mensagem no WhatsApp para encomendar rações frescas em fardo ou medicamentos pesados. Entregamos na sua região.
              </li>
            </ul>
          </div>

        </div>

        {/* SEO Tags Footer section */}
        <div className="mt-8 pt-8 border-t border-yellow-500 text-center text-xs text-slate-850 space-y-2">
          <p className="font-semibold">
            Agropecuária Fênix DF • CNPJ: Divulgado na Loja Clínica • Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-4 flex-wrap text-[11px] text-red-900 font-bold">
            <span>#RacoesCeilandia</span>
            <span>#RacoesPNorte</span>
            <span>#MedicamentosPetDF</span>
            <span>#AviculturaGaiolasDF</span>
            <span>#AgropecuariaFenix</span>
            <span>#ComprarRacaoGranel</span>
          </div>
          <p className="flex items-center justify-center gap-1 mt-4 text-[10px] font-bold text-red-950">
            Feito com <Heart className="w-3 h-3 text-red-600 fill-red-600" /> para os pets do Distrito Federal.
          </p>
        </div>
      </div>
    </footer>
  );
}
