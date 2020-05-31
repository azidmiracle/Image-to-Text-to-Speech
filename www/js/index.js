var element = document.getElementById("result"); //get the element textarea. This is where the output is displayed

var isToggle = false;//Wwhen the speaker button is clicked. Initial value is false. (volume off)

//when the button camera is clicked, it will call the takephoto method
document
  .getElementById("cameraID")
  .addEventListener("click", () => takephoto());

//when the button borwse is clicked, it will call the browse the phone's gallery method
document
  .getElementById("browseImg")
  .addEventListener("click", () => browsephoto());

/*method in taking the photo. this is a built-in plug in of the camera
it will evalutate the onSuccess function first. If it fails, it will execute the onFail function
Quality is set to 100% (full resolution) and the orientation true (Rotate the image to correct for the orientation of the device during capture.)*/
function takephoto() {
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 100,
    correctOrientation: true,
  });
}

function browsephoto() {
  var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
  var options = setOptions(srcType);

  navigator.camera.getPicture(onSuccess, onFail, options);

  function setOptions(srcType) {
    var options = {
      // Some common settings are 20, 50, and 100
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URI,
      // In this app, dynamically set the picture source, Camera or photo gallery
      sourceType: srcType,
      encodingType: Camera.EncodingType.JPEG,
      mediaType: Camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true, //Corrects Android orientation quirks
    };
    return options;
  }
}
/* NOT USED
function setOptions(srcType) {
  var options = {
    // Some common settings are 20, 50, and 100
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    // In this app, dynamically set the picture source, Camera or photo gallery
    sourceType: srcType,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.PICTURE,
    allowEdit: true,
    correctOrientation: true, //Corrects Android orientation quirks
  };
  return options;
}*/

function onSuccess(imageData) {
  textocr.recText(0, imageData, onSuccessOCR, onFailOCR); // removed returnType (here 3) from version 2.0.0
  // for sourceType Use 0,1,2,3 or 4
  // for returnType Use 0,1,2 or 3 // 3 returns duplicates[see table]

  function onSuccessOCR(recognizedText) {
    var allBlocks = recognizedText.lines.linetext;//OCR imported method to select per line of the captured text

    //convert to new line
    var allLines = "";
    allBlocks.forEach((element) => {
      allLines = allLines + element + "\n";
    });
    element.innerHTML = allLines;//put the value to the element
  }
  function onFailOCR(message) {
    alert("Failed because: " + message);
  }
}
function onFail(message) {
  alert("Failed because: " + message);
}


/*WHEN THE SPEAKER BUTTON IS CLICKED, it will turn on the speaker*/
document.getElementById("toSpeech").addEventListener("click", (e) => {
  const targetLi = event.target;
  isToggle = !isToggle;
  toggle(isToggle, targetLi);
  textToSpeech(isToggle);
});

function textToSpeech(isOn) {
  document.addEventListener(
    "deviceready",
    function () {
      // basic usage
      var toSpeak = element.textContent;
      if (isOn == false) {
        toSpeak = "";
      }
      //This is the imported methods from TTS
      //Pass the text/value in the element
      TTS.speak(
        toSpeak,
        function () {
          //alert('success');
        },
        function (reason) {
          alert(reason);
        }
      );
    },
    false
  );
}
