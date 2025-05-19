import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#7A73FF', // 보라
  white: '#FFFFFF', // 흰색
  black: '#1A1A1A', // 짙은 회색(사실상 검정)
};

export const styles = StyleSheet.create({
  // ── 전체 배경 ──
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // ── 헤더 ──
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  profileText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 4,
  },

  // ── 달력 스트립 ──
  calendarStrip: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weekDayText: {
    color: COLORS.white,
    fontSize: 14,
  },
  dates: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 4,
  },
  dateItem: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    color: COLORS.white,
    fontSize: 14,
  },
  dateItemSelected: {
    backgroundColor: COLORS.white,
  },
  dateTextSelected: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },

  // ── 스크롤 컨텐츠 ──
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },

  // ── 루틴 아이템 ──
  routineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  timeText: {
    color: COLORS.primary,
    fontSize: 14,
    width: 50,
  },
  titleText: {
    flex: 1,
    color: COLORS.black,
    fontSize: 14,
    marginLeft: 8,
  },

  // ── 플로팅 액션 버튼 ──
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },

  // ── 탭바 ──
  tabBar: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: COLORS.white,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: COLORS.black,
    fontSize: 12,
    marginTop: 4,
  },
});
