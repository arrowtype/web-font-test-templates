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





/////////////////////////////////////////////////////////
////////////////////// Type Tester ///////////////////////
/////////////////////////////////////////////////////////

const matrixWords = document.querySelectorAll(".matrix-word")
const typeTesterInput = document.querySelector(".matrix .typer")


function typeTestMatrix() {
    console.log(this);
    // console.log(this.value);
    console.log(this.innerHTML);
    for (var word of matrixWords) {
        var newWord = this.value;
        word.innerHTML = newWord;
    }
}


// typeTesterInput.addEventListener('change', typeTestMatrix);

function addMatrixListeners(){
    typeTesterInput.addEventListener('input', typeTestMatrix);
}

window.addEventListener('load', addMatrixListeners);

