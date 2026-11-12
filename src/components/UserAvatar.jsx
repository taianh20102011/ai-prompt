import React, { useState } from 'react';
import { 
  Bot, 
  Terminal, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  BrainCircuit, 
  Code2, 
  Flame, 
  Zap, 
  Orbit, 
  User 
} from 'lucide-react';

export const PRESET_AVATARS = [
  { id: 'none', label: 'Không dùng ảnh', desc: 'Chữ viết tắt' },
  { id: 'icon:bot', label: 'Cortex Bot', icon: Bot, color: 'from-indigo-600 to-blue-500', text: 'text-indigo-400' },
  { id: 'icon:brain', label: 'Neural Mind', icon: BrainCircuit, color: 'from-purple-600 to-pink-500', text: 'text-purple-400' },
  { id: 'icon:terminal', label: 'Enclave Shell', icon: Terminal, color: 'from-emerald-600 to-teal-500', text: 'text-emerald-400' },
  { id: 'icon:cpu', label: 'AI Processor', icon: Cpu, color: 'from-blue-600 to-cyan-500', text: 'text-cyan-400' },
  { id: 'icon:sparkles', label: 'Creative Spark', icon: Sparkles, color: 'from-amber-500 to-pink-500', text: 'text-amber-400' },
  { id: 'icon:shield', label: 'Zero-Trust', icon: ShieldCheck, color: 'from-emerald-700 to-emerald-500', text: 'text-emerald-400' },
  { id: 'icon:code', label: 'Clean Code', icon: Code2, color: 'from-sky-600 to-indigo-500', text: 'text-sky-400' },
  { id: 'icon:flame', label: 'Burstiness', icon: Flame, color: 'from-rose-600 to-amber-500', text: 'text-rose-400' },
  { id: 'icon:orbit', label: 'Orbital Tech', icon: Orbit, color: 'from-violet-600 to-indigo-600', text: 'text-violet-400' },
  { id: 'icon:zap', label: 'Ultra Fast', icon: Zap, color: 'from-amber-400 to-yellow-500', text: 'text-amber-400' },
];

function getInitials(name = '') {
  if (!name) return 'AI';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function UserAvatar({ avatar, name = '', size = 'w-12 h-12', className = '' }) {
  const [imgError, setImgError] = useState(false);

  // 1. Nếu avatar là một preset icon dạng "icon:name"
  if (avatar && avatar.startsWith('icon:')) {
    const preset = PRESET_AVATARS.find(p => p.id === avatar) || PRESET_AVATARS[1];
    const IconComponent = preset.icon || Bot;

    return (
      <div 
        className={`${size} rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 shadow-xs ${className}`}
        title={name || preset.label}
      >
        <IconComponent className="w-1/2 h-1/2 text-indigo-400" />
      </div>
    );
  }

  // 2. Nếu người dùng chọn "none", rỗng, hoặc ảnh bị lỗi: Render chữ viết tắt (Initials)
  if (!avatar || avatar === 'none' || imgError) {
    const initials = getInitials(name);
    return (
      <div 
        className={`${size} rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] font-mono font-bold flex items-center justify-center shrink-0 shadow-xs select-none ${className}`}
        title={name}
      >
        <span className="text-xs tracking-wider">{initials}</span>
      </div>
    );
  }

  // 3. Render ảnh tùy chỉnh (URL hoặc Base64 data URI do người dùng tự tải lên)
  return (
    <img
      src={avatar}
      alt={name || 'Avatar'}
      onError={() => setImgError(true)}
      className={`${size} rounded-xl object-cover border border-[var(--border-subtle)] shrink-0 shadow-xs ${className}`}
    />
  );
}
