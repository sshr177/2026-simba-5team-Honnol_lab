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
                    "음료를 주문한 뒤 창가나 구석 자리에 앉아보세요. 조용한 자리는 긴장을 줄이는 데 도움이 돼요.",
                    "처음부터 오래 머물 필요는 없어요. 10~15분만 있어도 충분해요.",
                    "주변 사람들이 나를 신경 쓸 것 같아도 대부분은 자신의 일에 집중하고 있어요.",
                    "휴대폰을 보지 않고 카페 음악에 집중해 보세요.",
                    "음료의 향이나 맛을 천천히 느껴보세요.",
                    "창밖 풍경을 구경하며 지나가는 사람들을 관찰해 보세요.",
                    "카페 인테리어에서 마음에 드는 부분을 찾아보세요.",
                    "오늘 가장 좋았던 일을 하나 떠올려 보세요.",
                    "“지금 이 시간은 나를 위한 시간이다”라고 생각해 보세요.",
                    "혼자 카페에 온 것만으로도 충분히 잘하고 있다는 걸 기억하세요."
                ],
                2: [
                    "읽고 싶었던 책이나 글을 가져와 보세요.",
                    "오늘 해야 할 일을 간단히 정리해 보세요.",
                    "앞으로 해보고 싶은 일들을 적어보세요.",
                    "새로운 메뉴에 도전해 보세요.",
                    "좋아하는 노래 플레이리스트를 만들어 보세요.",
                    "최근 즐거웠던 순간을 떠올려 보세요.",
                    "카페에서 보내고 싶은 나만의 루틴을 생각해 보세요.",
                    "창밖을 보며 잠시 멍 때리는 시간을 가져보세요.",
                    "일기나 메모를 작성해 보세요.",
                    "혼자 있는 시간이 불편한지 편안한지 스스로 관찰해 보세요."
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
                    "모든 작품을 이해하려고 하지 않아도 괜찮아요.",
                    "가장 눈에 띄는 작품부터 감상해 보세요.",
                    "작품 앞에 잠시 멈춰 서 보세요.",
                    "설명을 읽지 않아도 괜찮아요.",
                    "색감이나 분위기만 느껴보세요.",
                    "천천히 걸으며 공간을 둘러보세요.",
                    "관심 없는 작품은 지나쳐도 괜찮아요.",
                    "관람객들과 속도를 맞출 필요는 없어요.",
                    "10분만 둘러본다는 마음으로 시작해 보세요.",
                    "전시장에 온 것만으로도 새로운 경험이에요."
                ],
                2: [
                    "가장 마음에 드는 작품을 골라보세요.",
                    "왜 좋았는지 생각해 보세요.",
                    "작품 설명을 읽어보세요.",
                    "작가가 어떤 이야기를 전하려 했을지 상상해 보세요.",
                    "비슷한 분위기의 작품을 찾아보세요.",
                    "기억에 남는 작품을 사진으로 남겨보세요.",
                    "작품이 주는 감정을 생각해 보세요.",
                    "전시의 주제를 추측해 보세요.",
                    "전시 공간의 분위기도 함께 즐겨보세요.",
                    "관람 후 가장 기억에 남는 작품 하나를 떠올려 보세요."
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
                    "혼밥하는 사람은 생각보다 많아요. 너무 걱정하지 않아도 괜찮아요.",
                    "익숙하고 좋아하는 메뉴를 주문해 보세요.",
                    "식당에 들어가는 것 자체를 목표로 삼아도 좋아요.",
                    "자리에 앉으면 메뉴판을 천천히 둘러보세요.",
                "음식을 먹는 속도를 남들과 비교하지 마세요.",
                "주변 시선보다 음식에 집중해 보세요.",
                "음식의 맛과 향을 천천히 느껴보세요.",
                "물 한 잔 마시며 긴장을 풀어보세요.",
                "식사를 끝까지 마친 자신을 칭찬해 보세요.",
                "다음에도 올 수 있겠다는 생각이 들면 성공이에요."
                ],
                2: [
                    "평소 먹어보고 싶었던 메뉴에 도전해 보세요.",
                    "음식 사진을 한 장 남겨보세요.",
                    "식당 분위기를 천천히 둘러보세요.",
                    "음식의 맛을 한 단어로 표현해 보세요.",
                    "다음에 또 방문할지 생각해 보세요.",
                    "메뉴판에서 다음에 먹고 싶은 음식을 찾아보세요.",
                    "혼자 식사하는 편안함을 느껴보세요.",
                    "식사하며 오늘 하루를 돌아보세요.",
                    "나만의 맛집 리스트를 만들어 보세요.",
                    "식사 시간을 온전히 나에게 집중하는 시간으로 사용해 보세요."

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
                    "목적지가 없어도 괜찮아요. 일단 걸어보세요.",
                "천천히 걷는 것만으로도 충분해요.",
                "하늘을 한 번 올려다보세요.",
                "나무나 꽃을 찾아보세요.",
                "바람이 부는 방향을 느껴보세요.",
                "걷는 동안 휴대폰 사용을 줄여보세요.",
                "주변 소리에 집중해 보세요.",
                "벤치가 보이면 잠시 앉아 쉬어보세요.",
                "10분만 걸어도 괜찮아요.",
                "밖에 나온 자신을 칭찬해 주세요."
                ],
                2: [
                    "새로운 길로 조금만 더 걸어가 보세요.",
                    "계절의 변화를 찾아보세요.",
                    "가장 마음에 드는 풍경을 찾아보세요.",
                    "사진을 한 장 찍어보세요.",
                    "좋아하는 음악을 들으며 걸어보세요.",
                    "최근 고민을 정리해 보세요.",
                    "떠오르는 생각을 메모해 보세요.",
                    "산책 후 기분이 어떻게 달라졌는지 생각해 보세요.",
                    "다음에 와보고 싶은 장소를 찾아보세요.",
                    "나만의 산책 코스를 만들어 보세요."
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
            levels: {
                1: [
                    "혼자 영화 보러 오는 사람은 정말 많아요.",
                    "보고 싶은 영화를 자유롭게 선택해 보세요.",
                    "좌석도 내가 원하는 자리를 고를 수 있어요.",
                    "영화 시작 전 긴장되는 건 자연스러운 일이에요.",
                    "팝콘이나 음료를 준비해 보세요.",
                    "영화가 시작되면 다른 사람은 거의 신경 쓰이지 않을 거예요.",
                    "영화 내용에만 집중해 보세요.",
                    "웃기면 웃고 슬프면 슬퍼해도 괜찮아요.",
                    "영화가 끝날 때까지 편하게 관람해 보세요.",
                    "혼자 영화관에 온 자신을 칭찬해 보세요."
                ],
                2: [
                    "가장 기대되는 장면을 생각해 보세요.",
                    "좋아하는 캐릭터를 찾아보세요.",
                    "인상 깊은 대사를 기억해 보세요.",
                    "영화의 분위기에 집중해 보세요.",
                    "기억에 남는 장면을 찾아보세요.",
                    "영화가 전달하는 메시지를 생각해 보세요.",
                    "관람 후 감상을 한 문장으로 적어보세요.",
                    "친구에게 추천할지 생각해 보세요.",
                    "OST가 좋았다면 찾아서 들어보세요.",
                    "비슷한 장르의 작품도 찾아보세요."
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
        helpSubtitle.textContent = 'LV.{{ place.recommended_level }} 단계에 맞는 혼놀 도움말이에요.';

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