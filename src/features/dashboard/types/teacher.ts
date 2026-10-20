export interface TeacherKPI {
  id: string;
  label: string;
  value: string;
  changeNote?: string;
  changeType?: "positive" | "neutral" | "badge";
  subLabel: string;
  sparklineData?: number[];
  iconType: "mail" | "students" | "views" | "payout";
  badgeText?: string;
}

export interface StudentLead {
  id: string;
  studentName: string;
  studentAvatar: string;
  subject: string;
  timeAgo: string;
  distance: string;
  locality: string;
  teachingPreference: string;
  frequency: string;
  messageSnippet: string;
}

export interface TeacherBatch {
  id: string;
  title: string;
  status: "Active" | "Upcoming" | "Full";
  schedule: string;
  location: string;
  capacityFilled: number;
  capacityTotal: number;
  monthlyFee: number;
}

export interface TeacherScheduleSlot {
  id: string;
  time: string;
  duration: string;
  subject: string;
  batchOrStudent: string;
  mode: "offline" | "online";
  location: string;
  isLiveNow?: boolean;
}
