function creatorCommentaryExtension() {
  var test_url = "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3";
//TODO: replace above url with something on our own site

  console.log("Looking for Linked MP3");
  var re = /(https?:\/\/*.mp3)/;
  //TODO: make re more specific mp3 match
  var mp3 = document.body.innerHTML.match(re);
  if (mp3 == null) {
    console.log("Exiting. No Linked Creator Commentary MP3.");
mp3 = [0, test_url]; //TODO: delete this line and exit (only for testing right now)
//    return; //TODO: uncomment this line
  }
  mp3 = mp3[1];
  console.log("Creating Player for " + mp3);

  var idPrefix = "creatorCommentaryExtension";
  var div = document.createElement("DIV");
  div.id = idPrefix + "Div";
  div.dataset.expanded = 1;
  div.style.position = "absolute";
  div.style.left = "0px";
  div.style.top = "0px";
  div.style.zIndex = "999999";

  var btn = document.createElement("BUTTON");
  btn.id = idPrefix + "Button";
  btn.title = "Hide the MP3 Player";
  btn.innerHTML = "&laquo;";
  btn.style.fontSize = "200%";
  btn.style.fontWeight = "300";
  btn.style.paddingBottom = "8px";
  btn.style.verticalAlign = "top";

  var audio = document.createElement("AUDIO");
  audio.src = mp3;
  audio.setAttribute("controls", "controls");

  div.appendChild(audio);
  div.appendChild(btn);
  document.body.appendChild(div);
  audio.play(); //TODO: delay until ads have played??? ??? ???

  btn.onclick = function () {
    if (div.dataset.expanded == 1) { //Collapse the div
      div.dataset.expanded = 0;
      btn.innerHTML = "&raquo;";
      btn.title = "Show the MP3 Player";
      audio.style.display = "none";
    } else { //Expand the Div
      div.dataset.expanded = 1;
      btn.innerHTML = "&laquo;";
      btn.title = "Hide the MP3 Player";
      audio.style.display= "inline-block";
    }
  }
}


/******************** Extension Startup ********************/
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: creatorCommentaryExtension
  });
});