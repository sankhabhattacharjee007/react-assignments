import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import StudentList from './components/StudentList';
import { initialStudents } from './data/students';

function App() {
  const [students] = useState(initialStudents);
  const [cgpaSortOrder, setCgpaSortOrder] = useState('none');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const departments = useMemo(() => {
    const depts = new Set(initialStudents.map((s) => s.department));
    return Array.from(depts);
  }, []);

  const processedStudents = useMemo(() => {
    let result = [...students];

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.rollNo.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q)
      );
    }

    if (selectedDepartment !== 'All') {
      result = result.filter((s) => s.department === selectedDepartment);
    }

    if (cgpaSortOrder === 'desc') {
      result.sort((a, b) => b.cgpa - a.cgpa);
    } else if (cgpaSortOrder === 'asc') {
      result.sort((a, b) => a.cgpa - b.cgpa);
    }

    return result;
  }, [students, searchQuery, selectedDepartment, cgpaSortOrder]);

  const stats = useMemo(() => {
    if (students.length === 0) return { avg: '0.00', max: '0.00' };
    const total = students.reduce((acc, curr) => acc + curr.cgpa, 0);
    const avg = (total / students.length).toFixed(2);
    const max = Math.max(...students.map((s) => s.cgpa)).toFixed(2);
    return { avg, max };
  }, [students]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All');
    setCgpaSortOrder('none');
  };

  return (
    <div className="portal-app">
      <Header
        portalTitle="Student Information Portal"
        portalSubtitle="College of Engineering &amp; Technology — Student Directory"
        totalStudents={students.length}
        avgCgpa={stats.avg}
        highestCgpa={stats.max}
        cgpaSortOrder={cgpaSortOrder}
        onSortChange={setCgpaSortOrder}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        departments={departments}
      />

      <main className="portal-main">
        <StudentList
          students={processedStudents}
          currentSort={cgpaSortOrder}
          onResetFilters={handleResetFilters}
        />
      </main>
    </div>
  );
}

export default App;
