/*
* @Author: 宏达
* @Date:   2017-09-29 15:34:23
* @Last Modified by:   宏达
* @Last Modified time: 2017-09-30 10:42:17
*/
function snake(){
	this.scene=document.querySelector('div.scene');
	this.snake=['1_0','2_0','3_0'];
	this.direction=40;
	this.food='';
	this.flag={'1_0':true,'2_0':true,'3_0':true};
}
snake.prototype={
	start:function(){
		this.drawLine();
		this.drawSnake();
		this.move();
		this.key();
		this.dropFood();
	},
	drawLine:function(){
		for(let i=0;i<20;i++){
			for(let j=0;j<20;j++){
				this.scene.innerHTML+=`<div class='block' id="${i}_${j}"></div>`;
			}
		}
	},
	drawSnake:function(){
		this.snake.forEach(element=>{
			document.getElementById(element).classList.add('hot')
		})
	},
	move:function(){
		let that=this;
		this.t=setInterval(function(){
		let oldt=that.snake[that.snake.length-1];
		let arr=oldt.split('_');
		let newt='';
		if(that.direction==37){
			newt=`${arr[0]*1}_${arr[1]*1-1}`;
		}else if(that.direction==38){
            newt=`${arr[0]*1-1}_${arr[1]}`;
		}else if(that.direction==39){
            newt=`${arr[0]}_${arr[1]*1+1}`;
		}else if(that.direction==40){
			newt=`${arr[0]*1+1}_${arr[1]}`;
		}
        let newarr=newt.split('_');
		if(newarr[0]<0 || newarr[0]>19||newarr[1]<0||newarr[1]>19||that.flag[newt]){
                clearInterval(that.t);
                alert('game over');
        }
        if(newt==that.food){
        	that.snake.push(newt);
		    that.flag[newt]=true;
		    document.getElementById(that.food).style.background='hotpink';
		    that.dropFood();
        }else{
		    that.snake.push(newt);
		    that.flag[newt]=true;
		    let weiba=that.snake.shift();
            delete that.flag[weiba];
		    document.getElementById(weiba).classList.remove('hot');
		    that.drawSnake();
		}
		}, 500)
	},
	key:function(){
        document.onkeydown=function(e){
        	let keycode=e.keyCode;
        	if(Math.abs(keycode-this.direction)==2){
        		return;
        	}
        	this.direction=keycode;
        }.bind(this);
	},
	dropFood:function(){
		let x=Math.floor(Math.random()*20);
		let y=Math.floor(Math.random()*20);
		do{
			x=Math.floor(Math.random()*20);
		    y=Math.floor(Math.random()*20);
		}while(this.flag[`${x}_${y}`])
		this.food=`${x}_${y}`;
		document.getElementById(this.food).style.background = 'red';
	}
}