document.getElementById("file-input").addEventListener("change", function(event) {
    if (event.target.files.length > 0) {
        const fileCount = event.target.files.length;
        const message = fileCount === 1 
            ? `File selected: ${event.target.files[0].name}`
            : `${fileCount} files selected`;
        alert(message);
        handleFileUpload(event);
    }
});
 
document.getElementById("analyze-btn").addEventListener("click", function() {
    document.getElementById("intake-process").classList.add("hidden");
    document.getElementById("analysis-section").classList.remove("hidden");
    
    // Close the offcanvas using Bootstrap's API
    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('sidebar'));
    if (offcanvas) {
        offcanvas.hide();
    }
});
 
let files = [];

function handleFileUpload(event) {
    const fileInput = event.target;
    const fileList = document.getElementById('fileList');
    
    // For drag & drop, append files instead of replacing
    if (event.type !== 'drop') {
        Array.from(fileInput.files).forEach(file => {
            // Check if file already exists
            const isDuplicate = files.some(existingFile => 
                existingFile.name === file.name && 
                existingFile.size === file.size
            );
            if (!isDuplicate) {
                files.push(file);
            }
        });
    } else {
        // For drag & drop
        Array.from(fileInput.files).forEach(file => {
            const isDuplicate = files.some(existingFile => 
                existingFile.name === file.name && 
                existingFile.size === file.size
            );
            if (!isDuplicate) {
                files.push(file);
            }
        });
    }
    
    displayFiles();
}

function displayFiles() {
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';
    
    files.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>${file.name}</span>
            <button onclick="removeFile(${index})">
                <i class="fa-solid fa-times"></i>
            </button>
        `;
        fileList.appendChild(fileItem);
    });
    
    // Show/hide analyze button based on files presence
    document.getElementById('analyze-btn').style.display = files.length > 0 ? 'block' : 'none';
}

function removeFile(index) {
    files.splice(index, 1);
    displayFiles();
}

// Add drag and drop handlers
const dropArea = document.getElementById('drop-area');

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('drag-over');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over');
    const droppedFiles = e.dataTransfer.files;
    handleFileUpload({ target: { files: droppedFiles }, type: 'drop' });
});

document.getElementById("expandTableBtn").addEventListener("click", function() {
    document.getElementById("contractTable").classList.toggle("expanded-table");
});

function toggleLinkInput() {
    var sourceSelect = document.getElementById("sourceImport");
    var linkInputBox = document.getElementById("linkInputBox");
    linkInputBox.style.display = sourceSelect.value === "networkPath" ? "block" : "none";
}

function navigateToLink() {
    var link = document.getElementById("sharepointLink").value;
    if (link) {
        window.open(link, "_blank");
    } else {
        alert("Please enter a valid link.");
    }
}

function toggleFullScreen() {
    var container = document.getElementById("tableContainer");
    container.classList.toggle("full-screen");
}