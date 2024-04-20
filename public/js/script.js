document.addEventListener('DOMContentLoaded', function () {
    function showDropdown(content) {
        content.style.display = 'block';
    }
    function hideDropdown(content) {
        content.style.display = 'none';
    }
    document.querySelectorAll('.dropdown').forEach(function (dropdown) {
        var btn = dropdown.querySelector('.dropbtn');
        var content = dropdown.querySelector('.dropdown-content');
        btn.onmouseover = function () {
            showDropdown(content);
        };
        dropdown.onmouseout = function (event) {
            setTimeout(function () {
                if (!dropdown.contains(event.relatedTarget)) {
                    hideDropdown(content);
                }
            }, 100);
        };
        content.onmouseover = function () {
            showDropdown(content);
        };
    });
});

$(document).ready(function () {
    $(".box").hover(function () {
        $(this).find(".pop-up").show();
    });

    $(".box").mouseleave(function () {
        $(this).find(".pop-up").hide();
    });
});

document.getElementById('sitar').addEventListener('click', () => {
    document.getElementById('inst-head').innerHTML = "Sitar";
    document.getElementById('inst-para').innerHTML = "The sitar, a quintessential instrument in Hindustani classical music, evokes a sense of timeless elegance and spiritual depth. With its long neck, resonant gourd body, and intricate fretwork, <b>the sitar is not only a musical instrument but also a symbol of India's rich cultural heritage and artistic legacy.</b>";
    document.getElementById('inst-course').href = "sitar.html";
});

document.getElementById('tabla').addEventListener('click', () => {
    document.getElementById('inst-head').innerHTML = "Tabla";
    document.getElementById('inst-para').innerHTML = "Tabla, the rhythmic heartbeat of Hindustani classical music, embodies a rich tradition of percussive artistry and cultural heritage.<br><b>In Hindustani classical music, the tabla serves as the primary rhythmic accompaniment, providing a dynamic and intricate framework for melodic improvisation.</b>";
    document.getElementById('inst-course').href = "tabla.html";
});
document.getElementById('flute').addEventListener('click', () => {
    document.getElementById('inst-head').innerHTML = "Flute";
    document.getElementById('inst-para').innerHTML = "In Hindustani classical music, the flute holds a special place as one of the most enchanting and expressive instruments. Known as the 'bansuri,' it is revered for its ability to evoke deep emotions and paint vivid musical landscapes.<br><b>Its lyrical melodies and fluid phrasing create a sense of serenity and tranquility, drawing listeners into a state of contemplation and reflection</b>.";
    document.getElementById('inst-course').href = "flute.html";
});

document.getElementById('harmonium').addEventListener('click', () => {
    document.getElementById('inst-head').innerHTML = "Harmonium";
    document.getElementById('inst-para').innerHTML = "In Hindustani classical music, the harmonium plays a significant role as both a solo and accompaniment instrument, providing harmonic support and adding depth to vocal and instrumental performances.<br> <b>Its rich, warm tones blend seamlessly with the human voice, creating a vibrant tapestry of sound that resonates with audiences.</b>";
    document.getElementById('inst-course').href = "harmonium.html";
});

var instMainImage = document.getElementById("inst-main-img");
var instThumbnails = document.getElementsByClassName('inst-thumb-img');
for (var i = 0; i < instThumbnails.length; i++) {
    var instImg = instThumbnails[i];
    instImg.addEventListener('click', function () {
        instMainImage.src = this.src;
    });
}


document.getElementById('hindustani').addEventListener('click', () => {
    document.getElementById('vocal-head').innerHTML = "Hindustani";
    document.getElementById('vocal-para').innerHTML = "Hindustani vocal music is a traditional form of music that originates from the Indian subcontinent.It has a rich and vibrant history that dates back centuries and is known for its complex rhythms.<br><b>Hindustani music has evolved from the classical music tradition of North India, which was heavily influenced by Persian and Arabic music.</b><br> One of the most unique aspects of Hindustani vocal music is its emphasis on improvisation.";
    document.getElementById('vocal-course').href = "sitar.html";
});

document.getElementById('carnatic').addEventListener('click', () => {
    document.getElementById('vocal-head').innerHTML = "Carnatic";
    document.getElementById('vocal-para').innerHTML = "On the other hand, Carnatic vocal music hails from the southern part of India and is known for its rigorous adherence to classical principles and rhythmic complexity.<b>Carnatic music places a strong emphasis on precise intonation, rhythmic patterns, and intricate compositions.<b><br>It follows a well-defined structure, with compositions typically consisting of sections like the alapana, tanam, and pallavi.";
    document.getElementById('vocal-course').href = "tabla.html";
});

var vocalMainImage = document.getElementById("vocal-main-img");
var vocalThumbnails = document.getElementsByClassName('vocal-thumb-img');
for (var i = 0; i < vocalThumbnails.length; i++) {
    var vocalImg = vocalThumbnails[i];
    vocalImg.addEventListener('click', function () {
        vocalMainImage.src = this.src;
    })
}

$(document).ready(function () {
    const welcomeText = "Discover the Timeless Beauty of Hindustani Classical Music!";
    const typingWelcomeElement = $(".after-slide");
    let indexWelcome = 0;
    let direction = 1; // 1 for forward, -1 for backward

    function typeHeadingWelcome() {
        if (indexWelcome < 0 || indexWelcome >= welcomeText.length) {
            direction *= -1; // Change direction when reaching the end or start
        }

        if (direction === 1) {
            typingWelcomeElement.text(welcomeText.substring(0, indexWelcome));
        } else {
            typingWelcomeElement.text(welcomeText.substring(0, indexWelcome - 1)); //.split('').reverse().join(''));
        }

        indexWelcome += direction;
        setTimeout(typeHeadingWelcome, 100);
    }
    setTimeout(typeHeadingWelcome, 1000);
});

$(document).ready(function () {
    const Text = "Shruti-Sangam";
    const typingElement = $(".logo");
    let index = 0;
    function type() {
        if (index < Text.length) {
            typingElement.text(typingElement.text() + Text.charAt(index)); // Fix: Use text() method to set text content
            index++;
            setTimeout(type, 100);
        }
    }
    setTimeout(type, 1000);
});

var instMainImage = document.getElementById("inst-main-img");
    var instThumbnails = document.getElementsByClassName('inst-thumb-img');
    var selectedThumbBox = null;

    for (var i = 0; i < instThumbnails.length; i++) {
        var instImg = instThumbnails[i];
        instImg.addEventListener('click', function () {
            instMainImage.src = this.src;

            // Check if there's a previously selected thumb-box
            if (selectedThumbBox !== null) {
                // Remove the 'selected' class to bring it back to its normal position
                selectedThumbBox.classList.remove('selected');
            }

            // Add 'selected' class to the clicked thumb-box to raise it up
            this.parentNode.classList.add('selected');
            selectedThumbBox = this.parentNode;
        });
    }

    var vocalMainImage = document.getElementById("vocal-main-img");
    var vocalThumbnails = document.getElementsByClassName('vocal-thumb-img');
    var selectedThumbBox = null;

    for (var i = 0; i < vocalThumbnails.length; i++) {
        var vocalImg = vocalThumbnails[i];
        vocalImg.addEventListener('click', function () {
            vocalMainImage.src = this.src;

            // Check if there's a previously selected thumb-box
            if (selectedThumbBox !== null) {
                // Remove the 'selected' class to bring it back to its normal position
                selectedThumbBox.classList.remove('selected');
            }

            // Add 'selected' class to the clicked thumb-box to raise it up
            this.parentNode.classList.add('selected');
            selectedThumbBox = this.parentNode;
        });
    }