const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '..', 'src', 'App.tsx');
let content = fs.readFileSync(appPath, 'utf8');

console.log('Starting increase_all_tiny_texts. Length:', content.length);

// 1. FAQ ACCORDION SIZES
content = content.replace(
  `<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-tight">
                      Frequently asked questions
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-600 mt-2">
                      Everything you need to know about tracking, documentation, customs, and shipment coordination.
                    </p>`,
  `<h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight">
                      Frequently asked questions
                    </h2>

                    <p className="text-sm sm:text-base text-neutral-600 mt-2.5">
                      Everything you need to know about tracking, documentation, customs, and shipment coordination.
                    </p>`
);

content = content.replace(
  `className="w-full bg-[#F5F2ED] border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-[#8B0D1A] transition"`,
  `className="w-full bg-[#F5F2ED] border border-neutral-200 rounded-xl pl-10 pr-4 py-3 text-sm text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-[#8B0D1A] transition"`
);

content = content.replace(
  `className="w-full p-4 sm:p-4.5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-[13.5px] text-neutral-900 hover:text-[#8B0D1A] transition cursor-pointer"`,
  `className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-neutral-900 hover:text-[#8B0D1A] transition cursor-pointer"`
);

content = content.replace(
  `className="px-4 pb-4 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-200/80 animate-in fade-in duration-200"`,
  `className="px-4 sm:px-5 pb-5 pt-2 text-sm text-neutral-700 leading-relaxed border-t border-neutral-200/80 animate-in fade-in duration-200"`
);

// 2. QUOTE FORM SIZES
content = content.replace(
  `<h3 className="text-xl sm:text-2xl font-black text-white">
                        Tell us what you need to move.
                      </h3>
                      <p className="text-xs text-white/80 mt-1 leading-relaxed">
                        Give us the shipment details and we’ll have the information needed to understand your logistics request.
                      </p>`,
  `<h3 className="text-2xl sm:text-3xl font-black text-white">
                        Tell us what you need to move.
                      </h3>
                      <p className="text-sm sm:text-base text-white/90 mt-1.5 leading-relaxed">
                        Give us the shipment details and we’ll have the information needed to understand your logistics request.
                      </p>`
);

content = content.replace(
  /label className="text-\[10px\] font-bold uppercase text-white\/80 block mb-1"/g,
  'label className="text-xs font-bold uppercase text-white/90 block mb-1.5"'
);

content = content.replace(
  /className="w-full bg-white text-neutral-900 rounded-lg px-3 py-2 text-xs focus:outline-none/g,
  'className="w-full bg-white text-neutral-900 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none'
);

content = content.replace(
  `className="w-full mt-4 bg-white hover:bg-[#F5F2ED] text-[#8B0D1A] font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"`,
  `className="w-full mt-4 bg-white hover:bg-[#F5F2ED] text-[#8B0D1A] font-extrabold py-4 rounded-xl text-sm uppercase tracking-wider transition shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"`
);

// 3. LEGACY SECTION SIZES
content = content.replace(
  `<h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 leading-tight">
                  Moving more than cargo.
                </h2>`,
  `<h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 leading-tight">
                  Moving more than cargo.
                </h2>`
);

content = content.replace(
  `className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-5 min-h-[48px]"`,
  `className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-5 min-h-[52px]"`
);

content = content.replace(
  `className={\`flex-1 py-2 text-xs font-bold rounded-lg transition capitalize cursor-pointer \${`,
  `className={\`flex-1 py-2.5 text-sm font-bold rounded-lg transition capitalize cursor-pointer \${`
);

// 4. FOOTER LINK SIZES
content = content.replace(
  `<ul className="space-y-2.5 text-xs text-neutral-400">`,
  `<ul className="space-y-3 text-sm text-neutral-300">`
);

content = content.replace(
  `<ul className="space-y-2.5 text-xs text-neutral-400">`,
  `<ul className="space-y-3 text-sm text-neutral-300">`
);

content = content.replace(
  `className="text-xs text-neutral-400 leading-relaxed mb-4"`,
  `className="text-sm text-neutral-300 leading-relaxed mb-4"`
);

content = content.replace(
  `className="w-full bg-white text-neutral-900 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#8B0D1A]"`,
  `className="w-full bg-white text-neutral-900 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B0D1A]"`
);

content = content.replace(
  `className="w-full bg-[#8B0D1A] hover:bg-[#720A15] text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition active:scale-95 cursor-pointer shadow-md"`,
  `className="w-full bg-[#8B0D1A] hover:bg-[#720A15] text-white font-bold py-3 rounded-lg text-sm uppercase tracking-wider transition active:scale-95 cursor-pointer shadow-md"`
);

fs.writeFileSync(appPath, content, 'utf8');
console.log('increase_all_tiny_texts completed. New length:', content.length);
