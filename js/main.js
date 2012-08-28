gameWindow = "butts";

initPage = function(){
//Hide before load
	$('.contentLoader').css({opacity:0});
	$('div.content').css({opacity:0});
	
//Create nav buttons
	navList = [];
	var vGame = new NavigationView({
		model:new NavigationItem({id:'game'})
	});
	navList.push(vGame);
	var vBlog = new NavigationView({
		model:new NavigationItem({id:'blog'})
	});
	navList.push(vBlog);
	var vContact = new NavigationView({
		model:new NavigationItem({id:'contact'})
	});
	navList.push(vContact);
	
	$('nav.main').append(vGame.el);
	$('nav.main').append(vBlog.el);
	$('nav.main').append(vContact.el);
	
//InitBlog
	initBlog();
	
//Game events
	var loadString = "http://www.extremecatattack.com/game/index.html";
	$('div#content_game').click(function(){
		gameWindow = window.open(loadString, '_blank', 'width=1300, height=740');
	});
	
//Contact events
	$('div#content_contact_email').click(function(){
		window.location.href = "mailto:thyancey@gmail.com";
	});
	$('div#content_contact_facebook').click(function(){
		window.open("http://www.facebook.com/extremecatattack", '_blank');
	});
				
//sets default view to game.
	vBlog.mouseClick();
	//vGame.mouseClick();
};

closeGame = function(){
	gameWindow.close();
};

loadContent = function(loadID){
	$('.contentLoader').animate({opacity:1}, 100, "easeOutSine");
	$("div.content").animate({opacity:0}, 500, "easeOutSine", function(){
		hideAllContent();
		
		var loadDiv = getSelector(loadID, "content");
		if($(loadDiv).children().length > 0){
			showThisContent(loadID);
		}else{
			var loadString = "html/" + loadID + ".html";
			loadThisContent(loadString, loadDiv);
		}
	});
};

var loadThisContent = function(loadString, loadDiv){
	$(loadDiv).load(loadString);
};

var showThisContent = function(loadID){
	var loadDiv = getSelector(loadID, "content");
	$(loadDiv).show();
	revealContent();
};

var revealContent = function(){
	$("div.content").animate({opacity:1}, 500, "easeOutSine", function(){
		$('.contentLoader').animate({opacity:0}, 500, "easeOutSine");	
	});
};

var getSelector = function(loadID, type){
	if(type == "content"){
		return(String("#content_" + loadID));
	}
}

var hideAllContent = function(){
	$.each($('div.content').children(), function(){
		$(this).hide();
	});
};

disableItems = function(){;
	for(var i = 0; i < navList.length;i++){
		navList[i].disableItem();
	}
};

var initBlogButtons = function(){
	$("div#lastPost").on('click', function(){
		shiftBlog(-1);
	});
	$("div#nextPost").on('click', function(){
		shiftBlog(1);
	});
	$(".blogButtons div").on('hover', hoverButton);
};

var hoverButton = function(event){
	$(this).toggleClass("highlight");
}

var hideLastPost = function(command){
	if(command){
		$("div#lastPost").animate({"left":"15px"}, 500, "easeOutSine", function(){
			$("div#lastPost").animate({"left":"255px", "opacity":"0"}, 150, "easeInSine");
		});
	}else{
		$("div#lastPost").animate({"left":"55px", "opacity":"1"}, 1000, "easeOutBounce");
	}
};

var hideNextPost = function(command){
	if(command){
		$("div#nextPost").animate({"left":"780px"}, 300, "easeOutSine", function(){
			$("div#nextPost").animate({"left":"520px", "opacity":"0"}, 150, "easeInSine");
		});
	}else{
		$("div#nextPost").animate({"left":"740px", "opacity":"1"}, 1000, "easeOutBounce");
	}
}



