window.onload = function () {
    const container = document.getElementById("map");

    const options = {
        center: new kakao.maps.LatLng(37.558514, 126.998217),
        level: 3
    };

    const map = new kakao.maps.Map(container, options);
};