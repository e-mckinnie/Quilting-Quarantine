(function () {
    'use strict';
    function $(id) { return document.getElementById(id);}
    var knit_squares = ["blue", "green", "pink", "yellow", "purple", "red"];

    window.onload = function(){
        loadQuilt();
        showQuilt();
        $("home-button").onclick = showQuilt;
        $("about-button").onclick = showAbout;
    };

    //shows quilt and hides about page
    function showQuilt(){
        $("quilt").classList.remove("hidden");
        $("about-info").classList.add("hidden");
        $("single").classList.add("hidden");
        while ($("single").firstChild) { 
            $("single").removeChild($("single").firstChild);
        }
    }

    //generates the quilt
    function loadQuilt(){
        var videos = getVideos();
        var num_black_squares = getNumBlackSquares(videos.length);
        var num_per_side = Math.sqrt(num_black_squares + videos.length);
        var square_dimensions = getSquareDimensions(num_per_side);

        makeVideoSquares(videos, square_dimensions);
        makeBlackSquares(num_black_squares, square_dimensions);
        positionSquares(num_per_side, square_dimensions);
    }

    //returns array of YouTube links to be displayed
    function getVideos(){
        return [];
    }

    //calculates width and height of each square
    function getSquareDimensions(num_per_side){
        var div_height = $("quilt").offsetHeight;
        var div_width = $("quilt").offsetWidth;
        return [Math.floor(div_width/num_per_side), Math.floor(div_height/num_per_side)];
    }

    //calculates the number of black squares needed to ensure we have a 
    //square number of total squares
    function getNumBlackSquares(num_videos){
        var n = 0;
        while (! (isSquare(n + num_videos))){ //add black squares until we have a square number
            n += 1;
        }
        return n;
    }

    //returns if n is a square number or not
    function isSquare(n){
        var root = Math.floor(Math.sqrt(n) + 0.5);
        return (root*root == n)
    }

    //makes video squares and adds to page
    function makeVideoSquares(videos, square_dimensions){
        for (var i = 0; i < videos.length; i++){
            var square = document.createElement("div");
            square.style.width = square_dimensions[0] + "px";
            square.style.height = square_dimensions[1] + "px";

            var index = Math.floor(Math.random()*knit_squares.length);
            square.style.backgroundImage = "url(knit_images/" + knit_squares[index] + ".jpg)";
            square.style.backgroundSize = "cover";
            
            var url = document.createElement("img");
            url.setAttribute("src", videos[i][4]);
            url.setAttribute("width", Math.floor(0.8*square_dimensions[0]) + "");
            url.setAttribute("height", Math.floor(0.8*square_dimensions[1]) + "");

            square.appendChild(url);
            square.className = "square";
            square.onclick = showSingleView(videos[i], index);
            $("quilt").appendChild(square);
        }
    }

    function showSingleView(video_info, knit_index){
        return function() {
            $("single").classList.remove("hidden");
            $("about-info").classList.add("hidden");
            $("quilt").classList.add("hidden");
            
            var name = document.createElement("h2");
            name.innerHTML = video_info[0] + ", " + video_info[1];
            var location = document.createElement("h3");
            location.innerHTML = video_info[2];
            var link = document.createElement("iframe");
            link.setAttribute("src", video_info[3])
            link.setAttribute("width", "550em");
            link.setAttribute("height", "350em");

            $("single").appendChild(name);
            $("single").appendChild(location);
            $("single").appendChild(link);
            $("single").style.backgroundImage = "url(images/" + knit_squares[knit_index] + ".jpg)";
        }
    }

    //makes black squares and adds to page
    function makeBlackSquares(num_black_squares, square_dimensions){
        for(var i = 0; i < num_black_squares; i++){
            var square = document.createElement("div");
            square.style.width = square_dimensions[0] + "px";
            square.style.height = square_dimensions[1] + "px";
            //square.classList.add("black_square");
            square.className = "square";
            $("quilt").appendChild(square);
        }
    }

    //positions black and video squares within quilt
    function positionSquares(num_per_side, square_dimensions){
        var positions = getPositions(num_per_side, square_dimensions);
        var all_squares = document.querySelectorAll(".square");
        var indices = getIndices(all_squares.length);
        for (var i = 0; i < all_squares.length; i++){
            var index = Math.floor(Math.random()*indices.length);
            var square = all_squares[i];
            var coordinates = positions[indices[index]];
            square.style.left = coordinates[0];
            square.style.top = coordinates[1];
            indices.splice(index, 1);
        }
    }

    //gets coordinates for each square (left, top) 
    function getPositions(num_per_side, square_dimensions){
        var positions = [];
        for(var i = 0; i < num_per_side; i++){
            for(var j = 0; j < num_per_side; j++){
                var coordinate = [(j*square_dimensions[0] + "px"), (i*square_dimensions[1] + "px")]
                positions.push(coordinate);
            }
        }
        return positions;
    }

    //returns a list of numbers 0 through n - 1
    function getIndices(n){
        var indices = [];
        for (var i = 0; i < n; i++){
            indices.push(i);
        }
        return indices;
    }

    //shows about page and hides quilt
    function showAbout(){
        $("about-info").classList.remove("hidden");
        $("quilt").classList.add("hidden");
        $("single").classList.add("hidden");
        while ($("single").firstChild) { 
            $("single").removeChild($("single").firstChild);
        }
    }


})();