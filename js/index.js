var siteNameInput = document.getElementById('siteName');
var siteURLInput = document.getElementById('siteURL');
var bookMarkContainer = localStorage.getItem("bookMark") ? JSON.parse(localStorage.getItem("bookMark")) : [];
displayBookmarks();


function clearValidationClasses() {
    siteNameInput.classList.remove("is-valid", "is-invalid");
    siteURLInput.classList.remove("is-valid", "is-invalid");
}

function clearInputs() {
    siteNameInput.value = "";
    siteURLInput.value = "";
}

function addBookmark() {
    if (validateInput(siteNameInput) && validateInput(siteURLInput)) {
        var bookmark = {
            name: siteNameInput.value,
            url: siteURLInput.value
        };
        bookMarkContainer.push(bookmark);
        displayBookmarks();
        localStorage.setItem('bookMark', JSON.stringify(bookMarkContainer));
        clearValidationClasses();
        clearInputs();
    }
}


function displayBookmarks() {
    var bookMarksBox = '';
    for (var i = 0; i < bookMarkContainer.length; i++) {
        bookMarksBox += `
      <tr>
        <td>${i + 1}</td>
        <td>${bookMarkContainer[i].name}</td>
        <td><a href="${bookMarkContainer[i].url}" target="_blank"><button class="btn btn-success my-1 px-4">Visit</button></a></td>
        <td><button class="btn px-4 btn-danger" onclick="deleteBookmark(${i})">Delete</button></td>
      </tr>`;
    }
    document.getElementById("rowDataBookmark").innerHTML = bookMarksBox;
    document.getElementById("rowDataBookmark").classList.replace('opacity-0', 'opacity-100');
}

function deleteBookmark(index) {
    bookMarkContainer.splice(index, 1);
    displayBookmarks();
    localStorage.setItem('bookMark', JSON.stringify(bookMarkContainer));
}

function validateInput(element) {
    var regex = {
        siteName: /^[A-Za-z\u0600-\u06FF]{3,}$/,
        siteURL: /^(https?:\/\/)?([\w\d-]+\.){1,2}[a-z]{2,}(\/\S*)?$/
    };
    var isValid = regex[element.id].test(element.value);
    var alertElement = element.id === 'siteName' ? document.getElementById('nameAlert') : document.getElementById('urlAlert');

    if (isValid) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        alertElement.classList.replace('d-block', 'd-none');
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        alertElement.classList.replace('d-none', 'd-block');
    }
    return isValid;
}
