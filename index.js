let $ = function(selector){
	return document.querySelector(selector);
}
function randomTop(){
	return Math.random() * 400;
}
function randomLeft(){
	return Math.random() * 700 + 50;
}
function Element(name,config){
	let element = document.createElement('div');
	element.setAttribute('class',name + ' element');
 	element.textContent = config.value;
	element.style.top = randomTop() + 'px';
	element.style.left = -randomLeft() + 'px';
	$('.ctn').appendChild(element);
}
let mapdata = {
	setA: 'rect',
	setB: 'circle',
	setC: 'triangle'
};
for(let prop in data){
	data[prop].forEach(function(item,index){
		Element(mapdata[prop],item);
	});
}

function start(){
	let clientWidth = document.body.clientWidth;
	let elements = document.querySelectorAll('.element');
	let lefts = [];
	let speeds = [];
	let countIndexs = [];
	elements = Array.prototype.slice.call(elements);
	elements = elements.sort(function(v1,v2){
		return parseInt(v2.style.left) - parseInt(v1.style.left);
	});
	elements.forEach(function(item,index){
		lefts.push(item.style.left.replace('px','')*1);
		speeds.push(Math.random()*0.5 + 2);
		countIndexs.push(0);
	});
	console.log(lefts);
	let countIndex = 0;
	let intervalId = setInterval(function(){
		countIndex++;
		countIndexs.forEach(function(item,index){
			if(index<=countIndex){
				countIndexs[index]++;
			}
		});
		elements.forEach(function(item,index){
			if(item.className.indexOf('disable') === -1){
				if(countIndexs[index]*speeds[index]>=-lefts[index]+clientWidth){
					countIndexs[index] = 0;
				}else{
					item.style.transform = 'translateX(' + countIndexs[index]*speeds[index] +'px)';
				}
			}else{
				item.style.transform = 'translateX(' + countIndexs[index]*speeds[index] +'px)';
			}
			
		});
	},50);
}
start();