
//Chrome控制台直接获取需要的标准
function getCssStandard(){
    let ul = document.getElementById('container')
    var result =[]
    for(var li of ul.children){
        if(li.getAttribute('data-tag').match(/css/)){
            result.push({
                name:li.children[1].innerText,
                url:li.children[0].href
         })    
        }
    }
    return result
}
