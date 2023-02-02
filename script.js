// JavaScript code
var currentShow = 0;
var currentImage = 0;
var shows = [];

function loadSchedule() {
  // Read the file and extract the show names
  var fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "text/plain";
  fileInput.onchange = function() {
    var file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = function() {
      var showNames = reader.result.split("\n");
      // Load the images for each show and add to the shows array
      for (var i = 0; i < showNames.length; i++) {
        var showName = showNames[i];
        var showFolder = "Content/Shows/" + showName;
        var fileInput2 = document.createElement("input");
        fileInput2.type = "file";
        fileInput2.accept = "text/plain";
        fileInput2.onchange = function() {
          var file2 = fileInput2.files[0];
          var reader2 = new FileReader();
          reader2.onload = function() {
            var showImages = reader2.result.split("\n");
            shows.push({ name: showName, images: showImages });
          };
          reader2.readAsText(file2);
        };
        fileInput2.click();
      }
    };
    reader.readAsText(file);
  };
  fileInput.click();
}

function displayImage() {
  // Get the current show and image
  var show = shows[currentShow];
  var image = show.images[currentImage];
  
  // Update the background image
  document.body.style.backgroundImage = "url('Content/Shows/" + show.name + "/" + image + "')";
  
  // Increment the image index
  currentImage++;
  
  // If all images in the current show have been displayed, move to the next show
  if (currentImage >= show.images.length) {
    currentShow++;
    currentImage = 0;
    
    // If all shows have been displayed, start over
    if (currentShow >= shows.length) {
      currentShow = 0;
    }
  }
}

// Load the schedule and start displaying the images
loadSchedule();
setInterval(displayImage, 5000); // 5 seconds delay
