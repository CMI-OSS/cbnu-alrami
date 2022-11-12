import dayjs from "dayjs";

export const displayDate = (createdAt: Date) => {
  const now = dayjs();
  const second = now.diff(createdAt, "s", true);
  const minute = now.diff(createdAt, "m", true);
  const hour = now.diff(createdAt, "h", true);
  const day = now.diff(createdAt, "d", true);
  const week = now.diff(createdAt, "w", true);
  const month = now.diff(createdAt, "M", true);
  const year = now.diff(createdAt, "y", true);

  if (second < 60) return `방금 전`;
  if (minute < 60) return `${Math.floor(minute)}분 전`;
  if (hour < 24) return `${Math.floor(hour)}시간 전`;
  if (day < 7) return `${Math.floor(day)}일 전`;
  if (week < 5) return `${Math.floor(week)}주 전`;
  if (month < 12) return `${Math.floor(month)}개월 전`;
  return `${Math.floor(year)}년 전`;
};
