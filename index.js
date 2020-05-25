(function () {
    'use strict';
    function $(id) { return document.getElementById(id);}

    window.onload = function(){
        getQuilt();
        $("home-button").onclick = getQuilt;
        $("about-button").onclick = getAbout;
    };

    function getQuilt(){
        $("quilt").classList.remove("hidden");
        $("about-info").classList.add("hidden");
    }

    function getAbout(){
        $("about-info").classList.remove("hidden");
        $("quilt").classList.add("hidden");
    }


})();