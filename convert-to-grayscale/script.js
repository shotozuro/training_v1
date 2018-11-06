function init () {
  var canvas = document.getElementById("input");
  var context = canvas.getContext("2d");
  var button = document.getElementById("convert");

  button.disabled = true;
  var image = new Image();
  image.onload = function () {
    context.drawImage(image, 0, 0);
    button.disabled= false;
    button.value = "Convert";
  }
}

function convert() {

  grayscale(input, output)
}

function grayscale () {
  var input = document.getElementById("input");
  var output = document.getElementById("output");
	var inputContext = input.getContext("2d");
	var imageData = inputContext.getImageData(0, 0, input.width, input.height);
	var data = imageData.data;
 
	var arraylength = input.width * input.height * 4;

	for (var i=arraylength-1; i>0;i-=4)
	{
		var gray = 0.3 * data[i-3] + 0.59 * data[i-2] + 0.11 * data[i-1];
		data[i-3] = gray;
		data[i-2] = gray;
		data[i-1] = gray;
 
	}
	var outputContext = output.getContext("2d");
	outputContext.putImageData(imageData, 0, 0);
}

init()