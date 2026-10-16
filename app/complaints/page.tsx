'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ComplaintsPage() {
  const [complaintForm, setComplaintForm] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`شكوى أو مقترح جديد من: ${complaintForm.name}`);
    const body = encodeURIComponent(
      `اسم المراجع: ${complaintForm.name}\nرقم الهاتف: ${complaintForm.phone}\n\nنص الشكوى / المقترح:\n${complaintForm.message}`
    );
    window.location.href = `mailto:nasseralmutairy@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-800 font-sans text-sm md:text-base">
      
      {/* Header / Navbar */}
      <header className="bg-emerald-900 text-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-3">
          <div>
            <h1 className="text-lg font-bold">نبض العدان</h1>
            <p className="text-[10px] text-emerald-200">مستشفى العدان - الشكاوى والمقترحات</p>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-medium">
            <Link href="/" className="hover:text-emerald-200 transition">الرئيسية</Link>
            <Link href="/smart-path" className="hover:text-emerald-200 transition">🧭 المسار الذكي</Link>
            <Link href="/complaints" className="hover:text-emerald-200 transition font-bold text-emerald-300">📝 الشكاوى والمقترحات</Link>
            <Link href="/admin" className="bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg font-bold hover:bg-amber-300 transition shadow-sm">
              🔒 لوحة التحكم
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
          <div className="border-r-4 border-emerald-700 pr-3">
            <h2 className="text-2xl font-bold text-slate-900">📝 الشكاوى والمقترحات</h2>
            <p className="text-slate-500 text-xs mt-1">صوتكم يهمنا لتحسين الخدمات، وسيرسل النموذج مباشرة إلى بريدك الشخصي</p>
          </div>

          <form onSubmit={handleComplaintSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الكامل:</label>
              <input
                type="text"
                placeholder="أدخل اسمك الكريم"
                value={complaintForm.name}
                onChange={e => setComplaintForm({ ...complaintForm, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف:</label>
              <input
                type="tel"
                placeholder="رقم الهاتف للتواصل"
                value={complaintForm.phone}
                onChange={e => setComplaintForm({ ...complaintForm, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">موضوع الشكوى أو المقترح:</label>
              <textarea
                rows={5}
                placeholder="اكتب تفاصيل الشكوى أو المقترح هنا..."
                value={complaintForm.message}
                onChange={e => setComplaintForm({ ...complaintForm, message: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-600"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm transition shadow"
            >
              إرسال الشكوى مباشرة إلى البريد (nasseralmutairy@gmail.com)
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs border-t border-slate-800 mt-20">
  <p className="text-emerald-400 font-medium">منصة نبض العدان - رئيس العلاقات العامة</p>
</footer>

    </div>
  );
}