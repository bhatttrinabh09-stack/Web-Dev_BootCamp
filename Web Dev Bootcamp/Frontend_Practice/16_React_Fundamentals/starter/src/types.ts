export interface Course {
  id: string;
  title: string;
  instructor: string;
  hours: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  isEnrolled: boolean;
}
