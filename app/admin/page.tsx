'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DepartmentUser {
  id: number;
  name: string;
  department: string;
  username: string;
  pass: string;
}

interface HealthEvent {
  id: number;
  title: string;
  department: string;
  date: string;
  description: string;
  addedBy: string;
}

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [userRole, setUserRole] = useState<'admin' | 'head'>('head');
  const [userName, setUserName] = useState('');
  const [userDept, setUserDept] = useState('');

  const [departments, setDepartments] = useState<string[]>([
    'قسم الجراحة',
    'قسم الأطفال',
    'قسم الباطنية',
    'قسم الطوارئ',
    'العيادات الخارجية',
    'مختبر التحاليل'
  ]);
  const [newDeptName, setNewDeptName] = useState('');

  const [users, setUsers] = useState<DepartmentUser[]>([
    { id: 1, name: 'رئيس العلاقات العامة', department: 'جميع الأقسام', username: 'admin', pass: 'admin123' },
    { id: 2, name: 'د. خالد العنزي', department: 'قسم الجراحة', username: 'dr_khaled', pass: '1234' },
    { id: 3, name: 'د. مريم العتيبي', department: 'قسم الأطفال', username: 'dr_mariam', pass: '1234' },
  ]);

  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [newUserName, setNewUserName] = useState('');
  const [newUserDept, setNewUserDept] = useState('قسم الجراحة');
  const [newUserUsername, setNewUserUsername] = useState('');
  const [newUserPass, setNewUserPass] = useState('');

  const [events, setEvents] = useState<HealthEvent[]>([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventTargetDept, setEventTargetDept] = useState('قسم الجراحة');

  const [editingEventId, setEditingEventId] = useState<number | null>(null);

  useEffect(() => {
    const savedEvents = localStorage.getItem('hospital_events');
    const savedUsers = localStorage.getItem('hospital_users');
    const savedDepts = localStorage.getItem('hospital_depts');

    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      const defaultEvs: HealthEvent[] = [
        {
          id: 1,
          title: 'حملة التوعية بسرطان الثدي (اليوم العالمي)',
          department: 'قسم الجراحة',
          date: '2026-10-20',
          description: 'فعالية توعوية في المدخل الرئيسي للعيادات الخارجية.',
          addedBy: 'الإدارة'
        },
        {
          id: 2,
          title: 'اليوم العالمي لمرض السكري',
          department: 'قسم الأطفال',
          date: '2026-11-14',
          description: 'فحص عشوائي لنسبة السكر في الدم.',
          addedBy: 'الإدارة'
        }
      ];
      setEvents(defaultEvs);
      localStorage.setItem('hospital_events', JSON.stringify(defaultEvs));
    }

    if (savedUsers) setUsers(JSON.parse(savedUsers));
    if (savedDepts) setDepartments(JSON.parse(savedDepts));
  }, []);

  const saveEventsToStorage = (updated: HealthEvent[]) => {
    setEvents(updated);
    localStorage.setItem('hospital_events', JSON.stringify(updated));
  };

  const saveUsersToStorage = (updated: DepartmentUser[]) => {
    setUsers(updated);
    localStorage.setItem('hospital_users', JSON.stringify(updated));
  };

  const saveDeptsToStorage = (updated: string[]) => {
    setDepartments(updated);
    localStorage.setItem('hospital_depts', JSON.stringify(updated));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = users.find(acc => acc.username === username && acc.pass === password);
    if (found) {
      setIsLoggedIn(true);
      if (found.username === 'admin') {
        setUserRole('admin');
      } else {
        setUserRole('head');
      }
      setUserName(found.name);
      setUserDept(found.department);
      if (found.department) {
        setEventTargetDept(found.department);
      }
    } else {
      alert('اسم المستخدم أو كلمة المرور غير صحيحة!');
    }
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserUsername || !newUserPass) return;

    if (editingUserId !== null) {
      const updated = users.map(u => u.id === editingUserId ? {
        ...u,
        name: newUserName,
        department: newUserDept,
        username: newUserUsername,
        pass: newUserPass
      } : u);
      saveUsersToStorage(updated);
      setEditingUserId(null);
    } else {
      const newUser: DepartmentUser = {
        id: Date.now(),
        name: newUserName,
        department: newUserDept,
        username: newUserUsername,
        pass: newUserPass
      };
      saveUsersToStorage([...users, newUser]);
    }

    setNewUserName('');
    setNewUserUsername('');
    setNewUserPass('');
  };

  const handleEditUser = (user: DepartmentUser) => {
    setEditingUserId(user.id);
    setNewUserName(user.name);
    setNewUserDept(user.department);
    setNewUserUsername(user.username);
    setNewUserPass(user.pass);
  };

  const handleDeleteUser = (id: number) => {
    const updated = users.filter(u => u.id !== id);
    saveUsersToStorage(updated);
  };

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName || departments.includes(newDeptName)) return;
    const updated = [...departments, newDeptName];
    saveDeptsToStorage(updated);
    setNewDeptName('');
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle || !eventDate) return;

    const targetDept = userRole === 'admin' ? eventTargetDept : userDept;

    if (editingEventId !== null) {
      const updated = events.map(ev => ev.id === editingEventId ? {
        ...ev,
        title: eventTitle,
        date: eventDate,
        department: targetDept,
        description: eventDesc
      } : ev);
      saveEventsToStorage(updated);
      setEditingEventId(null);
    } else {
      const newEvent: HealthEvent = {
        id: Date.now(),
        title: eventTitle,
        department: targetDept,
        date: eventDate,
        description: eventDesc || 'لا يوجد وصف',
        addedBy: userName
      };
      saveEventsToStorage([newEvent, ...events]);
    }

    setEventTitle('');
    setEventDate('');
    setEventDesc('');
  };

  const handleEditEvent = (ev: HealthEvent) => {
    setEditingEventId(ev.id);
    setEventTitle(ev.title);
    setEventDate(ev.date);
    setEventDesc(ev.description);
    setEventTargetDept(ev.department);
  };

  const handleDeleteEvent = (id: number) => {
    const updated = events.filter(ev => ev.id !== id);
    saveEventsToStorage(updated);
  };

  if (!isLoggedIn) {
    return (
      <div dir="rtl" className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-slate-100 font-sans">
        <div className="bg-slate-800 border border-slate-700 p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-xl md:text-2xl font-bold text-blue-400">🔒 دخول لوحة التحكم</h1>
            <p className="text-xs text-slate-400">منصة نبض العدان - إدارة العلاقات العامة ورؤساء الأقسام</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">اسم المستخدم:</label>
              <input
                type="text"
                placeholder="أدخل اسم المستخدم"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">كلمة المرور:</label>
              <input
                type="password"
                placeholder="أدخل كلمة المرور"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl text-sm transition">
              تسجيل الدخول
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-400 hover:underline">العودة للرئيسية ➔</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-slate-900 text-slate-100 p-3 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        {/* Header */}
        <div className="bg-slate-800 p-4 md:p-6 rounded-2xl shadow border border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-lg md:text-2xl font-bold text-blue-400">⚙️ لوحة الإدارة والفعاليات</h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              المستخدم: <span className="text-white font-bold">{userName}</span> ({userDept})
            </p>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <Link href="/events" target="_blank" className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 rounded-xl text-xs font-bold transition">
              👁️ عرض صفحة المراجعين
            </Link>
            <button onClick={() => setIsLoggedIn(false)} className="bg-rose-600/20 text-rose-300 border border-rose-500/30 px-3 py-2 rounded-xl text-xs font-bold">
              تسجيل الخروج 🚪
            </button>
          </div>
        </div>

        {/* القسم الخاص بالأدمن فقط */}
        {userRole === 'admin' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            <div className="bg-slate-800 p-4 md:p-6 rounded-2xl shadow border border-slate-700 space-y-4">
              <h2 className="text-base md:text-lg font-bold text-blue-400">🏥 إضافة قسم جديد للمستشفى</h2>
              <form onSubmit={handleAddDept} className="flex flex-col md:flex-row gap-3">
                <input
                  type="text"
                  placeholder="اسم القسم الجديد"
                  value={newDeptName}
                  onChange={e => setNewDeptName(e.target.value)}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm"
                  required
                />
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl text-sm font-bold">
                  إضافة القسم
                </button>
              </form>
              <div className="flex flex-wrap gap-2 pt-2">
                {departments.map((d, idx) => (
                  <span key={idx} className="bg-slate-900 border border-slate-700 px-3 py-1 rounded-lg text-xs text-blue-300">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 p-4 md:p-6 rounded-2xl shadow border border-slate-700 space-y-4">
              <h2 className="text-base md:text-lg font-bold text-blue-400">
                {editingUserId ? '✏️ تعديل بيانات رئيس القسم' : '➕ إضافة حساب رئيس قسم جديد'}
              </h2>
              <form onSubmit={handleSaveUser} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="اسم المسؤول"
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm"
                  required
                />
                <select
                  value={newUserDept}
                  onChange={e => setNewUserDept(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm"
                >
                  {departments.map((d, idx) => (
                    <option key={idx} value={d}>{d}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="اسم المستخدم"
                  value={newUserUsername}
                  onChange={e => setNewUserUsername(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="كلمة المرور"
                  value={newUserPass}
                  onChange={e => setNewUserPass(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm"
                  required
                />
                <button type="submit" className="md:col-span-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-xl text-sm transition">
                  {editingUserId ? 'حفظ التعديلات' : 'إضافة حساب رئيس القسم'}
                </button>
              </form>
            </div>

          </div>
        )}

        {/* قائمة رؤساء الأقسام - متجاوبة مع الهواتف */}
        {userRole === 'admin' && (
          <div className="bg-slate-800 rounded-2xl shadow border border-slate-700 overflow-hidden p-4 md:p-6 space-y-4">
            <h3 className="font-bold text-slate-200">👥 إدارة حسابات ورؤساء الأقسام</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {users.map(u => (
                <div key={u.id} className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex justify-between items-center gap-2">
                  <div className="space-y-1">
                    <p className="font-bold text-sm text-white">{u.name}</p>
                    <p className="text-xs text-blue-400">{u.department}</p>
                    <p className="text-xs font-mono text-slate-400">اسم المستخدم: {u.username} | السر: {u.pass}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button onClick={() => handleEditUser(u)} className="bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-lg text-xs font-bold">تعديل</button>
                    {u.username !== 'admin' && (
                      <button onClick={() => handleDeleteUser(u.id)} className="bg-rose-500/20 text-rose-300 px-2.5 py-1 rounded-lg text-xs font-bold">حذف</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* نموذج الفاعلية */}
        <div className="bg-slate-800 p-4 md:p-6 rounded-2xl shadow border border-slate-700 space-y-4">
          <h2 className="text-base md:text-lg font-bold text-blue-400">
            {editingEventId ? '✏️ تعديل الفعالية' : '📅 إضافة ونشر الفعاليات الصحية'}
          </h2>
          <form onSubmit={handleSaveEvent} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">عنوان الفعالية:</label>
              <input
                type="text"
                placeholder="عنوان الفعالية"
                value={eventTitle}
                onChange={e => setEventTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">التاريخ:</label>
              <input
                type="date"
                value={eventDate}
                onChange={e => setEventDate(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">القسم المسؤول:</label>
              {userRole === 'admin' ? (
                <select
                  value={eventTargetDept}
                  onChange={e => setEventTargetDept(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm"
                >
                  {departments.map((d, idx) => (
                    <option key={idx} value={d}>{d}</option>
                  ))}
                </select>
              ) : (
                <input type="text" disabled value={userDept} className="w-full bg-slate-950 border border-slate-800 text-blue-400 font-bold rounded-xl px-4 py-2 text-sm cursor-not-allowed" />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">وصف الفعالية:</label>
              <input
                type="text"
                placeholder="وصف تفصيلي للفعالية"
                value={eventDesc}
                onChange={e => setEventDesc(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm"
              />
            </div>

            <button type="submit" className="md:col-span-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl py-3 text-sm transition mt-2">
              {editingEventId ? 'حفظ تعديل الفعالية' : 'نشر الفعالية لصفحة المراجعين'}
            </button>
          </form>
        </div>

        {/* عرض الفعاليات المنشورة ببطاقات مخصصة للهواتف */}
        <div className="bg-slate-800 rounded-2xl shadow border border-slate-700 p-4 md:p-6 space-y-4">
          <h3 className="font-bold text-slate-200">📋 جميع الفعاليات المنشورة</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map(ev => {
              // الصلاحية: الأدمن يقدر يعدل/يحذف الكل، ورئيس القسم يقدر يعدل/يحذف أي فعالية تابعة لقسمه أو أضافها بنفسه
              const canModify = userRole === 'admin' || ev.department.includes(userDept) || ev.addedBy === userName;

              return (
                <div key={ev.id} className="bg-slate-900 border border-slate-700 p-4 rounded-xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <span className="bg-blue-900/60 text-blue-300 text-xs font-bold px-2 py-0.5 rounded-md border border-blue-700/50">
                        {ev.department}
                      </span>
                      <span className="text-xs font-mono text-slate-400">📅 {ev.date}</span>
                    </div>
                    <h4 className="font-bold text-white text-base pt-1">{ev.title}</h4>
                    <p className="text-xs text-slate-400">{ev.description}</p>
                    <p className="text-[11px] text-slate-500 pt-1">بواسطة: {ev.addedBy}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                    {canModify ? (
                      <>
                        <button onClick={() => handleEditEvent(ev)} className="bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition">
                          ✏️ تعديل
                        </button>
                        <button onClick={() => handleDeleteEvent(ev.id)} className="bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition">
                          🗑️ حذف
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-slate-500 bg-slate-950 px-3 py-1 rounded-md">
                        محمية (قسم آخر)
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}