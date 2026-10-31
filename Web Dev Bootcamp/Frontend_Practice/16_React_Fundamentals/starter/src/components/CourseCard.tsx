import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onEnroll: (courseId: string) => void;
}

export function CourseCard({ course, onEnroll }: CourseCardProps) {
  // TODO:
  // 1. Render card with title, instructor, level, hours
  // 2. Conditionally render:
  //    - If course.isEnrolled -> <span className="badge badge-enrolled">Enrolled</span>
  //    - Else -> <button className="btn-enroll" onClick={() => onEnroll(course.id)}>Enroll Now</button>
  return (
    <article className="card">
      <h3>{course.title}</h3>
      <p>Instructor: {course.instructor}</p>
      {/* TODO: Add remaining markup and conditional button/badge */}
    </article>
  );
}
