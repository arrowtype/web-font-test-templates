const fontSections = document.querySelectorAll(".font-section")
const fontSectionLinks = document.querySelectorAll("#sidebar a")

// console.log(fontSections)
// console.log(fontSectionLinks)

function highlightNav() {
    // console.log(window.scrollY)
    // console.log(fontSections);
    for (var section of fontSections) {
        // console.log("scroll is ", window.scrollY)
        let scrollPos = section.offsetTop - window.scrollY
        let bottomPos = scrollPos + section.offsetHeight 

        // console.log(section.offsetTop)
        if (scrollPos <= 100 && scrollPos + section.offsetHeight >= 100) {
            
            for (var link of fontSectionLinks){
                let linkHref = link.hash.replace('#','');
                // console.log(linkHref);
                if (linkHref == section.id) {
                    // console.log(link.hash)
                    link.classList.add("highlight")
                }
            }
        }
        else if (scrollPos >= 100 || bottomPos < 100) {
            // console.log(section.id, scrollPos, bottomPos, "out of view")
            for (var link of fontSectionLinks){
                let linkHref = link.hash.replace('#','');
                // console.log(linkHref);
                if (linkHref == section.id) {
                    // console.log(link.hash)
                    link.classList.remove("highlight")
                }
            }
        }
    }
}   

function addTypeSpecListeners(){
    highlightNav()
    document.addEventListener('scroll', highlightNav)
    // for (var link of fontSectionLinks) {
    //     link.addEventListener('onclick', highlightNav)
    // }
}

window.addEventListener('load', addTypeSpecListeners);



/////////////////////////////////////////////////////////////
////////////////////// Hamburger menu ///////////////////////
////////////////////////////////////////////////////////////

const desktopNav = document.querySelector("#desktop-nav");
const mobileNav = document.querySelector("#mobile-nav");
const sidebarButton = document.querySelector("#sidebar-button");
const sidebarDrawer = document.querySelector("#sidebar");
const typeSpecimen = document.querySelector("#tests");


function toggleSidebar(evt) {
    
    sidebarButton.classList.add("show-sm");
    mobileNav.classList.add("show-sm");
    desktopNav.classList.add("hide-sm");

    if (this.id == "sidebar-button") {
        sidebarDrawer.classList.toggle("revealed");
    }
    else if (this.id == "tests") {
        sidebarDrawer.classList.remove("revealed");
    }
}

// how can you do this only on the correct page?
function addSidebarButtonListener(){

    sidebarButton.addEventListener('click', toggleSidebar)
    if (typeSpecimen != null) {
        typeSpecimen.addEventListener('click', toggleSidebar)
    }
}

window.addEventListener('load', addSidebarButtonListener);


/////////////////////////////////////////////////////////
////////////////////// Type Tester ///////////////////////
/////////////////////////////////////////////////////////

const matrixWords = document.querySelectorAll(".matrix-word")
const matrixWordsContainer = document.querySelector(".matrix p")
const typeTesterInput = document.querySelector(".matrix .typer")


function typeTestMatrix(e) {
    console.log(e);
    // console.log(this.value);
    console.log(this.innerHTML);
    for (var word of matrixWords) {
        var newWord = this.value;
        word.innerHTML = newWord;
    }
}


// typeTesterInput.addEventListener('change', typeTestMatrix);

// how can you do this only on the correct page?
function addMatrixListeners(){
    if (typeTesterInput != null) {
        typeTesterInput.addEventListener('input', typeTestMatrix);
    }
}

window.addEventListener('load', addMatrixListeners);


function varFontSlide(e) {
    // console.log(e);
    let mouseX = e.clientX
    let mouseY = e.clientY
    let winX = window.innerWidth
    let winY = window.innerHeight

    // console.log(mouseX, mouseY);
    // console.log(window.innerWidth, window.innerHeight);

    // get a 0–1 value for mouse position, X and Y
    let wghtRatio = mouseX / winX
    let opszRatio = (winY - mouseY) / winY // using (winY - mouseY) to set lower values at bottom of window

    // weight axis
    let wghtMin = 0
    let wghtMax = 1000

    // optical size axis
    let opszMin = 6
    let opszMax = 72

    // calculate ranges
    let wghtAxisRange = wghtMax - wghtMin    // 1000
    let opszAxisRange = opszMax - opszMin      // 66

    // calculate setting based on ratio of mouse position (a slider would work, too)
    let wght = wghtRatio * wghtAxisRange + wghtMin
    let opsz = opszRatio * opszAxisRange + opszMin

    console.log("wght is " + wght)
    console.log("opsz is " + opsz)

    let fontVarSettings = `font-variation-settings: 'opsz' ${opsz}, 'wght' ${wght}`

    typeTesterInput.setAttribute("style", fontVarSettings);

    let wghtInverse = (1 - wghtRatio) * wghtAxisRange + wghtMin
    let opszInverse = (1 - opszRatio) * opszAxisRange + opszMin

    let fontVarSettingsInverse = `font-variation-settings: 'opsz' ${opszInverse}, 'wght' ${wghtInverse}`

    matrixWordsContainer.setAttribute("style", fontVarSettingsInverse);
}

function addMousePosListener(){
    if (typeTesterInput != null) {
        // console.log("loggingmouse")
        window.onmousemove = varFontSlide;
    }
}

window.addEventListener('load', addMousePosListener);

// window.onmousemove = logMouseMove;

// function logMouseMove(e) {
// 	// e = event || window.event;	
// 	mousePos = { x: e.clientX, y: e.clientY };
// 	console.log(mousePos);
// }