var Bname = document.getElementById("Bname");
var Burl = document.getElementById("Burl");
var bookmarkTable = document.getElementById("bookmarkTable");

var BookmarkList = [];
if (localStorage.getItem("BookmarkList")) {
    BookmarkList = JSON.parse(localStorage.getItem("BookmarkList"));
    displayBookmark(BookmarkList);
}else {
    BookmarkList = [];
}
function addBookmark() {
    let BookMark = {
        name: Bname.value,
        url: Burl.value
    }
    BookmarkList.push(BookMark);
    save();
    clearForm();
}

function displayBookmark(list) {
    let cartona = '';
    for (let i = 0; i < list.length; i++) {
        cartona += ` 
                <tr>
                    <td>${i+1}</td>
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