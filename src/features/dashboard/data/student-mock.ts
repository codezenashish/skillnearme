import {
  EnrolledClass,
  VerifiedTutor,
  ScheduleEvent,
  StudentInquiry,
} from "../types/student";

export const STUDENT_PROFILE = {
  name: "Aarav",
  zone: "Bengaluru South Zone",
  gridLabel: "Hyperlocal Learning Grid",
  currentSubject: "Acoustic Guitar",
  nextLessonSnippet: "Lesson 4 of 12 begins tomorrow at 5:00 PM with Vikram Sen.",
  progressPercent: 33,
  progressLabel: "33% (4/12 Sessions)",
  hoursLearnedMonth: "14 hrs",
  activeCoursesCount: "2 active",
};

export const ENROLLED_CLASSES: EnrolledClass[] = [
  {
    id: "class-1",
    type: "Active Batch (3/5 students)",
    typeColor: "blue",
    rating: 4.9,
    title: "Acoustic Guitar - Intermediate",
    tutorName: "Vikram Sen",
    tutorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    isVerified: true,
    timing: "Tomorrow, 5:00 PM",
    mode: "offline",
    locationOrPlatform: "Offline at Tutor's Studio • 1.4 km away in 12th Main Indiranagar",
  },
  {
    id: "class-2",
    type: "1-on-1 Class",
    typeColor: "purple",
    rating: 5.0,
    title: "Class 10 CBSE Physics Revision",
    tutorName: "Anita Sharma",
    tutorAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    isVerified: true,
    timing: "Friday, 6:30 PM",
    mode: "online",
    locationOrPlatform: "Online via Google Meet • Link ready",
  },
];

export const VERIFIED_TUTORS: VerifiedTutor[] = [
  {
    id: "tutor-1",
    name: "Rahul Mehta",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verificationBadge: "Police & Govt ID Verified",
    specialization: "Western Classical & Jazz Piano",
    credentials: "8+ yrs exp • Trinity Guildhall Grade 8 Certified • Ex-Bangalore Conservatory",
    hourlyRate: 900,
    freeTrialNote: "Free 20-min demo",
    rating: 4.95,
    reviewsCount: 68,
    distance: "1.2 km away",
    locality: "Koramangala 4th Block",
    teachingMode: "Home & Studio",
    activeStudentsNote: "14 students actively learning",
  },
  {
    id: "tutor-2",
    name: "Dr. Sunita Rao",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    verificationBadge: "Degree & Medical Council Verified",
    specialization: "NEET & Class 12 Biology Specialist (Ex-Allen faculty)",
    credentials: "12+ yrs exp • MBBS, MD • Produced 40+ Top 1,000 NEET Rankers",
    hourlyRate: 1200,
    freeTrialNote: "Flexible 1:1 Slots",
    rating: 5.0,
    reviewsCount: 124,
    distance: "2.8 km away",
    locality: "Domlur Stage 2",
    teachingMode: "Tutor's Home Center",
    activeStudentsNote: "High response rate (<15 mins)",
  },
];

export const UPCOMING_SCHEDULE_EVENTS: ScheduleEvent[] = [
  {
    id: "sched-1",
    badge: "TOMORROW • 5:00 PM",
    duration: "60 mins",
    title: "Acoustic Guitar with Vikram Sen",
    mode: "offline",
    locationOrPlatform: "Offline (Indiranagar)",
    actionText: "Get Directions",
    actionType: "link",
  },
  {
    id: "sched-2",
    badge: "FRIDAY • 6:30 PM",
    duration: "45 mins",
    title: "Physics Revision with Anita Sharma",
    mode: "online",
    locationOrPlatform: "Online Meet",
    actionText: "Sync Cal",
    actionType: "button",
  },
];

export const RECENT_INQUIRIES: StudentInquiry[] = [
  {
    id: "inq-1",
    name: "Vikram Sen",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    timeAgo: "12m ago",
    lastMessage: "See you tomorrow at 5 PM! Bring your chord sheets.",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "inq-2",
    name: "Rahul Mehta",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    timeAgo: "2h ago",
    lastMessage: "The weekend slot at 11 AM is confirmed for trial.",
    unreadCount: 0,
    isOnline: false,
  },
];
