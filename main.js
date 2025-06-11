document.addEventListener('DOMContentLoaded', function() {

    var repo = document.querySelector('#data');
    var tBody = document.querySelector('#sidebar #directoryInfo');
    let array=[];

    // Function to display a file in the main data area
    function displayFile(item) {
        // Clear the current content
        repo.innerHTML = '';
        
        if (item.type === 'file') {
            const fileExtension = item.name.split('.').pop().toLowerCase();
            
            if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension)) {
                // Display image
                const img = document.createElement('img');
                img.src = './uploads/' + item.name;
                img.alt = item.name;
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';
                img.style.objectFit = 'contain';
                repo.appendChild(img);
            } else {
                // Display file info for non-images
                const fileInfo = document.createElement('div');
                fileInfo.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>File type: ${fileExtension.toUpperCase()}</p>
                    <p><a href="./uploads/${item.name}" target="_blank">Open file</a></p>
                `;
                fileInfo.style.padding = '2rem';
                fileInfo.style.textAlign = 'center';
                repo.appendChild(fileInfo);
            }
        } else if (item.type === 'directory') {
            // Display directory info
            const dirInfo = document.createElement('div');
            dirInfo.innerHTML = `
                <h3>📁 ${item.name}</h3>
                <p>Directory</p>
            `;
            dirInfo.style.padding = '2rem';
            dirInfo.style.textAlign = 'center';
            repo.appendChild(dirInfo);
        }
    }
 

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
            td.style.cursor = 'pointer';
            tr.appendChild(td);
            tBody.appendChild(tr);
            
            // Add click event to display the selected file
            td.addEventListener("click", (e) => {
                displayFile(item);
            });
        }

  
    }).catch(error=> {
        if (error.message.startsWith('HTTP error')) {
            console.error('There was a problem with the request:', error.message);
        } else {
            console.error('There was a problem processing the JSON:', error.message);
        }
    })

    // Removed events.php fetch as it's unrelated to the media directory functionality

    

    

});