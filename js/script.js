$(document).ready(function () {
    prikaziKompanije();
    var danasnjiDatum = new Date();
    var formattedDate = danasnjiDatum.getFullYear() + '-' + ('0' + (danasnjiDatum.getMonth() + 1)).slice(-2) + '-' + ('0' + danasnjiDatum.getDate()).slice(-2);
    $('#datum_unosa').val(formattedDate);
});

function proveriUnose(maticni_broj, ime_kompanije) {
    if (isNaN(maticni_broj)) {
        alert('Maticni broj nije ispravan!');
        return false;
    }
    if (maticni_broj.length != 8) {
        alert('Maticni broj nema 8 cifara!');
        return false;
    }
    if (maticni_broj == "") {
        alert('Matični broj nije unet!');
        return false;
    }
    if (ime_kompanije == "") {
        alert('Ime kompanije nije uneto!');
        return false;
    }
    return true;
}

function proveriMaticniBroj(maticni_broj) {
    if (isNaN(maticni_broj)) {
        alert('Maticni broj nije ispravan!');
        return false;
    }
    if (maticni_broj.length != 8) {
        alert('Maticni broj nema 8 cifara!');
        return false;
    }
    if (maticni_broj == "") {
        alert('Matični broj nije unet!');
        return false;
    }
    return true;
}

function dodajKompaniju() {
    var maticni_broj = $('#maticni_broj').val();
    var ime_kompanije = $('#ime_kompanije').val();
    var danasnjiDatum = new Date();
    var datum_unosa = $('#datum_unosa').val() ?? (danasnjiDatum.getFullYear() + '-' + (danasnjiDatum.getMonth() + 1) + '-' + danasnjiDatum.getDate());

    if (!proveriUnose(maticni_broj, ime_kompanije))
        return;

    // FORMATIRANJE UNOSA
    maticni_broj = parseInt(maticni_broj, 10);
    ime_kompanije = ime_kompanije.charAt(0).toUpperCase() + ime_kompanije.slice(1);

    $.ajax({
        url: 'php/dodaj_kompaniju.php',
        method: 'POST',
        data: {
            maticni_broj: maticni_broj,
            ime_kompanije: ime_kompanije,
            datum_unosa: datum_unosa
        },
        success: function (response) {
            if (response) {
                alert(response);
            }
            else {
                // CISCENJE POLJA
                $('#maticni_broj').val("");
                $('#ime_kompanije').val("");
                prikaziKompanije();
            }
        }
    });
}

function ukloniKompaniju() {
    var maticni_broj = $('#maticni_broj').val();
    if (!proveriMaticniBroj(maticni_broj))
        return;

    maticni_broj = parseInt(maticni_broj, 10);
    var potvrda = confirm('Da li ste sigurni da želite ukloniti kompaniju sa matičnim brojem ' + maticni_broj + '?');

    if (potvrda) {
        $.ajax({
            url: 'php/ukloni_kompaniju.php',
            method: 'POST',
            data: {
                maticni_broj: maticni_broj
            },
            success: function (response) {
                if (response) {
                    alert(response);
                }
                prikaziKompanije();
            }
        });
    }
}

function prikaziKompanije() {
    $.ajax({
        url: 'php/prikazi_kompanije.php',
        method: 'GET',
        success: function (response) {
            var kompanije = JSON.parse(response);

            var tabela = $('#tabela_kompanija tbody');
            tabela.empty();

            kompanije.forEach(function (kompanija) {
                tabela.append(
                    '<tr>' +
                    '<td>' + kompanija.maticni_broj + '</td>' +
                    '<td>' + kompanija.ime_kompanije + '</td>' +
                    '<td>' + kompanija.datum_unosa + '</td>' +
                    '</tr>'
                );
            });
        }
    });
}

function preuzmiJson() {
    $.ajax({
        url: 'php/prikazi_kompanije.php',
        method: 'GET',
        success: function (response) {
            var kompanije = JSON.parse(response);

            var data = {
                kompanije: kompanije
            };

            var jsonData = JSON.stringify(data, null, 2);
            var blob = new Blob([jsonData], { type: 'application/json' });
            saveAs(blob, 'kompanije.json');
        }
    });
}

