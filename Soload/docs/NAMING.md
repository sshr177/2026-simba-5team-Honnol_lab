# 네이밍 컨벤션

## Python / Django
- 모델: PascalCase — `Place`, `PlaceImage`, `ReviewImage`, `PlaceLike`
- 필드/변수/함수: snake_case — `recommended_level`, `kakao_id`, `create_place()`, `score_to_level()`
- Boolean 필드: `has_*` (has_wifi, has_con)
- 역참조(related_name): 복수 snake_case — `images`, `reviews`, `likes`
- URL name = view 함수명과 일치 (`placeinfo`, `create_place`)

## 템플릿 / 정적
- 페이지: `templates/pages/<name>.html`, 공통 조각: `shared/_navbar.html`(언더바)
- CSS 클래스: 블록_요소 / 블록__요소--상태 (`place-card_like`, `navbar__link--active`)

## JavaScript
- 함수: camelCase — `getCSRFToken()`, `sendPlaceToBackend()`, `renderSearchResults()`
- data 속성: `data-place-id`, `data-liked`, `data-lat` / `data-lng`