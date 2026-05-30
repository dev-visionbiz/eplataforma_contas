import { ManagedUser } from '../types';
import { LucideMoreVertical, LucideShield, LucideUser, LucideClock } from 'lucide-react';

interface UserTableProps {
  users: ManagedUser[];
}

const roleLabels: Record<string, string> = {
  master_admin: 'Master Admin',
  accounting_admin: 'Adm. Contábil',
  client_admin: 'Adm. Cliente',
  analyst: 'Analista',
  employee: 'Funcionário',
};

const statusColors: Record<string, string> = {
  active: 'text-success-500 bg-success-500/10',
  pending: 'text-warning-500 bg-warning-500/10',
  suspended: 'text-danger-500 bg-danger-500/10',
};

export function UserTable({ users }: UserTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-background-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background-secondary/50 border-bottom border-border">
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Usuário</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Papel</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Último Acesso</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-vision-500/10 flex items-center justify-center text-vision-500 font-medium text-xs">
                      {user.fullName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-ice-50">{user.fullName}</div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                    <LucideShield className="w-3.5 h-3.5 text-vision-500" />
                    {roleLabels[user.role]}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${statusColors[user.status]}`}>
                    {user.status === 'active' ? 'Ativo' : user.status === 'pending' ? 'Pendente' : 'Suspenso'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <LucideClock className="w-3.5 h-3.5" />
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('pt-BR') : 'Nunca'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="p-1 hover:bg-slate-800 rounded transition-colors text-slate-500">
                    <LucideMoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
