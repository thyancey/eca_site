
var BlogItem = Backbone.Model.extend({
	defaults:{
		idx: 0,
		title: "new title",
		date: "01/01/01",
		content: "sample content",
		photos: []
	}
	
});

var BlogView = Backbone.View.extend({
	
	template:_.template(
			'<div id="blogTitle">' + '<%= title %>' + '</div>' +
			'<div id="blogDate">' + '<%= date %>' + '</div>' +
			'<div id="blogContent">' + '<%= content %>' + '</div>'
	),
			
	initialize: function(){
		this.model.on('hide', this.remove, this);
	},
	
	render: function(){
		var html = this.template(this.model.toJSON());
		
		this.$el.html(html);
		return this.$el.html();
	},
	
	remove: function(){
		this.$el.remove();
	}
	
	/*'<div id="blogPolaroid">' + '<%= blogImage %>' + '</div>'*/
});

//Called from main.js to fetch data
var initBlog = function(){
	fetchBlog();
	
}


var fetchBlog = function(){
	console.log("fetching xml");
	var xml = $.ajax({	type:"GET",
						url:"../xml/blogcontent.xml",
						dataType:"xml",
						success:parseBlogArray
	});
}

var parseBlogArray = function(xml){
	console.log("received xml");
	blogArray = [];
	mXML = xml;
	$(xml).find("blogPost").each(function(){
		//find photos within item
		var photoArray = [];
		var photoGroup = $(this).children("photos")[0];
		$(photoGroup).children("photo").each(function(){
			var photo = {
				title:$(this).children("title").text(),
				image:$(this).children("image").text(),
				left:$(this).attr("left"),
				top:$(this).attr("top")
			}
			photoArray.push(photo);
		});
		//create blogItem and push to blogArray.
		var blogItem = {
			title:$(this).children("title").text(),
			date:$(this).children("date").text(),
			content:"&nbsp;&nbsp;&nbsp;&nbsp; " + $(this).children("content").text(),
			photos:photoArray
		}
		blogArray.push(blogItem);
	});
	
	setBlog(blogArray.length -1);
	initBlogButtons();
}

//shows the given blog number.
var setBlog = function(blogNumber){	
	var blogItem = new BlogItem(blogArray[blogNumber]);
	var blogView = new BlogView({model:blogItem});
	$('div.polaroidImages').fadeOut(200, function(){
		//$('div#content_blog .blogCopy').fadeOut(200, function(){
			$('div#content_blog .blogCopy').html(blogView.render());
			setPolaroids(blogItem.get('photos'));
			
			checkArrows();
			
			setBlogCounter();
		//});
	});
	$('div#content_blog .blogCopy').animate({"top":"100px", "opacity":"0"}, 200, "easeInCubic");
	

}

var getCurrentBlogIdx = function(){
	var curTitle = $('div#blogTitle').text();
	var foundIdx = -1;
	
	for(var i = 0; i < blogArray.length; i++){
		if(curTitle == blogArray[i].title){
			if(foundIdx == -1){
				foundIdx = i;
			}else{
				console.log("duplicate entry title found at index " + i + " all blog titles must be unique!");
			}
		}
	}
	
	return foundIdx;
}

var checkArrows = function(){
	var curIdx = getCurrentBlogIdx();
	hideNextPost(curIdx >= blogArray.length - 1);
	hideLastPost(curIdx <= 0);
};

var shiftBlog = function(direction){	
	var curIdx = getCurrentBlogIdx();
	if(curIdx != -1){
		curIdx += direction;
		
		if((curIdx <= blogArray.length - 1) && (curIdx >= 0)){
			setBlog(curIdx);
			//setBlogCounter();
		}
	}
};

var setBlogCounter = function(){
	$("div#blogCounter").html(getCurrentBlog);
	
};

var getCurrentBlog = function(){
	var dispIndex = getCurrentBlogIdx() + 1;
	var curBlog = dispIndex + " of " + blogArray.length;
	return "<p>" + curBlog + "</p>";
};





