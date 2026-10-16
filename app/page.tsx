'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-800 font-sans text-sm md:text-base">
      
      {/* Header / Navbar */}
      <header className="bg-emerald-900 text-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-3">
          <div>
            <h1 className="text-lg font-bold">نبض العدان</h1>
            <p className="text-[10px] text-emerald-200">مستشفى العدان - منصة العلاقات العامة</p>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-medium">
            <Link href="/" className="hover:text-emerald-200 transition font-bold">الرئيسية</Link>
            <Link href="/smart-path" className="hover:text-emerald-200 transition">🧭 المسار الذكي</Link>
            <Link href="/events" className="hover:text-emerald-200 transition text-emerald-300 font-bold">📅 الفعاليات الصحية</Link>
            <Link href="/complaints" className="hover:text-emerald-200 transition">📝 الشكاوى والمقترحات</Link>
            <Link href="/admin" className="bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg font-bold hover:bg-amber-300 transition shadow-sm">
              🔒 لوحة التحكم
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-10">
        <section className="text-center py-10 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-4">
          <h2 className="text-3xl font-extrabold text-emerald-900">مرحباً بكم في البوابة الرسمية</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            منصة متكاملة لتوجيه المراجعين عبر المسار الذكي لأقسام مستشفى العدان، وإدارة الفعاليات والأيام العالمية، واستقبال الشكاوى والمقترحات.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/smart-path" className="bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-800 transition shadow">
              🧭 اذهب إلى المسار الذكي والخريطة
            </Link>
            <Link href="/events" className="bg-emerald-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-900 transition shadow">
              📅 تصفح الفعاليات الصحية
            </Link>
            <Link href="/complaints" className="bg-slate-100 text-slate-800 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition border border-slate-300">
              📝 تقديم شكوى أو مقترح
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs border-t border-slate-800 mt-20">
        <p className="text-emerald-400 font-medium">منصة نبض العدان - رئيس العلاقات العامة</p>
      </footer>

    </div>
  );
}