// following the misty skills tutorials on docs.mistyrobotics.com

misty.Debug("hello, world!");

// audio cue
misty.PlayAudio("010-Uhm.wav", 30)
misty.Pause(1000);

//getrandom
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//look_around callback
function _look_around(repeat = true) {
    misty.MoveHeadPosition(
        getRandomInt(-5, 5), // Random pitch position between -5 and 5
        getRandomInt(-5, 5), // Random roll position between -5 and 5
        getRandomInt(-5, 5), // Random yaw position between -5 and 5
        100); // Head movement velocity. Decrease for slower movement.

    if (repeat) misty.RegisterTimerEvent(
        "look_around",
        getRandomInt(5, 10) * 1000,
        false);
    
}

// breathingLED callback
function _breathingLED() {
    var red = 140 / 10.0;
    var green = 0 / 10.0;
    var blue = 220 / 10.0;


    for (var i = 10; i >= 0; i = i - 1) {
        misty.ChangeLED(Math.floor(i * red), Math.floor(i * green), Math.floor(i*blue));

        
        // slow n' steady wins the race
        misty.Pause(100);
    }

    for (var i = 0; i <= 10; i = i + 1) {
        misty.ChangeLED(Math.floor(i * red), Math.floor(i * green), Math.floor(i * blue));

        misty.Pause(100);
    }

    // loop (recursion???????????????????)
    misty.RegisterTimerEvent("breathingLED", 1, false);
}

function waveRightArm() {
    misty.MoveArmDegrees("left", 90, 45); // left arm down
    misty.Pause(50);
    misty.MoveArmDegrees("right", 90, 45);
    misty.Pause(800);
    misty.MoveArmDegrees("right", -45, 45); // right arm up
    misty.Pause(100);
    misty.MoveArmDegrees("right", -20, 45); // right arm up
    misty.Pause(800);
    misty.MoveArmDegrees("right", -45, 45); // right arm up
    misty.Pause(100);
    misty.MoveArmDegrees("right", 90, 45) // right arm down
}

function _movement(){
    var flag = 1;

    waveRightArm();

    if (flag = 1){
        misty.DriveTime(0, 30, 5000);
        misty.Pause(5000);
        misty.DriveTime(0, -30, 5000);
        misty.Pause(5000);
        misty.Stop();
        flag = 0;
    }
}

function _registerFaceRec() {
    misty.StopFaceRecognition();
    misty.StartFaceRecognition();

    misty.AddPropertyTest("FaceRec", "PersonName", "exists", "", "string");
    misty.RegisterEvent("FaceRec", "FaceRecognition", 1000, false);
}

function _FaceRec(data) {
    var faceDetected = data.PropertyTestResults[0].PropertyValue;

    misty.Debug("Misty sees "+ faceDetected);

    if (faceDetected == "Elizabeth") {
        misty.DisplayImage("Happy.png");
        misty.PlayAudio("005-Eurra.wav", 30);
        waveRightArm();
    }
    else if (faceDetected == "unknown person") {
        misty.DisplayImage("image0.png");
        misty.PlayAudio("001-OooOooo.wav");
    };

    misty.RegisterTimerEvent("registerFaceRec", 7000, false);
}


misty.RegisterTimerEvent("look_around", getRandomInt(5, 10) * 1000, false);
misty.RegisterTimerEvent("breathingLED", 1, false);
misty.RegisterTimerEvent("movement", 1, false);
_registerFaceRec();