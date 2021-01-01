

var stopped = false;  //if stop button pressed

var myAudio = [document.getElementById("myAudio1"),     //audio samples
		document.getElementById("myAudio2"),
		document.getElementById("myAudio3"),
		document.getElementById("myAudio4"),
		document.getElementById("myAudio5"),
		document.getElementById("myAudio6"),
		document.getElementById("myAudio7"),
		document.getElementById("myAudio8"),
		document.getElementById("myAudio9")];

var isPlaying = [false, false, false, false, false, false, false, false, false];  //states of pads in current loop
var shouldBePlaying = [false, false, false, false, false, false, false, false, false];  //states of pads in the next loop

/*
An audio has finished playing one loop
*/
function playAll(id) {
	
	isPlaying[id] = false;
	var otherIsPlaying = false;
		
	//look for another tab that played in this loop
	for(var i = 0; i < myAudio.length; i++)
	{
		if(isPlaying[i])
		{	
			otherIsPlaying = true;
			break;
		}
	}
	
	//if there are no other playing tabs, start playing all "waiting" tabs
	if(!otherIsPlaying){
		for(var i = 0; i < myAudio.length; i++)
		{
			if(shouldBePlaying[i])
			{
				myAudio[i].play();
				isPlaying[i] = true;
			}
		}
	}
}

/**
* A pad is pressed
*/
function togglePlay(id) {
    
	const element = document.getElementById(id.toString());
     
	if(shouldBePlaying[id])  //if pad is already turned on
	{
		myAudio[id].pause();
		shouldBePlaying[id] = false;
		isPlaying[id] = false;
		
		
		//change back color of pad
		element.style.color = "#FFFFFF";
		element.style.borderColor = "#00FFFF";
		
	}
    else  //if pad is turned off
	{
		var otherIsPlaying = false;
		myAudio[id].currentTime = 0;
		
		//look for another playing pad
		for(var i = 0; i < myAudio.length; i++)
		{
			if(shouldBePlaying[i])
			{	
				otherIsPlaying = true;
				break;
			}
		}
		
		if(!stopped && !otherIsPlaying)  //if there are no other playing pads, then start playing. If there are, wait for this loop to finish.
		{
			myAudio[id].play();
			isPlaying[id] = true;
		}
		shouldBePlaying[id] = true;
		
		
		//change color of pad
		element.style.color = "#FDFF33";
		element.style.borderColor = "#FDFF33";
	}
};

/**
* Stop button is pressed. Stop all playing audio samples.
*/
function stopButtonPressed()
{	
	if(!stopped)
	{
		for(var i = 0; i < myAudio.length; i++)
		{
			if(shouldBePlaying[i])
			{	
				myAudio[i].pause();
				myAudio[i].currentTime = 0;
				isPlaying[i] = false;
			}
		}
	}
	stopped = true;
};

/**
* Play button is pressed. Start playing all stopped audio samples.
*/
function playButtonPressed()
{
	if(stopped)
	{
		for(var i = 0; i < myAudio.length; i++)
		{
			if(shouldBePlaying[i])
			{
				myAudio[i].play();
				isPlaying[i] = true;
			}
		}
	}
	stopped = false;
};
