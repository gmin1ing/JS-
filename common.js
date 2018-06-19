function my$(id){
	return document.getElementById(id) ;
}

function addEventListener(element,type,fn){
	if(element.addEventListener){
		element.addEventListener(type,fn,false);
	}else if(attachEvent){
		element.attachEvent("on"+type,fn);
	}else{
		element["on"+type]=fn;
	}
}

function removeEventListener(element,type,fnName){
	if(element.removeEventListener){
		element.removeEventListener(type,fnName,false);
	}else if(element.detachEvent){
		element.detachEvent("on"+type,fnName);
	}else {
		element["on"+type]=null;
	}
}

function setInnerText(element,text){
	if(typeof element.textContent=="undefined"){
		element.innerText=text;
	}else{
		element.textContent=text;
	}
}
//匀速动画
		function animate(element,target){
				clearInterval(element.timeId);
				element.timeId=setInterval(function(){
				var current=element.offsetLeft;
				var step=100;
				step=current<target?step:-step;
				current+=step;
				if(Math.abs(target-current)>Math.abs(step)){
					element.style.left=current+"px";
				}else{

					clearInterval(element.timeId);
					element.style.left=target+"px";
				}
			},10);		
		}
//变速动画

	function animate_1(element,target){
				clearInterval(element.timeId);
				element.timeId=setInterval(function(){
				var current=element.offsetLeft;
				var step=(target-current)/10;
				step=step>0?Math.ceil(step):Math.floor(step)
				current+=step;
				element.style.left=current+"px";
				if(current==target){
					clearInterval(element.timeId);
				}
				////测试代码

				console.log("目标位置："target+"当前位置："+current+"每次移动步数："+step);
			},20);		
		}

		//获取浏览器向上卷曲出去的距离,向左卷曲出去的距离
		function getScroll(){
			//var obj={};
			//var top1=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0;
			//var left=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft;
			//obj.left=left;
			//obj.top=top;
			//return obj;

			return {
			left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0 ,
			top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
			};		
		}
     
	 //获取任意元素的任意一个样式的属性的值
	//function getStyle(element, attr){
		//判断浏览器是否支持这个方法
	//	if(window.getComputedStyle){
	//		return window.getComputedStyle(element,null)[attr];
	//	}else{
	//		return element.currentStyle[attr];
	//	}
	//}	
	function getStyle(element, attr){
		return window.getComputedStyle?window.getComputedStyle(element,null)[attr]:element.currentStyle[attr];
	}


function outputAttributes(element){
         	var pairs=new Array(),
         	attrName,
         	attrValue,
         	i,
         	len;

         	for (var i = 0, len=element.attributes.length; i <len; i++) {
         		attrName=element.attributes[i].nodeName;
         		attrValue=element.attributes[i].nodeValue;
         		if (element.attributes[i].specified) {
         			pairs.push(attrName+"=\""+attrValue+"\"");
         		};
         		
         	};
            return pairs.join(" ");

         }