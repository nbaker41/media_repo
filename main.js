document.addEventListener('DOMContentLoaded', function() {
    var container = document.querySelector( '.container' );

    var tBody = document.querySelector('TABLE #data');
    let array=[];
 

    fetch( './getContents.php' ).then(response => {
        if(!response.ok) {
            throw new Error ( `HTTP error! status: ${response.status}` )
        }
        return response.json();
    }).then(data => {
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            console.log(item); // print out the individual item
            // document.querySelector(".repo").innerHTML += `data[i].name`;

            // you can also create a new table row and add the item data to it here
            let tr = document.createElement('TR');
            let td1 = document.createElement('TD');
            td1.innerHTML = `<img src="/uploads/${item.name}" alt="${item.name}"/> ${item.name}`; // replace "property1" with the actual property name
            let td2 = document.createElement('TD');
            td2.textContent = item.type; // replace "property2" with the actual property name
            tr.appendChild(td1);
            tr.appendChild(td2);
            tBody.appendChild(tr);
        }

  
    }).catch(error=> {
        if (error.message.startsWith('HTTP error')) {
            console.error('There was a problem with the request:', error.message);
        } else {
            console.error('There was a problem processing the JSON:', error.message);
        }
    })


});