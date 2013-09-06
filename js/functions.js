var Data = {
    file: 'places2.xml',
    params: {},
    searchID: 'SearchField',
    inputs: '#SearchField li',
    textID: '#food',
    text: null,
    getParams : getParams
}



var availableTags = [
    "בשר",
    "חומוס",
    "סיני",
    "מקסיקני",
    "פיצה",
    "איטלקי",
    "צרפתי",
    "מזון מהיר",
    "יווני",
    "דרום אמריקאי",
    "שוקולד",
    "קינוחים",
    "בית קפה",
    "אותנטי",
    "הודי",
    "ארומטי",
    "יפני",
    "קוריאני",
    "וייטנאמי",
    "אסייתי",
    "בלקני",
    "קלאסי",
    "חמוצים",
    "תימני",
    "פרסי",
    "גבינות",
    "דזרט",
    "הלני",
    "וולגה",
    "כורדי",
    "רוסי",
    "עירקי",
    "פרסי"
];


function SortArray(array) {
    
    var n = array.length;
    var tempArr = [];
    for (var i = 0; i < n - 1; i++) {
        // The following line removes one random element from arr
        // and pushes it onto tempArr
        tempArr.push(array.splice(Math.floor(Math.random() * array.length), 1)[0]);
    }
    // Push the remaining item onto tempArr
    tempArr.push(array[0]);
    array = tempArr;
    return array;
}

function GetDataFromXML(file,params){
    $('.PicContainer').html('');
    $.ajax({
        type: "GET",
        url: file,
        data: params,
        dataType: "xml",
        statusCode: {
            404: function () {
                alert('ERROR: Could not contact server.');
            },
            500: function () {
                alert('ERROR: A server-side error has occurred.');
            }
        },
        success: function (xml) {
            $(xml).find('place').each(function () {
                var src = $(this).find('img').text();
                var name = $(this).find('name').text();
                var location = $(this).find('location').text();
                var description = $(this).find('description').text();

                $('.PicContainer').append('\
                    <div class="pic">\
                        <div class="ImgContainer" title="' + name + ', ' + location + '<br>' + description + '">\
                            <img src="' + src + '" alt="' + name + '" />\
                        </div>\
                        <div class="data">\
                            <div class="name">' + name + ', ' + location + '</div>\
                        </div>\
                    </div>');
            });
        },
        error: function (response, status, error) {
            if (response.status && response.status != 400 && response.status != 500) {
                alert(status + ': ' + error);
            }
        },
        complete: function (xhr, status) {
            setTimeout(function () {
                $("#loader").remove();
                $('.mainContent').show('drop', { direction: 'up' }, 1000);
                $('footer').show('blind');
                $('.ImgContainer').tooltip({
                    content: function () {
                        return $(this).attr('title');
                    }
                });
            }, 1000);

        }
    });
}

function CenterDiv(id){
    var obj = $('#' + id);
    var window_width = $(window).width();
    var window_height = $(window).height();

    obj_width = obj.width();
    obj_height = obj.height();

    obj.css({
        top:window_height / 2 - obj_height / 2,
        left:window_width / 2 - obj_width / 2
    });
}

function preload(arrayOfImages) {
    $(arrayOfImages).each(function () {
        $('<img />').attr('src',this).appendTo('body').css('display','none');
    });
}

function setHoverClass(hoverClass){
    $('.' + hoverClass).hover(function () {
        $(this).addClass('on');
    },
    function(){
        $(this).removeClass('on');    
    });
}

function setHoverSrc(id,hoverSrc){
    var obj = $('#' + id);
    var src = obj.attr('src');
    obj.hover(function () {
        obj.attr('src', hoverSrc);
    }, function () {
        obj.attr('src', src);
    });
}

function setOptionCss(id){
    var sel = document.getElementById(id);
    sel.addEventListener('click', function(el){
        var options = this.children;
        for(var i=0; i < this.childElementCount; i++){
            options[i].style.color = 'white';
        }
        var selected = this.children[this.selectedIndex];
            selected.style.color = 'red';
    }, false);
}

function isNumeric (txt){	return (txt.match(/^[0-9]+$/) != null);	}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");    // escape brackets before regex compilation. \[ => \\\[ , \] => \\\]
    var regexS = "[\\?&]" + name + "=([^&#]*)";                     // search: begins with ? or &. look for = after the name and does not contain & or #
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);                 // search on url
    if (results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));  // replace + with space
}

function addQueryStringToUrl(url) {
    var queryString = '';
    try {
        if (window.location.href.indexOf('?') >= 0) {
            queryString = window.location.href.split('?')[1];
        }
        if (queryString != "") {
            url += ((url.indexOf('?') > -1) ? '&' : '?')
            url += queryString;
        }
        return url;
    } catch (e) {
        return "";
    }
}

function getParams(){
    // get tag values
    var tags = [];
    var tags_text = "";
    $(Data.inputs).each(function () {
        var tag = $(this).attr('tagvalue');
        if (typeof tag !== 'undefined' && tag !== false) {
            tags.push(tag); 
        }
    });

    // create parameters for server request
    var params = {};
    for (var i = 0; i < tags.length && i < 4;i++ ){
        params['tag' + i] = tags[i];
        tags_text = tags_text + tags[i] + " ; ";
    }
    Data.params = params;
    // write tags on screen
    Data.text = tags_text.substring(0, tags_text.length - 2);
    $(Data.textID).text(Data.text);

}

function compareObjects(o1, o2){
    for(var p in o1){
        if(o1.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    for(var p in o2){
        if(o2.hasOwnProperty(p)){
            if(o1[p] !== o2[p]){
                return false;
            }
        }
    }
    return true;
};