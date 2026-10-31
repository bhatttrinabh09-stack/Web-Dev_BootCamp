import React, { useState } from 'react';
import { Course } from './types';
import { CourseCard } from './components/CourseCard';

const INITIAL_COURSES: Course[] = [
  { id: 'c1', title: 'Web Development Foundations', instructor: 'Alex Rivera', hours: 12, level: 'Beginner', isEnrolled: true },
  { id: 'c2', title: 'React & TypeScript in Depth', instructor: 'Priya Sharma', hours: 24, level: 'Intermediate', isEnrolled: false },
  { id: 'c3', title: 'PostgreSQL Relational Modelling', instructor: 'David Chen', hours: 16, level: 'Intermediate', isEnrolled: false },
];

export default function App() {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);

  const handleEnroll = (courseId: string) => {
    // TODO: Update course state immutably: set isEnrolled to true for courseId
  };

  return (
    <main>
      <h1>Engineering Course Directory</h1>
      <div className="card-grid">
        {/* TODO: Map over courses and render CourseCard with unique key */}
        {courses.map(course => (
          <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
        ))}
      </div>
    </main>
  );
}
