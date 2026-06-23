# 역할 분담

- **백엔드**: Django 전반 단독 — 모델/ERD, 인증, 장소·후기·찜·테스트 로직, 카카오 검색 저장 API, 통계·자동보정, 시드 데이터
- **프론트엔드**: 템플릿(HTML)·CSS·JS, 카카오 지도/검색 UI, fetch 연동, 모달/캐러셀

## 협업 방식
- GitHub Fork & PR (upstream merge, 멘토 확인 후 머지)
- 데이터 공유: `python manage.py loaddata seed.json` (db.sqlite3는 gitignore)
- 백↔프 인터페이스: context 변수명 / fetch URL·필드명 합의