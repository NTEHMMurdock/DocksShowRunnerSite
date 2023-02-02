// JavaScript code
var currentShow = 0;
var currentImage = 0;
var shows = [];

async function loadSchedule() {
  // Read the file and extract the show names
  const response = await fetch("Content/DockTVSchedule.txt");
  const showNames = await response.text().split("\n");
  
  // Load the images for each show and add to the shows array
  for (const showName of showNames) {
    const showFolder = "Content/Shows/" + showName;
    const showResponse = await fetch(showFolder + "/list_of_images.txt");
    const showImages = await showResponse.text().split("\n");
    shows.push({ name: showName, images: showImages });
  }
}

async function displayImage() {
  // Check if the shows array is empty
  if (shows.length === 0) {
    return;
  }
  
  // Get the current show and image
  const show = shows[currentShow];
  const image = show.images[currentImage];
  
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
