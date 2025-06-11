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
        if (data.error) {
            repo.innerHTML = `<div style='color:red;'>${data.error}</div>`;
            return;
        }
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
                // Show preview if image
                if (item.type === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(item.name)) {
                    repo.innerHTML = '';
                    let img = document.createElement("img");
                    img.src = './uploads/' + item.name;
                    img.alt = item.name;
                    img.style.maxWidth = '80%';
                    img.style.maxHeight = '80vh';
                    repo.appendChild(img);
                } else if (item.type === 'file') {
                    repo.innerHTML = `<p>File: ${item.name}</p>`;
                } else {
                    repo.innerHTML = `<p>Directory: ${item.name}</p>`;
                }
            })

            // Show thumbnails for images
            if (item.type === 'file' && /\.(jpg|jpeg|png|gif)$/i.test(item.name)) {
                let div2 = document.createElement('div');
                div2.classList.add('thumbnail');
                div2.innerHTML = `<div class="t-img"><img src="./uploads/${item.name}" alt="${item.name}"/></div><p>${item.name}</p>`;
                div2.addEventListener('click', () => {
                    repo.innerHTML = '';
                    let img = document.createElement("img");
                    img.src = './uploads/' + item.name;
                    img.alt = item.name;
                    img.style.maxWidth = '80%';
                    img.style.maxHeight = '80vh';
                    repo.appendChild(img);
                });
                div1.appendChild(div2);
            }
        }
        repo.appendChild(div1);

  
    }).catch(error=> {
        repo.innerHTML = `<div style='color:red;'>Error loading directory: ${error.message}</div>`;
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
        return response.json();
    }).then(events => {
        const eventsList = document.getElementById('eventsList');
        eventsList.innerHTML = '';
        events.forEach(event => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${event.link}" target="_blank">${event.title}</a>`;
            eventsList.appendChild(li);
        });
    }).catch(error=> {
        const eventsList = document.getElementById('eventsList');
        eventsList.innerHTML = '<li>Error loading events.</li>';
        if (error.message.startsWith('HTTP error')) {
            console.error('There was a problem with the request:', error.message);
        } else {
            console.error('There was a problem processing the JSON:', error.message);
        }
    })

    // Upload form handler
    const uploadForm = document.getElementById('uploadForm');
    const uploadStatus = document.getElementById('uploadStatus');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            uploadStatus.textContent = '';
            const formData = new FormData(uploadForm);
            fetch('./php/upload.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(result => {
                uploadStatus.style.color = result.includes('uploaded') ? 'green' : 'red';
                uploadStatus.textContent = result;
                // Refresh directory listing after upload
                setTimeout(() => window.location.reload(), 1000);
            })
            .catch(error => {
                uploadStatus.style.color = 'red';
                uploadStatus.textContent = 'Upload failed.';
            });
        });
    }

});