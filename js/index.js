var siteNameInput = document.getElementById('siteName')
var siteURLInput = document.getElementById('siteURL')
var bookMarkContainer;


if (localStorage.getItem("bookMark") == null) {
    bookMarkContainer = [];
}
else {

    bookMarkContainer = JSON.parse(localStorage.getItem('bookMark'));
    displayBookMarks();
}

function addBookMark(element) {


    if (validateName(siteNameInput) && validateName(siteURLInput)) {

        var bookMarks = {

            nameBookMark: siteNameInput.value,
            siteBookMark: siteURLInput.value,

        }
        bookMarkContainer.push(bookMarks)
        displayBookMarks()
        localStorage.setItem('bookMark', JSON.stringify(bookMarkContainer))
        clearBookMarks()

    }
    else {


        document.getElementById('exampleModal').classList.replace('d-none', 'd-block')

    }

}

function clearBookMarks() {

    siteNameInput.value = "";
    siteURLInput.value = "";

}

function displayBookMarks() {

    var bookMarksBox = ``;
    for (var i = 1; i < bookMarkContainer.length; i++) {

        bookMarksBox += `   
    <div class="col-3"><h4>${i}</h4></div>
    <div class="col-3"><h4>${bookMarkContainer[i].nameBookMark}</h4></div>
    <div class="col-3"><a href="${bookMarkContainer[i].siteBookMark}" target="_blank"><button class="text-white btn btn-success my-1 px-4">Visit</button></a></div>
    <div class="col-3"><button class="btn px-4  btn-danger" onclick="deleteBookMark(${i})">Delete</button></div>`
        document.getElementById("rowDataBookMark").classList.replace('opacity-0', 'opacity-100')

    }
    document.getElementById("rowDataBookMark").innerHTML = bookMarksBox;

}

function deleteBookMark(deleteIndexBookMark) {

    bookMarkContainer.splice(deleteIndexBookMark, 1)
    displayBookMarks()
    localStorage.setItem('bookMark', JSON.stringify(bookMarkContainer))

}

function validateName(element) {

    var regex = {

        siteName: /^[A-Za-z]{3,}$/
        ,
        siteURL: /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[-a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g,
    }

    if (regex[element.id].test(element.value)) {

        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        element.nextElementSibling.classList.replace('d-block', 'd-none')
        return true

    }
    else {

        element.classList.add("is-invalid")
        element.classList.remove("is-valid")
        element.nextElementSibling.classList.replace('d-none', 'd-block')
        return false
    }
}

