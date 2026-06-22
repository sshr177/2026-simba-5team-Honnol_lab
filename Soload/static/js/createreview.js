document.addEventListener("DOMContentLoaded", function () {
    const tagCheckboxes = document.querySelectorAll(
        'input[name="tags"]'
    );

    tagCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            const selectedTags = document.querySelectorAll(
                'input[name="tags"]:checked'
            );

            if (selectedTags.length > 4) {
                checkbox.checked = false;
                alert("태그는 최대 4개까지 선택할 수 있습니다.");
            }
        });
    });

    const reviewForm = document.querySelector("#review-form");
    const savePopup = document.querySelector("#save-popup");

    reviewForm.addEventListener("submit", function (event) {
        const requiredGroups = [
            "visit_times",
            "purposes",
            "nunchi_score",
            "tags",
            "recommended_level",
            "has_kiosk",
            "has_single_seat",
            "has_con",
            "has_wifi",
            "rating"
        ];

        for (const groupName of requiredGroups) {
            const checkedInput = document.querySelector(
                `input[name="${groupName}"]:checked`
            );

            if (checkedInput === null) {
                event.preventDefault();
                alert("모든 항목을 입력해주세요.");
                return;
            }
        }

        const review = document.querySelector(
            'textarea[name="content"]'
        );

        if (review.value.trim() === "") {
            event.preventDefault();
            alert("한 줄 후기를 작성해주세요.");
        }

        event.preventDefault();
        savePopup.classList.add("open");
    });
});