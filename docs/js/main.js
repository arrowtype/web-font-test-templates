const fontSections = document.querySelectorAll(".font-section")
const fontSectionLinks = document.querySelectorAll("#sidebar a")

// console.log(fontSections)
// console.log(fontSectionLinks)

function highlightNav() {
    // console.log(window.scrollY)
    for (var section of fontSections) {
        // console.log("scroll is ", window.scrollY)
        let scrollPos = section.offsetTop - window.scrollY
        let bottomPos = scrollPos + section.offsetHeight 

        console.log(section.offsetTop)
        if (scrollPos <= 100 && scrollPos + section.offsetHeight >= 100) {
            
            // console.log(section.id, scrollPos, bottomPos, "in view")
            // console.log(section)
            
            for (var link of fontSectionLinks){
                let linkHref = link.hash.replace('#','');
                // console.log(linkHref);
                if (linkHref == section.id) {
                    console.log(link.hash)
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
                    console.log(link.hash)
                    link.classList.remove("highlight")
                }
            }
        }
    }
        // let sectionPos = section.offsetTop
        // if fontSection offsetTop is <= 100
            // for link in fontSectionLinks
                // if link.hash == section.id
                    // add class "highlight" to link

}   

highlightNav()

document.addEventListener('scroll', highlightNav)

fontSectionLinks.addEventListener('onclick', highlightNav)