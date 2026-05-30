'use client';

import { useState, useEffect } from 'react';
import { UserTable } from '@/features/users/components/UserTable';
import { userService } from '@/features/users/services/user-service';
import { ManagedUser } from '@/features/users/types';
import { LucideUserPlus, LucideUsers, LucideArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function UsersPage() {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    userService.getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background-primary text-ice-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link href="/" className="flex items-center gap-2 text-xs text-slate-500 hover:text-vision-500 transition-colors mb-2">
              <LucideArrowLeft className="w-3 h-3" />
              Voltar ao Início
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-vision-500/10 rounded-lg">
                <LucideUsers className="w-6 h-6 text-vision-500" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight font-secondary">Gerenciamento de Usuários</h1>
            </div>
            <p className="text-slate-400 text-sm">Convide e gerencie as permissões de acesso do ecossistema.</p>
          </div>

          <button className="vision-button-primary flex items-center justify-center gap-2 h-11">
            <LucideUserPlus className="w-4 h-4" />
            Convidar Usuário
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total de Usuários', value: users.length, icon: LucideUsers },
            { label: 'Ativos', value: users.filter(u => u.status === 'active').length, icon: LucideUserPlus },
            { label: 'Pendentes', value: users.filter(u => u.status === 'pending').length, icon: LucideClock },
          ].map((stat, i) => (
            <div key={i} className="vision-card p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-xl">
                <stat.icon className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>

        {/* User Table */}
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-vision-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <UserTable users={users} />
        )}
      </div>
    </div>
  );
}

// Simple Clock mock for the stats card
function LucideClock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
