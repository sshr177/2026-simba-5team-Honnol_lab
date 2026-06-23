# Soload 기능 명세서 (백엔드)

| 분류 | 기능 | 설명 | 관련 URL | 관련 모델 |

| 인증 | 회원가입 | 비번 규칙(길이/숫자/특수문자)+아이디 중복 검증, Profile 자동생성(Signal) | signup | User, Profile |
| 인증 | 로그인/로그아웃 | 세션 기반 | login/logout | User |
| 온보딩 | 혼놀 테스트 | 10문항 점수→레벨 저장 | testpage/lastpage | Profile |
| 장소 | 검색·등록 | 카카오 검색 결과를 kakao_id 기준 중복없이 저장 | create_place | Place |
| 장소 | 상세·통계 | 별점 평균, 태그/시간대 TOP3, 눈치지수 집계 | placeinfo | Place, Review |
| 장소 | 같은 레벨 후기 필터 | 내 레벨 후기만 보기 | placeinfo?same_level | Review, Profile |
| 장소 | 지도 | 위경도 마커, 카테고리별 표시 | main, placeinfo | Place |
| 후기 | 작성 | 항목+사진 업로드, 작성 시 경험치/레벨업 | createreview | Review, ReviewImage |
| 후기 | 장소 정보 자동보정 | 후기 평균·다수결로 Place 추천레벨/시설 갱신 | createreview | Place, Review |
| 찜 | 토글 | 중복방지(unique), fetch 토글 | place_like | PlaceLike |
| 마이 | 내 찜·후기 | 모아보기 | mypage | PlaceLike, Review |