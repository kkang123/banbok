export interface Problem {
  id: number;
  memberId: number;
  problemUrl: string;
  site: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  deleted?: boolean;
}

export interface HeatmapValue {
  date: string;
  count: number;
}
