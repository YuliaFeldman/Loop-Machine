

var paused = false;  //if pause button pressed
var myAudio = [document.getElementById("myAudio1"),     //loop samples
		document.getElementById("myAudio2"),
		document.getElementById("myAudio3"),
		document.getElementById("myAudio4"),
		document.getElementById("myAudio5"),
		document.getElementById("myAudio6"),
		document.getElementById("myAudio7"),
		document.getElementById("myAudio8"),
		document.getElementById("myAudio9")];
var isPlaying = [false, false, false, false, false, false, false, false, false];  //states of pads

/**
* When a pad is turned on, it starts playing its loop
*/
function togglePlay(id) {
    const element = document.getElementById(id.toString());
     if(isPlaying[id])
	{
		myAudio[id].pause();
		isPlaying[id] = false;
		//change back color of pad
		element.style.color = "#FFFFFF";
		element.style.borderColor = "#00FFFF";
		
	}
     else
	{
		myAudio[id].currentTime = 0;
		
		//sync this loop with other playing loops
		for(var i = 0; i < myAudio.length; i++)
		{
			if(isPlaying[i])
			{	
				myAudio[id].currentTime = myAudio[i].currentTime;
				break;
			}
		}
		if(!paused)
		{
			myAudio[id].play();
		}
		isPlaying[id] = true;
		
		//change color of pad
		element.style.color = "#FDFF33";
		element.style.borderColor = "#FDFF33";
	}
};

/**
* Stop button is pressed. Pause all playing loops.
*/
function stopButtonPressed()
{	
	if(!paused)
	{
		for(var i = 0; i < myAudio.length; i++)
		{
			if(isPlaying[i])
			{	
				myAudio[i].pause();
			}
		}
	}
	paused = true;
};

/**
* Play button is pressed. Continue playing all paused loops.
*/
function playButtonPressed()
{
	if(paused)
	{
		for(var i = 0; i < myAudio.length; i++)
		{
			if(isPlaying[i])
			{
				myAudio[i].play();
			}
		}
	}
	paused = false;
};
