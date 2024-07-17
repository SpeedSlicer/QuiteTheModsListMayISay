/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ChatCMD/Help.js":
/*!*****************************!*\
  !*** ./src/ChatCMD/Help.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { CommandList } = __webpack_require__(/*! ../CommandList */ "./src/CommandList.js");

ModAPI.addEventListener('sendchatmessage', function(m) {

    if (m.message == '.help') {
        m.preventDefault = true
        ModAPI.displayToChat({msg: `
§6[-COMMANDS-]
§6[Music-Controlls]
§3.help §6\| §aDisplays this help dialogue
§3.play §6\| §aPlays the song
§3.pause §6\| §aPauses the lo-fi
§3.replay §6\| §aReplays the lo-fi
§3.volume §b[int] §6\| §aSets the volume of the lo-fi (max is 100)
§3.setsong §b[url] §6\| §aAllows you to set the custom url to a new song
§0==================================
        `})
         }
    }
)

/***/ }),

/***/ "./src/ChatCMD/Music.js":
/*!******************************!*\
  !*** ./src/ChatCMD/Music.js ***!
  \******************************/
/***/ (() => {

class AudioSystem {
    constructor() {
      this.songplayer = new Audio('https://files.catbox.moe/k4j25x.mp3');
      this.songplayer.volume = 0.1;
      this.oldVolume = this.songplayer.volume;
      this.loopToggle = false;
    }
  
    play() {
      this.songplayer.play();
      ModAPI.displayToChat({ msg: '§3Now playing lo-fi' });
    }
  
    pause() {
      this.songplayer.pause();
      ModAPI.displayToChat({ msg: '§3Lo-fi paused' });
    }
  
    replay() {
      this.songplayer.load();
      ModAPI.displayToChat({ msg: '§3Replaying lo-fi' });
    }
  
    setVolume(volume) {
      try {
        this.songplayer.volume = volume / 100;
        this.oldVolume = this.songplayer.volume;
        ModAPI.displayToChat({ msg: '§3Volume set to ' + volume });
      } catch (error) {
        ModAPI.displayToChat({ msg: "§6[§4ERROR§6] §c" + error });
      }
    }
  
    setSong(url) {
      this.songplayer.pause();
      this.songplayer = new Audio(url);
      this.songplayer.volume = this.oldVolume;
      ModAPI.displayToChat({ msg: '§3URL was set to §6[ §b' + url + ' §6]' });
    }
  
    toggleLoop() {
      this.songplayer.loop = this.loopToggle;
      this.loopToggle = !this.loopToggle;
      ModAPI.displayToChat({ msg: '§3Loop is now set to §6[ §a' + this.loopToggle + ' §6]' });
    }
  }
  
  // Usage
  const audioSystem = new AudioSystem();
  
  ModAPI.addEventListener('sendchatmessage', (e) => {
    if (e.message == '.play') {
      e.preventDefault = true;
      audioSystem.play();
    } else if (e.message == '.pause') {
      e.preventDefault = true;
      audioSystem.pause();
    } else if (e.message == '.replay') {
      e.preventDefault = true;
      audioSystem.replay();
    } else if (e.message.startsWith('.volume ')) {
      e.preventDefault = true;
      audioSystem.setVolume(parseInt(e.message.substr(8)));
    } else if (e.message.startsWith('.setsong ') && e.message.substr(9).startsWith('https://')) {
      e.preventDefault = true;
      audioSystem.setSong(e.message.substr(9));
    } else if (e.message == '.loop') {
      e.preventDefault = true;
      audioSystem.toggleLoop();
    }
  });

/***/ }),

/***/ "./src/CommandList.js":
/*!****************************!*\
  !*** ./src/CommandList.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CommandList: () => (/* binding */ CommandList)
/* harmony export */ });
/* harmony import */ var _ChatCMD_Music__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChatCMD/Music */ "./src/ChatCMD/Music.js");
/* harmony import */ var _ChatCMD_Music__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ChatCMD_Music__WEBPACK_IMPORTED_MODULE_0__);



let CommandList = [
    {
      name: "Music",
      commandData: (_ChatCMD_Music__WEBPACK_IMPORTED_MODULE_0___default()),
    },
]

/***/ }),

/***/ "./src/GUI/Menu.js":
/*!*************************!*\
  !*** ./src/GUI/Menu.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateMenu: () => (/* binding */ CreateMenu)
/* harmony export */ });
const { SetupModules } = __webpack_require__(/*! ./Modules */ "./src/GUI/Modules.js");
const { LogoData } = __webpack_require__(/*! ../ModulesList */ "./src/ModulesList.js");

let isMenuOpen = false;
let isDarkMode = localStorage.getItem("isDarkMode") === "true" || false;

function toggleDarkMode() {
  const Holder = document.getElementById("SCMM");
  Holder.classList.toggle("light-mode");
  Holder.classList.toggle("dark-mode");
  const switchIcon = Holder.querySelector(".switch-icon i");
  switchIcon.classList.toggle("fa-sun");
  switchIcon.classList.toggle("fa-moon");
  isDarkMode = !isDarkMode;
  localStorage.setItem("isDarkMode", isDarkMode.toString());
}

function createStyles() {
  const style = document.createElement("style");
  style.textContent = `
    body {
      margin: 0;
      padding: 0;
      font-family: 'Montserrat', sans-serif;
    }

    #SCMM {
      backdrop-filter: blur(10px);
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      background-color: rgba(0, 0, 0, 0.5);
      transition: background-color 0.3s ease;
    }

    .menu-container {
      width: 80%;
      max-width: 800px;
      height: 80%;
      max-height: 600px;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      padding: 30px;
      box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.4);
      animation: shine 3s ease-in-out infinite;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
    }

    .menu-header {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: fit-content;
      width: 100%;
      color: #fff;
      gap: 20px;
      margin-bottom: 20px;
    }

    .menu-header img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
    }

    .menu-header h1 {
      font-size: 32px;
      font-weight: 700;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }

    .dark-mode-switch {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-left: auto;
    }

    .switch-container {
      position: relative;
      width: 80px;
      height: 40px;
      background-color: #fff;
      border-radius: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .switch-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #333;
      border-radius: 20px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .switch-circle {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;
      background-color: #333;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      transition: transform 0.3s ease, background-color 0.3s ease;
    }

    .switch-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 16px;
      transition: color 0.3s ease;
    }

    .switch-icon .fa-sun {
      display: block;
    }

    .switch-icon .fa-moon {
      display: none;
    }

    .light-mode {
      background-color: #f0f0f0;
    }

    .light-mode .menu-container {
      background: #f0f0f0;
      box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.4);
    }

    .light-mode .menu-header h1 {
      color: #000;
    }

    .dark-mode {
      background-color: #333;
    }

    .dark-mode .menu-container {
      background-color: #444;
      box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.8);
    }

    .dark-mode .menu-header h1 {
      color: #fff;
    }

    .dark-mode .switch-container {
      background-color: #fff;
    }

    .dark-mode .switch-bg {
      opacity: 1;
    }

    .dark-mode .switch-circle {
      transform: translateX(40px);
      background-color: #fff;
    }

    .dark-mode .switch-icon {
      color: #333;
    }

    .dark-mode .switch-icon .fa-sun {
      display: none;
    }

    .dark-mode .switch-icon .fa-moon {
      display: block;
    }

    @keyframes shine {
      0% {
        box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.4);
      }
      50% {
        box-shadow: 0 0 80px 30px rgba(255, 255, 255, 0.4);
      }
      100% {
        box-shadow: 0 0 50px 20px rgba(0, 0, 0, 0.4);
      }
    }

    .search-container {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }

    .search-input {
      width: 100%;
      max-width: 400px;
      padding: 10px 20px;
      border: none;
      border-radius: 20px;
      font-size: 16px;
      background-color: rgba(255, 255, 255, 0.2);
      color: #fff;
      transition: background-color 0.3s ease;
    }

    .search-input::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }

    .light-mode .search-input {
      background-color: rgba(0, 0, 0, 0.1);
      color: #333;
    }

    .light-mode .search-input::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }
  `;
  document.head.appendChild(style);
}

function CreateMenu() {
  if (!isMenuOpen) {
    isMenuOpen = true;

    const Holder = document.createElement("div");
    Holder.id = "SCMM";
    Holder.classList.add(isDarkMode ? "dark-mode" : "light-mode");

    const Menu = document.createElement("div");
    Menu.classList.add("menu-container");
    Menu.innerHTML = `
      <div class="menu-header">
        <img src="${LogoData}" alt="Logo">
        <h1>Fracticle Client</h1>
        <div class="dark-mode-switch">
          <div class="switch-container">
            <div class="switch-bg"></div>
            <div class="switch-circle">
              <div class="switch-icon">
                <i class="fas fa-sun"></i>
                <i class="fas fa-moon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="search-container">
        <input type="text" class="search-input" placeholder="Search for mods..." />
      </div>
      <div id="SCMM-MODULES" class="module-container">
        <!-- Modules will be inserted here dynamically -->
      </div>
    `;

    document.body.appendChild(Holder);
    Holder.appendChild(Menu);

    // Add some additional styles to the modules
    const moduleContainer = Holder.querySelector("#SCMM-MODULES");
    moduleContainer.style.display = "flex";
    moduleContainer.style.flexWrap = "wrap";
    moduleContainer.style.justifyContent = "center";
    moduleContainer.style.gap = "20px";

    const modules = document.querySelectorAll("#SCMM-MODULES > *");
    modules.forEach((module) => {
      module.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      module.style.padding = "20px";
      module.style.borderRadius = "10px";
      module.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.2)";
      module.style.transition = "transform 0.3s ease-in-out";
      module.style.flex = "0 0 calc(33.33% - 20px)";
      module.addEventListener("mouseover", () => {
        module.style.transform = "scale(1.05)";
      });
      module.addEventListener("mouseout", () => {
        module.style.transform = "scale(1)";
      });
    });

    // Add event listener for the dark mode switch
    const switchContainer = Holder.querySelector('.switch-container');
    switchContainer.addEventListener('click', toggleDarkMode);

    // Add event listener for the search input
    const searchInput = Holder.querySelector('.search-input');
    searchInput.addEventListener('input', filterModules);

    createStyles();
    SetupModules();
  } else {
    document.getElementById("SCMM").remove();
    isMenuOpen = false;
  }
}

function filterModules() {
  const searchInput = document.querySelector('.search-input');
  const searchTerm = searchInput.value.toLowerCase();
  const modules = document.querySelectorAll('#SCMM-MODULES > *');

  modules.forEach((module) => {
    const moduleText = module.textContent.toLowerCase();
    if (moduleText.includes(searchTerm)) {
      module.style.display = 'block';
    } else {
      module.style.display = 'none';
    }
  });
}

/***/ }),

/***/ "./src/GUI/Modules.js":
/*!****************************!*\
  !*** ./src/GUI/Modules.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SetupModules: () => (/* binding */ SetupModules),
/* harmony export */   StartupModules: () => (/* binding */ StartupModules)
/* harmony export */ });
const { ModulesList } = __webpack_require__(/*! ../ModulesList */ "./src/ModulesList.js");
const Keystrokes = __webpack_require__(/*! ../Modules/Keystrokes */ "./src/Modules/Keystrokes.js"); 
const Fullbright = __webpack_require__(/*! ../Modules/Fullbright */ "./src/Modules/Fullbright.js");
const XpHud = __webpack_require__(/*! ../Modules/XpHud */ "./src/Modules/XpHud.js");
const MangaFont = __webpack_require__(/*! ../Modules/MangaFont */ "./src/Modules/MangaFont.js");
// IF YOU ADD YOUR OWN MAKE SURE TO REQUIRE THEM HOW YOU NAMED IT IN THE "ModulesList.js" FILE!!!
// Example: const CPS = require("../Modules/scriptnamecanbewhatever")

let BareLocalStorageData = localStorage.getItem("SCMM-MODS");
let ParsedLSData = JSON.parse(BareLocalStorageData);

function StartupModules () {
  //if (!BareLocalStorageData) {
    let mods = [];
    ModulesList.forEach((Module) => { mods.push({ name: Module.name, enabled: false });})
    localStorage.setItem("SCMM-MODS", JSON.stringify(mods));
  //}

  // Cant get this to work so womp womp for now
  // if (ParsedLSData) ModulesList.forEach((Module) => { if (ParsedLSData.find((e) => e.name === Module.name)) eval(`${Module.name}.Init("${Module.name}")`); });
}

function SetupModules() {
  function Add(name, img) {
    const Module = document.createElement("div");

    Module.innerHTML = `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: end; height: 25vh; width: 25vh; border-radius: 2.5vh; background-color: rgba(255, 255, 255, 0.15); border: solid 0.1vw rgba(255, 255, 255, 0.5); position: relative;">
            <img style="position: absolute; top: 35%; left: 50%; transform: translate(-50%, -50%); font-size: 2vh; width: 15vh; height: 15vh;" src="${img}"/>
            <h1 style="word-wrap: break-word;position: absolute; top: 62.5%; left: 50%; transform: translate(-50%, -50%); font-size: 1.5vh; width: 100%; text-align: center;">${name}</h1>
            <a style="background-color: rgba(255, 0, 0, 0.25); width: 100%; height: 20%; bottom: 0; border-radius: 0 0 2.5vh 2.5vh; position: relative; border: solid 0.1vw rgba(255, 255, 255, 0.5);" id="SCMM-${name}-Toggle">
                <p style="position: absolute; top: 10%; left: 50%; transform: translate(-50%, -50%); font-size: 2vh;">DISABLED</p>
            </a>
        </div>
      `;

    const Holder = document.getElementById("SCMM-MODULES");
    if (Holder) Holder.appendChild(Module);
  }

  function EnableToggle(name) {
    document.getElementById(`SCMM-${name}-Toggle`).addEventListener("mousedown", function (e) {
      const i = ParsedLSData.findIndex((e) => e.name === name);

      if (i !== -1) {
        ParsedLSData[i].enabled = !ParsedLSData[i].enabled;
        eval(`${name}.Init("${name}")`);

        localStorage.setItem("SCMM-MODS", JSON.stringify(ParsedLSData));
      }
    })
  }

  function SetCorrectToggle(name) {
    const i = ParsedLSData.findIndex((e) => e.name === name);

    if (i !== -1) {
      const Toggle = document.getElementById(`SCMM-${name}-Toggle`);
      if (Toggle) {
        Toggle.style.backgroundColor = ParsedLSData[i].enabled ? "rgba(0, 255, 0, 0.25)" : "rgba(255, 0, 0, 0.25)";
        Toggle.querySelector("p").innerHTML = ParsedLSData[i].enabled ? "ENABLED" : "DISABLED";
      }
    }
  }

  ModulesList.forEach((Module) => {
    BareLocalStorageData = localStorage.getItem("SCMM-MODS");
    ParsedLSData = JSON.parse(BareLocalStorageData);
  
    Add(Module.name, Module.imagedata);
    EnableToggle(Module.name);
    setInterval(function () {
      SetCorrectToggle(Module.name);
    }, 100);
  });
}

/***/ }),

/***/ "./src/Modules/Fullbright.js":
/*!***********************************!*\
  !*** ./src/Modules/Fullbright.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Init: () => (/* binding */ Init)
/* harmony export */ });
let int;

function Init(name) {
  const Data = JSON.parse(localStorage.getItem("SCMM-MODS"));
  const ModuleIndex = Data.findIndex((e) => e.name === name);

  if (ModuleIndex !== 1 && !Data[ModuleIndex].enabled) {
    clearInterval(int);
    int = setInterval(function () {
      ModAPI.blocks.air.lightValue = 10;
      ModAPI.blocks.water.lightValue = 10;
      ModAPI.blocks.air.reload();
      ModAPI.blocks.water.reload();
    }, 5000);
  } else {
    clearInterval(int);
    int = setInterval(function () {
      ModAPI.blocks.air.lightValue = 1;
      ModAPI.blocks.water.lightValue = 1;
      ModAPI.blocks.air.reload();
      ModAPI.blocks.water.reload();
    }, 5000);
  }
}

/***/ }),

/***/ "./src/Modules/Keystrokes.js":
/*!***********************************!*\
  !*** ./src/Modules/Keystrokes.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Init: () => (/* binding */ Init)
/* harmony export */ });
ModAPI.require("player");

let pressedKeys = {};
let int;

function Init(name) {
  const Data = JSON.parse(localStorage.getItem("SCMM-MODS"));
  const ModuleIndex = Data.findIndex((e) => e.name === name);
  const Keystrokes = document.getElementById("SCMM-Keystrokes");

  if (ModuleIndex !== 1 && !Data[ModuleIndex].enabled) {
    if (Keystrokes) return;
    
    int = setInterval(() => {
      if (document.getElementById("SCMM-Keystrokes")) {
        const pressableKeys = ["w", "a", "s", "d"];
        pressableKeys.forEach((key) => {
          const element = document.getElementById(`${key}key`);
          if (element && pressedKeys[key]) {
            element.style.color = "black";
            element.style.background = "rgba(255, 255, 255, 0.5)";
          } else {
            element.style.color = "white";
            element.style.background = "rgba(0, 0, 0, 0.5)";
          }
        });
      }
    }, 10);

    window.addEventListener("keydown", function (e) {
      e.preventDefault();
      pressedKeys[e.key.toLowerCase()] = true;
    });
    window.addEventListener("keyup", function (e) {
      delete pressedKeys[e.key.toLowerCase()];
    });

    const keystrokes = document.createElement("div");
    keystrokes.id = "SCMM-Keystrokes";
    keystrokes.style = `font-size: 2vh;transform: translate(-10%, -35%);display: grid;width: fit-content;height: fit-content;position: absolute;right: 0;bottom: 0;grid-template-areas: ". W ." "A S D";gap: 5px;`;
    keystrokes.innerHTML = `<div id="wkey" style="border-radius: 1vh;min-height: 6vh;min-width: 6vh;display: flex;justify-content: center;align-items: center;font-family: 'Minecraftia';grid-area: W;">W</div>
    <div id="akey" style="border-radius: 1vh;min-height: 6vh;min-width: 6vh;display: flex;justify-content: center;align-items: center;font-family: 'Minecraftia';grid-area: A;">A</div>
    <div id="skey" style="border-radius: 1vh;min-height: 6vh;min-width: 6vh;display: flex;justify-content: center;align-items: center;font-family: 'Minecraftia';grid-area: S;">S</div>
    <div id="dkey" style="border-radius: 1vh;min-height: 6vh;min-width: 6vh;display: flex;justify-content: center;align-items: center;font-family: 'Minecraftia';grid-area: D;">D</div>`;

    document.body.appendChild(keystrokes);
  } else {
    if (int) clearInterval(int);
    if (Keystrokes) Keystrokes.remove();
  }
}

/***/ }),

/***/ "./src/Modules/MangaFont.js":
/*!**********************************!*\
  !*** ./src/Modules/MangaFont.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Init: () => (/* binding */ Init)
/* harmony export */ });
let isTextSwitchingEnabled = true; 

function Init(name) {
    const Data = JSON.parse(localStorage.getItem("SCMM-MODS"));
    const ModuleIndex = Data.findIndex((e) => e.name === name);
    if (ModuleIndex !== 1 && !Data[ModuleIndex].enabled) {
        ModAPI.require("player")

        ModAPI.addEventListener("sendchatmessage", function (event) {
            if (isTextSwitchingEnabled) {
                event.message = event.message.split('').map(char => {
                    switch(char.toLowerCase()) {
                        case 'a': return '卂';
                        case 'b': return '乃';
                        case 'c': return '匚';
                        case 'd': return 'ᗪ';
                        case 'e': return '乇';
                        case 'f': return '千';
                        case 'g': return 'ᘜ';
                        case 'h': return '卄';
                        case 'i': return '丨';
                        case 'j': return 'ﾌ';
                        case 'k': return 'Ҝ';
                        case 'l': return 'ㄥ';
                        case 'm': return '爪';
                        case 'n': return '几';
                        case 'o': return 'ㄖ';
                        case 'p': return '卩';
                        case 'q': return 'Ҩ';
                        case 'r': return '尺';
                        case 's': return '丂';
                        case 't': return 'ㄒ';
                        case 'u': return 'ㄩ';
                        case 'v': return 'ᐯ';
                        case 'w': return '山';
                        case 'x': return '乂';
                        case 'y': return 'ㄚ';
                        case 'z': return '乙';
                        default: return char;
                    }
                }).join('');
            }
        });
    } else {
        isTextSwitchingEnabled = false;
        console.log("Disabled Mod");
    }
}

/***/ }),

/***/ "./src/Modules/XpHud.js":
/*!******************************!*\
  !*** ./src/Modules/XpHud.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Init: () => (/* binding */ Init)
/* harmony export */ });
function Init(name) {
    const Data = JSON.parse(localStorage.getItem("SCMM-MODS"));
    const ModuleIndex = Data.findIndex((e) => e.name === name);

    if (ModuleIndex !== 1 && !Data[ModuleIndex].enabled) {
        
        /* ModAPI.require("player");

        ModAPI.displayToChat({ msg: "Death Position Enabled" });

        ModAPI.addEventListener("playerdeath", () => {
            const player = ModAPI.player;
            const playerPos = player.getPositionVector();
            const x = Math.round(playerPos.x);
            const y = Math.round(playerPos.y);
            const z = Math.round(playerPos.z);

            ModAPI.displayToChat({
                msg: `You died at coordinates: X: ${x}, Y: ${y}, Z: ${z}`
            });
        }); 
        kept breaking my game so turned off for now*/
        console.log("enabled mod");

    } else {
        console.log("Disabled Mod");
    }
}



/***/ }),

/***/ "./src/ModulesList.js":
/*!****************************!*\
  !*** ./src/ModulesList.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogoData: () => (/* binding */ LogoData),
/* harmony export */   ModulesList: () => (/* binding */ ModulesList)
/* harmony export */ });
/* harmony import */ var _Base64_ClientLogo_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base64/ClientLogo.png */ "./src/Base64/ClientLogo.png");
/* harmony import */ var _Base64_Keystrokes_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base64/Keystrokes.png */ "./src/Base64/Keystrokes.png");
/* harmony import */ var _Base64_Fullbright_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Base64/Fullbright.png */ "./src/Base64/Fullbright.png");
/* harmony import */ var _Base64_XpHud_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Base64/XpHud.png */ "./src/Base64/XpHud.png");
/* harmony import */ var _Base64_MangaFont_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Base64/MangaFont.png */ "./src/Base64/MangaFont.png");
/* harmony import */ var _Base64_ToggleSprint_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Base64/ToggleSprint.png */ "./src/Base64/ToggleSprint.png");
/* harmony import */ var _Base64_ChatShortcuts_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Base64/ChatShortcuts.png */ "./src/Base64/ChatShortcuts.png");








const LogoData = _Base64_ClientLogo_png__WEBPACK_IMPORTED_MODULE_0__;

let ModulesList = [
  {
    name: "Keystrokes",
    imagedata: _Base64_Keystrokes_png__WEBPACK_IMPORTED_MODULE_1__,
  },
  {
    name: "Fullbright",
    imagedata: _Base64_Fullbright_png__WEBPACK_IMPORTED_MODULE_2__,
  },
  {
    name: "XpHud",
    imagedata: _Base64_XpHud_png__WEBPACK_IMPORTED_MODULE_3__,
  },
  {
    name: "MangaFont",
    imagedata: _Base64_MangaFont_png__WEBPACK_IMPORTED_MODULE_4__,
  },
  {
    name: "ToggleSprint",
    imagedata: _Base64_ToggleSprint_png__WEBPACK_IMPORTED_MODULE_5__,
  },
  {
    name: "ChatShortcuts",
    imagedata: _Base64_ChatShortcuts_png__WEBPACK_IMPORTED_MODULE_6__,
  },
];

/***/ }),

/***/ "./src/RequireAll.js":
/*!***************************!*\
  !*** ./src/RequireAll.js ***!
  \***************************/
/***/ (() => {

ModAPI.require("player");
ModAPI.require("network");
ModAPI.require("settings");
ModAPI.require("server");


/***/ }),

/***/ "./src/Base64/ChatShortcuts.png":
/*!**************************************!*\
  !*** ./src/Base64/ChatShortcuts.png ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./src/Base64/ClientLogo.png":
/*!***********************************!*\
  !*** ./src/Base64/ClientLogo.png ***!
  \***********************************/
/***/ ((module) => {

"use strict";

/***/ }),

/***/ "./src/Base64/Fullbright.png":
/*!***********************************!*\
  !*** ./src/Base64/Fullbright.png ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./src/Base64/Keystrokes.png":
/*!***********************************!*\
  !*** ./src/Base64/Keystrokes.png ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./src/Base64/MangaFont.png":
/*!**********************************!*\
  !*** ./src/Base64/MangaFont.png ***!
  \**********************************/
/***/ ((module) => {

"use strict";

/***/ }),

/***/ "./src/Base64/ToggleSprint.png":
/*!*************************************!*\
  !*** ./src/Base64/ToggleSprint.png ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = "data:image/png;base64,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";

/***/ }),

/***/ "./src/Base64/XpHud.png":
/*!******************************!*\
  !*** ./src/Base64/XpHud.png ***!
  \******************************/
/***/ ((module) => {

"use strict";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/Main.js ***!
  \*********************/
const { CreateMenu } = __webpack_require__(/*! ./GUI/Menu */ "./src/GUI/Menu.js");
const { StartupModules } = __webpack_require__(/*! ./GUI/Modules */ "./src/GUI/Modules.js");
const { ChatCommands } = __webpack_require__(/*! ./ChatCMD/Help */ "./src/ChatCMD/Help.js")
const { RequireAll } = __webpack_require__(/*! ./RequireAll.js */ "./src/RequireAll.js")

StartupModules();

window.addEventListener("keydown", function (e) {
  if (e.key === "=") {
    CreateMenu();
  }
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnJhY3RpY2xlLWNsaWVudC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxRQUFRLGNBQWMsRUFBRSxtQkFBTyxDQUFDLDRDQUFnQjs7QUFFaEQ7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDRCQUE0QjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2Qix1QkFBdUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsMEJBQTBCO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixrQ0FBa0M7QUFDakUsUUFBUTtBQUNSLCtCQUErQixpQ0FBaUM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsK0NBQStDO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsK0RBQStEO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0RWdDOzs7QUFHNUI7QUFDUDtBQUNBO0FBQ0EsbUJBQW1CLHVEQUFLO0FBQ3hCLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7O0FDUkEsUUFBUSxlQUFlLEVBQUUsbUJBQU8sQ0FBQyx1Q0FBVztBQUM1QyxRQUFRLFdBQVcsRUFBRSxtQkFBTyxDQUFDLDRDQUFnQjs7QUFFN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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LG1EQUFhO0FBQzVCLEdBQUc7QUFDSDtBQUNBO0FBQ0EsZUFBZSxtREFBYTtBQUM1QixHQUFHO0FBQ0g7QUFDQTtBQUNBLGVBQWUsOENBQVE7QUFDdkIsR0FBRztBQUNIO0FBQ0E7QUFDQSxlQUFlLGtEQUFZO0FBQzNCLEdBQUc7QUFDSDtBQUNBO0FBQ0EsZUFBZSxxREFBZTtBQUM5QixHQUFHO0FBQ0g7QUFDQTtBQUNBLGVBQWUsc0RBQWdCO0FBQy9CLEdBQUc7QUFDSDs7Ozs7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDSEE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7QUNOQSxRQUFRLGFBQWEsRUFBRSxtQkFBTyxDQUFDLHFDQUFZO0FBQzNDLFFBQVEsaUJBQWlCLEVBQUUsbUJBQU8sQ0FBQywyQ0FBZTtBQUNsRCxRQUFRLGVBQWUsRUFBRSxtQkFBTyxDQUFDLDZDQUFnQjtBQUNqRCxRQUFRLGFBQWEsRUFBRSxtQkFBTyxDQUFDLDRDQUFpQjs7QUFFaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9GcmFjdGljbGUtY2xpZW50Ly4vc3JjL0NoYXRDTUQvSGVscC5qcyIsIndlYnBhY2s6Ly9GcmFjdGljbGUtY2xpZW50Ly4vc3JjL0NoYXRDTUQvTXVzaWMuanMiLCJ3ZWJwYWNrOi8vRnJhY3RpY2xlLWNsaWVudC8uL3NyYy9Db21tYW5kTGlzdC5qcyIsIndlYnBhY2s6Ly9GcmFjdGljbGUtY2xpZW50Ly4vc3JjL0dVSS9NZW51LmpzIiwid2VicGFjazovL0ZyYWN0aWNsZS1jbGllbnQvLi9zcmMvR1VJL01vZHVsZXMuanMiLCJ3ZWJwYWNrOi8vRnJhY3RpY2xlLWNsaWVudC8uL3NyYy9Nb2R1bGVzL0Z1bGxicmlnaHQuanMiLCJ3ZWJwYWNrOi8vRnJhY3RpY2xlLWNsaWVudC8uL3NyYy9Nb2R1bGVzL0tleXN0cm9rZXMuanMiLCJ3ZWJwYWNrOi8vRnJhY3RpY2xlLWNsaWVudC8uL3NyYy9Nb2R1bGVzL01hbmdhRm9udC5qcyIsIndlYnBhY2s6Ly9GcmFjdGljbGUtY2xpZW50Ly4vc3JjL01vZHVsZXMvWHBIdWQuanMiLCJ3ZWJwYWNrOi8vRnJhY3RpY2xlLWNsaWVudC8uL3NyYy9Nb2R1bGVzTGlzdC5qcyIsIndlYnBhY2s6Ly9GcmFjdGljbGUtY2xpZW50Ly4vc3JjL1JlcXVpcmVBbGwuanMiLCJ3ZWJwYWNrOi8vRnJhY3RpY2xlLWNsaWVudC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9GcmFjdGljbGUtY2xpZW50L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0ZyYWN0aWNsZS1jbGllbnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0ZyYWN0aWNsZS1jbGllbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9GcmFjdGljbGUtY2xpZW50L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRnJhY3RpY2xlLWNsaWVudC8uL3NyYy9NYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgQ29tbWFuZExpc3QgfSA9IHJlcXVpcmUoXCIuLi9Db21tYW5kTGlzdFwiKTtcblxuTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoJ3NlbmRjaGF0bWVzc2FnZScsIGZ1bmN0aW9uKG0pIHtcblxuICAgIGlmIChtLm1lc3NhZ2UgPT0gJy5oZWxwJykge1xuICAgICAgICBtLnByZXZlbnREZWZhdWx0ID0gdHJ1ZVxuICAgICAgICBNb2RBUEkuZGlzcGxheVRvQ2hhdCh7bXNnOiBgXG7CpzZbLUNPTU1BTkRTLV1cbsKnNltNdXNpYy1Db250cm9sbHNdXG7CpzMuaGVscCDCpzZcXHwgwqdhRGlzcGxheXMgdGhpcyBoZWxwIGRpYWxvZ3VlXG7CpzMucGxheSDCpzZcXHwgwqdhUGxheXMgdGhlIHNvbmdcbsKnMy5wYXVzZSDCpzZcXHwgwqdhUGF1c2VzIHRoZSBsby1maVxuwqczLnJlcGxheSDCpzZcXHwgwqdhUmVwbGF5cyB0aGUgbG8tZmlcbsKnMy52b2x1bWUgwqdiW2ludF0gwqc2XFx8IMKnYVNldHMgdGhlIHZvbHVtZSBvZiB0aGUgbG8tZmkgKG1heCBpcyAxMDApXG7CpzMuc2V0c29uZyDCp2JbdXJsXSDCpzZcXHwgwqdhQWxsb3dzIHlvdSB0byBzZXQgdGhlIGN1c3RvbSB1cmwgdG8gYSBuZXcgc29uZ1xuwqcwPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBgfSlcbiAgICAgICAgIH1cbiAgICB9XG4pIiwiY2xhc3MgQXVkaW9TeXN0ZW0ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgdGhpcy5zb25ncGxheWVyID0gbmV3IEF1ZGlvKCdodHRwczovL2ZpbGVzLmNhdGJveC5tb2UvazRqMjV4Lm1wMycpO1xuICAgICAgdGhpcy5zb25ncGxheWVyLnZvbHVtZSA9IDAuMTtcbiAgICAgIHRoaXMub2xkVm9sdW1lID0gdGhpcy5zb25ncGxheWVyLnZvbHVtZTtcbiAgICAgIHRoaXMubG9vcFRvZ2dsZSA9IGZhbHNlO1xuICAgIH1cbiAgXG4gICAgcGxheSgpIHtcbiAgICAgIHRoaXMuc29uZ3BsYXllci5wbGF5KCk7XG4gICAgICBNb2RBUEkuZGlzcGxheVRvQ2hhdCh7IG1zZzogJ8KnM05vdyBwbGF5aW5nIGxvLWZpJyB9KTtcbiAgICB9XG4gIFxuICAgIHBhdXNlKCkge1xuICAgICAgdGhpcy5zb25ncGxheWVyLnBhdXNlKCk7XG4gICAgICBNb2RBUEkuZGlzcGxheVRvQ2hhdCh7IG1zZzogJ8KnM0xvLWZpIHBhdXNlZCcgfSk7XG4gICAgfVxuICBcbiAgICByZXBsYXkoKSB7XG4gICAgICB0aGlzLnNvbmdwbGF5ZXIubG9hZCgpO1xuICAgICAgTW9kQVBJLmRpc3BsYXlUb0NoYXQoeyBtc2c6ICfCpzNSZXBsYXlpbmcgbG8tZmknIH0pO1xuICAgIH1cbiAgXG4gICAgc2V0Vm9sdW1lKHZvbHVtZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5zb25ncGxheWVyLnZvbHVtZSA9IHZvbHVtZSAvIDEwMDtcbiAgICAgICAgdGhpcy5vbGRWb2x1bWUgPSB0aGlzLnNvbmdwbGF5ZXIudm9sdW1lO1xuICAgICAgICBNb2RBUEkuZGlzcGxheVRvQ2hhdCh7IG1zZzogJ8KnM1ZvbHVtZSBzZXQgdG8gJyArIHZvbHVtZSB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIE1vZEFQSS5kaXNwbGF5VG9DaGF0KHsgbXNnOiBcIsKnNlvCpzRFUlJPUsKnNl0gwqdjXCIgKyBlcnJvciB9KTtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIHNldFNvbmcodXJsKSB7XG4gICAgICB0aGlzLnNvbmdwbGF5ZXIucGF1c2UoKTtcbiAgICAgIHRoaXMuc29uZ3BsYXllciA9IG5ldyBBdWRpbyh1cmwpO1xuICAgICAgdGhpcy5zb25ncGxheWVyLnZvbHVtZSA9IHRoaXMub2xkVm9sdW1lO1xuICAgICAgTW9kQVBJLmRpc3BsYXlUb0NoYXQoeyBtc2c6ICfCpzNVUkwgd2FzIHNldCB0byDCpzZbIMKnYicgKyB1cmwgKyAnIMKnNl0nIH0pO1xuICAgIH1cbiAgXG4gICAgdG9nZ2xlTG9vcCgpIHtcbiAgICAgIHRoaXMuc29uZ3BsYXllci5sb29wID0gdGhpcy5sb29wVG9nZ2xlO1xuICAgICAgdGhpcy5sb29wVG9nZ2xlID0gIXRoaXMubG9vcFRvZ2dsZTtcbiAgICAgIE1vZEFQSS5kaXNwbGF5VG9DaGF0KHsgbXNnOiAnwqczTG9vcCBpcyBub3cgc2V0IHRvIMKnNlsgwqdhJyArIHRoaXMubG9vcFRvZ2dsZSArICcgwqc2XScgfSk7XG4gICAgfVxuICB9XG4gIFxuICAvLyBVc2FnZVxuICBjb25zdCBhdWRpb1N5c3RlbSA9IG5ldyBBdWRpb1N5c3RlbSgpO1xuICBcbiAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoJ3NlbmRjaGF0bWVzc2FnZScsIChlKSA9PiB7XG4gICAgaWYgKGUubWVzc2FnZSA9PSAnLnBsYXknKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICAgIGF1ZGlvU3lzdGVtLnBsYXkoKTtcbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZSA9PSAnLnBhdXNlJykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgICBhdWRpb1N5c3RlbS5wYXVzZSgpO1xuICAgIH0gZWxzZSBpZiAoZS5tZXNzYWdlID09ICcucmVwbGF5Jykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgICBhdWRpb1N5c3RlbS5yZXBsYXkoKTtcbiAgICB9IGVsc2UgaWYgKGUubWVzc2FnZS5zdGFydHNXaXRoKCcudm9sdW1lICcpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICAgIGF1ZGlvU3lzdGVtLnNldFZvbHVtZShwYXJzZUludChlLm1lc3NhZ2Uuc3Vic3RyKDgpKSk7XG4gICAgfSBlbHNlIGlmIChlLm1lc3NhZ2Uuc3RhcnRzV2l0aCgnLnNldHNvbmcgJykgJiYgZS5tZXNzYWdlLnN1YnN0cig5KS5zdGFydHNXaXRoKCdodHRwczovLycpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICAgIGF1ZGlvU3lzdGVtLnNldFNvbmcoZS5tZXNzYWdlLnN1YnN0cig5KSk7XG4gICAgfSBlbHNlIGlmIChlLm1lc3NhZ2UgPT0gJy5sb29wJykge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgICBhdWRpb1N5c3RlbS50b2dnbGVMb29wKCk7XG4gICAgfVxuICB9KTsiLCJpbXBvcnQgTXVzaWMgZnJvbSBcIi4vQ2hhdENNRC9NdXNpY1wiXG5cblxuZXhwb3J0IGxldCBDb21tYW5kTGlzdCA9IFtcbiAgICB7XG4gICAgICBuYW1lOiBcIk11c2ljXCIsXG4gICAgICBjb21tYW5kRGF0YTogTXVzaWMsXG4gICAgfSxcbl0iLCJjb25zdCB7IFNldHVwTW9kdWxlcyB9ID0gcmVxdWlyZShcIi4vTW9kdWxlc1wiKTtcbmNvbnN0IHsgTG9nb0RhdGEgfSA9IHJlcXVpcmUoXCIuLi9Nb2R1bGVzTGlzdFwiKTtcblxubGV0IGlzTWVudU9wZW4gPSBmYWxzZTtcbmxldCBpc0RhcmtNb2RlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJpc0RhcmtNb2RlXCIpID09PSBcInRydWVcIiB8fCBmYWxzZTtcblxuZnVuY3Rpb24gdG9nZ2xlRGFya01vZGUoKSB7XG4gIGNvbnN0IEhvbGRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiU0NNTVwiKTtcbiAgSG9sZGVyLmNsYXNzTGlzdC50b2dnbGUoXCJsaWdodC1tb2RlXCIpO1xuICBIb2xkZXIuY2xhc3NMaXN0LnRvZ2dsZShcImRhcmstbW9kZVwiKTtcbiAgY29uc3Qgc3dpdGNoSWNvbiA9IEhvbGRlci5xdWVyeVNlbGVjdG9yKFwiLnN3aXRjaC1pY29uIGlcIik7XG4gIHN3aXRjaEljb24uY2xhc3NMaXN0LnRvZ2dsZShcImZhLXN1blwiKTtcbiAgc3dpdGNoSWNvbi5jbGFzc0xpc3QudG9nZ2xlKFwiZmEtbW9vblwiKTtcbiAgaXNEYXJrTW9kZSA9ICFpc0RhcmtNb2RlO1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImlzRGFya01vZGVcIiwgaXNEYXJrTW9kZS50b1N0cmluZygpKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVzKCkge1xuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgc3R5bGUudGV4dENvbnRlbnQgPSBgXG4gICAgYm9keSB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgICAgZm9udC1mYW1pbHk6ICdNb250c2VycmF0Jywgc2Fucy1zZXJpZjtcbiAgICB9XG5cbiAgICAjU0NNTSB7XG4gICAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTBweCk7XG4gICAgICB3aWR0aDogMTAwdnc7XG4gICAgICBoZWlnaHQ6IDEwMHZoO1xuICAgICAgcG9zaXRpb246IGZpeGVkO1xuICAgICAgbGVmdDogMDtcbiAgICAgIHRvcDogMDtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICB6LWluZGV4OiA5OTk5O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XG4gICAgfVxuXG4gICAgLm1lbnUtY29udGFpbmVyIHtcbiAgICAgIHdpZHRoOiA4MCU7XG4gICAgICBtYXgtd2lkdGg6IDgwMHB4O1xuICAgICAgaGVpZ2h0OiA4MCU7XG4gICAgICBtYXgtaGVpZ2h0OiA2MDBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIHBhZGRpbmc6IDMwcHg7XG4gICAgICBib3gtc2hhZG93OiAwIDAgNTBweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC40KTtcbiAgICAgIGFuaW1hdGlvbjogc2hpbmUgM3MgZWFzZS1pbi1vdXQgaW5maW5pdGU7XG4gICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XG4gICAgfVxuXG4gICAgLm1lbnUtaGVhZGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGhlaWdodDogZml0LWNvbnRlbnQ7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgZ2FwOiAyMHB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICB9XG5cbiAgICAubWVudS1oZWFkZXIgaW1nIHtcbiAgICAgIHdpZHRoOiA4MHB4O1xuICAgICAgaGVpZ2h0OiA4MHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgYm94LXNoYWRvdzogMCAwIDIwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuICAgIH1cblxuICAgIC5tZW51LWhlYWRlciBoMSB7XG4gICAgICBmb250LXNpemU6IDMycHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgdGV4dC1zaGFkb3c6IDJweCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgICB9XG5cbiAgICAuZGFyay1tb2RlLXN3aXRjaCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICB9XG5cbiAgICAuc3dpdGNoLWNvbnRhaW5lciB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICB3aWR0aDogODBweDtcbiAgICAgIGhlaWdodDogNDBweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICAgICAgYm94LXNoYWRvdzogMCAwIDEwcHggcmdiYSgwLCAwLCAwLCAwLjIpO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgdHJhbnNpdGlvbjogYmFja2dyb3VuZC1jb2xvciAwLjNzIGVhc2U7XG4gICAgfVxuXG4gICAgLnN3aXRjaC1iZyB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDA7XG4gICAgICBsZWZ0OiAwO1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzO1xuICAgICAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgICAgIG9wYWNpdHk6IDA7XG4gICAgICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuM3MgZWFzZTtcbiAgICB9XG5cbiAgICAuc3dpdGNoLWNpcmNsZSB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDVweDtcbiAgICAgIGxlZnQ6IDVweDtcbiAgICAgIHdpZHRoOiAzMHB4O1xuICAgICAgaGVpZ2h0OiAzMHB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzMzMztcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIGJveC1zaGFkb3c6IDAgMCAxMHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UsIGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xuICAgIH1cblxuICAgIC5zd2l0Y2gtaWNvbiB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDUwJTtcbiAgICAgIGxlZnQ6IDUwJTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICB0cmFuc2l0aW9uOiBjb2xvciAwLjNzIGVhc2U7XG4gICAgfVxuXG4gICAgLnN3aXRjaC1pY29uIC5mYS1zdW4ge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgfVxuXG4gICAgLnN3aXRjaC1pY29uIC5mYS1tb29uIHtcbiAgICAgIGRpc3BsYXk6IG5vbmU7XG4gICAgfVxuXG4gICAgLmxpZ2h0LW1vZGUge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YwZjBmMDtcbiAgICB9XG5cbiAgICAubGlnaHQtbW9kZSAubWVudS1jb250YWluZXIge1xuICAgICAgYmFja2dyb3VuZDogI2YwZjBmMDtcbiAgICAgIGJveC1zaGFkb3c6IDAgMCA1MHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjQpO1xuICAgIH1cblxuICAgIC5saWdodC1tb2RlIC5tZW51LWhlYWRlciBoMSB7XG4gICAgICBjb2xvcjogIzAwMDtcbiAgICB9XG5cbiAgICAuZGFyay1tb2RlIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzMzM7XG4gICAgfVxuXG4gICAgLmRhcmstbW9kZSAubWVudS1jb250YWluZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzQ0NDtcbiAgICAgIGJveC1zaGFkb3c6IDAgMCA1MHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjgpO1xuICAgIH1cblxuICAgIC5kYXJrLW1vZGUgLm1lbnUtaGVhZGVyIGgxIHtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgIH1cblxuICAgIC5kYXJrLW1vZGUgLnN3aXRjaC1jb250YWluZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICB9XG5cbiAgICAuZGFyay1tb2RlIC5zd2l0Y2gtYmcge1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG5cbiAgICAuZGFyay1tb2RlIC5zd2l0Y2gtY2lyY2xlIHtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCg0MHB4KTtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgfVxuXG4gICAgLmRhcmstbW9kZSAuc3dpdGNoLWljb24ge1xuICAgICAgY29sb3I6ICMzMzM7XG4gICAgfVxuXG4gICAgLmRhcmstbW9kZSAuc3dpdGNoLWljb24gLmZhLXN1biB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cblxuICAgIC5kYXJrLW1vZGUgLnN3aXRjaC1pY29uIC5mYS1tb29uIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cblxuICAgIEBrZXlmcmFtZXMgc2hpbmUge1xuICAgICAgMCUge1xuICAgICAgICBib3gtc2hhZG93OiAwIDAgNTBweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC40KTtcbiAgICAgIH1cbiAgICAgIDUwJSB7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCA4MHB4IDMwcHggcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQpO1xuICAgICAgfVxuICAgICAgMTAwJSB7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCA1MHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5zZWFyY2gtY29udGFpbmVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgfVxuXG4gICAgLnNlYXJjaC1pbnB1dCB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIG1heC13aWR0aDogNDAwcHg7XG4gICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XG4gICAgICBib3JkZXI6IG5vbmU7XG4gICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpO1xuICAgICAgY29sb3I6ICNmZmY7XG4gICAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZTtcbiAgICB9XG5cbiAgICAuc2VhcmNoLWlucHV0OjpwbGFjZWhvbGRlciB7XG4gICAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xuICAgIH1cblxuICAgIC5saWdodC1tb2RlIC5zZWFyY2gtaW5wdXQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xuICAgICAgY29sb3I6ICMzMzM7XG4gICAgfVxuXG4gICAgLmxpZ2h0LW1vZGUgLnNlYXJjaC1pbnB1dDo6cGxhY2Vob2xkZXIge1xuICAgICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcbiAgICB9XG4gIGA7XG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlTWVudSgpIHtcbiAgaWYgKCFpc01lbnVPcGVuKSB7XG4gICAgaXNNZW51T3BlbiA9IHRydWU7XG5cbiAgICBjb25zdCBIb2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIEhvbGRlci5pZCA9IFwiU0NNTVwiO1xuICAgIEhvbGRlci5jbGFzc0xpc3QuYWRkKGlzRGFya01vZGUgPyBcImRhcmstbW9kZVwiIDogXCJsaWdodC1tb2RlXCIpO1xuXG4gICAgY29uc3QgTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgTWVudS5jbGFzc0xpc3QuYWRkKFwibWVudS1jb250YWluZXJcIik7XG4gICAgTWVudS5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwibWVudS1oZWFkZXJcIj5cbiAgICAgICAgPGltZyBzcmM9XCIke0xvZ29EYXRhfVwiIGFsdD1cIkxvZ29cIj5cbiAgICAgICAgPGgxPkZyYWN0aWNsZSBDbGllbnQ8L2gxPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZGFyay1tb2RlLXN3aXRjaFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzd2l0Y2gtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3dpdGNoLWJnXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3dpdGNoLWNpcmNsZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3dpdGNoLWljb25cIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtbW9vblwiPjwvaT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJzZWFyY2gtY29udGFpbmVyXCI+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwic2VhcmNoLWlucHV0XCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggZm9yIG1vZHMuLi5cIiAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGlkPVwiU0NNTS1NT0RVTEVTXCIgY2xhc3M9XCJtb2R1bGUtY29udGFpbmVyXCI+XG4gICAgICAgIDwhLS0gTW9kdWxlcyB3aWxsIGJlIGluc2VydGVkIGhlcmUgZHluYW1pY2FsbHkgLS0+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChIb2xkZXIpO1xuICAgIEhvbGRlci5hcHBlbmRDaGlsZChNZW51KTtcblxuICAgIC8vIEFkZCBzb21lIGFkZGl0aW9uYWwgc3R5bGVzIHRvIHRoZSBtb2R1bGVzXG4gICAgY29uc3QgbW9kdWxlQ29udGFpbmVyID0gSG9sZGVyLnF1ZXJ5U2VsZWN0b3IoXCIjU0NNTS1NT0RVTEVTXCIpO1xuICAgIG1vZHVsZUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG4gICAgbW9kdWxlQ29udGFpbmVyLnN0eWxlLmZsZXhXcmFwID0gXCJ3cmFwXCI7XG4gICAgbW9kdWxlQ29udGFpbmVyLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJjZW50ZXJcIjtcbiAgICBtb2R1bGVDb250YWluZXIuc3R5bGUuZ2FwID0gXCIyMHB4XCI7XG5cbiAgICBjb25zdCBtb2R1bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNTQ01NLU1PRFVMRVMgPiAqXCIpO1xuICAgIG1vZHVsZXMuZm9yRWFjaCgobW9kdWxlKSA9PiB7XG4gICAgICBtb2R1bGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSlcIjtcbiAgICAgIG1vZHVsZS5zdHlsZS5wYWRkaW5nID0gXCIyMHB4XCI7XG4gICAgICBtb2R1bGUuc3R5bGUuYm9yZGVyUmFkaXVzID0gXCIxMHB4XCI7XG4gICAgICBtb2R1bGUuc3R5bGUuYm94U2hhZG93ID0gXCIwIDAgMjBweCByZ2JhKDAsIDAsIDAsIDAuMilcIjtcbiAgICAgIG1vZHVsZS5zdHlsZS50cmFuc2l0aW9uID0gXCJ0cmFuc2Zvcm0gMC4zcyBlYXNlLWluLW91dFwiO1xuICAgICAgbW9kdWxlLnN0eWxlLmZsZXggPSBcIjAgMCBjYWxjKDMzLjMzJSAtIDIwcHgpXCI7XG4gICAgICBtb2R1bGUuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG4gICAgICAgIG1vZHVsZS5zdHlsZS50cmFuc2Zvcm0gPSBcInNjYWxlKDEuMDUpXCI7XG4gICAgICB9KTtcbiAgICAgIG1vZHVsZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgICBtb2R1bGUuc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZSgxKVwiO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBkYXJrIG1vZGUgc3dpdGNoXG4gICAgY29uc3Qgc3dpdGNoQ29udGFpbmVyID0gSG9sZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zd2l0Y2gtY29udGFpbmVyJyk7XG4gICAgc3dpdGNoQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlRGFya01vZGUpO1xuXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgc2VhcmNoIGlucHV0XG4gICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBIb2xkZXIucXVlcnlTZWxlY3RvcignLnNlYXJjaC1pbnB1dCcpO1xuICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZmlsdGVyTW9kdWxlcyk7XG5cbiAgICBjcmVhdGVTdHlsZXMoKTtcbiAgICBTZXR1cE1vZHVsZXMoKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlNDTU1cIikucmVtb3ZlKCk7XG4gICAgaXNNZW51T3BlbiA9IGZhbHNlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbHRlck1vZHVsZXMoKSB7XG4gIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaC1pbnB1dCcpO1xuICBjb25zdCBzZWFyY2hUZXJtID0gc2VhcmNoSW5wdXQudmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgbW9kdWxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNTQ01NLU1PRFVMRVMgPiAqJyk7XG5cbiAgbW9kdWxlcy5mb3JFYWNoKChtb2R1bGUpID0+IHtcbiAgICBjb25zdCBtb2R1bGVUZXh0ID0gbW9kdWxlLnRleHRDb250ZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKG1vZHVsZVRleHQuaW5jbHVkZXMoc2VhcmNoVGVybSkpIHtcbiAgICAgIG1vZHVsZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9IGVsc2Uge1xuICAgICAgbW9kdWxlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICB9KTtcbn0iLCJjb25zdCB7IE1vZHVsZXNMaXN0IH0gPSByZXF1aXJlKFwiLi4vTW9kdWxlc0xpc3RcIik7XG5jb25zdCBLZXlzdHJva2VzID0gcmVxdWlyZShcIi4uL01vZHVsZXMvS2V5c3Ryb2tlc1wiKTsgXG5jb25zdCBGdWxsYnJpZ2h0ID0gcmVxdWlyZShcIi4uL01vZHVsZXMvRnVsbGJyaWdodFwiKTtcbmNvbnN0IFhwSHVkID0gcmVxdWlyZShcIi4uL01vZHVsZXMvWHBIdWRcIik7XG5jb25zdCBNYW5nYUZvbnQgPSByZXF1aXJlKFwiLi4vTW9kdWxlcy9NYW5nYUZvbnRcIik7XG4vLyBJRiBZT1UgQUREIFlPVVIgT1dOIE1BS0UgU1VSRSBUTyBSRVFVSVJFIFRIRU0gSE9XIFlPVSBOQU1FRCBJVCBJTiBUSEUgXCJNb2R1bGVzTGlzdC5qc1wiIEZJTEUhISFcbi8vIEV4YW1wbGU6IGNvbnN0IENQUyA9IHJlcXVpcmUoXCIuLi9Nb2R1bGVzL3NjcmlwdG5hbWVjYW5iZXdoYXRldmVyXCIpXG5cbmxldCBCYXJlTG9jYWxTdG9yYWdlRGF0YSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiU0NNTS1NT0RTXCIpO1xubGV0IFBhcnNlZExTRGF0YSA9IEpTT04ucGFyc2UoQmFyZUxvY2FsU3RvcmFnZURhdGEpO1xuXG5leHBvcnQgZnVuY3Rpb24gU3RhcnR1cE1vZHVsZXMgKCkge1xuICAvL2lmICghQmFyZUxvY2FsU3RvcmFnZURhdGEpIHtcbiAgICBsZXQgbW9kcyA9IFtdO1xuICAgIE1vZHVsZXNMaXN0LmZvckVhY2goKE1vZHVsZSkgPT4geyBtb2RzLnB1c2goeyBuYW1lOiBNb2R1bGUubmFtZSwgZW5hYmxlZDogZmFsc2UgfSk7fSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlNDTU0tTU9EU1wiLCBKU09OLnN0cmluZ2lmeShtb2RzKSk7XG4gIC8vfVxuXG4gIC8vIENhbnQgZ2V0IHRoaXMgdG8gd29yayBzbyB3b21wIHdvbXAgZm9yIG5vd1xuICAvLyBpZiAoUGFyc2VkTFNEYXRhKSBNb2R1bGVzTGlzdC5mb3JFYWNoKChNb2R1bGUpID0+IHsgaWYgKFBhcnNlZExTRGF0YS5maW5kKChlKSA9PiBlLm5hbWUgPT09IE1vZHVsZS5uYW1lKSkgZXZhbChgJHtNb2R1bGUubmFtZX0uSW5pdChcIiR7TW9kdWxlLm5hbWV9XCIpYCk7IH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU2V0dXBNb2R1bGVzKCkge1xuICBmdW5jdGlvbiBBZGQobmFtZSwgaW1nKSB7XG4gICAgY29uc3QgTW9kdWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblxuICAgIE1vZHVsZS5pbm5lckhUTUwgPSBgXG4gICAgICA8ZGl2IHN0eWxlPVwiZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgYWxpZ24taXRlbXM6IGNlbnRlcjsganVzdGlmeS1jb250ZW50OiBlbmQ7IGhlaWdodDogMjV2aDsgd2lkdGg6IDI1dmg7IGJvcmRlci1yYWRpdXM6IDIuNXZoOyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTUpOyBib3JkZXI6IHNvbGlkIDAuMXZ3IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTsgcG9zaXRpb246IHJlbGF0aXZlO1wiPlxuICAgICAgICAgICAgPGltZyBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAzNSU7IGxlZnQ6IDUwJTsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7IGZvbnQtc2l6ZTogMnZoOyB3aWR0aDogMTV2aDsgaGVpZ2h0OiAxNXZoO1wiIHNyYz1cIiR7aW1nfVwiLz5cbiAgICAgICAgICAgIDxoMSBzdHlsZT1cIndvcmQtd3JhcDogYnJlYWstd29yZDtwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogNjIuNSU7IGxlZnQ6IDUwJTsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7IGZvbnQtc2l6ZTogMS41dmg7IHdpZHRoOiAxMDAlOyB0ZXh0LWFsaWduOiBjZW50ZXI7XCI+JHtuYW1lfTwvaDE+XG4gICAgICAgICAgICA8YSBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjI1KTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMjAlOyBib3R0b206IDA7IGJvcmRlci1yYWRpdXM6IDAgMCAyLjV2aCAyLjV2aDsgcG9zaXRpb246IHJlbGF0aXZlOyBib3JkZXI6IHNvbGlkIDAuMXZ3IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcIiBpZD1cIlNDTU0tJHtuYW1lfS1Ub2dnbGVcIj5cbiAgICAgICAgICAgICAgICA8cCBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAxMCU7IGxlZnQ6IDUwJTsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7IGZvbnQtc2l6ZTogMnZoO1wiPkRJU0FCTEVEPC9wPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIGA7XG5cbiAgICBjb25zdCBIb2xkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlNDTU0tTU9EVUxFU1wiKTtcbiAgICBpZiAoSG9sZGVyKSBIb2xkZXIuYXBwZW5kQ2hpbGQoTW9kdWxlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIEVuYWJsZVRvZ2dsZShuYW1lKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYFNDTU0tJHtuYW1lfS1Ub2dnbGVgKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zdCBpID0gUGFyc2VkTFNEYXRhLmZpbmRJbmRleCgoZSkgPT4gZS5uYW1lID09PSBuYW1lKTtcblxuICAgICAgaWYgKGkgIT09IC0xKSB7XG4gICAgICAgIFBhcnNlZExTRGF0YVtpXS5lbmFibGVkID0gIVBhcnNlZExTRGF0YVtpXS5lbmFibGVkO1xuICAgICAgICBldmFsKGAke25hbWV9LkluaXQoXCIke25hbWV9XCIpYCk7XG5cbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJTQ01NLU1PRFNcIiwgSlNPTi5zdHJpbmdpZnkoUGFyc2VkTFNEYXRhKSk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIFNldENvcnJlY3RUb2dnbGUobmFtZSkge1xuICAgIGNvbnN0IGkgPSBQYXJzZWRMU0RhdGEuZmluZEluZGV4KChlKSA9PiBlLm5hbWUgPT09IG5hbWUpO1xuXG4gICAgaWYgKGkgIT09IC0xKSB7XG4gICAgICBjb25zdCBUb2dnbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgU0NNTS0ke25hbWV9LVRvZ2dsZWApO1xuICAgICAgaWYgKFRvZ2dsZSkge1xuICAgICAgICBUb2dnbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gUGFyc2VkTFNEYXRhW2ldLmVuYWJsZWQgPyBcInJnYmEoMCwgMjU1LCAwLCAwLjI1KVwiIDogXCJyZ2JhKDI1NSwgMCwgMCwgMC4yNSlcIjtcbiAgICAgICAgVG9nZ2xlLnF1ZXJ5U2VsZWN0b3IoXCJwXCIpLmlubmVySFRNTCA9IFBhcnNlZExTRGF0YVtpXS5lbmFibGVkID8gXCJFTkFCTEVEXCIgOiBcIkRJU0FCTEVEXCI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgTW9kdWxlc0xpc3QuZm9yRWFjaCgoTW9kdWxlKSA9PiB7XG4gICAgQmFyZUxvY2FsU3RvcmFnZURhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlNDTU0tTU9EU1wiKTtcbiAgICBQYXJzZWRMU0RhdGEgPSBKU09OLnBhcnNlKEJhcmVMb2NhbFN0b3JhZ2VEYXRhKTtcbiAgXG4gICAgQWRkKE1vZHVsZS5uYW1lLCBNb2R1bGUuaW1hZ2VkYXRhKTtcbiAgICBFbmFibGVUb2dnbGUoTW9kdWxlLm5hbWUpO1xuICAgIHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgIFNldENvcnJlY3RUb2dnbGUoTW9kdWxlLm5hbWUpO1xuICAgIH0sIDEwMCk7XG4gIH0pO1xufSIsImxldCBpbnQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBJbml0KG5hbWUpIHtcbiAgY29uc3QgRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJTQ01NLU1PRFNcIikpO1xuICBjb25zdCBNb2R1bGVJbmRleCA9IERhdGEuZmluZEluZGV4KChlKSA9PiBlLm5hbWUgPT09IG5hbWUpO1xuXG4gIGlmIChNb2R1bGVJbmRleCAhPT0gMSAmJiAhRGF0YVtNb2R1bGVJbmRleF0uZW5hYmxlZCkge1xuICAgIGNsZWFySW50ZXJ2YWwoaW50KTtcbiAgICBpbnQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICBNb2RBUEkuYmxvY2tzLmFpci5saWdodFZhbHVlID0gMTA7XG4gICAgICBNb2RBUEkuYmxvY2tzLndhdGVyLmxpZ2h0VmFsdWUgPSAxMDtcbiAgICAgIE1vZEFQSS5ibG9ja3MuYWlyLnJlbG9hZCgpO1xuICAgICAgTW9kQVBJLmJsb2Nrcy53YXRlci5yZWxvYWQoKTtcbiAgICB9LCA1MDAwKTtcbiAgfSBlbHNlIHtcbiAgICBjbGVhckludGVydmFsKGludCk7XG4gICAgaW50ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgTW9kQVBJLmJsb2Nrcy5haXIubGlnaHRWYWx1ZSA9IDE7XG4gICAgICBNb2RBUEkuYmxvY2tzLndhdGVyLmxpZ2h0VmFsdWUgPSAxO1xuICAgICAgTW9kQVBJLmJsb2Nrcy5haXIucmVsb2FkKCk7XG4gICAgICBNb2RBUEkuYmxvY2tzLndhdGVyLnJlbG9hZCgpO1xuICAgIH0sIDUwMDApO1xuICB9XG59IiwiTW9kQVBJLnJlcXVpcmUoXCJwbGF5ZXJcIik7XG5cbmxldCBwcmVzc2VkS2V5cyA9IHt9O1xubGV0IGludDtcblxuZXhwb3J0IGZ1bmN0aW9uIEluaXQobmFtZSkge1xuICBjb25zdCBEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlNDTU0tTU9EU1wiKSk7XG4gIGNvbnN0IE1vZHVsZUluZGV4ID0gRGF0YS5maW5kSW5kZXgoKGUpID0+IGUubmFtZSA9PT0gbmFtZSk7XG4gIGNvbnN0IEtleXN0cm9rZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlNDTU0tS2V5c3Ryb2tlc1wiKTtcblxuICBpZiAoTW9kdWxlSW5kZXggIT09IDEgJiYgIURhdGFbTW9kdWxlSW5kZXhdLmVuYWJsZWQpIHtcbiAgICBpZiAoS2V5c3Ryb2tlcykgcmV0dXJuO1xuICAgIFxuICAgIGludCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIlNDTU0tS2V5c3Ryb2tlc1wiKSkge1xuICAgICAgICBjb25zdCBwcmVzc2FibGVLZXlzID0gW1wid1wiLCBcImFcIiwgXCJzXCIsIFwiZFwiXTtcbiAgICAgICAgcHJlc3NhYmxlS2V5cy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7a2V5fWtleWApO1xuICAgICAgICAgIGlmIChlbGVtZW50ICYmIHByZXNzZWRLZXlzW2tleV0pIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KVwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmNvbG9yID0gXCJ3aGl0ZVwiO1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gXCJyZ2JhKDAsIDAsIDAsIDAuNSlcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIDEwKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcHJlc3NlZEtleXNbZS5rZXkudG9Mb3dlckNhc2UoKV0gPSB0cnVlO1xuICAgIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGRlbGV0ZSBwcmVzc2VkS2V5c1tlLmtleS50b0xvd2VyQ2FzZSgpXTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGtleXN0cm9rZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGtleXN0cm9rZXMuaWQgPSBcIlNDTU0tS2V5c3Ryb2tlc1wiO1xuICAgIGtleXN0cm9rZXMuc3R5bGUgPSBgZm9udC1zaXplOiAydmg7dHJhbnNmb3JtOiB0cmFuc2xhdGUoLTEwJSwgLTM1JSk7ZGlzcGxheTogZ3JpZDt3aWR0aDogZml0LWNvbnRlbnQ7aGVpZ2h0OiBmaXQtY29udGVudDtwb3NpdGlvbjogYWJzb2x1dGU7cmlnaHQ6IDA7Ym90dG9tOiAwO2dyaWQtdGVtcGxhdGUtYXJlYXM6IFwiLiBXIC5cIiBcIkEgUyBEXCI7Z2FwOiA1cHg7YDtcbiAgICBrZXlzdHJva2VzLmlubmVySFRNTCA9IGA8ZGl2IGlkPVwid2tleVwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czogMXZoO21pbi1oZWlnaHQ6IDZ2aDttaW4td2lkdGg6IDZ2aDtkaXNwbGF5OiBmbGV4O2p1c3RpZnktY29udGVudDogY2VudGVyO2FsaWduLWl0ZW1zOiBjZW50ZXI7Zm9udC1mYW1pbHk6ICdNaW5lY3JhZnRpYSc7Z3JpZC1hcmVhOiBXO1wiPlc8L2Rpdj5cbiAgICA8ZGl2IGlkPVwiYWtleVwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czogMXZoO21pbi1oZWlnaHQ6IDZ2aDttaW4td2lkdGg6IDZ2aDtkaXNwbGF5OiBmbGV4O2p1c3RpZnktY29udGVudDogY2VudGVyO2FsaWduLWl0ZW1zOiBjZW50ZXI7Zm9udC1mYW1pbHk6ICdNaW5lY3JhZnRpYSc7Z3JpZC1hcmVhOiBBO1wiPkE8L2Rpdj5cbiAgICA8ZGl2IGlkPVwic2tleVwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czogMXZoO21pbi1oZWlnaHQ6IDZ2aDttaW4td2lkdGg6IDZ2aDtkaXNwbGF5OiBmbGV4O2p1c3RpZnktY29udGVudDogY2VudGVyO2FsaWduLWl0ZW1zOiBjZW50ZXI7Zm9udC1mYW1pbHk6ICdNaW5lY3JhZnRpYSc7Z3JpZC1hcmVhOiBTO1wiPlM8L2Rpdj5cbiAgICA8ZGl2IGlkPVwiZGtleVwiIHN0eWxlPVwiYm9yZGVyLXJhZGl1czogMXZoO21pbi1oZWlnaHQ6IDZ2aDttaW4td2lkdGg6IDZ2aDtkaXNwbGF5OiBmbGV4O2p1c3RpZnktY29udGVudDogY2VudGVyO2FsaWduLWl0ZW1zOiBjZW50ZXI7Zm9udC1mYW1pbHk6ICdNaW5lY3JhZnRpYSc7Z3JpZC1hcmVhOiBEO1wiPkQ8L2Rpdj5gO1xuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChrZXlzdHJva2VzKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoaW50KSBjbGVhckludGVydmFsKGludCk7XG4gICAgaWYgKEtleXN0cm9rZXMpIEtleXN0cm9rZXMucmVtb3ZlKCk7XG4gIH1cbn0iLCJsZXQgaXNUZXh0U3dpdGNoaW5nRW5hYmxlZCA9IHRydWU7IFxuXG5leHBvcnQgZnVuY3Rpb24gSW5pdChuYW1lKSB7XG4gICAgY29uc3QgRGF0YSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJTQ01NLU1PRFNcIikpO1xuICAgIGNvbnN0IE1vZHVsZUluZGV4ID0gRGF0YS5maW5kSW5kZXgoKGUpID0+IGUubmFtZSA9PT0gbmFtZSk7XG4gICAgaWYgKE1vZHVsZUluZGV4ICE9PSAxICYmICFEYXRhW01vZHVsZUluZGV4XS5lbmFibGVkKSB7XG4gICAgICAgIE1vZEFQSS5yZXF1aXJlKFwicGxheWVyXCIpXG5cbiAgICAgICAgTW9kQVBJLmFkZEV2ZW50TGlzdGVuZXIoXCJzZW5kY2hhdG1lc3NhZ2VcIiwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoaXNUZXh0U3dpdGNoaW5nRW5hYmxlZCkge1xuICAgICAgICAgICAgICAgIGV2ZW50Lm1lc3NhZ2UgPSBldmVudC5tZXNzYWdlLnNwbGl0KCcnKS5tYXAoY2hhciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaChjaGFyLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2EnOiByZXR1cm4gJ+WNgic7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdiJzogcmV0dXJuICfkuYMnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6IHJldHVybiAn5YyaJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2QnOiByZXR1cm4gJ+GXqic7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlJzogcmV0dXJuICfkuYcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZic6IHJldHVybiAn5Y2DJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2cnOiByZXR1cm4gJ+GYnCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdoJzogcmV0dXJuICfljYQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaSc6IHJldHVybiAn5LioJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2onOiByZXR1cm4gJ+++jCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdrJzogcmV0dXJuICfSnCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzogcmV0dXJuICfjhKUnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6IHJldHVybiAn54iqJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ24nOiByZXR1cm4gJ+WHoCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvJzogcmV0dXJuICfjhJYnO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncCc6IHJldHVybiAn5Y2pJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3EnOiByZXR1cm4gJ9KoJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3InOiByZXR1cm4gJ+Wwuic7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzogcmV0dXJuICfkuIInO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndCc6IHJldHVybiAn44SSJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3UnOiByZXR1cm4gJ+OEqSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzogcmV0dXJuICfhkK8nO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAndyc6IHJldHVybiAn5bGxJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3gnOiByZXR1cm4gJ+S5gic7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlICd5JzogcmV0dXJuICfjhJonO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAneic6IHJldHVybiAn5LmZJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBjaGFyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuam9pbignJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlzVGV4dFN3aXRjaGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc29sZS5sb2coXCJEaXNhYmxlZCBNb2RcIik7XG4gICAgfVxufSIsImV4cG9ydCBmdW5jdGlvbiBJbml0KG5hbWUpIHtcbiAgICBjb25zdCBEYXRhID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIlNDTU0tTU9EU1wiKSk7XG4gICAgY29uc3QgTW9kdWxlSW5kZXggPSBEYXRhLmZpbmRJbmRleCgoZSkgPT4gZS5uYW1lID09PSBuYW1lKTtcblxuICAgIGlmIChNb2R1bGVJbmRleCAhPT0gMSAmJiAhRGF0YVtNb2R1bGVJbmRleF0uZW5hYmxlZCkge1xuICAgICAgICBcbiAgICAgICAgLyogTW9kQVBJLnJlcXVpcmUoXCJwbGF5ZXJcIik7XG5cbiAgICAgICAgTW9kQVBJLmRpc3BsYXlUb0NoYXQoeyBtc2c6IFwiRGVhdGggUG9zaXRpb24gRW5hYmxlZFwiIH0pO1xuXG4gICAgICAgIE1vZEFQSS5hZGRFdmVudExpc3RlbmVyKFwicGxheWVyZGVhdGhcIiwgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGxheWVyID0gTW9kQVBJLnBsYXllcjtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclBvcyA9IHBsYXllci5nZXRQb3NpdGlvblZlY3RvcigpO1xuICAgICAgICAgICAgY29uc3QgeCA9IE1hdGgucm91bmQocGxheWVyUG9zLngpO1xuICAgICAgICAgICAgY29uc3QgeSA9IE1hdGgucm91bmQocGxheWVyUG9zLnkpO1xuICAgICAgICAgICAgY29uc3QgeiA9IE1hdGgucm91bmQocGxheWVyUG9zLnopO1xuXG4gICAgICAgICAgICBNb2RBUEkuZGlzcGxheVRvQ2hhdCh7XG4gICAgICAgICAgICAgICAgbXNnOiBgWW91IGRpZWQgYXQgY29vcmRpbmF0ZXM6IFg6ICR7eH0sIFk6ICR7eX0sIFo6ICR7en1gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7IFxuICAgICAgICBrZXB0IGJyZWFraW5nIG15IGdhbWUgc28gdHVybmVkIG9mZiBmb3Igbm93Ki9cbiAgICAgICAgY29uc29sZS5sb2coXCJlbmFibGVkIG1vZFwiKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRGlzYWJsZWQgTW9kXCIpO1xuICAgIH1cbn1cblxuIiwiaW1wb3J0IExvZ28gZnJvbSBcIi4vQmFzZTY0L0NsaWVudExvZ28ucG5nXCJcbmltcG9ydCBLZXlzdHJva2VzaW1nIGZyb20gXCIuL0Jhc2U2NC9LZXlzdHJva2VzLnBuZ1wiXG5pbXBvcnQgRnVsbGJyaWdodGltZyBmcm9tIFwiLi9CYXNlNjQvRnVsbGJyaWdodC5wbmdcIlxuaW1wb3J0IFhwSHVkaW1nIGZyb20gXCIuL0Jhc2U2NC9YcEh1ZC5wbmdcIlxuaW1wb3J0IE1hbmdhRm9udGltZyBmcm9tIFwiLi9CYXNlNjQvTWFuZ2FGb250LnBuZ1wiXG5pbXBvcnQgVG9nZ2xlU3ByaW50aW1nIGZyb20gXCIuL0Jhc2U2NC9Ub2dnbGVTcHJpbnQucG5nXCJcbmltcG9ydCBDaGF0U2hvcnRjdXRzaW1nIGZyb20gXCIuL0Jhc2U2NC9DaGF0U2hvcnRjdXRzLnBuZ1wiXG5cbmV4cG9ydCBjb25zdCBMb2dvRGF0YSA9IExvZ287XG5cbmV4cG9ydCBsZXQgTW9kdWxlc0xpc3QgPSBbXG4gIHtcbiAgICBuYW1lOiBcIktleXN0cm9rZXNcIixcbiAgICBpbWFnZWRhdGE6IEtleXN0cm9rZXNpbWcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIkZ1bGxicmlnaHRcIixcbiAgICBpbWFnZWRhdGE6IEZ1bGxicmlnaHRpbWcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlhwSHVkXCIsXG4gICAgaW1hZ2VkYXRhOiBYcEh1ZGltZyxcbiAgfSxcbiAge1xuICAgIG5hbWU6IFwiTWFuZ2FGb250XCIsXG4gICAgaW1hZ2VkYXRhOiBNYW5nYUZvbnRpbWcsXG4gIH0sXG4gIHtcbiAgICBuYW1lOiBcIlRvZ2dsZVNwcmludFwiLFxuICAgIGltYWdlZGF0YTogVG9nZ2xlU3ByaW50aW1nLFxuICB9LFxuICB7XG4gICAgbmFtZTogXCJDaGF0U2hvcnRjdXRzXCIsXG4gICAgaW1hZ2VkYXRhOiBDaGF0U2hvcnRjdXRzaW1nLFxuICB9LFxuXTsiLCJNb2RBUEkucmVxdWlyZShcInBsYXllclwiKTtcbk1vZEFQSS5yZXF1aXJlKFwibmV0d29ya1wiKTtcbk1vZEFQSS5yZXF1aXJlKFwic2V0dGluZ3NcIik7XG5Nb2RBUEkucmVxdWlyZShcInNlcnZlclwiKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJjb25zdCB7IENyZWF0ZU1lbnUgfSA9IHJlcXVpcmUoXCIuL0dVSS9NZW51XCIpO1xuY29uc3QgeyBTdGFydHVwTW9kdWxlcyB9ID0gcmVxdWlyZShcIi4vR1VJL01vZHVsZXNcIik7XG5jb25zdCB7IENoYXRDb21tYW5kcyB9ID0gcmVxdWlyZShcIi4vQ2hhdENNRC9IZWxwXCIpXG5jb25zdCB7IFJlcXVpcmVBbGwgfSA9IHJlcXVpcmUoXCIuL1JlcXVpcmVBbGwuanNcIilcblxuU3RhcnR1cE1vZHVsZXMoKTtcblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gIGlmIChlLmtleSA9PT0gXCI9XCIpIHtcbiAgICBDcmVhdGVNZW51KCk7XG4gIH1cbn0pOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==