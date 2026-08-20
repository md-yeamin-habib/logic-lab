const gateSelect = document.getElementById("gateSelect");

const switches = [
    document.getElementById("switch1"),
    document.getElementById("switch2"),
    document.getElementById("switch3"),
    document.getElementById("switch4"),
    document.getElementById("switch5"),
    document.getElementById("switch6")
];

const inputWires = [
    document.getElementById("inputWire1"),
    document.getElementById("inputWire2"),
    document.getElementById("inputWire3"),
    document.getElementById("inputWire4"),
    document.getElementById("inputWire5"),
    document.getElementById("inputWire6")
];

const outputWire = document.getElementById("outputWire");

const bulb = document.getElementById("bulb");

const bulbOuter = document.getElementById("bulbOuter");

const gateShape = document.getElementById("gateShape");

const gateExtra = document.getElementById("gateExtra");

const gateBubble = document.getElementById("gateBubble");

const singleOutput = document.getElementById("singleOutput");

const decoderOutputs = document.getElementById("decoderOutputs");

const decoderWires = [];

const decoderBulbs = [];

const decoderBulbOuters = [];

const decoderLabels = [];


for (let i = 0; i < 8; i++) {

    decoderWires.push(document.getElementById(`decoderWire${i}`));

    decoderBulbs.push(document.getElementById(`decoderBulb${i}`));

    decoderBulbOuters.push(document.getElementById(`decoderBulbOuter${i}`));

    decoderLabels.push(document.getElementById(`decoderLabel${i}`));
}

const inputs = [false, false, false, false, false, false];

let currentGate = "AND";

function setHorizontalWire(wire, x1, y1, x2, y2) {
    wire.setAttribute("d", `M ${x1} ${y1} H ${x2}`);
}

function hideWire(wire) {
    wire.setAttribute("d", "");
}

function positionSwitch(element, x, y) {

    element.style.left = `${(x / 1400) * 100}%`;

    element.style.top = `${(y / 600) * 100}%`;

    element.style.transform = "translate(-50%, -50%)";
}

function showSwitch(index, visible) {

    const element = switches[index];

    if (!element) { return; }

    element.style.opacity = visible ? "1" : "0";

    element.style.pointerEvents = visible ? "auto" : "none";
}

function updateSwitchLabel(index, label) {

    const element = switches[index];

    if (!element) { return; }

    const span = element.querySelector("span");

    if (!span) { return; }

    span.textContent = `${label}: ${inputs[index] ? "ON" : "OFF"}`;
}

function updateSwitch(index) {

    const element = switches[index];

    if (!element) { return; }

    element.classList.toggle("on", inputs[index]);
}

switches.forEach((element, index) => {
        element.addEventListener("click", () => {
                inputs[index] = !inputs[index];
                updateSwitch(index);
                updateCurrentSwitchLabels();
                updateCircuit();
            }
        );
    }
);

function updateCurrentSwitchLabels() {

    switch (currentGate) {

        case "XOR3":

            updateSwitchLabel(0, "A");
            updateSwitchLabel(1, "B");
            updateSwitchLabel(2, "C");

            break;


        case "DECODER3":

            updateSwitchLabel(0, "A");
            updateSwitchLabel(1, "B");
            updateSwitchLabel(2, "C");

            break;


        case "MUX4":

            updateSwitchLabel(0, "D0");
            updateSwitchLabel(1, "D1");
            updateSwitchLabel(2, "D2");
            updateSwitchLabel(3, "D3");
            updateSwitchLabel(4, "S0");
            updateSwitchLabel(5, "S1");

            break;


        default:

            updateSwitchLabel(0, "A");
            updateSwitchLabel(1, "B");

            break;
    }
}

const gateGeometry = {

    AND: {

        type: "gate",

        path: `
            M 470 220
            H 650
            C 810 220 900 255 900 300
            C 900 345 810 380 650 380
            H 470
            Z
        `,

        extra: "",

        bubble: false,

        inputs: [
            {
                x: 470,
                y: 220
            },
            {
                x: 470,
                y: 380
            }
        ],

        output: {
            x: 900,
            y: 300
        },

        wireEnd: {
            x: 1250,
            y: 300
        }
    },

    OR: {

        type: "gate",

        path: `
            M 470 220
            C 590 220 760 230 900 300
            C 760 370 590 380 470 380
            C 535 330 535 270 470 220
            Z
        `,

        extra: "",

        bubble: false,

        inputs: [
            {
                x: 470,
                y: 220
            },
            {
                x: 470,
                y: 380
            }
        ],

        output: {
            x: 900,
            y: 300
        },

        wireEnd: {
            x: 1250,
            y: 300
        }
    },

    NOT: {

        type: "gate",

        path: `
            M 600 220
            L 600 380
            L 900 300
            Z
        `,

        extra: "",

        bubble: true,

        inputs: [
            {
                x: 600,
                y: 300
            }
        ],

        output: {
            x: 900,
            y: 300
        },

        bubblePosition: {
            x: 913,
            y: 300,
            r: 13
        },

        wireStart: {
            x: 926,
            y: 300
        },

        wireEnd: {
            x: 1250,
            y: 300
        }
    },

    NAND: {

        type: "gate",

        path: `
            M 470 220
            H 650
            C 810 220 900 255 900 300
            C 900 345 810 380 650 380
            H 470
            Z
        `,

        extra: "",

        bubble: true,

        inputs: [
            {
                x: 470,
                y: 220
            },
            {
                x: 470,
                y: 380
            }
        ],

        output: {
            x: 900,
            y: 300
        },

        bubblePosition: {
            x: 913,
            y: 300,
            r: 13
        },

        wireStart: {
            x: 926,
            y: 300
        },

        wireEnd: {
            x: 1250,
            y: 300
        }
    },

    NOR: {

        type: "gate",

        path: `
            M 470 220
            C 590 220 760 230 900 300
            C 760 370 590 380 470 380
            C 535 330 535 270 470 220
            Z
        `,

        extra: "",

        bubble: true,

        inputs: [
            {
                x: 470,
                y: 220
            },
            {
                x: 470,
                y: 380
            }
        ],

        output: {
            x: 900,
            y: 300
        },

        bubblePosition: {
            x: 913,
            y: 300,
            r: 13
        },

        wireStart: {
            x: 926,
            y: 300
        },

        wireEnd: {
            x: 1250,
            y: 300
        }
    },

    XOR: {

        type: "gate",

        path: `
            M 500 220
            C 610 220 770 230 900 300
            C 770 370 610 380 500 380
            C 555 330 555 270 500 220
            Z
        `,

        extra: `
            M 460 220
            C 520 270 520 330 460 380
        `,

        bubble: false,

        inputs: [
            {
                x: 500,
                y: 220
            },
            {
                x: 500,
                y: 380
            }
        ],

        output: {
            x: 900,
            y: 300
        },

        wireEnd: {
            x: 1250,
            y: 300
        }
    },

    XNOR: {

        type: "gate",

        path: `
            M 500 220
            C 610 220 770 230 900 300
            C 770 370 610 380 500 380
            C 555 330 555 270 500 220
            Z
        `,

        extra: `
            M 460 220
            C 520 270 520 330 460 380
        `,

        bubble: true,

        inputs: [
            {
                x: 500,
                y: 220
            },
            {
                x: 500,
                y: 380
            }
        ],

        output: {
            x: 900,
            y: 300
        },

        bubblePosition: {
            x: 913,
            y: 300,
            r: 13
        },

        wireStart: {
            x: 926,
            y: 300
        },

        wireEnd: {
            x: 1250,
            y: 300
        }
    },

    XOR3: {

        type: "gate",

        path: `
            M 500 150
            C 650 150 820 190 940 300
            C 820 410 650 450 500 450
            C 565 390 565 210 500 150
            Z
        `,

        extra: `
            M 455 150
            C 525 210 525 390 455 450
        `,

        bubble: false,

        inputs: [
            {
                x: 500,
                y: 150
            },
            {
                x: 500,
                y: 300
            },
            {
                x: 500,
                y: 450
            }
        ],

        output: {
            x: 940,
            y: 300
        },

        wireEnd: {
            x: 1250,
            y: 300
        }
    },

    DECODER3: {

        type: "decoder",

        path: `
            M 600 150
            H 900
            V 450
            H 600
            Z
        `,

        inputs: [
            {
                x: 600,
                y: 220
            },
            {
                x: 600,
                y: 300
            },
            {
                x: 600,
                y: 380
            }
        ],

        outputs: [
            {
                x: 900,
                y: 150
            },
            {
                x: 900,
                y: 193
            },
            {
                x: 900,
                y: 236
            },
            {
                x: 900,
                y: 279
            },
            {
                x: 900,
                y: 321
            },
            {
                x: 900,
                y: 364
            },
            {
                x: 900,
                y: 407
            },
            {
                x: 900,
                y: 450
            }
        ]
    },

    MUX4: {

        type: "mux",

        path: `
            M 600 130
            H 900
            L 940 300
            L 900 470
            H 600
            Z
        `,

        inputs: [

            {
                x: 600,
                y: 160
            },
            {
                x: 600,
                y: 220
            },
            {
                x: 600,
                y: 280
            },
            {
                x: 600,
                y: 340
            },
            {
                x: 600,
                y: 410
            },
            {
                x: 600,
                y: 460
            }
        ],

        output: {
            x: 940,
            y: 300
        },

        wireEnd: {
            x: 1250,
            y: 300
        }
    }

};

function resetGateVisuals() {

    gateShape.setAttribute("d", "");
    gateExtra.setAttribute("d", "");
    gateBubble.setAttribute("r", "0");
    gateShape.classList.remove("active");
    gateExtra.classList.remove("active");
    gateBubble.classList.remove("active");
    outputWire.classList.remove("active");
    hideWire(outputWire);

    inputWires.forEach(wire => {
            hideWire(wire);
            wire.classList.remove("active");
        }
    );
}

function hideAllSwitches() {

    switches.forEach((_, index) => {
            showSwitch(index, false);
        }
    );
}

function showSingleOutput() {

    singleOutput.style.display = "block";
    decoderOutputs.style.display = "none";
}

function showDecoderOutputs() {

    singleOutput.style.display = "none";
    decoderOutputs.style.display = "block";
}

function setupTwoInputGate(geometry) {

    hideAllSwitches();
    showSwitch(0, true);
    showSwitch(1, true);
    positionSwitch(switches[0], 229, geometry.inputs[0].y);
    positionSwitch( switches[1], 229, geometry.inputs[1].y);
    setHorizontalWire(
        inputWires[0],
        270,
        geometry.inputs[0].y,
        geometry.inputs[0].x,
        geometry.inputs[0].y
    );

    setHorizontalWire(
        inputWires[1],
        270,
        geometry.inputs[1].y,
        geometry.inputs[1].x,
        geometry.inputs[1].y
    );
}


function setupNot() {

    hideAllSwitches();
    showSwitch(0, true);
    positionSwitch(switches[0], 359, 300);
    setHorizontalWire(inputWires[0], 400, 300, 600, 300);
    hideWire(inputWires[1]);
}


function setupXor3(geometry) {

    hideAllSwitches();
    showSwitch(0, true);
    showSwitch(1, true);
    showSwitch(2, true);


    for (let i = 0; i < 3; i++) {

        positionSwitch(switches[i], 229, geometry.inputs[i].y);
        setHorizontalWire(
            inputWires[i],
            270,
            geometry.inputs[i].y,
            geometry.inputs[i].x,
            geometry.inputs[i].y
        );
    }
}


function setupDecoder(geometry) {

    hideAllSwitches();
    showSwitch(0, true);
    showSwitch(1, true);
    showSwitch(2, true);

    for (let i = 0; i < 3; i++) {

        positionSwitch(switches[i], 329, geometry.inputs[i].y);
        setHorizontalWire(
            inputWires[i],
            370,
            geometry.inputs[i].y,
            geometry.inputs[i].x,
            geometry.inputs[i].y
        );
    }

    for (let i = 0; i < 8; i++) {

        const output = geometry.outputs[i];
        setHorizontalWire(
            decoderWires[i],
            output.x,
            output.y,
            1135,
            output.y
        );

        const outer = decoderBulbOuters[i];
        const inner = decoderBulbs[i];
        outer.setAttribute("cx", "1165");
        outer.setAttribute("cy", output.y);
        inner.setAttribute("cx", "1165");
        inner.setAttribute("cy", output.y);
        decoderLabels[i].setAttribute("x", "1200");
        decoderLabels[i].setAttribute("y", output.y);
    }
}


function setupMux(geometry) {

    hideAllSwitches();

    for (let i = 0; i < 6; i++) {

        showSwitch(i, true);
        positionSwitch(switches[i], 329, geometry.inputs[i].y);
        setHorizontalWire(
            inputWires[i],
            370,
            geometry.inputs[i].y,
            geometry.inputs[i].x,
            geometry.inputs[i].y
        );
    }

    setHorizontalWire(
        outputWire,
        geometry.output.x,
        geometry.output.y,
        geometry.wireEnd.x,
        geometry.wireEnd.y
    );
}

function updateGate() {

    const geometry = gateGeometry[currentGate];
    resetGateVisuals();
    hideAllSwitches();

    if (
        currentGate === "AND" ||
        currentGate === "OR" ||
        currentGate === "NAND" ||
        currentGate === "NOR" ||
        currentGate === "XOR" ||
        currentGate === "XNOR"
    ) {
        showSingleOutput();
        setupTwoInputGate(geometry);
        gateShape.setAttribute("d", geometry.path);
        gateExtra.setAttribute("d", geometry.extra);
        gateExtra.style.display = geometry.extra ? "block" : "none";
        const startX = geometry.bubble ? geometry.wireStart.x : geometry.output.x;
        setHorizontalWire(
            outputWire,
            startX,
            geometry.output.y,
            geometry.wireEnd.x,
            geometry.wireEnd.y
        );

        if (geometry.bubble) {
            gateBubble.setAttribute("cx", geometry.bubblePosition.x);
            gateBubble.setAttribute("cy", geometry.bubblePosition.y);
            gateBubble.setAttribute("r", geometry.bubblePosition.r);
            gateBubble.style.display = "block";

        } else {
            gateBubble.style.display = "none";
        }
    }

    else if (currentGate === "NOT") {
        showSingleOutput();
        setupNot();
        gateShape.setAttribute("d", geometry.path);
        gateExtra.setAttribute("d", "");
        gateBubble.setAttribute("cx", geometry.bubblePosition.x);
        gateBubble.setAttribute("cy", geometry.bubblePosition.y);
        gateBubble.setAttribute("r", geometry.bubblePosition.r);
        gateBubble.style.display = "block";
        setHorizontalWire(
            outputWire,
            geometry.wireStart.x,
            geometry.output.y,
            geometry.wireEnd.x,
            geometry.wireEnd.y
        );

        inputs[1] = false;
        updateSwitch(1);
    }

    else if (currentGate === "XOR3") {
        showSingleOutput();
        setupXor3(geometry);
        gateShape.setAttribute("d", geometry.path);
        gateExtra.setAttribute("d", geometry.extra);
        gateExtra.style.display = "block";
        setHorizontalWire(
            outputWire,
            geometry.output.x,
            geometry.output.y,
            geometry.wireEnd.x,
            geometry.wireEnd.y
        );
    }

    else if (currentGate === "DECODER3") {
        showDecoderOutputs();
        setupDecoder(geometry);
        gateShape.setAttribute("d", geometry.path);
        gateExtra.setAttribute("d", "");
        gateBubble.style.display = "none";
        hideWire(outputWire);
    }

    else if (currentGate === "MUX4") {
        showSingleOutput();
        setupMux(geometry);
        gateShape.setAttribute("d", geometry.path);
        gateExtra.setAttribute("d", "");
        gateBubble.style.display = "none";
    }

    updateCurrentSwitchLabels();
}

function calculateOutput() {

    switch (currentGate) {

        case "AND":
            return (inputs[0] && inputs[1]);

        case "OR":
            return (inputs[0] || inputs[1]);

        case "NOT":
            return !inputs[0];

        case "NAND":
            return !(inputs[0] && inputs[1]);


        case "NOR":
            return !(inputs[0] || inputs[1]);

        case "XOR":
            return (inputs[0] !== inputs[1]);

        case "XNOR":
            return (inputs[0] === inputs[1]);

        case "XOR3":
            return (inputs[0] ^ inputs[1] ^ inputs[2]) === 1;

        default:
            return false;
    }
}

function calculateDecoder() {

    const value =
        (inputs[0] ? 4 : 0) +
        (inputs[1] ? 2 : 0) +
        (inputs[2] ? 1 : 0);

    const outputs =
        new Array(8).fill(false);

    outputs[value] = true;

    return outputs;
}

function calculateMux() {

    const selection =
        (inputs[5] ? 2 : 0) +
        (inputs[4] ? 1 : 0);

    return inputs[selection];
}

function updateDecoderOutputs() {

    const outputs = calculateDecoder();

    for (let i = 0; i < 8; i++) {

        decoderBulbs[i].classList.toggle("on", outputs[i]);
        decoderBulbOuters[i].classList.toggle("on", outputs[i]);
        decoderLabels[i].classList.toggle("active", outputs[i]);
        decoderWires[i].classList.toggle("active", outputs[i]);
    }
}

function updateCircuit() {

    if (currentGate === "DECODER3") {

        updateDecoderOutputs();
        bulb.classList.remove("on");
        bulbOuter.classList.remove("on");

        for (let i = 0; i < 3; i++) {
            inputWires[i].classList.toggle("active", inputs[i]);
        }

        for (let i = 3; i < 6; i++) {
            inputWires[i].classList.remove("active");
        }

        gateShape.classList.remove("active");
        gateExtra.classList.remove("active");
        gateBubble.classList.remove("active");

        return;
    }

    let output;

    if (currentGate === "MUX4") {
        output = calculateMux();

    } else {
        output = calculateOutput();
    }

    let activeInputs = 0;

    switch (currentGate) {

        case "NOT":
            activeInputs = 1;
            break;


        case "XOR3":
            activeInputs = 3;
            break;


        case "MUX4":
            activeInputs = 6;
            break;


        default:
            activeInputs = 2;
            break;
    }


    for (let i = 0; i < inputWires.length; i++) {

        inputWires[i].classList.toggle("active", i < activeInputs && inputs[i]);
    }

    gateShape.classList.toggle("active", output);
    gateExtra.classList.toggle("active", output);
    gateBubble.classList.toggle("active", output);
    outputWire.classList.toggle("active", output);
    bulb.classList.toggle("on", output);
    bulbOuter.classList.toggle("on", output);
}


gateSelect.addEventListener("change", () => {
        currentGate = gateSelect.value;
        updateGate();
        updateCircuit();
    }
);

updateGate();
updateCircuit();
