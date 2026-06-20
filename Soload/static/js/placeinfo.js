/* document.addEventListener("DOMContentLoaded", function () {
    const openButton = document.getElementById("beginner-help-button");
    const modal = document.getElementById("help-modal");
    const closeButton = document.getElementById("help-close-button");

    if (!openButton || !modal || !closeButton) {
        console.log("팝업 요소를 찾지 못했습니다.");
        return;
    }

    openButton.addEventListener("click", function () {
        modal.classList.add("active");
    });

    closeButton.addEventListener("click", function () {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("active");
        }
    });
}); */

document.addEventListener("DOMContentLoaded", function () {
    const openButton = document.getElementById("beginner-help-button");
    const modal = document.getElementById("help-modal");
    const closeButton = document.getElementById("help-close-button");

    const helpDataElement = document.getElementById("help-data");
    const helpTitle = document.getElementById("help-title");
    const helpSubtitle = document.getElementById("help-subtitle");
    const helpList = document.getElementById("help-list");
    const helpDescription = document.getElementById("help-description");

    const helpData = {
        cafe: {
            title : "☕카페",
            levels: {
                1: [
                    "음료를 천천히 마셔보세요.",
                    "5분만 휴대폰을 내려놓아 보세요.",
                    "창밖 풍경을 바라보세요.",
                    "카페 분위기를 느껴보세요."
                ],
                2: [
                    "오늘 있었던 일을 떠올려 보세요.",
                    "좋아하는 음악을 들어보세요.",
                    "새로운 메뉴에 도전해 보세요.",
                    "사람들의 모습을 가볍게 구경해 보세요."
                ],
                3: [
                    "책이나 기사 하나를 읽어보세요.",
                    "오늘의 목표를 정리해 보세요.",
                    "하고 싶었던 일을 시작해 보세요.",
                    "생각나는 아이디어를 메모해 보세요."
                ],
                4: [
                    "일기나 감상문을 작성해 보세요.",
                    "앞으로의 계획을 세워보세요.",
                    "관심 있는 주제에 대해 찾아보세요.",
                    "스스로에게 질문을 던져보세요."
                ],
                5: [
                    "카페에서만 할 수 있는 나만의 루틴을 만들어 보세요.",
                    "한 시간 이상 온전히 나에게 집중해 보세요.",
                    "새로운 영감을 찾아보세요.",
                    "혼자 있는 시간을 충분히 즐겨보세요."
                ]
            }
        },

        exhibition: {
            title: "🖼️전시장",
            levels:{
                1: [
                    "모든 작품을 다 보려고 하지 않아도 괜찮아요.",
                    "가장 눈에 띄는 작품 하나만 천천히 감상해 보세요.",
                    "작품 설명을 읽지 않아도 괜찮아요. 느낌만 받아보세요.",
                    "10분만 둘러본다는 마음으로 시작해 보세요."
                ],
                2: [
                    "마음에 드는 작품을 하나 골라보세요.",
                    "왜 그 작품이 좋았는지 생각해 보세요.",
                    "작품의 색감이나 분위기에 집중해 보세요.",
                    "천천히 걸으며 전시 공간 자체를 즐겨보세요."
                ],
                3: [
                    "작품 설명을 읽으며 감상해 보세요.",
                    "전시의 주제가 무엇인지 추측해 보세요.",
                    "가장 기억에 남는 작품을 찾아보세요.",
                    "감상 후 짧게 한 줄 평을 남겨보세요."
                ],
                4: [
                    "전시 전체의 흐름을 따라가 보세요.",
                    "작품끼리 어떤 공통점이 있는지 찾아보세요.",
                    "인상 깊은 감정을 기록해 보세요.",
                    "이전에 본 전시와 비교해 보세요."
                ],
                5: [
                    "전시를 나만의 방식으로 해석해 보세요.",
                    "가장 좋아하는 작품 TOP3를 정해보세요.",
                    "전시가 전달하는 메시지를 생각해 보세요.",
                    "관람 후 스스로에게 질문을 던져보세요."
                ]
            }
        },

        restaurant:{
            title: "🍽️밥집",
            levels: {
                1: [
                    "좋아하는 메뉴를 주문해 보세요.",
                    "주변 시선을 신경 쓰지 않아도 괜찮아요.",
                    "음식의 맛에 집중해 보세요.",
                    "천천히 식사해 보세요."
                ],
                2: [
                    "먹고 싶었던 메뉴에 도전해 보세요.",
                    "식당 분위기를 느껴보세요.",
                    "음식의 장점을 찾아보세요.",
                    "식사 시간을 즐겨보세요."
                ],
                3: [
                    "새로운 식당을 방문해 보세요.",
                    "메뉴 선택을 스스로 해보세요.",
                    "나만의 맛집 기준을 만들어 보세요.",
                    "음식 사진을 남겨보세요."
                ],
                4: [
                    "평소 가고 싶었던 식당에 방문해 보세요.",
                    "새로운 음식에 도전해 보세요.",
                    "식사 후 간단한 후기를 남겨보세요.",
                    "혼밥의 편안함을 느껴보세요."
                ],
                5: [
                    "나만의 맛집 리스트를 만들어 보세요.",
                    "좋아하는 메뉴 TOP3를 정해보세요.",
                    "식사 시간을 온전히 즐겨보세요.",
                    "새로운 맛을 탐험해 보세요."
                ]
            }
        },

        walk: {
            title: "🌳산책길",
            levels: {
                1: [
                    "천천히 걸어보세요.",
                    "주변을 둘러보세요.",
                    "하늘을 한 번 올려다보세요.",
                    "바람을 느껴보세요."
                ],
                2: [
                    "계절의 변화를 찾아보세요.",
                    "예쁜 풍경을 발견해 보세요.",
                    "좋아하는 노래와 함께 걸어보세요.",
                    "잠시 멈춰 주변을 관찰해 보세요."
                ],
                3: [
                    "새로운 길로 걸어보세요.",
                    "사진을 한 장 찍어보세요.",
                    "떠오르는 생각을 정리해 보세요.",
                    "걸음 수 목표를 세워보세요."
                ],
                4: [
                    "평소 가보지 않았던 곳까지 가보세요.",
                    "산책하며 목표를 생각해 보세요.",
                    "자연의 소리에 집중해 보세요.",
                    "동네의 새로운 장소를 발견해 보세요."
                ],
                5: [
                    "목적 없이 걷는 시간을 즐겨보세요.",
                    "생각을 정리하는 시간을 가져보세요.",
                    "나만의 산책 코스를 만들어 보세요.",
                    "오늘의 산책을 기록해 보세요."
                ]
            }
        },

        movie: {
            title: "🎬영화관",
            levles: {
                1: [
                    "보고 싶은 영화를 골라보세요.",
                    "혼자 보는 것이 어색해도 괜찮아요.",
                    "영화에 집중해 보세요.",
                    "편안하게 관람해 보세요."
                ],
                2: [
                    "인상 깊은 장면을 찾아보세요.",
                    "좋아하는 캐릭터를 골라보세요.",
                    "영화의 분위기를 느껴보세요.",
                    "OST를 귀 기울여 들어보세요."
                ],
                3: [
                    "영화의 메시지를 생각해 보세요.",
                    "기억에 남는 대사를 떠올려 보세요.",
                    "관람 후 감상을 정리해 보세요.",
                    "비슷한 작품을 찾아보세요."
                ],
                4: [
                    "영화의 연출이나 촬영 기법에 주목해 보세요.",
                    "등장인물의 선택을 생각해 보세요.",
                    "영화 평점을 남겨보세요.",
                    "다른 해석을 상상해 보세요."
                ],
                5: [
                    "영화를 나만의 시선으로 평가해 보세요.",
                    "감상 후 카페나 산책을 즐겨보세요.",
                    "인생 영화 리스트를 만들어 보세요.",
                    "문화생활 자체를 즐겨보세요."
                ]
            }
        }
    };

    const categoryMap = {
        "카페": "cafe",
        "cafe": "cafe",
        "CAFE": "cafe",

        "전시장": "exhibition",
        "전시회": "exhibition",
        "exhibition": "exhibition",

        "밥집": "restaurant",
        "맛집": "restaurant",
        "식당": "restaurant",
        "restaurant": "restaurant",

        "산책길": "walk",
        "공원": "walk",
        "walk": "walk",

        "영화관": "movie",
        "영화": "movie",
        "movie": "movie",
    };

    function getCategoryKey(rawCategory) {
        if (!rawCategory) {
            return "cafe";
        }

        return categoryMap[rawCategory] || "cafe";
    }

    function getLevel(rawLevel) {
        const level = Number(rawLevel);

        if (level >= 1 && level <= 5) {
            return level;
        }

        return 1;
    }

    function renderHelpContent() {
        const rawCategory = helpDataElement.dataset.category;
        const rawLevel = helpDataElement.dataset.level;

        const categoryKey = getCategoryKey(rawCategory);
        const level = getLevel(rawLevel);

        const selectedHelp = helpData[categoryKey];
        const selectedTips = selectedHelp.levels[level];

        helpTitle.textContent = selectedHelp.title;
        helpSubtitle.textContent = 'LV.{{ place.level }} 단계에 맞는 혼놀 도움말이에요.';

        helpList.innerHTML = "";

        selectedTips.forEach(function (tip) {
            const li = document.createElement("li");
            li.textContent = tip;
            helpList.appendChild(li);
        });

        helpDescription.textContent = "위의 도움말들을 토대로 혼놀을 하다보면 혼자만의 시간이 조금 더 익숙해질 거에요!";
    }

    if (!openButton || !modal || !closeButton || !helpDataElement) {
        console.log("도움말 팝업 요소를 찾지 못했습니다.");
        return;
    }

    openButton.addEventListener("click", function () {
        renderHelpContent();
        modal.classList.add("active");
    });

    closeButton.addEventListener("click", function() {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.classList.remove("active");
        }
    });
});