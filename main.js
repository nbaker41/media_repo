document.addEventListener('DOMContentLoaded', function() {

    var repo = document.querySelector('#data');
    var tBody = document.querySelector('#sidebar #directoryInfo');
    let array=[];
 

    fetch( './php/getContents.php' ).then(response => {
        if(!response.ok) {
            throw new Error ( `HTTP error! status: ${response.status}` )
        }
        return response.json();
    }).then(data => {
        let div1 = document.createElement('div');
        div1.classList.add('data-container');

        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.innerHTML = item.name;
            tr.appendChild(td);
            tBody.appendChild(tr);
            td.addEventListener("click", (e)=>{
                
                // let img = document.createElement("img");
                // img.src = '/uploads/' + item.name;
                // repo.appendChild(img);
            })
            // let div2 = document.createElement('div');
            // div2.classList.add('thumbnail');
            // div2.innerHTML = `<div class="t-img"><img src="/uploads/${item.name}" alt="${item.name}"/></div><p>${item.name}</p>`; // replace "property1" with the actual property name
            // div1.appendChild(div2);
            // repo.appendChild(div1);

            // tBody.innerHTML += `<tr><td class="item">${item.name}</td></tr>`;

        }

  
    }).catch(error=> {
        if (error.message.startsWith('HTTP error')) {
            console.error('There was a problem with the request:', error.message);
        } else {
            console.error('There was a problem processing the JSON:', error.message);
        }
    })

    fetch( './php/events.php' ).then(response => {
        if(!response.ok) {
            throw new Error ( `HTTP error! status: ${response.status}` )
        }
        return response.text();
    }).then(data => {
        // console.log(data);

  
    }).catch(error=> {
        if (error.message.startsWith('HTTP error')) {
            console.error('There was a problem with the request:', error.message);
        } else {
            console.error('There was a problem processing the JSON:', error.message);
        }
    })

    

    

});