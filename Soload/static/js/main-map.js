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

                const marker = new kakao.maps.Marker({
                    map: map,
                    position: position
                });

                const confirmAdd = confirm(`${place.place_name}을(를) 추가할까요?`);

                if (!confirmAdd) {
                    return;
                }

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

            });

            resultList.appendChild(item);
        });
    }

    if (!searchInput || !searchButton) {
        console.log("검색창 또는 검색 버튼을 찾지 못했습니다.");
        return;
    }

    searchButton.addEventListener("click", function () {
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
        });
    });
});