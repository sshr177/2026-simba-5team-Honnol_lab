document.addEventListener("DOMContentLoaded", function () {
    const savedPlaceOpenButton = document.getElementById("saved-place-button");
    const savedPlaceModal = document.getElementById("saved-place-modal");
    const savedPlaceCloseButton = document.getElementById("saved-place-close-button");

    const reviewCollectionOpenButton = document.getElementById("review-collection-button");
    const reviewCollectionModal = document.getElementById("review-collection-modal");
    const reviewCollectionCloseButton = document.getElementById("review-collection-close-button");

    const profileEditOpenButton = document.getElementById("profile-edit-button");
    const profileEditModal = document.getElementById("profile-edit-modal");
    const profileEditCloseButton = document.getElementById("profile-edit-close-button");

    const reviewDetailOpenButtons = document.querySelectorAll(".review-detail-open-button");
    const reviewDetailModal = document.getElementById("mypage-review-modal");
    const reviewDetailCloseButton = document.getElementById("mypage-review-modal-close");
    const reviewDetailUser = document.getElementById("mypage-review-modal-user");
    const reviewDetailText = document.getElementById("mypage-review-modal-text");
    const reviewDetailDetails = document.getElementById("mypage-review-modal-details");
    const reviewDetailMeta = document.getElementById("mypage-review-modal-meta");

    if (savedPlaceOpenButton && savedPlaceModal && savedPlaceCloseButton) {
        savedPlaceOpenButton.addEventListener("click", function () {
            savedPlaceModal.classList.add("active");
        });

        savedPlaceCloseButton.addEventListener("click", function () {
            savedPlaceModal.classList.remove("active");
        });

        savedPlaceModal.addEventListener("click", function (event) {
            if (event.target === savedPlaceModal) {
                savedPlaceModal.classList.remove("active");
            }
        });
    }

    if (reviewCollectionOpenButton && reviewCollectionModal && reviewCollectionCloseButton) {
        reviewCollectionOpenButton.addEventListener("click", function () {
            reviewCollectionModal.classList.add("active");
        });

        reviewCollectionCloseButton.addEventListener("click", function () {
            reviewCollectionModal.classList.remove("active");
        });

        reviewCollectionModal.addEventListener("click", function (event) {
            if (event.target === reviewCollectionModal) {
                reviewCollectionModal.classList.remove("active");
            }
        });
    }

    if (profileEditOpenButton && profileEditModal && profileEditCloseButton) {
        profileEditOpenButton.addEventListener("click", function () {
            profileEditModal.classList.add("active");
        });

        profileEditCloseButton.addEventListener("click", function () {
            profileEditModal.classList.remove("active");
        });

        profileEditModal.addEventListener("click", function (event) {
            if (event.target === profileEditModal) {
                profileEditModal.classList.remove("active");
            }
        });
    }

    if (
        reviewDetailModal &&
        reviewDetailCloseButton &&
        reviewDetailUser &&
        reviewDetailText &&
        reviewDetailDetails &&
        reviewDetailMeta
    ) {
        reviewDetailOpenButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                const place = button.querySelector(".review-place-name");
                const date = button.querySelector(".review-visit-date");
                const content = button.querySelector(".review-text");
                const details = button.querySelector(".review-detail-data");
                const meta = button.querySelector(".review-detail-meta");

                reviewDetailUser.textContent = [
                    place ? place.textContent.trim() : "",
                    date ? date.textContent.trim() : ""
                ].filter(Boolean).join("\n");
                reviewDetailText.textContent = content ? content.textContent.trim() : "";
                reviewDetailDetails.innerHTML = details ? details.innerHTML : "";
                reviewDetailMeta.textContent = meta ? meta.textContent.trim() : "";

                reviewDetailModal.classList.add("active");
            });
        });

        reviewDetailCloseButton.addEventListener("click", function () {
            reviewDetailModal.classList.remove("active");
        });

        reviewDetailModal.addEventListener("click", function (event) {
            if (event.target === reviewDetailModal) {
                reviewDetailModal.classList.remove("active");
            }
        });
    }
});
