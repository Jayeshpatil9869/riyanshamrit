import React from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { AdminLayout } from '../../components/admin/AdminLayout';
import {
  History,
  Shield,
  Tag,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Clock,
  Trash2
} from 'lucide-react';

export const AdminActivityPage: React.FC = () => {
  const { activityLogs } = useCommerce();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'products':
        return <Package className="w-4 h-4 text-[#757d5c]" />;
      case 'orders':
        return <ShoppingBag className="w-4 h-4 text-blue-600" />;
      case 'customers':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'coupons':
        return <Tag className="w-4 h-4 text-emerald-600" />;
      case 'settings':
        return <Settings className="w-4 h-4 text-amber-600" />;
      default:
        return <Shield className="w-4 h-4 text-[#1a1c18]" />;
    }
  };

  return (
    <AdminLayout activeTab="activity">
      {/* Header */}
      <div className="pb-6 border-b border-[rgba(26,28,24,0.08)]">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[#757d5c] font-semibold block mb-1">
          SECURITY &amp; COMPLIANCE
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl text-[#1a1c18]">
          Audit Trail &amp; Activity Log
        </h1>
        <p className="text-xs text-[#1a1c18]/60 mt-1 font-body">
          Chronological timestamped records of all store changes, catalog modifications, dispatches, and coupon issuances.
        </p>
      </div>

      {/* Activity Timeline List */}
      <div className="bg-white rounded-3xl border border-[rgba(26,28,24,0.08)] p-6 sm:p-8 shadow-xs space-y-6">
        {activityLogs.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#1a1c18]/50">
            No activity records registered yet.
          </div>
        ) : (
          <div className="relative border-l border-[rgba(26,28,24,0.12)] ml-4 sm:ml-6 space-y-6">
            {activityLogs.map((log) => (
              <div key={log.id} className="relative pl-6 sm:pl-8 group">
                {/* Timeline Dot */}
                <div className="absolute -left-3 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#3c4433] flex items-center justify-center shadow-xs">
                  <div className="w-2 h-2 rounded-full bg-[#3c4433]" />
                </div>

                <div className="bg-[#fbfbf9] p-4 sm:p-5 rounded-2xl border border-[rgba(26,28,24,0.06)] space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(log.category)}
                      <strong className="text-xs text-[#1a1c18] font-medium">{log.action}</strong>
                      <span className="px-2 py-0.5 rounded-full bg-black/5 text-[#1a1c18]/70 text-[9px] font-mono uppercase font-bold">
                        {log.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#1a1c18]/50">
                      <Clock className="w-3 h-3" />
                      <span>{log.timestamp}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#1a1c18]/70 font-body leading-relaxed">
                    {log.details}
                  </p>

                  <div className="pt-2 border-t border-[rgba(26,28,24,0.04)] text-[10px] font-mono text-[#1a1c18]/40">
                    Initiated by: <strong>{log.adminName}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
