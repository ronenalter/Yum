var page;
var T;
var flag = false;

jQuery(document).ready(function () {
    // load theme switcher
    $('#switcher').themeswitcher({
        imgpath: 'themeswitcher/images/',
        additionalThemes: [
		  {
		      title: 'Aristo',
		      name: 'aristo',
		      icon: 'theme_90_aristo.png',
		      url: 'css/themeroller/aristo/Aristo.css'
		  },
		  {
		      title: 'Twitter Bootstrap',
		      name: 'bootstrap',
		      icon: 'theme_90_aristo.png',
		      url: 'css/themeroller/bootstrap/Bootstrap.css'
		  }
		],
        loadTheme: 'Bootstrap'
    });
    $('#SearchField').tagit({ tagSource: availableTags, sortable: true, maxTags: 4, editable: true });

    // get default data from xml file and display page
    GetDataFromXML('places.xml');
    // get page number
    page = getParameterByName('page');
    if (page == "") {
        page = 1;
        goToPage(page);
    }
    else if (!isNumeric(page)) {
        page = 1;
        goToPage(page);
    }
    else page = parseInt(page);

    // search button click event
    $('#search').click(showStep2);
    // go to next page
    $('.Next').click(function (e) {
        e.preventDefault();
        page = page + 1;
        var href = location.href.split("?")[0] + "?page=" + page;
        window.location.href = href;
        return false;
    });
    // go to previous page
    $('.Prev').click(function (e) {
        e.preventDefault();
        page = page - 1;
        if (page < 1) page = 1;
        var href = location.href.split("?")[0] + "?page=" + page;
        window.location.href = href;
        return false;
    });
});

function goToPage(num){
    var href = location.href.split("?")[0] + "?page=" + num;
    window.location.href = href;    
}

function showStep2(){
    clearTimeout(T);
    $('.form').addClass('step_2');
    // get data
    Data.getParams();

    T = setTimeout(function () {
        Data.file = flag ? 'places.xml' : 'places2.xml';
        flag = flag ? false : true;
        GetDataFromXML(Data.file, Data.params);
        $('.form').addClass('step_1').removeClass('step_2');
    }, 1000);
}


