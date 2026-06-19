document.addEventListener("DOMContentLoaded", function () {
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
});