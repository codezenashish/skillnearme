import {
  TeacherKPI,
  StudentLead,
  TeacherBatch,
  TeacherScheduleSlot,
} from "../types/teacher";

export const TEACHER_PROFILE = {
  name: "Prof. Sandeep Verma",
  qualifications: "M.Sc Physics • Indiranagar",
  completionPercentage: 95,
  completionStep: "1 step left: Add 1 video intro",
  isVerified: true,
  isTopRated: true,
  isAcceptingStudents: true,
};

export const TEACHER_KPIS: TeacherKPI[] = [
  {
    id: "kpi-1",
    label: "Total Inquiries this Week",
    value: "28",
    changeNote: "+14%",
    changeType: "positive",
    subLabel: "vs last week",
    iconType: "mail",
    sparklineData: [32, 28, 30, 18, 14, 6],
  },
  {
    id: "kpi-2",
    label: "Active Enrolled Students",
    value: "16",
    subLabel: "Across 3 offline batches",
    iconType: "students",
    badgeText: "92% Att.",
  },
  {
    id: "kpi-3",
    label: "Profile Views (5km zone)",
    value: "482",
    subLabel: "#1 Top rank in Indiranagar",
    iconType: "views",
    badgeText: "High",
  },
  {
    id: "kpi-4",
    label: "Monthly Net Payouts",
    value: "₹42,500",
    subLabel: "Next: 24th Oct (Direct Bank)",
    iconType: "payout",
    badgeText: "₹8,500 pending",
  },
];

export const STUDENT_LEADS: StudentLead[] = [
  {
    id: "lead-1",
    studentName: "Priya Nair",
    studentAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    subject: "Class 11 CBSE Chemistry",
    timeAgo: "15 mins ago",
    distance: "1.8 km away",
    locality: "Domlur Stage 2",
    teachingPreference: "Home Tutoring (Tutor travels)",
    frequency: "3 days/week",
    messageSnippet:
      "Looking for 3 days/week preparation for term exams and NEET foundation chemistry. Can you accommodate evening slots?",
  },
  {
    id: "lead-2",
    studentName: "Arjun Das",
    studentAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    subject: "Guitar Fingerstyle - Beginner",
    timeAgo: "2 hours ago",
    distance: "0.9 km away",
    locality: "12th Main Indiranagar",
    teachingPreference: "Offline at your center",
    frequency: "Weekend batch preferred",
    messageSnippet:
      "Hi Sir, looking to join your Saturday morning beginner acoustic guitar batch. Do I need to bring my own instrument?",
  },
];

export const TEACHER_BATCHES: TeacherBatch[] = [
  {
    id: "batch-1",
    title: "Batch A: Class 10 Math Foundation",
    status: "Active",
    schedule: "Mon, Wed, Fri • 4:00 PM - 5:30 PM",
    location: "Indiranagar Classroom 102",
    capacityFilled: 8,
    capacityTotal: 10,
    monthlyFee: 3500,
  },
  {
    id: "batch-2",
    title: "Batch B: NEET Physics Crash Course",
    status: "Active",
    schedule: "Tue, Thu, Sat • 6:00 PM - 7:30 PM",
    location: "Online via Zoom Classroom",
    capacityFilled: 8,
    capacityTotal: 8,
    monthlyFee: 4200,
  },
];

export const TODAY_TEACHING_SCHEDULE: TeacherScheduleSlot[] = [
  {
    id: "slot-1",
    time: "4:00 PM - 5:30 PM",
    duration: "90 mins",
    subject: "Class 10 Math Foundation",
    batchOrStudent: "Batch A (8 students)",
    mode: "offline",
    location: "Classroom 102",
    isLiveNow: true,
  },
  {
    id: "slot-2",
    time: "6:00 PM - 7:30 PM",
    duration: "90 mins",
    subject: "NEET Physics Numerical Problem Solving",
    batchOrStudent: "Batch B (8 students)",
    mode: "online",
    location: "Zoom Classroom Link",
    isLiveNow: false,
  },
];
