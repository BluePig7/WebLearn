"use strict";
function byId(id){
   return (typeof(id) === "string" ? document.getElementById(id) : id) ;
}
// 设定全局属性
var index = 0 , 
    timer = null ,
    pics = byId("banner").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span") ,
    prev = byId("prev"),
    next = byId("next"),
    len = pics.length ;
    // console.log(len);
// 鼠标滑过事件
function slideImg(){
    var main = byId("main");
    // 鼠标在上面
    main.onmouseover = function(){
        // 清除定时器
        if(timer) 
        clearInterval(timer);
    }
    // 鼠标移开
    main.onmouseout = function(){
        timer = setInterval(function(){
                    if(index >= len ){
                        index = 0 ;
                    }
                    changeImg();
                    index++;
            },2000);
    }

    // 直接调用上面写好的main的鼠标移开函数事件
    main.onmouseout();

    // 实现圆点点击切换图片事件
        for(var d = 0 ; d < len ; d++){
            dots[d].id = d;
            dots[d].onclick = function(){
                // 这个地方不能直接用 index = d 来设定index值，因为function有值范围域，这里面的d值永远都是3；解决办法一就是设定span元素添加id属性；
                index = this.id;
                changeImg();
            }
        }

    // 上下张切换按钮
    prev.onclick = function(){
        if(index == 0){
            index = 2;
        }else{
            index--;
        }
        // console.log(index);
       changeImg();
    }
    next.onclick = function(){
        if(index == 2){
            index = 0;
        }
        else{
            index++;
        }
        changeImg();
    }
}
// 切换图片函数
function changeImg(){
    for(var i = 0 ; i < len ;i++){
        // 隐藏图片和span的显示
        pics[i].style.display = "none";
        dots[i].className = "";
    }
    pics[index].style.display = "block";
    dots[index].className = "active";
    // 这样写会导致点击圆点跳转不能很好的覆盖
    // 隐藏之前的div为none；
    // if(index == 0)
    // pics[len-1].style.display = "none";
    // else
    // pics[index-1].style.display ="none";
}
slideImg();