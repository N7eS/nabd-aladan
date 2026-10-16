'use client';

import { useState } from 'react';
import Link from 'next/link';

interface DepartmentUser {
  id: number;
  name: string;      // مثل: د. خالد العنزي
  department: string;// مثل: قسم الجراحة
  username: string;
  pass: string;
}

interface HealthEvent {
  id: number;
  title: string;
  department: string; // القسم المسؤول
  date: string;
  description: string;
  addedBy: string;    // من أضافها
}

export default function EventsAdminDashboard() {
  // محاكاة تسجيل الدخول (يمكنك التبديل بين الأدمن ورؤساء الأقسام للتجربة)
  const [currentUser, setCurrentUser] = useState<{ role: 'admin' | 'head'; name: string; dept?: string }>({
    role: 'admin',
    name: 'المشرف العام (الأدمن)'
  });

  // قائمة رؤساء الأقسام (يمكن للأدمن إضافتهم، تعديلهم، أو حذفهم)
  const [users, setUsers] = useState<DepartmentUser[]>([
    { id: 1, name: 'د. خالد العنزي', department: 'قسم الجراحة', username: 'dr_khaled', pass: '1234' },
    { id: 2, name: 'د. مريم العتيبي', department: 'قسم الأطفال', username: 'dr_mariam', pass: '5678' },
  ]);

  // قائمة الفعاليات والأيام العالمية
  const [events, setEvents] = useState<HealthEvent[]>([
    { id: 101, title: 'حملة التوعية بسرطان الثدي (اليوم العالمي)', department: 'قسم الجراحة', date: '2026-10-20', description: 'فعالية توعوية في العيادات الخارجية', addedBy: 'د. خالد العنزي' },
    { id: 102, title: 'يوم الطفل العالمي للسكري', department: 'قسم الأطفال', date: '2026-11-14', description: 'فحص عشوائي وتوزيع ارشادات', addedBy: 'د. مريم العتيبي' },
  ]);

  // حقول إضافة مستتر رئيس قسم جديد (للأدمن فقط)
  const [newUserName, setNewUserName] = useState('');
  const [newDept, setNewDept] = useState('قسم الجراحة');
  const [newUsername, setNewUsername] = useState('');
  const [newPass, setNewPass] = useState('');

  // حقول إضافة فعالية جديدة
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventTargetDept, setEventTargetDept] = useState('قسم الجراحة');

  // إضافة رئيس قسم جديد (أدمن فقط)
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUsername || !newPass) return;
    const newUser: DepartmentUser = {
      id: Date.now(),
      name: newUserName,
      department: newDept,
      username: newUsername,
      pass: newPass
    };
    setUsers([...users, newUser]);
    setNewUserName('');
    setNewUsername('');
    setNewPass('');
  };

  // حذف رئيس قسم (أدمن فقط)
  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  // إضافة فعالية
  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDate) return;

    // لو كان المستخدم رئيس قسم، يتم إجبار الفعالية أن تكون على قسمه فقط
    const targetDepartment = currentUser.role === 'head' ? (currentUser.dept || '') : eventTargetDept;

    const newEvent: HealthEvent = {
      id: Date.now(),
      title: eventTitle,
      department: targetDepartment,
      date: eventDate,
      description: eventDesc,
      addedBy: currentUser.name
    };

    setEvents([newEvent, ...events]);
    setEventTitle('');
    setEventDate('');
    setEventDesc('');
  };

  // حذف فعالية (الأدمن يحذف أي شي، رئيس القسم يحذف فعالياته فقط)
  const handleDeleteEvent = (event: HealthEvent) => {
    if (currentUser.role === 'admin' || event.addedBy === currentUser.name) {
      setEvents(events.filter(ev => ev.id !== event.id));
    } else {
      alert('عذراً، لا تملك صلاحية حذف فعالية تخص قسم آخر!');
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-900 text-slate-100 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Navbar & Session Switcher for Testing */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow border border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-emerald-400">📅 لوحة تحكم الفعاليات والأيام العالمية</h1>
            <p className="text-sm text-slate-400 mt-1">مستشفى العدان - نظام الصلاحيات المخصص لرؤساء الأقسام والأدمن</p>
          </div>

          <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400">حالة الصلاحية الحالية:</span>
            <select
              className="bg-slate-800 text-emerald-400 font-bold text-sm px-3 py-1.5 rounded-lg border border-slate-600 focus:outline-none"
              value={currentUser.role === 'admin' ? 'admin' : currentUser.name}
              onChange={(e) => {
                if (e.target.value === 'admin') {
                  setCurrentUser({ role: 'admin', name: 'المشرف العام (الأدمن)' });
                } else {
                  const selectedUser = users.find(u => u.name === e.target.value);
                  if (selectedUser) {
                    setCurrentUser({ role: 'head', name: selectedUser.name, dept: selectedUser.department });
                  }
                }
              }}
            >
              <option value="admin">مشرف عام (الأدمن - تحكم كامل)</option>
              {users.map(u => (
                <option key={u.id} value={u.name}>رئيس قسم: {u.name} ({u.department})</option>
              ))}
            </select>
          </div>
        </div>

        {/* SECTION 1: Admin Only - Users & Passwords Management */}
        {currentUser.role === 'admin' && (
          <div className="bg-slate-800 p-6 rounded-2xl shadow border border-emerald-500/30 space-y-6">
            <div className="border-r-4 border-emerald-500 pr-3">
              <h2 className="text-lg font-bold text-emerald-300">👥 إدارة حسابات ورؤساء الأقسام (خاص بالأدمن)</h2>
              <p className="text-xs text-slate-400">إضافة يوزر وباسورد وتحديد القسم لكل رئيس قسم</p>
            </div>

            <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <input
                type="text"
                placeholder="اسم الدكتور / المسؤول (مثل د. خالد)"
                value={newUserName}
                onChange={e => setNewUserName(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                required
              />
              <select
                value={newDept}
                onChange={e => setNewDept(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm"
              >
                <option value="قسم الجراحة">قسم الجراحة</option>
                {/* يمكنك إضافة المزيد من الأقسام لاحقاً */}
                <option value="قسم الأطفال">قسم الأطفال</option>
                <option value="قسم الباطنية">قسم الباطنية</option>
                <option value="قسم الطوارئ">قسم الطوارئ</option>
              </select>
              <input
                type="text"
                placeholder="اسم المستخدم (Username)"
                value={newUsername}
                onChange={e => setNewUsername(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                required
              />
              <input
                type="text"
                placeholder="كلمة المرور (Password)"
                value={newPass}
                onChange={e => setNewPass(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                required
              />
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl px-4 py-2.5 text-sm transition">
                إنشاء حساب رئيس القسم
              </button>
            </form>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400 text-xs">
                    <th className="py-2.5 px-4">اسم المسؤول</th>
                    <th className="py-2.5 px-4">القسم الطبي</th>
                    <th className="py-2.5 px-4">اسم المستخدم</th>
                    <th className="py-2.5 px-4">كلمة المرور</th>
                    <th className="py-2.5 px-4 text-center">الإجراء</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {users.map(u => (
                    <tr key={u.id} className="hover:bg-slate-700/40">
                      <td className="py-3 px-4 font-semibold text-white">{u.name}</td>
                      <td className="py-3 px-4 text-emerald-400">{u.department}</td>
                      <td className="py-3 px-4 font-mono text-slate-300">{u.username}</td>
                      <td className="py-3 px-4 font-mono text-amber-400">{u.pass}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleDeleteUser(u.id)}
                          className="text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1 rounded-lg text-xs transition"
                        >
                          حذف الحساب
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 2: Add Event Form (Restricted to Department for Heads) */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow border border-slate-700 space-y-4">
          <div className="border-r-4 border-amber-500 pr-3">
            <h2 className="text-lg font-bold text-slate-200">
              {currentUser.role === 'admin' ? '➕ إضافة فعالية جديدة (للأدمن أو نيابة عن أي قسم)' : `➕ إضافة فعالية خاصة بـ (${currentUser.dept})`}
            </h2>
            <p className="text-xs text-slate-400">
              {currentUser.role === 'admin' ? 'يمكن للأدمن اختيار القسم ونشر الفعالية في أي مكان' : 'أنت تنشر ك رئيس قسم، وستسجل الفعالية باسم قسمك فقط حصرياً'}
            </p>
          </div>

          <form onSubmit={handleAddEvent} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="عنوان الفعالية أو اليوم العالمي"
              value={eventTitle}
              onChange={e => setEventTitle(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm"
              required
            />
            <input
              type="date"
              value={eventDate}
              onChange={e => setEventDate(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm"
              required
            />

            {/* إذا كان المستخدم أدمن يستطيع اختيار القسم، وإذا كان رئيس قسم يثبت قسمه تلقائياً */}
            {currentUser.role === 'admin' ? (
              <select
                value={eventTargetDept}
                onChange={e => setEventTargetDept(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm"
              >
                <option value="قسم الجراحة">قسم الجراحة</option>
                <option value="قسم الأطفال">قسم الأطفال</option>
                <option value="قسم الباطنية">قسم الباطنية</option>
                <option value="قسم الطوارئ">قسم الطوارئ</option>
              </select>
            ) : (
              <input
                type="text"
                disabled
                value={currentUser.dept}
                className="bg-slate-950 border border-slate-800 text-emerald-400 font-bold rounded-xl px-4 py-2.5 text-sm cursor-not-allowed"
              />
            )}

            <input
              type="text"
              placeholder="وصف تفصيلي للفعالية"
              value={eventDesc}
              onChange={e => setEventDesc(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm md:col-span-2"
            />
            
            <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl px-4 py-2.5 text-sm transition md:col-span-2">
              نشر الفعالية رسمياً
            </button>
          </form>
        </div>

        {/* SECTION 3: Events List & Strict Deletion/Edit Permissions */}
        <div className="bg-slate-800 rounded-2xl shadow border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-200">📋 جدول الفعاليات والأيام العالمية الحالية</h2>
            <span className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full">
              {currentUser.role === 'admin' ? 'صلاحية كاملة (تعديل/حذف للكل)' : `صلاحية محددة: تحكم بفعاليات ${currentUser.dept} فقط`}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right border-collapse text-sm">
              <thead>
                <tr className="bg-slate-900 text-slate-400 text-xs uppercase border-b border-slate-700">
                  <th className="py-3 px-6">عنوان الفعالية</th>
                  <th className="py-3 px-6">القسم المسؤول</th>
                  <th className="py-3 px-6">تاريخ الفعالية</th>
                  <th className="py-3 px-6">الوصف</th>
                  <th className="py-3 px-6">أضيفت بواسطة</th>
                  <th className="py-3 px-6 text-center">الإجراء (حذف)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {events.map(ev => {
                  // هل يملك هذا المستخدم صلاحية حذف هذه الفعالية؟
                  const canDelete = currentUser.role === 'admin' || ev.addedBy === currentUser.name;

                  return (
                    <tr key={ev.id} className="hover:bg-slate-700/40">
                      <td className="py-4 px-6 font-bold text-white">{ev.title}</td>
                      <td className="py-4 px-6 text-emerald-400 font-medium">{ev.department}</td>
                      <td className="py-4 px-6 text-slate-300 font-mono">{ev.date}</td>
                      <td className="py-4 px-6 text-slate-400">{ev.description}</td>
                      <td className="py-4 px-6 text-slate-300">{ev.addedBy}</td>
                      <td className="py-4 px-6 text-center">
                        {canDelete ? (
                          <button
                            onClick={() => handleDeleteEvent(ev)}
                            className="bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition"
                          >
                            حذف الفعالية
                          </button>
                        ) : (
                          <span className="text-xs text-slate-500 bg-slate-900 px-2.5 py-1 rounded-md">
                            غير مسموح (ليست تخص قسمك)
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}