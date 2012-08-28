
var PolaroidItem = Backbone.Model.extend({
	defaults:{
		idx: 0,
		title: "polaroid",
		image: "blankImage.png",
		path: "assets/images/blog/",
		left: "400px",
		top: "100px"
	}
});

var PolaroidView = Backbone.View.extend({	
	className:"blogImage",
	
	template:_.template(
				'<p>' + '<%= title %>' + '</p>' +
				'<div class="bgImage"><img src="' + '<%= path %>' + '<%= image %>' + '"/></div>' +
				'<div class="polaroidImage"><img src="assets/images/content/polaroid.png"/></div>'
			),
	
	initialize: function(){
		this.$el.css({
			"left":this.model.get('left'),
			"top":this.model.get('top'),
			"-webkit-transform":getRand(),
			"-moz-transform":getRand()
		});
		//console.log("this set to " + this.$el.css("-moz-transform"));
		this.model.on('hide', this.remove, this);
		this.model.on('change', this.render, this);
		this.render();
		
		function getRand(){
			var randInt = 10 - Math.round(Math.random(1,10) * 20);	
			//rotate(-10deg);
			return String("rotate(" + randInt + "deg)");
		}
	},
	
	render: function(){
		var html = this.template(this.model.toJSON());
		this.$el.html(html);
		
		return this.$el;
	},
	
	remove: function(){
		console.log("attemtping to remove from view");
		this.$el.remove();
	},
	
	events:{
		"click":"onImageClick",
		"mouseover":"onImageMouseOver",
		"mouseout":"onImageMouseOut"
	},
	
	onImageClick: function(event){
		event.stopPropagation();
		var loadString = "assets/images/blog/fullsize/" + this.model.get('image');
		window.open(loadString, '_blank');
	},
	onImageMouseOver: function(event){
		event.stopPropagation();
		var pEl = this.$el.children("p")[0];
		$(pEl).toggleClass("highlight");
	},
	onImageMouseOut: function(event){
		event.stopPropagation();
		var pEl = this.$el.children("p")[0];
		$(pEl).toggleClass("highlight");
	}
});

var PolaroidCollection = Backbone.Collection.extend({	
	model: PolaroidItem,
	
	initialize: function(){
		this.on('remove', this.hideModel, this);
	},
	
	hideModel: function(polaroidItem){
		polaroidItem.trigger('hide');
	}
});

var PolaroidCollectionView = Backbone.View.extend({
	//className: "polaroidImages",
	
	initialize: function(){
		this.collection.on('add', this.addPolaroid, this);
		this.collection.on('reset', this.addAllPolaroids, this);
	},
	
	render: function(){
		this.addAllPolaroids();
	},
	
	//clears the el and adds all polaroids in the collection
	addAllPolaroids: function(){
		this.$el.html("");
		this.collection.forEach(this.addPolaroid, this);
	},
	
	addPolaroid: function (polaroidItem){
		var polaroidView = new PolaroidView({
			model:polaroidItem
		});
		
		this.$el.append(polaroidView.render());
	}
});


//Called by the blogManager to create a list of polaroids.
var setPolaroids = function(pArray){
	var polaroidCollection = new PolaroidCollection();
	
	var polaroidCollectionView = new PolaroidCollectionView({
		el:$("div.polaroidImages"),
		collection:polaroidCollection
	});
	$('polaroidImages')
	
	polaroidCollection.reset(pArray);
	
	$('div.polaroidImages').fadeIn(200, function(){
		//$('div#content_blog .blogCopy').fadeIn(200);
	});
	$('div#content_blog .blogCopy').animate({"top":"0px", "opacity":"1"}, 200, "easeOutSine");
}









