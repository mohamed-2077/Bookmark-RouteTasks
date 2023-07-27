var bookmarkName=document.getElementById('siteName');
var bookmarkUrl=document.getElementById('siteUrl');
var allBookmarks=[];

if(localStorage.getItem('bookmark')!=null){
    allBookmarks=JSON.parse(localStorage.getItem('bookmark'));
    displayBookmarks();
}

function addBookmark(){
    var bookmark={
        name:bookmarkName.value,
        url:bookmarkUrl.value
    }
    let urlPattern = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/; //src: https://www.freecodecamp.org/news/check-if-a-javascript-string-is-a-url/
    if(bookmarkName.value===''){
        Swal.fire('Enter the site name.');
    }else if(bookmarkUrl.value===''){
        Swal.fire('Enter the site URL.');
    }else if(!urlPattern.test(bookmarkUrl.value)){
        Swal.fire("Enter a valid URL.\nA valid URL should start with 'http://' or 'https://'");
    }else{
        var alreadyExists=allBookmarks.some(function(x){
            return x.name===bookmark.name;
        });
        if(alreadyExists){
            Swal.fire("Bookmark already exists!");
        }else{
            allBookmarks.push(bookmark);
            localStorage.setItem('bookmark',JSON.stringify(allBookmarks))
            clearData()
            displayBookmarks()
        }
    }
}

function clearData(){
    bookmarkName.value='';
    bookmarkUrl.value='';
} 

function displayBookmarks(){
    var box=''
    var index1=0;
    for(var i=0;i<allBookmarks.length;i++){
        box+=
        `  
        <tr>
            <td>${i+1}</td>
            <td>${allBookmarks[i].name}</td>
            <td><button class="btn btn-success"><a href="${allBookmarks[i].url}" target="_blank"><i class="fa-solid fa-eye"></i>&nbsp;Visit</a></button></td>
            <td><button class="btn btn-danger" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can"></i>&nbsp;Delete</button></td>
        </tr>
        `
    }
    document.getElementById('dataBox').innerHTML=box
}

function deleteBookmark(index){
    allBookmarks.splice(index,1);
    displayBookmarks();
    localStorage.setItem('bookmark',JSON.stringify(allBookmarks));
}