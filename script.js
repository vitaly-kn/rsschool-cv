document.addEventListener('scroll' ,onScroll);

function onScroll(event) {
    const curPos = window.scrollY;
    const blocks = document.querySelectorAll('#home, #services, #portfolio, #about, #contact');
    const links = document.querySelectorAll('a.navmenu-item-link');
    console.log(blocks);
    console.log(links);

    blocks.forEach((element) => {
        if (element.offsetTop <= (curPos + 96) && (element.offsetTop +  element.offsetHeight) > curPos) {
            links.forEach((a) => {
                a.classList.remove('navmenu-item-link-selected');
                if (element.getAttribute('id') === a.getAttribute('href').substring(1)) {
                    a.classList.add('navmenu-item-link-selected');
                }
            })
        }
    });
}