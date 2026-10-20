export interface EnrolledClass {
  id: string;
  type: string; // e.g. "Active Batch (3/5 students)" | "1-on-1 Class"
  typeColor?: "blue" | "purple";
  rating: number;
  title: string;
  tutorName: string;
  tutorAvatar: string;
  isVerified: boolean;
  timing: string;
  mode: "offline" | "online";
  locationOrPlatform: string;
}

export interface VerifiedTutor {
  id: string;
  name: string;
  avatar: string;
  verificationBadge: string;
  specialization: string;
  credentials: string;
  hourlyRate: number;
  freeTrialNote: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  locality: string;
  teachingMode: string;
  activeStudentsNote: string;
}

export interface ScheduleEvent {
  id: string;
  badge: string; // e.g. "TOMORROW • 5:00 PM"
  duration: string;
  title: string;
  mode: "offline" | "online";
  locationOrPlatform: string;
  actionText: string;
  actionType: "link" | "button";
}

export interface StudentInquiry {
  id: string;
  name: string;
  avatar: string;
  timeAgo: string;
  lastMessage: string;
  unreadCount?: number;
  isOnline?: boolean;
}
