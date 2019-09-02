
let app = new function () {
    const countries = document.getElementById('countries');
    const list = document.getElementById('list');
    this.countries = '';// ['France', 'Germany', 'England', 'Spain', 'Belgium', 'Italy', 'Portugal', 'Irland', 'Luxembourg'];
    this.Count = function (data) {
        let el = document.getElementById('counter');
        let name = 'country';
        if (data) {
            if (data > 1) {
                name = 'countries';
            }
            el.innerHTML = data + ' ' + name;
        } else {
            this.list.querySelector('tbody tr:first-child').style.display = 'none';
            el.innerHTML = 'No ' + name;
        }
    }
    function renderList(countriesObj) {;
        let data = '';
        for (let key in countriesObj) {
            data += '<tr id="'+key+'">';
                data += '<td>' + countriesObj[key]['country'] + '</td>';
                data += '<td><button onclick="app.Edit(\'' + key+ '\')">Edit</button></td>';
                data += '<td><button onclick="app.Delete(\'' + key+ '\')">Delete</button></td>';
                data += '</tr>';
        }
        return data;
    }
    this.FetchAll = function (obj = null) {

        fetch('http://localhost:3008').then(
            function (response) {
                response.json().then((result) => {
                   let listHtmlStr = renderList(result);
                    countries.innerHTML = listHtmlStr;
                });
            }
        )
    };
    this.Add = function () {
        let el = document.getElementById('add-name');
        let country = el.value;
        if (country) {
            el.value = '';
        }
        let request = fetch('http://localhost:3008', {
            method: 'POST',
            body: JSON.stringify(country.trim())
        }).then(
            function (response) {
                if (response.status !== 200) {
                    console.log(response.status);
                } else {
                    console.log('send');
                    response.json().then((result) => {

                    })
                }
            }
        ).catch((e) => {
            console.log(e);
        })
        this.FetchAll();

    }
    function CloseInput() {
        document.getElementById('spoiler').style.display = 'none';
    }



    this.Edit = function (item) {
        let el = document.getElementById('edit-name');
        let tr = document.getElementById(`${item}`);
        let countryName = tr.querySelector('td');


        //Display value in the field
        el.value = tr.querySelector('td').textContent;
        self = this;
        document.getElementById('spoiler').style.display = 'block';
        document.getElementById('saveEdit').onsubmit = function () {

            tr.querySelector('td').innerText = el.value;
            CloseInput();
        }
    }
    this.Delete = function (item) {
        let deleteItem = fetch('http://localhost:3008/?id=' + item +'',{
            method: 'DELETE'
        });
        deleteItem.then(
            (response) => {
                response.json().then((result) => {
                    this.FetchAll();
                })
            }
        )
    };
}
window.onload = function () {
    app.FetchAll();
}



