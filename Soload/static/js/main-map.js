document.addEventListener("DOMContentLoaded", function () {
    const mapContainer = document.getElementById("map");

    if (!mapContainer) {
        console.log("map 요소를 찾지 못했습니다.");
        return;
    }

    const mapOption = {
        center: new kakao.maps.LatLng(37.558514, 126.998217),
        level: 4
    };

    const map = new kakao.maps.Map(mapContainer, mapOption);

    const searchInput = document.getElementById("place-search-input");
    const searchButton = document.getElementById("place-search-button");
    const resultList = document.getElementById("search-result-list");

    const placesService = new kakao.maps.services.Places();
    const placesDataElement = document.getElementById("places-data");
    let searchPreviewMarker = null;

    function getCSRFToken() {
        const cookie = document.cookie
            .split("; ")
            .find(function (row) {
                return row.startsWith("csrftoken=");
            });

        if (!cookie) {
            return "";
        }

        return cookie.split("=")[1];
    }

    function getCategoryClass(category) {
        if (!category) {
            return "place-map-marker--default";
        }

        if (category === "카페") {
            return "place-map-marker--cafe";
        }

        if (category === "음식점") {
            return "place-map-marker--restaurant";
        }

        if (category === "문화시설") {
            return "place-map-marker--culture";
        }

        if (category === "관광명소") {
            return "place-map-marker--tour";
        }

        if (category === "숙박") {
            return "place-map-marker--hotel";
        }

        if (category === "병원") {
            return "place-map-marker--hospital";
        }

        return "place-map-marker--default";
    }

    if (placesDataElement) {
        const savedPlaces = JSON.parse(placesDataElement.textContent);

        savedPlaces.forEach(function (place) {
            const position = new kakao.maps.LatLng(
                Number(place.lat),
                Number(place.lng)
            );

            const categoryClass = getCategoryClass(place.category);

            const markerContent = document.createElement("button");
            markerContent.type = "button";
            markerContent.className = `place-map-marker ${categoryClass}`;

            markerContent.innerHTML = `
                <span class="place-map-marker-level">Lv.${place.recommended_level}</span>
                <span class="place-map-marker-divider">|</span>
                <span class="place-map-marker-rating">★ ${Number(place.avg_rating).toFixed(1)}</span>
            `;

            markerContent.addEventListener("click",function(){
                window.location.href =`/placeinfo/${place.id}/`;
            });

            new kakao.maps.CustomOverlay({
                map: map,
                position: position,
                content: markerContent,
                yAnchor: 1
            });
        });
    }

    function renderSearchResults(results) {
        if (!resultList) {
            console.log("search-result-list 요소를 찾지 못했습니다.");
            return;
        }

        resultList.innerHTML = "";

        results.forEach(function (place) {
            const item = document.createElement("button");
            item.type = "button";
            item.className = "search-result-item";

            item.innerHTML = `
                <strong>${place.place_name}</strong>
                <span>${place.road_address_name || place.address_name}</span>
            `;

            item.addEventListener("click", function () {
                console.log("선택한 장소:", place);

                const position = new kakao.maps.LatLng(
                    Number(place.y),
                    Number(place.x)
                );

                map.setCenter(position);

                new kakao.maps.Marker({
                    map: map,
                    position: position
                });

                const placeData = {
                    kakao_id: place.id,
                    name: place.place_name,
                    address: place.road_address_name || place.address_name,
                    latitude: place.y,
                    longitude: place.x,
                    category: place.category_group_name,
                    phone: place.phone
                };

                console.log("백엔드로 보낼 장소:", placeData);
                sendPlaceToBackend(placeData, false);
            });

            resultList.appendChild(item);
        });
    }

    function sendPlaceToBackend(placeData, confirmed) {
        const formData = new FormData();

        formData.append("kakao_id", placeData.kakao_id);
        formData.append("name", placeData.name);
        formData.append("address", placeData.address);
        formData.append("latitude", placeData.latitude);
        formData.append("longitude", placeData.longitude);
        formData.append("category", placeData.category);
        formData.append("phone", placeData.phone);

        if (confirmed) {
            formData.append("confirm", "yes");
        }

        fetch("/place/create-or-get/", {
            method: "POST",
            headers: {
                "X-CSRFToken": getCSRFToken()
            },
            body: formData
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("서버 요청 실패");
            }

            if (response.redirected) {
                window.location.href = response.url;
                return;
            }

            return response.json();
        })
        .then(function (data) {
            if (!data) {
                return;
            }

            console.log("백엔드 응답:", data);

            if (data.exists === false) {
                const confirmAdd = confirm(`${placeData.name}을(를) 추가할까요?`);

                if (!confirmAdd) {
                    return;
                }

                sendPlaceToBackend(placeData, true);
            }
        })
        .catch(function (error) {
            console.error("장소 저장 중 오류:", error);
        });
    }

    if (!searchInput || !searchButton) {
        console.log("검색창 또는 검색 버튼을 찾지 못했습니다.");
        return;
    }

    function searchPlaces() {
        const keyword = searchInput.value.trim();

        if (!keyword) {
            alert("장소를 입력하세요.");
            return;
        }

        placesService.keywordSearch(keyword, function (data, status, pagination) {
            console.log("검색어:", keyword);
            console.log("status:", status);
            console.log("data:", data);
            console.log("pagination:", pagination);

            if (status !== kakao.maps.services.Status.OK) {
                alert("검색 결과가 없습니다.");
                return;
            }

            renderSearchResults(data);

            const firstPlace = data[0];
            const position = new kakao.maps.LatLng(
                Number(firstPlace.y),
                Number(firstPlace.x)
            );

            map.panTo(position);

            if (searchPreviewMarker) {
                searchPreviewMarker.setMap(null);
            }

            searchPreviewMarker = new kakao.maps.Marker({
                map: map,
                position: position
            });
        });
    }

    searchButton.addEventListener("click", function () {
        searchPlaces();
    });

    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            searchPlaces();
        }
    });

    const likeButtons = document.querySelectorAll(".place-card_like");

    likeButtons.forEach(function (button) {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const placeId = button.dataset.placeId;

            fetch(`/place/${placeId}/like/`, {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCSRFToken()
                }
            })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("찜 요청 실패");
                }

                return response.json();
            })
            .then(function (data) {
                if (!data.success) {
                    return;
                }

                if (data.liked) {
                    button.textContent = "♥";
                    button.dataset.liked = "true";
                    button.classList.add("place-card_like--active");
                } else {
                    button.textContent = "♡";
                    button.dataset.liked = "false";
                    button.classList.remove("place-card_like--active");
                }
            })
            .catch(function (error) {
                console.error("찜 처리 중 오류:", error);
            });
        });
    });
});
