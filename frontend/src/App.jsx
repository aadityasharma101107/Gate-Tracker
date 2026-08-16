import React, { useState, useEffect } from 'react';
import api from './api';
import Login from './components/Login';
import { CheckCircle2, Circle, ChevronDown, ChevronRight, BookOpen, LogOut } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [syllabus, setSyllabus] = useState([]);
  const [openSubjects, setOpenSubjects] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
      fetchSyllabus();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchSyllabus = async () => {
    setLoading(true);
    try {
      const response = await api.get('/syllaus/');
      setSyllabus(response.data);
    } catch (err) {
      console.error('Error loading syllabus:', err);
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setSyllabus([]);
  };

  const toggleSubject = (subjectId) => {
    setOpenSubjects((prev) => ({
      ...prev,
      [subjectId]: !prev[subjectId],
    }));
  };

  const handleToggleTopic = async (topicId) => {
    setSyllabus((prevSyllabus) => 
      prevSyllabus.map((subject) => ({
        ...subject,
        topics: subject.topics.map((t) => 
          t.id === topicId ? { ...t, is_completed: !t.is_completed } : t
        ),
      }))
    );

    try {
      await api.post(`/topics/${topicId}/toggle/`);

    } catch (err) {
      console.error('Failed to sync topic state:', err);
      fetchSyllabus();
    }
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  if (loading) {
    return <div style={{ padding: '2rem', fontFamily: 'sans-serif'}}>Loading GATE Tracker...</div>;

  }

  const allTopics = syllabus.flatMap((s) => s.topics || []);
  const completedTopics = allTopics.filter((t) => t.is_completed).length;
  const totalTopics = allTopics.length;
  const progressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
            <BookOpen /> GATE CS Tracker
          </h1>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.4rem 0.8rem',
              background: '#f3f4f6',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <span><strong>Overall Progress:</strong> {progressPercent}%</span>
            <span>{completedTopics} / {totalTopics} Completed</span>
          </div>
          <div style={{ width: '100%', height: '10px', backgroundColor: '#e5e7eb', borderRadius: '5px' }}>
            <div
              style={{
                width: `${progressPercent}%`,
                height: '100%',
                backgroundColor: '#2563eb',
                borderRadius: '5px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      </header>

      {/* Subjects Accordion */}
      <main>
        {syllabus.map((subject) => {
          const isOpen = openSubjects[subject.id];
          const subCompleted = subject.topics.filter((t) => t.is_completed).length;
          const subTotal = subject.topics.length;

          return (
            <div
              key={subject.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                marginBottom: '1rem',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => toggleSubject(subject.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  {subject.name}
                </div>
                <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                  {subCompleted}/{subTotal}
                </span>
              </button>

              {isOpen && (
                <ul style={{ listStyle: 'none', padding: '0 1rem', margin: 0 }}>
                  {subject.topics.map((topic) => (
                    <li
                      key={topic.id}
                      onClick={() => handleToggleTopic(topic.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.75rem 0',
                        borderBottom: '1px solid #f3f4f6',
                        cursor: 'pointer',
                      }}
                    >
                      {topic.is_completed ? (
                        <CheckCircle2 color="#16a34a" size={20} />
                      ) : (
                        <Circle color="#9ca3af" size={20} />
                      )}
                      <span
                        style={{
                          textDecoration: topic.is_completed ? 'line-through' : 'none',
                          color: topic.is_completed ? '#9ca3af' : '#111827',
                        }}
                      >
                        {topic.name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}
}