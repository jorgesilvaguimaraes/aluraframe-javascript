var campos = [
    document.querySelector('#data'),
    document.querySelector('#quantidade'),
    document.querySelector('#valor')
];


document.querySelector('.form').addEventListener('submit',function(event){
    event.preventDefault();

    tbody = document.querySelector('tbody');

    tr = document.createElement('tr');
    campos.forEach(function(campo){
        var td = document.createElement('td');
        td.textContent = campo.value;
        tr.appendChild(td);
    });

    var tdvolume = document.createElement('td');
    tdvolume.textContent = campos[1].value * campos[2].value;

    tr.appendChild(tdvolume);
    tbody.appendChild(tr);

    campos[0].value = '';
    campos[1].value = 1;
    campos[2].value = 0.0;

    campos[0].focus()

});

