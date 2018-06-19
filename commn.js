/**
 * Created by gaomin on 2018/5/24.
 */
function addEventListerner(element,type,fn){
    if(element.addEventListerner){
        element.addEventListerner(type,fn,false);
    }else if(attachEvent){
        element.attachEvent("on"+type,fn);
    }else{
        element["on"+type]=fn;
    }
}

     

