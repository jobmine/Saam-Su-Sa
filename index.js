let $ = function(selector) {
    return document.querySelector(selector);
}

function randomTop() {
    return Math.random() * 700;
}

function randomLeft() {
    return Math.random() * 10000 - 50;
}

function Element(name, config) {
    let element = document.createElement('div');
    element.setAttribute('class', name + ' element');
    element.style.backgroundColor = config.color;
    element.textContent = config.value;
    element.dataset['text'] = config.text;
    element.dataset['value'] = config.value;
    element.dataset['emoji'] = config.emoji;

    element.style.top = randomTop() + 'px';
    element.style.left = -randomLeft() + 'px';
    $('.ctn').appendChild(element);
}
let mapdata = {
    setA: 'rect',
    setB: 'circle',
    setC: 'triangle'
};
for (let prop in data) {
    data[prop].forEach(function(item, index) {
        Element(mapdata[prop], item);
    });
}
let colorIndex = 0;
$('.ctn').addEventListener('click', function(e) {
    let className = e.target.className;
    if (className.indexOf('element') !== -1 && className.indexOf('disable') === -1) {
        colorIndex++;
        let original = e.target.dataset['text'];
        let emoji = e.target.dataset['emoji'];
        let value = e.target.dataset['value'];
        let text = original.charAt(0).toUpperCase() + original.slice(1);
        let selector = '.' + className.replace(/\s?element/, '');
        let elements = document.querySelectorAll(selector);
        $('.text').style.display = 'block';

        $('.text').innerHTML = $('.text').innerHTML + text + " ";

        if (colorIndex === 1) {
            $('.text2').innerHTML = text;
        } else {
            $('.text2').innerHTML = $('.text2').innerHTML + original;
        }

        $('.emoji').innerHTML = $('.emoji').innerHTML + emoji;

        $('.value').innerHTML = $('.value').innerHTML + value;


        for (let i = 0; i < elements.length; i++) {
            elements[i].className = elements[i].className + ' disable';
        }
        if (colorIndex === 3) {
            var resulte = document.getElementById("result");
            resulte.classList.add("full");
            $('.emoji').style.display = 'block';
            $('.text2').style.display = 'block';
            $('.restart').style.display = 'block';
            $('.text').style.color = '#333';
            $('.value').style.color = '#585f61';
            $('.text2').style.color = '#585f61';

        }
    }
});

function start() {
    let clientWidth = document.body.clientWidth;
    let elements = document.querySelectorAll('.element');
    let lefts = [];
    let speeds = [];
    let countIndexs = [];
    elements = Array.prototype.slice.call(elements);
    elements = elements.sort(function(v1, v2) {
        return parseInt(v2.style.left) - parseInt(v1.style.left);
    });
    elements.forEach(function(item, index) {
        lefts.push(item.style.left.replace('px', '') * 1);
        speeds.push(Math.random() * 2 + 1);
        countIndexs.push(0);
    });
    console.log(lefts);
    let countIndex = 0;
    let intervalId = setInterval(function() {
        countIndex++;
        countIndexs.forEach(function(item, index) {
            if (index <= countIndex) {
                countIndexs[index]++;
            }
        });
        elements.forEach(function(item, index) {
            if (item.className.indexOf('disable') === -1) {
                if (countIndexs[index] * speeds[index] >= -lefts[index] + clientWidth) {
                    countIndexs[index] = 0;
                } else {
                    item.style.transform = 'translateX(' + countIndexs[index] * speeds[index] + 'px)';
                }
            } else {
                item.style.transform = 'translateX(' + countIndexs[index] * speeds[index] + 'px)';
            }

        });
    }, 50);
}

start();

var seconds = document.getElementById("countdown").textContent;
var countdown = setInterval(function() {
    seconds--;
    (seconds == 1) ? document.getElementById("plural").textContent = "": document.getElementById("plural").textContent = "s";
    document.getElementById("countdown").textContent = seconds;
    if (seconds <= 0) {
        var hideins = document.getElementById("instruction");
        hideins.classList.add("hidden");
        clearInterval(countdown);

    }
}, 1000);


$('.restart').addEventListener('click', function() {
    location.reload();
});


$('#ok').addEventListener('click', function() {
    var hideins = document.getElementById("instruction");
    hideins.classList.add("hidden");
});