var i = -1;
var isBackspacing = false;
var text = "Hello! Welcome to my personal website!";

const speedForward = 100;
const speedWait = 2000;
const speedBackspace = 25;

var prevScroll = window.pageYOffset;

const faders = document.querySelectorAll('.fade-in');

window.onscroll = function() {
    var currentScroll = window.pageYOffset;
    if (prevScroll > currentScroll) {
        $("#navigate").css("top", "0px");
    } else if (prevScroll < currentScroll) {
        $("#navigate").css("top", "-70px");
    }
    prevScroll = currentScroll;
}

$(document).ready(function() {
    setTimeout(function() { typeWriter("Home", text); }, speedWait);
});

function typeWriter(id, str) {
    var element = $("#" + id);
    var eHeader = element.children("h1");
    if (!isBackspacing) {
        if (i < str.length) {
            eHeader.text(eHeader.text() + str.charAt(i));
            i++;
            setTimeout(function() { typeWriter(id, str); }, speedForward);
        } else {
            isBackspacing = true;
            i = 0;
            eHeader.removeClass("cursor");
            setTimeout(function() { typeWriter(id, str); }, speedWait);
        }
    } else {
        if (eHeader.text().length > 0) {
            eHeader.addClass("cursor");
            eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
            setTimeout(function() { typeWriter(id, str); }, speedBackspace);
        } else {
            isBackspacing = false;
            setTimeout(function() { typeWriter(id, str); }, speedWait);
        }
    }
}

const appearOptions = {
    threshold: 0.5
};

const appearOnScroll = new IntersectionObserver(
    function(
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("appear");
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});