'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FolderGit2,
  Award,
  Briefcase,
  GraduationCap,
  Wrench,
  BookOpen,
  User,
  Share2,
  LayoutDashboard,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Check,
  AlertCircle,
  ExternalLink,
  Search,
  FileText,
  Image as ImageIcon,
  RefreshCw,
  Eye,
  EyeOff,
} from 'lucide-react';

type Tab =
  | 'overview'
  | 'projects'
  | 'certificates'
  | 'experience'
  | 'education'
  | 'skills'
  | 'notes'
  | 'profile'
  | 'socials';

function safeDateInput(val?: string | Date | null): string {
  if (!val) return '';
  const d = new Date(val);
  if (isNaN(d.getTime())) {
    if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
    if (typeof val === 'string' && /^\d{4}$/.test(val)) return `${val}-01-01`;
    return '';
  }
  return d.toISOString().split('T')[0];
}

function safeDisplayYear(val?: string | Date | null, fallback = 'Present'): string {
  if (!val) return fallback;
  const d = new Date(val);
  if (isNaN(d.getTime())) {
    if (typeof val === 'string' && val.length >= 4) return val.slice(0, 4);
    return fallback;
  }
  return String(d.getFullYear());
}

function safeDisplayDateMonthYear(val?: string | Date | null, fallback = '—'): string {
  if (!val) return fallback;
  const d = new Date(val);
  if (isNaN(d.getTime())) return typeof val === 'string' ? val : fallback;
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

interface AdminCMSProps {
  initialEmail: string;
}

export function AdminCMS({ initialEmail }: AdminCMSProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Data states
  const [stats, setStats] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [educations, setEducations] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [socials, setSocials] = useState<any[]>([]);

  // Search filter
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: string; id: string; name: string } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleLogout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  // Fetch data on tab change
  const refreshData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'overview') {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (data.success) setStats(data.stats);
      } else if (activeTab === 'projects') {
        const res = await fetch('/api/admin/projects');
        const data = await res.json();
        if (data.success) setProjects(data.projects);
      } else if (activeTab === 'certificates') {
        const res = await fetch('/api/admin/certificates');
        const data = await res.json();
        if (data.success) setCertificates(data.certificates);
      } else if (activeTab === 'experience') {
        const res = await fetch('/api/admin/experience');
        const data = await res.json();
        if (data.success) setExperiences(data.experiences);
      } else if (activeTab === 'education') {
        const res = await fetch('/api/admin/education');
        const data = await res.json();
        if (data.success) setEducations(data.educations);
      } else if (activeTab === 'skills') {
        const res = await fetch('/api/admin/skills');
        const data = await res.json();
        if (data.success) setSkills(data.skills);
      } else if (activeTab === 'notes') {
        const res = await fetch('/api/admin/notes');
        const data = await res.json();
        if (data.success) setNotes(data.notes);
      } else if (activeTab === 'profile') {
        const res = await fetch('/api/admin/profile');
        const data = await res.json();
        if (data.success) setProfile(data.profile);
      } else if (activeTab === 'socials') {
        const res = await fetch('/api/admin/socials');
        const data = await res.json();
        if (data.success) setSocials(data.socials);
      }
    } catch {
      showNotification('Failed to synchronize data from server', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [activeTab]);

  // Generic delete handler
  const executeDelete = async () => {
    if (!deleteConfirm) return;
    try {
      const res = await fetch(`/api/admin/${deleteConfirm.type}/${deleteConfirm.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Deletion failed');
      showNotification(`${deleteConfirm.name} deleted successfully`);
      setDeleteConfirm(null);
      refreshData();
    } catch (err: unknown) {
      showNotification(err instanceof Error ? err.message : 'Delete failed', 'error');
    }
  };

  // Toggle Experience Visibility
  const toggleExperienceVisibility = async (exp: any) => {
    const newVisibility = exp.isVisible === false ? true : false;
    try {
      const res = await fetch(`/api/admin/experience/${exp._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVisible: newVisibility }),
      });
      if (!res.ok) throw new Error('Failed to update visibility');
      showNotification(`"${exp.role}" set to ${newVisibility ? 'public' : 'hidden'}`);
      refreshData();
    } catch (err: unknown) {
      showNotification(err instanceof Error ? err.message : 'Error', 'error');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-cream)' }}>
      {/* CMS Sidebar */}
      <aside
        style={{
          width: '260px',
          borderRight: '1px solid var(--border-medium)',
          backgroundColor: 'var(--bg-surface)',
          padding: '2rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ marginBottom: '2rem', paddingLeft: '0.5rem' }}>
            <span className="kicker" style={{ marginBottom: 0 }}>PORTFOLIO CMS</span>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>Control Center</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{initialEmail}</p>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <SidebarButton
              icon={<LayoutDashboard size={18} />}
              label="Overview"
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            />
            <SidebarButton
              icon={<FolderGit2 size={18} />}
              label="Projects"
              active={activeTab === 'projects'}
              onClick={() => setActiveTab('projects')}
            />
            <SidebarButton
              icon={<Award size={18} />}
              label="Certificates"
              active={activeTab === 'certificates'}
              onClick={() => setActiveTab('certificates')}
            />
            <SidebarButton
              icon={<Briefcase size={18} />}
              label="Experience"
              active={activeTab === 'experience'}
              onClick={() => setActiveTab('experience')}
            />
            <SidebarButton
              icon={<GraduationCap size={18} />}
              label="Education"
              active={activeTab === 'education'}
              onClick={() => setActiveTab('education')}
            />
            <SidebarButton
              icon={<Wrench size={18} />}
              label="Skills"
              active={activeTab === 'skills'}
              onClick={() => setActiveTab('skills')}
            />
            <SidebarButton
              icon={<BookOpen size={18} />}
              label="Terminal Notes"
              active={activeTab === 'notes'}
              onClick={() => setActiveTab('notes')}
            />
            <SidebarButton
              icon={<User size={18} />}
              label="Profile & Bio"
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            />
            <SidebarButton
              icon={<Share2 size={18} />}
              label="Social Links"
              active={activeTab === 'socials'}
              onClick={() => setActiveTab('socials')}
            />
          </nav>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link
            href="/"
            target="_blank"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.88rem',
              color: 'var(--text-secondary)',
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Eye size={16} /> View Live Website
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontSize: '0.88rem',
              color: '#DC2626',
              padding: '0.6rem 0.8rem',
              borderRadius: 'var(--radius-sm)',
              textAlign: 'left',
              width: '100%',
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main CMS Area */}
      <main style={{ flex: 1, padding: '2.5rem 3rem', overflowY: 'auto' }}>
        {/* Toast Notification */}
        {notification && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.85rem 1.25rem',
              backgroundColor: notification.type === 'success' ? '#ECFDF5' : '#FEF2F2',
              color: notification.type === 'success' ? '#065F46' : '#991B1B',
              border: `1px solid ${notification.type === 'success' ? '#A7F3D0' : '#FCA5A5'}`,
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-md)',
              fontSize: '0.9rem',
            }}
          >
            {notification.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ marginBottom: '2.5rem' }}>
              <span className="kicker">System State</span>
              <h1 style={{ fontSize: '2.4rem' }}>Dashboard Overview</h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Live persistence metrics across MongoDB Atlas collections and GridFS buckets.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                marginBottom: '3rem',
              }}
            >
              <StatCard label="Total Projects" count={stats?.totalProjects ?? 0} icon={<FolderGit2 />} />
              <StatCard label="Certificates" count={stats?.totalCertificates ?? 0} icon={<Award />} />
              <StatCard label="Experience Items" count={stats?.totalExperiences ?? 0} icon={<Briefcase />} />
              <StatCard label="Published Notes" count={stats?.publishedNotes ?? 0} icon={<BookOpen />} />
              <StatCard label="Technical Skills" count={stats?.totalSkills ?? 0} icon={<Wrench />} />
            </div>

            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                padding: '2rem',
              }}
            >
              <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Storage Architecture Verification</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', fontSize: '0.9rem' }}>
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-warm)', borderRadius: '4px' }}>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Primary Database</p>
                  <p style={{ color: 'var(--text-secondary)' }}>MongoDB Atlas (Mongoose collections: Project, Cert, Experience, etc.)</p>
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-warm)', borderRadius: '4px' }}>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Binary Media Engine</p>
                  <p style={{ color: 'var(--text-secondary)' }}>MongoDB GridFS (`fs.files` & `fs.chunks` chunked streams)</p>
                </div>
                <div style={{ padding: '1rem', backgroundColor: 'var(--bg-warm)', borderRadius: '4px' }}>
                  <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>External Storage Status</p>
                  <p style={{ color: '#059669', fontWeight: 600 }}>100% Zero External S3 / R2 Dependencies</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <SectionHeader
              kicker="Portfolio Showcase"
              title="Project Management"
              onAdd={() => {
                setEditingItem({
                  title: '',
                  slug: '',
                  description: '',
                  longDescription: '',
                  coverImageId: '',
                  technologies: [],
                  githubUrl: '',
                  liveUrl: '',
                  status: 'completed',
                  featured: false,
                  order: projects.length + 1,
                });
                setActiveModal('project');
              }}
              onRefresh={refreshData}
            />

            <table className="editorial-table" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Title & Slug</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Technologies</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((proj) => (
                  <tr key={proj._id}>
                    <td style={{ width: '80px' }}>
                      {proj.coverImageId ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`/api/files/${proj.coverImageId}`}
                          alt={proj.title}
                          style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '2px' }}
                        />
                      ) : (
                        <div style={{ width: '60px', height: '40px', backgroundColor: 'var(--bg-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ImageIcon size={16} color="var(--text-muted)" />
                        </div>
                      )}
                    </td>
                    <td>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{proj.title}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>/{proj.slug}</p>
                    </td>
                    <td>
                      <span className="tag-editorial">{proj.status}</span>
                    </td>
                    <td>{proj.featured ? <span className="tag-accent">Yes</span> : 'No'}</td>
                    <td>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '280px' }}>
                        {proj.technologies?.slice(0, 3).map((t: string, i: number) => (
                          <span key={i} className="tag-editorial" style={{ fontSize: '0.75rem' }}>{t}</span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            setEditingItem({ ...proj });
                            setActiveModal('project');
                          }}
                          className="tag-editorial"
                          title="Edit"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'projects', id: proj._id, name: proj.title })}
                          className="tag-editorial"
                          style={{ color: '#DC2626' }}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <div>
            <SectionHeader
              kicker="Accreditations"
              title="Certificate & Credential Documents"
              onAdd={() => {
                setEditingItem({
                  title: '',
                  issuer: '',
                  issueDate: safeDateInput(new Date()),
                  description: '',
                  credentialUrl: '',
                  coverImageId: '',
                  fileId: '',
                  order: certificates.length + 1,
                });
                setActiveModal('certificate');
              }}
              onRefresh={refreshData}
            />

            <table className="editorial-table" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Title & Issuer</th>
                  <th>Date</th>
                  <th>PDF Attached</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert._id}>
                    <td style={{ width: '80px' }}>
                      {cert.coverImageId ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={`/api/files/${cert.coverImageId}`}
                          alt={cert.title}
                          style={{ width: '60px', height: '40px', objectFit: 'contain', backgroundColor: 'var(--bg-warm)' }}
                        />
                      ) : (
                        <div style={{ width: '60px', height: '40px', backgroundColor: 'var(--bg-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Award size={16} />
                        </div>
                      )}
                    </td>
                    <td>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{cert.title}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--accent-burnt)' }}>{cert.issuer}</p>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                      {safeDisplayDateMonthYear(cert.issueDate)}
                    </td>
                    <td>
                      {cert.fileId ? (
                        <a href={`/api/files/${cert.fileId}?download=true`} target="_blank" rel="noopener noreferrer" className="btn-editorial-outline" style={{ fontSize: '0.8rem' }}>
                          <FileText size={14} /> PDF Attached
                        </a>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>None</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            setEditingItem({
                              ...cert,
                              issueDate: safeDateInput(cert.issueDate),
                            });
                            setActiveModal('certificate');
                          }}
                          className="tag-editorial"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'certificates', id: cert._id, name: cert.title })}
                          className="tag-editorial"
                          style={{ color: '#DC2626' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div>
            <SectionHeader
              kicker="Career Path"
              title="Professional Experience"
              onAdd={() => {
                setEditingItem({
                  company: '',
                  role: '',
                  location: 'Sri Lanka',
                  employmentType: 'full-time',
                  startDate: safeDateInput(new Date()),
                  endDate: '',
                  current: true,
                  description: '',
                  achievements: [],
                  technologies: [],
                  isVisible: true,
                  order: experiences.length + 1,
                });
                setActiveModal('experience');
              }}
              onRefresh={refreshData}
            />

            <table className="editorial-table" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
              <thead>
                <tr>
                  <th>Company & Role</th>
                  <th>Period</th>
                  <th>Type</th>
                  <th>Visibility</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {experiences.map((exp) => (
                  <tr key={exp._id}>
                    <td>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{exp.role}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--accent-burnt)' }}>{exp.company} — {exp.location}</p>
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                      {safeDisplayYear(exp.startDate, '—')} - {exp.current ? 'Present' : safeDisplayYear(exp.endDate, 'Present')}
                    </td>
                    <td><span className="tag-editorial">{exp.employmentType}</span></td>
                    <td>
                      <button
                        onClick={() => toggleExperienceVisibility(exp)}
                        className={exp.isVisible !== false ? 'tag-accent' : 'tag-editorial'}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          cursor: 'pointer',
                          padding: '0.35rem 0.65rem',
                          fontSize: '0.78rem',
                          fontFamily: 'var(--font-mono)',
                          border: exp.isVisible !== false ? '1px solid var(--accent-burnt)' : '1px solid var(--border-medium)',
                          backgroundColor: exp.isVisible !== false ? 'var(--accent-burnt-soft)' : 'transparent',
                          color: exp.isVisible !== false ? 'var(--accent-burnt)' : 'var(--text-muted)',
                        }}
                        title={exp.isVisible !== false ? 'Public on portfolio. Click to hide.' : 'Hidden from portfolio. Click to make public.'}
                      >
                        {exp.isVisible !== false ? (
                          <>
                            <Eye size={13} />
                            <span>PUBLIC</span>
                          </>
                        ) : (
                          <>
                            <EyeOff size={13} />
                            <span>HIDDEN</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            setEditingItem({
                              ...exp,
                              startDate: safeDateInput(exp.startDate),
                              endDate: safeDateInput(exp.endDate),
                              isVisible: exp.isVisible !== false,
                            });
                            setActiveModal('experience');
                          }}
                          className="tag-editorial"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'experience', id: exp._id, name: `${exp.role} at ${exp.company}` })}
                          className="tag-editorial"
                          style={{ color: '#DC2626' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div>
            <SectionHeader
              kicker="Academics"
              title="Education Records"
              onAdd={() => {
                setEditingItem({
                  institution: '',
                  degree: '',
                  fieldOfStudy: '',
                  startDate: safeDateInput(new Date()),
                  endDate: '',
                  current: false,
                  grade: '',
                  description: '',
                  achievements: [],
                  order: educations.length + 1,
                });
                setActiveModal('education');
              }}
              onRefresh={refreshData}
            />

            <table className="editorial-table" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
              <thead>
                <tr>
                  <th>Degree & Institution</th>
                  <th>Field</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {educations.map((edu) => (
                  <tr key={edu._id}>
                    <td>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{edu.degree}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{edu.institution}</p>
                    </td>
                    <td>{edu.fieldOfStudy}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            setEditingItem({
                              ...edu,
                              startDate: safeDateInput(edu.startDate),
                              endDate: safeDateInput(edu.endDate),
                            });
                            setActiveModal('education');
                          }}
                          className="tag-editorial"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'education', id: edu._id, name: edu.degree })}
                          className="tag-editorial"
                          style={{ color: '#DC2626' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div>
            <SectionHeader
              kicker="Tooling"
              title="Technical Skills"
              onAdd={() => {
                setEditingItem({
                  name: '',
                  category: 'Frontend',
                  proficiency: 90,
                  iconName: 'Code',
                  order: skills.length + 1,
                });
                setActiveModal('skill');
              }}
              onRefresh={refreshData}
            />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {skills.map((skill) => (
                <div
                  key={skill._id}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    padding: '1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span className="tag-editorial" style={{ fontSize: '0.75rem', marginBottom: '0.25rem', display: 'inline-block' }}>{skill.category}</span>
                    <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{skill.name}</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--accent-burnt)' }}>{skill.proficiency}% Proficiency</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button
                      onClick={() => {
                        setEditingItem({ ...skill });
                        setActiveModal('skill');
                      }}
                      className="tag-editorial"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm({ type: 'skills', id: skill._id, name: skill.name })}
                      className="tag-editorial"
                      style={{ color: '#DC2626' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notes Tab */}
        {activeTab === 'notes' && (
          <div>
            <SectionHeader
              kicker="Writings"
              title="Notes from the Terminal"
              onAdd={() => {
                setEditingItem({
                  title: '',
                  slug: '',
                  summary: '',
                  content: '',
                  tags: [],
                  published: true,
                  readTimeMinutes: 4,
                });
                setActiveModal('note');
              }}
              onRefresh={refreshData}
            />

            <table className="editorial-table" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
              <thead>
                <tr>
                  <th>Title & Slug</th>
                  <th>Published</th>
                  <th>Read Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note) => (
                  <tr key={note._id}>
                    <td>
                      <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{note.title}</p>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>/{note.slug}</p>
                    </td>
                    <td>{note.published ? <span className="tag-accent">Published</span> : <span className="tag-editorial">Draft</span>}</td>
                    <td>{note.readTimeMinutes} min</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            setEditingItem({ ...note });
                            setActiveModal('note');
                          }}
                          className="tag-editorial"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'notes', id: note._id, name: note.title })}
                          className="tag-editorial"
                          style={{ color: '#DC2626' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && profile && (
          <div style={{ maxWidth: '720px' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <span className="kicker">Identity & Resumes</span>
              <h1 style={{ fontSize: '2.4rem' }}>Profile & Biography</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Manage your personal details and GridFS-stored CV document.</p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const res = await fetch('/api/admin/profile', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(profile),
                  });
                  if (!res.ok) throw new Error('Profile update failed');
                  showNotification('Profile updated successfully');
                  refreshData();
                } catch (err: unknown) {
                  showNotification(err instanceof Error ? err.message : 'Update failed', 'error');
                }
              }}
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-medium)',
                borderRadius: 'var(--radius-sm)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Full Name</label>
                <input
                  type="text"
                  value={profile.fullName || ''}
                  onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Professional Title</label>
                <input
                  type="text"
                  value={profile.title || ''}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Hero Headline</label>
                <input
                  type="text"
                  value={profile.headline || ''}
                  onChange={(e) => setProfile({ ...profile, headline: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Bio</label>
                <textarea
                  rows={4}
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Email</label>
                  <input
                    type="email"
                    value={profile.email || ''}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Location</label>
                  <input
                    type="text"
                    value={profile.location || ''}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* GridFS Media Uploaders */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', marginTop: '1rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>GridFS Stored Documents</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <FileUploader
                    label="Avatar Portrait"
                    documentType="profile-avatar"
                    currentFileId={profile.avatarImageId}
                    onUploadSuccess={(fileId) => setProfile({ ...profile, avatarImageId: fileId })}
                  />
                  <FileUploader
                    label="Resume PDF"
                    documentType="cv-pdf"
                    currentFileId={profile.resumeFileId}
                    isPdf
                    onUploadSuccess={(fileId) => setProfile({ ...profile, resumeFileId: fileId })}
                  />
                </div>
              </div>

              <button type="submit" className="btn-editorial-primary" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                Save Profile Changes
              </button>
            </form>
          </div>
        )}

        {/* Socials Tab */}
        {activeTab === 'socials' && (
          <div>
            <SectionHeader
              kicker="Channels"
              title="Social Links"
              onAdd={() => {
                setEditingItem({
                  platform: '',
                  url: '',
                  icon: 'Globe',
                  order: socials.length + 1,
                  isPublic: true,
                });
                setActiveModal('social');
              }}
              onRefresh={refreshData}
            />

            <table className="editorial-table" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
              <thead>
                <tr>
                  <th>Platform</th>
                  <th>URL</th>
                  <th>Public</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {socials.map((soc) => (
                  <tr key={soc._id}>
                    <td style={{ fontWeight: 600 }}>{soc.platform}</td>
                    <td>
                      <a href={soc.url} target="_blank" rel="noopener noreferrer" className="btn-editorial-outline" style={{ fontSize: '0.85rem' }}>
                        {soc.url} <ExternalLink size={12} />
                      </a>
                    </td>
                    <td>{soc.isPublic ? 'Yes' : 'Hidden'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            setEditingItem({ ...soc });
                            setActiveModal('social');
                          }}
                          className="tag-editorial"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'socials', id: soc._id, name: soc.platform })}
                          className="tag-editorial"
                          style={{ color: '#DC2626' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* MODAL: Project Create / Edit */}
      {activeModal === 'project' && editingItem && (
        <ModalWrapper
          title={editingItem._id ? 'Edit Project' : 'Create New Project'}
          onClose={() => setActiveModal(null)}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const url = editingItem._id ? `/api/admin/projects/${editingItem._id}` : '/api/admin/projects';
              const method = editingItem._id ? 'PUT' : 'POST';
              try {
                const res = await fetch(url, {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(editingItem),
                });
                if (!res.ok) {
                  const errData = await res.json();
                  throw new Error(errData.error || 'Operation failed');
                }
                showNotification(`Project ${editingItem._id ? 'updated' : 'created'} successfully`);
                setActiveModal(null);
                refreshData();
              } catch (err: unknown) {
                showNotification(err instanceof Error ? err.message : 'Error', 'error');
              }
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Title</label>
              <input
                type="text"
                required
                value={editingItem.title}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                  setEditingItem({ ...editingItem, title, slug: editingItem.slug || slug });
                }}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Slug (URL identifier)</label>
              <input
                type="text"
                required
                value={editingItem.slug}
                onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                style={{ width: '100%', fontFamily: 'var(--font-mono)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Brief Description</label>
              <textarea
                rows={2}
                required
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Long Blueprint Overview</label>
              <textarea
                rows={4}
                value={editingItem.longDescription || ''}
                onChange={(e) => setEditingItem({ ...editingItem, longDescription: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            {/* GridFS Cover Uploader */}
            <FileUploader
              label="Project Cover Image (GridFS)"
              documentType="project-cover"
              currentFileId={editingItem.coverImageId}
              onUploadSuccess={(fileId) => setEditingItem({ ...editingItem, coverImageId: fileId })}
            />

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Technologies (comma separated)</label>
              <input
                type="text"
                value={Array.isArray(editingItem.technologies) ? editingItem.technologies.join(', ') : ''}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>GitHub URL</label>
                <input
                  type="url"
                  value={editingItem.githubUrl || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, githubUrl: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Live Demo URL</label>
                <input
                  type="url"
                  value={editingItem.liveUrl || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, liveUrl: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <input
                  type="checkbox"
                  checked={editingItem.featured || false}
                  onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                />
                Mark as Featured
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                Status:
                <select
                  value={editingItem.status || 'completed'}
                  onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                >
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setActiveModal(null)} className="btn-editorial-secondary">Cancel</button>
              <button type="submit" className="btn-editorial-primary">Save Project</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* MODAL: Certificate Create / Edit */}
      {activeModal === 'certificate' && editingItem && (
        <ModalWrapper
          title={editingItem._id ? 'Edit Certificate' : 'Add Certificate'}
          onClose={() => setActiveModal(null)}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const url = editingItem._id ? `/api/admin/certificates/${editingItem._id}` : '/api/admin/certificates';
              const method = editingItem._id ? 'PUT' : 'POST';
              try {
                const res = await fetch(url, {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(editingItem),
                });
                if (!res.ok) throw new Error('Certificate save failed');
                showNotification('Certificate saved successfully');
                setActiveModal(null);
                refreshData();
              } catch (err: unknown) {
                showNotification(err instanceof Error ? err.message : 'Error', 'error');
              }
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Title</label>
              <input
                type="text"
                required
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Issuer</label>
                <input
                  type="text"
                  required
                  value={editingItem.issuer}
                  onChange={(e) => setEditingItem({ ...editingItem, issuer: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Issue Date</label>
                <input
                  type="date"
                  required
                  value={editingItem.issueDate}
                  onChange={(e) => setEditingItem({ ...editingItem, issueDate: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Description</label>
              <textarea
                rows={3}
                required
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            {/* GridFS Uploaders for Preview & PDF */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <FileUploader
                label="Certificate Image Preview"
                documentType="certificate-image"
                currentFileId={editingItem.coverImageId}
                onUploadSuccess={(fileId) => setEditingItem({ ...editingItem, coverImageId: fileId })}
              />
              <FileUploader
                label="Certificate PDF Doc"
                documentType="certificate-pdf"
                currentFileId={editingItem.fileId}
                isPdf
                onUploadSuccess={(fileId) => setEditingItem({ ...editingItem, fileId })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setActiveModal(null)} className="btn-editorial-secondary">Cancel</button>
              <button type="submit" className="btn-editorial-primary">Save Certificate</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* MODAL: Experience Create / Edit */}
      {activeModal === 'experience' && editingItem && (
        <ModalWrapper
          title={editingItem._id ? 'Edit Experience' : 'Add Experience Record'}
          onClose={() => setActiveModal(null)}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const url = editingItem._id ? `/api/admin/experience/${editingItem._id}` : '/api/admin/experience';
              const method = editingItem._id ? 'PUT' : 'POST';
              try {
                const payload = {
                  ...editingItem,
                  achievements: Array.isArray(editingItem.achievements)
                    ? editingItem.achievements
                    : typeof editingItem.achievements === 'string'
                      ? editingItem.achievements.split('\n').map((s: string) => s.trim()).filter(Boolean)
                      : [],
                  technologies: Array.isArray(editingItem.technologies)
                    ? editingItem.technologies
                    : typeof editingItem.technologies === 'string'
                      ? editingItem.technologies.split(',').map((s: string) => s.trim()).filter(Boolean)
                      : [],
                  order: Number(editingItem.order) || 0,
                  current: Boolean(editingItem.current),
                  isVisible: editingItem.isVisible !== false,
                  endDate: editingItem.current ? undefined : (editingItem.endDate || undefined),
                };
                const res = await fetch(url, {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                });
                if (!res.ok) {
                  const errData = await res.json();
                  throw new Error(errData.error || 'Failed to save experience');
                }
                showNotification(`Experience ${editingItem._id ? 'updated' : 'created'} successfully`);
                setActiveModal(null);
                refreshData();
              } catch (err: unknown) {
                showNotification(err instanceof Error ? err.message : 'Error', 'error');
              }
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Job Title / Role</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Full-Stack Engineer"
                  value={editingItem.role || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Company / Organization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Luvi Clothing"
                  value={editingItem.company || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Colombo, Sri Lanka (or Remote)"
                  value={editingItem.location || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Employment Type</label>
                <select
                  value={editingItem.employmentType || 'full-time'}
                  onChange={(e) => setEditingItem({ ...editingItem, employmentType: e.target.value })}
                  style={{ width: '100%' }}
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="internship">Internship</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Start Date</label>
                <input
                  type="date"
                  required
                  value={safeDateInput(editingItem.startDate)}
                  onChange={(e) => setEditingItem({ ...editingItem, startDate: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  End Date {editingItem.current && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Present)</span>}
                </label>
                <input
                  type="date"
                  disabled={editingItem.current}
                  value={editingItem.current ? '' : safeDateInput(editingItem.endDate)}
                  onChange={(e) => setEditingItem({ ...editingItem, endDate: e.target.value })}
                  style={{ width: '100%', opacity: editingItem.current ? 0.5 : 1 }}
                />
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={Boolean(editingItem.current)}
                onChange={(e) => setEditingItem({ ...editingItem, current: e.target.checked, endDate: e.target.checked ? '' : editingItem.endDate })}
              />
              Currently working in this role
            </label>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Description</label>
              <textarea
                rows={3}
                required
                placeholder="High-level summary of responsibilities, architecture, achievements..."
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                Key Achievements (One bullet point per line)
              </label>
              <textarea
                rows={3}
                placeholder="Architected responsive web application&#10;Integrated secure payment gateway"
                value={Array.isArray(editingItem.achievements) ? editingItem.achievements.join('\n') : (editingItem.achievements || '')}
                onChange={(e) => setEditingItem({ ...editingItem, achievements: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                Technologies (comma separated)
              </label>
              <input
                type="text"
                placeholder="Next.js, TypeScript, Docker, MongoDB"
                value={Array.isArray(editingItem.technologies) ? editingItem.technologies.join(', ') : (editingItem.technologies || '')}
                onChange={(e) => setEditingItem({ ...editingItem, technologies: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Display Order</label>
                <input
                  type="number"
                  value={editingItem.order ?? 0}
                  onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value, 10) || 0 })}
                  style={{ width: '100%' }}
                />
              </div>
              <FileUploader
                label="Company Logo (GridFS)"
                documentType="company-logo"
                currentFileId={editingItem.logoFileId}
                onUploadSuccess={(fileId) => setEditingItem({ ...editingItem, logoFileId: fileId })}
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer', marginTop: '0.25rem' }}>
              <input
                type="checkbox"
                checked={editingItem.isVisible !== false}
                onChange={(e) => setEditingItem({ ...editingItem, isVisible: e.target.checked })}
              />
              Show publicly on portfolio (Visible)
            </label>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setActiveModal(null)} className="btn-editorial-secondary">Cancel</button>
              <button type="submit" className="btn-editorial-primary">Save Experience</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* MODAL: Education Create / Edit */}
      {activeModal === 'education' && editingItem && (
        <ModalWrapper
          title={editingItem._id ? 'Edit Education' : 'Add Education Record'}
          onClose={() => setActiveModal(null)}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const url = editingItem._id ? `/api/admin/education/${editingItem._id}` : '/api/admin/education';
              const method = editingItem._id ? 'PUT' : 'POST';
              try {
                const payload = {
                  ...editingItem,
                  achievements: Array.isArray(editingItem.achievements)
                    ? editingItem.achievements
                    : typeof editingItem.achievements === 'string'
                      ? editingItem.achievements.split('\n').map((s: string) => s.trim()).filter(Boolean)
                      : [],
                  order: Number(editingItem.order) || 0,
                  current: Boolean(editingItem.current),
                  isVisible: editingItem.isVisible !== false,
                  endDate: editingItem.current ? undefined : (editingItem.endDate || undefined),
                };
                const res = await fetch(url, {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                });
                if (!res.ok) {
                  const errData = await res.json();
                  throw new Error(errData.error || 'Failed to save education');
                }
                showNotification(`Education ${editingItem._id ? 'updated' : 'created'} successfully`);
                setActiveModal(null);
                refreshData();
              } catch (err: unknown) {
                showNotification(err instanceof Error ? err.message : 'Error', 'error');
              }
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Degree / Qualification</label>
              <input
                type="text"
                required
                placeholder="e.g. BSc (Hons) in Information Technology Specialising in Software Engineering"
                value={editingItem.degree || ''}
                onChange={(e) => setEditingItem({ ...editingItem, degree: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Institution / University</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sri Lanka Institute of Information Technology (SLIIT)"
                  value={editingItem.institution || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Field of Study</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Software Engineering"
                  value={editingItem.fieldOfStudy || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, fieldOfStudy: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Start Date</label>
                <input
                  type="date"
                  required
                  value={safeDateInput(editingItem.startDate)}
                  onChange={(e) => setEditingItem({ ...editingItem, startDate: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  End Date {editingItem.current && <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Expected / Present)</span>}
                </label>
                <input
                  type="date"
                  disabled={editingItem.current}
                  value={editingItem.current ? '' : safeDateInput(editingItem.endDate)}
                  onChange={(e) => setEditingItem({ ...editingItem, endDate: e.target.value })}
                  style={{ width: '100%', opacity: editingItem.current ? 0.5 : 1 }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={Boolean(editingItem.current)}
                  onChange={(e) => setEditingItem({ ...editingItem, current: e.target.checked, endDate: e.target.checked ? '' : editingItem.endDate })}
                />
                Currently enrolled here
              </label>

              <div style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="Grade / Honors (e.g. Dean's List, First Class)"
                  value={editingItem.grade || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, grade: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Description</label>
              <textarea
                rows={3}
                required
                placeholder="Overview of curriculum, coursework, focus areas..."
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                Key Achievements (One bullet point per line)
              </label>
              <textarea
                rows={3}
                placeholder="Completed specialization in Cloud Systems&#10;Selected for Student Ambassador program"
                value={Array.isArray(editingItem.achievements) ? editingItem.achievements.join('\n') : (editingItem.achievements || '')}
                onChange={(e) => setEditingItem({ ...editingItem, achievements: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'center' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Display Order</label>
                <input
                  type="number"
                  value={editingItem.order ?? 0}
                  onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value, 10) || 0 })}
                  style={{ width: '100%' }}
                />
              </div>
              <FileUploader
                label="Institution Logo (GridFS)"
                documentType="education-logo"
                currentFileId={editingItem.logoFileId}
                onUploadSuccess={(fileId) => setEditingItem({ ...editingItem, logoFileId: fileId })}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setActiveModal(null)} className="btn-editorial-secondary">Cancel</button>
              <button type="submit" className="btn-editorial-primary">Save Education</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* MODAL: Skill Create / Edit */}
      {activeModal === 'skill' && editingItem && (
        <ModalWrapper
          title={editingItem._id ? 'Edit Skill' : 'Add Technical Skill'}
          onClose={() => setActiveModal(null)}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const url = editingItem._id ? `/api/admin/skills/${editingItem._id}` : '/api/admin/skills';
              const method = editingItem._id ? 'PUT' : 'POST';
              try {
                const payload = {
                  ...editingItem,
                  proficiency: Number(editingItem.proficiency) || 85,
                  order: Number(editingItem.order) || 0,
                };
                const res = await fetch(url, {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                });
                if (!res.ok) {
                  const errData = await res.json();
                  throw new Error(errData.error || 'Failed to save skill');
                }
                showNotification(`Skill ${editingItem._id ? 'updated' : 'created'} successfully`);
                setActiveModal(null);
                refreshData();
              } catch (err: unknown) {
                showNotification(err instanceof Error ? err.message : 'Error', 'error');
              }
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Skill Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Next.js, Docker, MongoDB"
                value={editingItem.name || ''}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Category</label>
                <select
                  value={editingItem.category || 'Frontend'}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  style={{ width: '100%' }}
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                  Proficiency ({editingItem.proficiency || 85}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editingItem.proficiency ?? 85}
                  onChange={(e) => setEditingItem({ ...editingItem, proficiency: parseInt(e.target.value, 10) || 0 })}
                  style={{ width: '100%', marginTop: '0.5rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Icon Name (Lucide icon)</label>
                <input
                  type="text"
                  placeholder="Code, Server, Database, Cloud..."
                  value={editingItem.iconName || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, iconName: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Display Order</label>
                <input
                  type="number"
                  value={editingItem.order ?? 0}
                  onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value, 10) || 0 })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setActiveModal(null)} className="btn-editorial-secondary">Cancel</button>
              <button type="submit" className="btn-editorial-primary">Save Skill</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* MODAL: Note Create / Edit */}
      {activeModal === 'note' && editingItem && (
        <ModalWrapper
          title={editingItem._id ? 'Edit Note' : 'Add Note from the Terminal'}
          onClose={() => setActiveModal(null)}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const url = editingItem._id ? `/api/admin/notes/${editingItem._id}` : '/api/admin/notes';
              const method = editingItem._id ? 'PUT' : 'POST';
              try {
                const payload = {
                  ...editingItem,
                  tags: Array.isArray(editingItem.tags)
                    ? editingItem.tags
                    : typeof editingItem.tags === 'string'
                      ? editingItem.tags.split(',').map((s: string) => s.trim()).filter(Boolean)
                      : [],
                  readTimeMinutes: Number(editingItem.readTimeMinutes) || 3,
                  published: Boolean(editingItem.published),
                };
                const res = await fetch(url, {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                });
                if (!res.ok) {
                  const errData = await res.json();
                  throw new Error(errData.error || 'Failed to save note');
                }
                showNotification(`Note ${editingItem._id ? 'updated' : 'created'} successfully`);
                setActiveModal(null);
                refreshData();
              } catch (err: unknown) {
                showNotification(err instanceof Error ? err.message : 'Error', 'error');
              }
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Title</label>
              <input
                type="text"
                required
                value={editingItem.title || ''}
                onChange={(e) => {
                  const title = e.target.value;
                  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                  setEditingItem({ ...editingItem, title, slug: editingItem.slug || slug });
                }}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Slug (URL identifier)</label>
              <input
                type="text"
                required
                value={editingItem.slug || ''}
                onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                style={{ width: '100%', fontFamily: 'var(--font-mono)' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Brief Summary</label>
              <textarea
                rows={2}
                required
                value={editingItem.summary || ''}
                onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Full Content (Markdown / Text)</label>
              <textarea
                rows={6}
                required
                value={editingItem.content || ''}
                onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                style={{ width: '100%', fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="Architecture, DevOps, React"
                  value={Array.isArray(editingItem.tags) ? editingItem.tags.join(', ') : (editingItem.tags || '')}
                  onChange={(e) => setEditingItem({ ...editingItem, tags: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Estimated Read Time (minutes)</label>
                <input
                  type="number"
                  min="1"
                  value={editingItem.readTimeMinutes ?? 3}
                  onChange={(e) => setEditingItem({ ...editingItem, readTimeMinutes: parseInt(e.target.value, 10) || 3 })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <FileUploader
              label="Cover Image (GridFS, optional)"
              documentType="note-cover"
              currentFileId={editingItem.coverImageId}
              onUploadSuccess={(fileId) => setEditingItem({ ...editingItem, coverImageId: fileId })}
            />

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={Boolean(editingItem.published)}
                onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
              />
              Publish to live website
            </label>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setActiveModal(null)} className="btn-editorial-secondary">Cancel</button>
              <button type="submit" className="btn-editorial-primary">Save Note</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* MODAL: Social Link Create / Edit */}
      {activeModal === 'social' && editingItem && (
        <ModalWrapper
          title={editingItem._id ? 'Edit Social Link' : 'Add Social Link'}
          onClose={() => setActiveModal(null)}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const url = editingItem._id ? `/api/admin/socials/${editingItem._id}` : '/api/admin/socials';
              const method = editingItem._id ? 'PUT' : 'POST';
              try {
                const payload = {
                  ...editingItem,
                  order: Number(editingItem.order) || 0,
                  isPublic: Boolean(editingItem.isPublic),
                };
                const res = await fetch(url, {
                  method,
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                });
                if (!res.ok) {
                  const errData = await res.json();
                  throw new Error(errData.error || 'Failed to save social link');
                }
                showNotification(`Social link ${editingItem._id ? 'updated' : 'created'} successfully`);
                setActiveModal(null);
                refreshData();
              } catch (err: unknown) {
                showNotification(err instanceof Error ? err.message : 'Error', 'error');
              }
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Platform Name</label>
              <input
                type="text"
                required
                placeholder="e.g. GitHub, LinkedIn, X / Twitter"
                value={editingItem.platform || ''}
                onChange={(e) => setEditingItem({ ...editingItem, platform: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Profile URL</label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={editingItem.url || ''}
                onChange={(e) => setEditingItem({ ...editingItem, url: e.target.value })}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Icon</label>
                <input
                  type="text"
                  required
                  placeholder="Github, Linkedin, Twitter, Mail, Globe"
                  value={editingItem.icon || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, icon: e.target.value })}
                  style={{ width: '100%' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Display Order</label>
                <input
                  type="number"
                  value={editingItem.order ?? 0}
                  onChange={(e) => setEditingItem({ ...editingItem, order: parseInt(e.target.value, 10) || 0 })}
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={editingItem.isPublic ?? true}
                onChange={(e) => setEditingItem({ ...editingItem, isPublic: e.target.checked })}
              />
              Show publicly in portfolio
            </label>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem' }}>
              <button type="button" onClick={() => setActiveModal(null)} className="btn-editorial-secondary">Cancel</button>
              <button type="submit" className="btn-editorial-primary">Save Social Link</button>
            </div>
          </form>
        </ModalWrapper>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(20, 19, 17, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 150,
            backdropFilter: 'blur(4px)',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-sm)',
              padding: '2rem',
              maxWidth: '440px',
              width: '100%',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <h3 style={{ fontSize: '1.3rem', color: '#DC2626', marginBottom: '0.75rem' }}>Confirm Deletion</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Are you sure you want to permanently delete <strong>{deleteConfirm.name}</strong>? Any associated binary files in MongoDB GridFS will also be removed.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem' }}>
              <button onClick={() => setDeleteConfirm(null)} className="btn-editorial-secondary">Cancel</button>
              <button onClick={executeDelete} className="btn-editorial-primary" style={{ backgroundColor: '#DC2626' }}>
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.7rem 0.85rem',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.92rem',
        fontWeight: active ? 600 : 400,
        color: active ? 'var(--accent-burnt)' : 'var(--text-secondary)',
        backgroundColor: active ? 'var(--accent-burnt-soft)' : 'transparent',
        textAlign: 'left',
        width: '100%',
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function StatCard({ label, count, icon }: { label: string; count: number; icon: React.ReactNode }) {
  return (
    <div style={{ padding: '1.75rem', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--accent-burnt)', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{label.toUpperCase()}</span>
        {icon}
      </div>
      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 600, color: 'var(--text-primary)' }}>{count}</p>
    </div>
  );
}

function SectionHeader({ kicker, title, onAdd, onRefresh }: { kicker: string; title: string; onAdd: () => void; onRefresh: () => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
      <div>
        <span className="kicker">{kicker}</span>
        <h1 style={{ fontSize: '2.2rem' }}>{title}</h1>
      </div>
      <div style={{ display: 'flex', gap: '0.8rem' }}>
        <button onClick={onRefresh} className="btn-editorial-secondary" title="Refresh">
          <RefreshCw size={16} />
        </button>
        <button onClick={onAdd} className="btn-editorial-primary">
          <Plus size={16} /> Add Record
        </button>
      </div>
    </div>
  );
}

function ModalWrapper({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(20, 19, 17, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 120,
        backdropFilter: 'blur(5px)',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-sm)',
          maxWidth: '640px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
          <h2 style={{ fontSize: '1.4rem' }}>{title}</h2>
          <button onClick={onClose} style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function FileUploader({
  label,
  documentType,
  currentFileId,
  isPdf = false,
  onUploadSuccess,
}: {
  label: string;
  documentType: string;
  currentFileId?: string;
  isPdf?: boolean;
  onUploadSuccess: (fileId: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [fileId, setFileId] = useState(currentFileId);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    formData.append('isPublic', 'true');

    try {
      const res = await fetch('/api/admin/files/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      setFileId(data.fileId);
      onUploadSuccess(data.fileId);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '1rem', border: '1px dashed var(--border-medium)', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-warm)' }}>
      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>{label}</label>

      {fileId && (
        <div style={{ marginBottom: '0.75rem' }}>
          {isPdf ? (
            <a href={`/api/files/${fileId}?download=true`} target="_blank" rel="noopener noreferrer" className="btn-editorial-outline" style={{ fontSize: '0.85rem' }}>
              <FileText size={16} /> View Current PDF ({fileId.slice(-6)})
            </a>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/api/files/${fileId}`}
              alt="Preview"
              style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
            />
          )}
        </div>
      )}

      <input
        type="file"
        accept={isPdf ? 'application/pdf' : 'image/jpeg,image/png,image/webp,image/svg+xml'}
        onChange={handleFileChange}
        disabled={uploading}
        style={{ fontSize: '0.85rem' }}
      />
      {uploading && <p style={{ fontSize: '0.8rem', color: 'var(--accent-burnt)', marginTop: '0.25rem' }}>Streaming to MongoDB GridFS...</p>}
    </div>
  );
}
