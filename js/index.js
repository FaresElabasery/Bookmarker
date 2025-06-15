var Bname = document.getElementById("Bname");
var Burl = document.getElementById("Burl");
var bookmarkTable = document.getElementById("bookmarkTable");
var myModal;

var BookmarkList = [];
if (localStorage.getItem("BookmarkList")) {
    BookmarkList = JSON.parse(localStorage.getItem("BookmarkList"));
    displayBookmark(BookmarkList);
} else {
    BookmarkList = [];
}
function addBookmark() {
    if (Bname.value == "" || Burl.value == "") {
        displayModal("empty");
        myModal = new bootstrap.Modal(document.getElementById('errorModal'), {
            keyboard: false
        });
        myModal.show();
    } else if (validateName(Bname.value) && validateUrl(Burl.value)) {
        let BookMark = {
            name: Bname.value,
            url: Burl.value
        }
        BookmarkList.push(BookMark);
        save();
        clearForm();
    } else {
        displayModal("not valid");
        myModal = new bootstrap.Modal(document.getElementById('errorModal'), {
            keyboard: false
        });
        myModal.show();
    }
}

function displayBookmark(list) {
    let cartona = '';
    for (let i = 0; i < list.length; i++) {
        cartona += ` 
                <tr>
                    <td>${i + 1}</td>
                    <td>${list[i].name}</td>
                    <td><a href="${list[i].url}" target="_blank"  class="btn visit-url"> <i class="fa-solid fa-eye"></i> Visit </a></td>
                    <td><button onclick=deleteUrl(${i}) class="btn btn-danger delete-url"> <i class="fa-solid fa-trash-can"></i> Delete</button></td>
                </tr>`
    }
    bookmarkTable.innerHTML = cartona;
}
function save() {
    localStorage.setItem("BookmarkList", JSON.stringify(BookmarkList));
    displayBookmark(BookmarkList)
}
function clearForm() {
    Bname.value = '';
    Burl.value = "";
}
function deleteUrl(index) {
    BookmarkList.splice(index, 1);
    save();
}
function validateUrl(url) {
    var regex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ig
    return regex.test(url);
}
Burl.addEventListener('input', function () {
    if (validateUrl(Burl.value)) {
        Burl.classList.add('is-valid');
        Burl.classList.remove('is-invalid');
    } else {
        Burl.classList.add('is-invalid');
        Burl.classList.remove('is-valid');
    }

})
function validateName(siteName) {
    var regex = /[A-Za-z0-9]{3,}/
    return regex.test(siteName);
}
Bname.addEventListener('input', function () {
    if (validateName(Bname.value)) {
        Bname.classList.add('is-valid');
        Bname.classList.remove('is-invalid');
    } else {
        Bname.classList.add('is-invalid');
        Bname.classList.remove('is-valid');
    }
})
function displayModal(errorName) {
    var modalContanier = document.getElementById("modalWrapper");
    var modal = `
        <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content border-0 p-2">
                    <div class="modal-header border-0 d-flex justify-content-between align-content-center">
                        <div class="d-flex align-content-center">
                            <i class="fa-solid fa-circle p-1 fs-4 text-danger"></i>
                            <i class="fa-solid fa-circle p-1 fs-4 text-warning"></i>
                            <i class="fa-solid fa-circle p-1 fs-4 text-success"></i>
                        </div>
                        <i class="fa-solid fa-xmark fs-4" data-bs-dismiss="modal" aria-label="Close"></i>
                    </div>
                    <div class="modal-body pb-0">
                        <h6 class="h5">Site Name or Url is ${errorName}, Please follow the rules below :</h6>
                        <ul class="list-unstyled mt-4 ms-3">
                            <li class="mt-3"><i class="fa-regular fa-circle-right me-1 "></i>
                                <span>Site name must contain at least 3 characters</span>
                            </li>
                            <li class="mt-3"><i class="fa-regular fa-circle-right me-1 "></i>
                                <span>Site URL must be a valid one</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
    modalContanier.innerHTML = modal;
}