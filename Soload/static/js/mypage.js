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
});
