document.addEventListener('scroll' ,onScroll);

function onScroll(event) {
    const curPos = window.scrollY;
    const blocks = document.querySelectorAll('#home, #services, #portfolio, #about, #contact');
    const headerHeight = document.querySelector('.header').offsetHeight;
    blocks.forEach((element) => {
        if ((element.offsetTop <= curPos + headerHeight) && (element.offsetTop +  element.offsetHeight) > curPos) {
            document.querySelector('.navmenu-item-link-selected').classList.remove('navmenu-item-link-selected');
            document.querySelector(`a[href="#${element.getAttribute('id')}"]`).classList.add('navmenu-item-link-selected');
            }
        });
    
}