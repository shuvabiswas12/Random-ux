var music = new Audio('audio/iterable.ogg');

document.addEventListener("DOMContentLoaded", function () {
    var shouldPlayMusic = true;

    let delayTimeSwitch = document.getElementById("delay-time--switch");
    let delayTimeDiv = document.getElementById("delay-time--div");

    let applyButton = document.getElementById("apply-button");

    let noRepeatSwitch = document.getElementById("no-repeat--switch");
    let noRepeatDiv = document.getElementById("no-repeat--div");

    let firstNumberInputField = document.getElementById("first-number");
    let lastNumberInputField = document.getElementById("last-number");

    let distanceOfTwoNumbers =
        parseInt(lastNumberInputField.value) -
        parseInt(firstNumberInputField.value);

    let maxCountUpto = document.getElementById("max-count-upto");
    maxCountUpto.innerText = (distanceOfTwoNumbers + 1).toString();

    // number change listener ...
    firstNumberInputField.addEventListener("input", function (e) {
        firstNumberInputField.value = e.target.value.toString();
        distanceOfTwoNumbers =
            parseInt(lastNumberInputField.value) -
            parseInt(firstNumberInputField.value);
        maxCountUpto.innerText = (distanceOfTwoNumbers + 1).toString();
    });

    lastNumberInputField.addEventListener("input", function (e) {
        lastNumberInputField.value = e.target.value.toString();
        distanceOfTwoNumbers =
            parseInt(lastNumberInputField.value) -
            parseInt(firstNumberInputField.value);
        maxCountUpto.innerText = (distanceOfTwoNumbers + 1).toString();
    });

    let latestCount = document.getElementById("latest-count");
    latestCount.innerText = "0".toString();

    let randomNumGeneratorBtn = document.getElementById("random-num--generator");

    let justGeneratedRandomNumber = 0;
    let totalBtnPressTime = 0;
    let counterArray = [];

    // getting the time delay duration ....
    let delayTimeDurationInputField = document.getElementById("delay-duration");
    let delayTimeDuration = parseFloat(delayTimeDurationInputField.value);

    // getting the value of time delay duration if it is changed ...
    delayTimeDurationInputField.addEventListener("input", function (e) {
        delayTimeDuration = parseFloat(e.target.value);
    });

    // for settings modal...

    let settingsModal = document.querySelectorAll(".modal");
    let instances = M.Modal.init(settingsModal, 0.5);
    instances[0].options.dismissible = false

    let delayTimeActive = false;
    let noRepeatActive = true;

    if (instances) {
        if (noRepeatDiv) {
            if (noRepeatDiv.className === "hide") {
                console.log("Hide!");
                noRepeatSwitch.checked = false;
            } else {
                noRepeatSwitch.checked = true;
                console.log("Hide Not!");
            }
        }

        if (delayTimeDiv) {
            if (delayTimeDiv.className === "hide") {
                delayTimeSwitch.checked = true;
                console.log("Checked!");
            } else {
                delayTimeSwitch.checked = false;
                console.log("Not Checked!");
            }
        }

        if (noRepeatSwitch) {
            noRepeatSwitch.addEventListener("click", function (e) {
                noRepeatActive = noRepeatSwitch.checked;
            });
        }

        if (delayTimeSwitch) {
            delayTimeSwitch.addEventListener("click", function (e) {
                delayTimeActive = delayTimeSwitch.checked;
            });
        }

        if (applyButton) {
            applyButton.addEventListener("click", function (e) {
                if (!noRepeatActive) {
                    noRepeatDiv.classList.add("hide");
                    totalBtnPressTime = 0;
                } else {
                    noRepeatDiv.classList.remove("hide");
                    // totalBtnPressTime = 0
                    // counterValue.innerText = '0'
                    // latestCount.innerText = '0'
                    // counterArray = []
                }

                if (!delayTimeActive) {
                    delayTimeDiv.classList.add("hide");
                } else {
                    delayTimeDiv.classList.remove("hide");
                }
            });
        }
    }

    // settings modal ends...

    // generated random number output modal...

    let numberOutputModal = document.querySelectorAll("#modal2");
    let instances_2 = M.Modal.init(numberOutputModal, 0.5);

    if (randomNumGeneratorBtn) {
        randomNumGeneratorBtn.addEventListener("click", function (e) {
            instances_2[0].options.dismissible = false;

            // rotation the generator btn icon ...
            randomNumGeneratorBtn.animate(
                [
                    // keyframes
                    { transform: "rotate(360deg)" },
                ],
                {
                    // timing options
                    duration: 300,
                }
            );
            // end the btn rotation code ...

            if (noRepeatActive) {
                if (delayTimeActive) {
                    increaseCounterAndShowWithNoRepeat(true);
                } else {
                    increaseCounterAndShowWithNoRepeat(false);
                }
            } else {
                if (delayTimeActive) {
                    increaseCounterAndShowWithRepeat(true);
                } else {
                    increaseCounterAndShowWithRepeat(false);
                }
            }
        });
    }

    let counterValue = document.getElementById("counter-value");

    function increaseCounterAndShowWithNoRepeat(isDelay) {
        totalBtnPressTime++;

        while (counterArray.length < parseInt(lastNumberInputField.value)) {
            justGeneratedRandomNumber =
                Math.floor(Math.random() * parseInt(lastNumberInputField.value)) +
                parseInt(firstNumberInputField.value);

            counterValue.innerText = "";

            if (counterArray.indexOf(justGeneratedRandomNumber) === -1) {
                counterArray.push(justGeneratedRandomNumber);

                if (mySecretNumber) {
                    justGeneratedRandomNumber = mySecretNumber;
                    mySecretNumber = null;
                    mySecretNumberInputField.value = "";
                }

                if (isDelay) {
                    rotateNumberOutputBox(true);
                } else {
                    rotateNumberOutputBox(false);
                }

                let box = document.getElementById("box");
                let recentColor = getAColorRandomly();
                box.style.backgroundColor = recentColor;

                let boxBack = document.getElementById("box-back");
                boxBack.style.backgroundColor = recentColor;
                latestCount.innerText = totalBtnPressTime.toString();

                break;
            }
        }

        if (counterArray.length >= parseInt(lastNumberInputField.value)) {
            // toast appear here ...
            createBottomToast()
            totalBtnPressTime = 0
            counterArray = []
        }
    }

    function increaseCounterAndShowWithRepeat(isDelay) {
        totalBtnPressTime++;

        while (totalBtnPressTime < parseInt(lastNumberInputField.value)) {
            justGeneratedRandomNumber =
                Math.floor(Math.random() * parseInt(lastNumberInputField.value)) +
                parseInt(firstNumberInputField.value);

            counterValue.innerText = "";

            counterArray.push(justGeneratedRandomNumber);

            if (mySecretNumber) {
                justGeneratedRandomNumber = mySecretNumber;
                mySecretNumber = null;
            }

            if (isDelay) {
                rotateNumberOutputBox(true);
            } else {
                rotateNumberOutputBox(false);
            }

            let box = document.getElementById("box");
            let recentColor = getAColorRandomly();
            box.style.backgroundColor = recentColor;

            let boxBack = document.getElementById("box-back");
            boxBack.style.backgroundColor = recentColor;
            latestCount.innerText = totalBtnPressTime.toString();

            break;
        }
    }

    // generated random number output modal ends...

    // Color code starts ...

    let previousColor = "#85bb5c";

    function getAColorRandomly() {
        // color's array starts ....

        let colors = [
            "#255d00",
            "#85bb5c",
            "#39796b",
            "#006064",
            "#001064",
            "#b28704",
            "#e91e63",
            "#4a0072",
            "#c2185b",
            "#9a0007",
            "#651fff",
            "#ac0800",
        ];

        // color's array ends ....

        let newColor = colors[Math.floor(Math.random() * colors.length)];
        while (previousColor === newColor) {
            newColor = colors[Math.floor(Math.random() * colors.length)];
        }
        previousColor = newColor;
        return newColor;
    }

    // Color code ends ...

    // For Dropdown starts ...

    let dropdown = document.querySelectorAll(".dropdown-trigger");
    let instances_3 = M.Dropdown.init(dropdown, "left");

    // For Dropdown ends ...

    // for reset btn starts ...

    let resetBtn = document.getElementById("reset-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            totalBtnPressTime = 0;
            counterValue.innerText = "0";
            latestCount.innerText = "0";
            counterArray = [];
        });
    }

    // for reset btn ends ...

    // for no repeat disable btn starts ...

    let disableBtn = document.getElementById("disable-btn");
    if (disableBtn) {
        disableBtn.addEventListener("click", function () {
            noRepeatDiv.classList.add("hide");

            noRepeatSwitch.checked = false;

            totalBtnPressTime = 0;
            counterValue.innerText = "0";
            latestCount.innerText = "0";
            counterArray = [];
        });
    }

    // for no repeat disable btn ends ...

    // for duration disable btn starts ...

    let durationDisableBtn = document.getElementById("duration-disable-btn");
    if (durationDisableBtn) {
        durationDisableBtn.addEventListener("click", function () {
            delayTimeSwitch.checked = false;
            delayTimeActive = false;
            delayTimeDiv.classList.add("hide");
        });
    }

    // for duration disable btn ends ...

    // flip box function starts ...

    function rotateNumberOutputBox(isDelay) {
        let delayTime = 1000;
        let transform = "rotateY(360deg)";

        if (isDelay) {
            if (delayTimeDuration) {
                delayTime = delayTimeDuration * 1000;
                var deg = 360 * delayTimeDuration;
                transform = `rotateY(${deg}deg)`;
            }
        }

        let box = document.getElementById("box");

        // // rotation the flip box ...
        let anim = box.animate(
            [
                // keyframes
                { transform: transform },
            ],
            {
                // timing options
                duration: delayTime,
            }
        );

        anim.onfinish = function () {
            music.pause();

            if (justGeneratedRandomNumber.toString().length < 7) {
                counterValue.style.fontSize = "6em"
                counterValue.style.top = "28%"
            } else if (justGeneratedRandomNumber.toString().length < 10) {
                counterValue.style.fontSize = "4.5em"
                counterValue.style.top = "31%"
            } else if (justGeneratedRandomNumber.toString().length < 13) {
                counterValue.style.fontSize = "3.5em"
                counterValue.style.top = "33%"
            } else if (justGeneratedRandomNumber.toString().length < 15) {
                counterValue.style.fontSize = "3em"
                counterValue.style.top = "37%"
            } else if (justGeneratedRandomNumber.toString().length < 19) {
                counterValue.style.fontSize = "2.5em"
                counterValue.style.top = "40%"
            } else {
                counterValue.style.fontSize = "2em"
                counterValue.style.top = "45%"
            }

            counterValue.innerText = justGeneratedRandomNumber.toString();
            instances_2[0].options.dismissible = true

            if (shouldPlayMusic) {
                music.currentTime = 0;
                music.play();
            }
        };
    }

    // flip box function ends ...

    // secret btn functionality starts ...

    let secretBtn = document.getElementById("MyClockDisplay");
    let okBtn = document.getElementById("ok-btn");
    let secretInput = document.getElementById("secret-input");
    let cancelBtn = document.getElementById("cancel-btn");

    let mySecretNumberInputField = document.getElementById("my-secret-number");

    let mySecretNumber = null;
    mySecretNumberInputField.addEventListener("input", function (e) {
        mySecretNumber = e.target.value;
    });

    okBtn.style.visibility = "hidden";
    cancelBtn.style.visibility = "hidden";
    secretInput.style.visibility = "hidden";
    secretBtn.style.visibility = "visible";

    if (secretBtn) {
        secretBtn.addEventListener("dblclick", function () {
            secretBtn.style.visibility = "hidden";

            okBtn.style.visibility = "visible";
            cancelBtn.style.visibility = "visible";
            secretInput.style.visibility = "visible";
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener("click", function () {
            okBtn.style.visibility = "hidden";
            cancelBtn.style.visibility = "hidden";
            secretInput.style.visibility = "hidden";

            secretBtn.style.visibility = "visible";
        });
    }

    okBtn.addEventListener("click", function () {
        okBtn.style.visibility = "hidden";
        cancelBtn.style.visibility = "hidden";
        secretInput.style.visibility = "hidden";

        secretBtn.style.visibility = "visible";
    });

    // secret btn functionality ends ...

    // enable music btn..

    let enableMusicBtn = document.getElementById("music-on");
    let disableMusicBtn = document.getElementById("music-off");

    disableMusicBtn.style.display = "inline-block";
    enableMusicBtn.style.display = "none";

    if (disableMusicBtn) {
        disableMusicBtn.addEventListener("click", function () {
            disableMusicBtn.style.display = "none";

            enableMusicBtn.style.display = "inline-block";
            shouldPlayMusic = true;
        });
    }

    if (enableMusicBtn) {
        enableMusicBtn.addEventListener("click", function () {
            disableMusicBtn.style.display = "inline-block";

            enableMusicBtn.style.display = "none";
            shouldPlayMusic = false;
        });
    }

    // disable music btn...


    //  toast starts ...
    function createBottomToast() {
        let x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    //  toast ends ...

});
