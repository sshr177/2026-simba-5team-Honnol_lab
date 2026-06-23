document.addEventListener("DOMContentLoaded", function () {
    const tagCheckboxes = document.querySelectorAll('input[name="tags"]');

    tagCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            const selectedTags = document.querySelectorAll('input[name="tags"]:checked');

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
            const checkedInput = document.querySelector(`input[name="${groupName}"]:checked`);

            if (checkedInput === null) {
                event.preventDefault();
                alert("모든 항목을 입력해주세요.");
                return;
            }
        }

        const review = document.querySelector('textarea[name="content"]');

        if (review.value.trim() === "") {
            event.preventDefault();
            alert("한줄 후기를 작성해주세요.");
            return;
        }

        savePopup.classList.add("open");
    });

    const reviewImageInput = document.querySelector("#review-image");
    const photoUploadFileName = document.querySelector("#photo-upload-file-name");

    if (reviewImageInput && photoUploadFileName) {
        reviewImageInput.addEventListener("change", function () {
            const fileCount = reviewImageInput.files.length;

            if (fileCount === 0) {
                photoUploadFileName.textContent = "선택된 사진 없음";
                return;
            }

            if (fileCount === 1) {
                photoUploadFileName.textContent = reviewImageInput.files[0].name;
                return;
            }

            photoUploadFileName.textContent = `${fileCount}개의 사진 선택됨`;
        });
    }
});
