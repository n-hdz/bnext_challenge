function dismiss(name) {
    arr = document.getElementsByClassName(name);
    for (var i = 0; i < arr.length; i++) {
        arr[i].classList.add('fade');
    }
    setTimeout(() => {
        for (var i = 0; i < arr.length; i++) {
            arr[i].style.display = 'none';
        }
    }, 500);
}

function triggerSpinner() {
    document.getElementById('loader').style.display = 'block';
}

function enableButton() {
    if (document.getElementById('idUsuario').value.length != 0) {
        document.getElementById('submitUser').disabled = false;
    } else {
        document.getElementById('submitUser').disabled = true;
    }
}

function checkTerms() {
    if (document.getElementById('termsCheck').checked) {
        document.getElementById('checkOut').disabled = false;
    } else {
        document.getElementById('checkOut').disabled = true;
    }
}