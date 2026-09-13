import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Briefcase, 
  Search, 
  MapPin, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Sparkles, 
  Filter,
  Check,
  Building2
} from 'lucide-react';
import { apiMatchJobs } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { DemoModeBadge } from '../components/DemoModeBadge';
import { ScoreGauge } from '../components/ScoreGauge';

export const JobMatcherPage = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [locationFilter, setLocationFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState({});

  const loadJobs = async () => {
    setLoading(true);
    try {
      const res = await apiMatchJobs(user?.profile);
      if (res && res.jobs) {
        setJobs(res.jobs);
      }
    } catch (err) {
      console.warn('Failed to load matched jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleApply = (jobId) => {
    setAppliedJobs(prev => ({ ...prev, [jobId]: true }));
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.requiredSkills || []).some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (locationFilter === 'remote') {
      return job.location.toLowerCase().includes('remote');
    }
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#34d399' }}>
              <Briefcase size={22} />
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Intelligent Job Matcher
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '6px' }}>
            Curated openings ranked by skill overlap, experience fit, and ATS probability.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <DemoModeBadge />
          <span className="badge badge-success">{jobs.length} Matched Positions</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="var(--text-dim)" />
          <input
            type="text"
            placeholder="Search by role, company, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              width: '100%'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Location:</span>
          <button
            onClick={() => setLocationFilter('all')}
            className={`btn btn-sm ${locationFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Locations
          </button>
          <button
            onClick={() => setLocationFilter('remote')}
            className={`btn btn-sm ${locationFilter === 'remote' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Remote Only
          </button>
        </div>
      </div>

      {/* Jobs List */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton" style={{ height: '170px', width: '100%' }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredJobs.map((job) => {
            const hasApplied = appliedJobs[job.id];

            return (
              <div key={job.id} className="glass-card interactive" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '14px' }}>
                  <div style={{ flex: 1, minWidth: '260px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff' }}>{job.title}</h2>
                      <span className={`badge ${
                        job.matchPercentage >= 85 ? 'badge-success' : 'badge-cyan'
                      }`}>
                        {job.fitLevel || 'Good Match'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px', fontSize: '0.825rem', color: 'var(--text-dim)', flexWrap: 'wrap' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffffff', fontWeight: 600 }}>
                        <Building2 size={14} color="#38bdf8" /> {job.company}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <MapPin size={14} /> {job.location}
                      </span>
                      {job.salary && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontWeight: 600 }}>
                          <DollarSign size={14} /> {job.salary}
                        </span>
                      )}
                      {job.experience && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={14} /> {job.experience}
                        </span>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <ScoreGauge score={job.matchPercentage} size={68} strokeWidth={6} label="Match" />
                    <button
                      onClick={() => handleApply(job.id)}
                      className={`btn btn-sm ${hasApplied ? 'btn-secondary' : 'btn-primary'}`}
                      style={{ minWidth: '100px' }}
                    >
                      {hasApplied ? (
                        <>
                          <Check size={14} color="#10b981" />
                          <span>Applied</span>
                        </>
                      ) : (
                        <>
                          <span>Quick Apply</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {job.description}
                </p>

                {/* Skills match breakdown */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                  <div>
                    <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>
                      Skills Matched ({job.matchedSkills?.length || 0}):
                    </span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                      {job.matchedSkills?.map((ms, i) => (
                        <span key={i} className="badge badge-success">
                          <CheckCircle2 size={12} /> {ms}
                        </span>
                      ))}
                    </div>
                  </div>

                  {job.missingSkills && job.missingSkills.length > 0 && (
                    <div>
                      <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase' }}>
                        Missing Requirements:
                      </span>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                        {job.missingSkills.map((ms, i) => (
                          <span key={i} className="badge badge-warning">
                            + {ms}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
