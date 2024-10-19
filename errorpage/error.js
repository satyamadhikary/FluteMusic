const output = document.getElementById('output');
const message = "404 Not Found\nThe requested URL was not found on this server.";
let index = 0;

function typeMessage() {
    if (index < message.length) {
        output.textContent += message.charAt(index);
        index++;
        setTimeout(typeMessage, 35);
    } else {
        // Add a blinking cursor after typing the message
        output.innerHTML += '<span class="cursor"></span>';
        addGoBackText(); // Call function to add "Go Back" text
    }
}

function addGoBackText() {
    const goBackText = document.createElement('div');
    goBackText.id = 'go-back';
    goBackText.className = 'go-back';
    goBackText.textContent = 'Go Back?';
    
    goBackText.addEventListener('click', () => {
        window.location.href = '/'; // Redirect to the home page
    });
    
    output.appendChild(goBackText); // Append "Go Back" text to output
}

typeMessage();
