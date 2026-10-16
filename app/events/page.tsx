'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface HealthEvent {
  id: number;
  title: string;
  department: string;
  date: string;
  description: string;
  addedBy: string;
}

export default function PublicEventsPage() {
  const [events, setEvents] = useState<HealthEvent[]>([]);

  useEffect(() => {
    // جلب الفعاليات المضافة من لوحة التحكم أو البيانات الافتراضية
    const savedEvents = localStorage.getItem('hospital_events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      const defaultEvents: HealthEvent[] = [
        {
          id: 1,
          title: 'حملة التوعية بسرطان الثدي (اليوم العالمي)',
          department: 'قسم الجراحة والعيادات الخارجية',
          date: '2026-10-20',
          description: 'فعالية توعوية في المدخل الرئيسي للعيادات الخارجية لتوزيع الإرشادات والفحوصات الوقائية.',
          addedBy: 'الإدارة'
        },
        {
          id: 2,
          title: 'اليوم العالمي لمرض السكري',
          department: 'قسم الأطفال والباطنية',
          date: '2026-11-14',
          description: 'فحص عشوائي لنسبة السكر في الدم وتقديم الاستشارات الطبية المجانية للمراجعين.',
          addedBy: 'الإدارة'
        }
      ];
      setEvents(defaultEvents);
      localStorage.setItem('hospital_events', JSON.stringify(defaultEvents));
    }
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-800 font-sans text-sm md:text-base">
      
      {/* Header / Navbar */}
      <header className="bg-emerald-900 text-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-3">
          <div>
            <h1 className="text-lg font-bold">نبض العدان</h1>
            <p className="text-[10px] text-emerald-200">مستشفى العدان - الفعاليات الصحية</p>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-medium">
            <Link href="/" className="hover:text-emerald-200 transition">الرئيسية</Link>
            <Link href="/smart-path" className="hover:text-emerald-200 transition">🧭 المسار الذكي</Link>
            <Link href="/events" className="hover:text-emerald-200 transition font-bold text-emerald-300">📅 الفعاليات الصحية</Link>
            <Link href="/complaints" className="hover:text-emerald-200 transition">📝 الشكاوى والمقترحات</Link>
            <Link href="/admin" className="bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg font-bold hover:bg-amber-300 transition shadow-sm">
              🔒 لوحة التحكم
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="border-r-4 border-emerald-600 pr-3">
            <h2 className="text-xl font-bold text-slate-900">📅 الفعاليات والأيام العالمية الصحية</h2>
            <p className="text-slate-500 text-xs">تعرف على أحدث الحملات الطبية والتوعوية المقامة في مستشفى العدان</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {events.length === 0 ? (
              <p className="text-xs text-slate-500 col-span-2 text-center py-8">لا توجد فعاليات حالياً.</p>
            ) : (
              events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3 flex flex-col justify-between hover:border-emerald-400 transition"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                        {ev.department}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">📅 {ev.date}</span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900">{ev.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{ev.description}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-400">
                    بواسطة: {ev.addedBy}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs border-t border-slate-800 mt-20">
        <p className="text-emerald-400 font-medium">منصة نبض العدان - رئيس العلاقات العامة</p>
      </footer>

    </div>
  );
}