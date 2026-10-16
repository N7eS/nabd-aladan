'use client';

import Link from 'next/link';

const hospitalDepartments = [
  { id: 1, name: 'العيادات الخارجية', icon: '🏥', desc: 'مبنى العيادات التخصصية ومواعيد المراجعة', query: 'Al+Adan+Hospital+Outpatient+Clinic' },
  { id: 2, name: 'قسم الطوارئ والحوادث', icon: '🚨', desc: 'استقبال الحالات العاجلة على مدار الساعة', query: 'Al+Adan+Hospital+Emergency+Department' },
  { id: 3, name: 'قسم الأطفال والولادة', icon: '👶', desc: 'أجنحة الأطفال وحديثي الولادة والطوارئ', query: 'Al+Adan+Hospital+Children+Hospital' },
  { id: 4, name: 'الصيدلية الرئيسية والصرف', icon: '💊', desc: 'صرف الأدوية الشهرية والمستلزمات', query: 'Al+Adan+Hospital+Pharmacy' },
  { id: 5, name: 'قسم الباطنية والأجنحة الطبية', icon: '🛏️', desc: 'أجنحة التنويم الداخلي للرجال والنساء', query: 'Al+Adan+Hospital+Internal+Medicine' },
  { id: 6, name: 'قسم الجراحة والعمليات', icon: '🔪', desc: 'غرف العمليات الجراحية وأجنحة الجراحة', query: 'Al+Adan+Hospital+Surgery+Department' },
  { id: 7, name: 'مختبر التحاليل وبنك الدم', icon: '🧪', desc: 'سحب الدم والتحاليل المخبرية', query: 'Al+Adan+Hospital+Laboratory' },
  { id: 8, name: 'قسم الأشعة والرنين المغناطيسي', icon: '🩻', desc: 'الأشعة المقطعية، السينية، والرنين', query: 'Al+Adan+Hospital+Radiology' },
  { id: 9, name: 'مبنى الإدارة والعلاقات العامة', icon: '🏢', desc: 'استقبال المراجعين وشكاوى الجمهور', query: 'Al+Adan+Hospital+Administration' }
];

export default function SmartPathPage() {
  const handleDepartmentClick = (query: string) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const url = `https://www.google.com/maps/dir/?api=1&destination=${query}&origin=${lat},${lng}`;
          window.open(url, '_blank');
        },
        () => {
          const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
          window.open(url, '_blank');
        }
      );
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-800 font-sans text-sm md:text-base">
      
      {/* Header / Navbar */}
      <header className="bg-emerald-900 text-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-3">
          <div>
            <h1 className="text-lg font-bold">نبض العدان</h1>
            <p className="text-[10px] text-emerald-200">مستشفى العدان - المسار الذكي</p>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-xs md:text-sm font-medium">
            <Link href="/" className="hover:text-emerald-200 transition">الرئيسية</Link>
            <Link href="/smart-path" className="hover:text-emerald-200 transition font-bold text-emerald-300">🧭 المسار الذكي</Link>
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
            <h2 className="text-xl font-bold text-slate-900">🧭 المسار الذكي وخريطة مستشفى العدان</h2>
            <p className="text-slate-500 text-xs">اختر القسم أو المبنى المطلوب أدناه، وسيفتح لك تطبيق قوقل ماب ليوجهك إليه مباشرة</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {hospitalDepartments.map((dept) => (
              <div
                key={dept.id}
                onClick={() => handleDepartmentClick(dept.query)}
                className="bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 p-5 rounded-xl cursor-pointer transition shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="text-3xl mb-2">{dept.icon}</div>
                  <h3 className="font-bold text-slate-800 text-base mb-1 group-hover:text-emerald-900 transition">{dept.name}</h3>
                  <p className="text-xs text-slate-600">{dept.desc}</p>
                </div>
                <div className="mt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:underline">
                  <span>📍 فتح في قوقل ماب ➔</span>
                </div>
              </div>
            ))}
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