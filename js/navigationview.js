

var NavigationView = Backbone.View.extend({
	el:$('.main')[0],
	tagName:'div',
	id:'butter',
	
	render: function(){
		this.$el.attr({"class":this.model.get("class")});
		this.$el.css({opacity:this.model.get("opacity")});
	},
	
	events: {
		'mouseover': 'mouseOver',
		'mouseout': 'mouseOff',
		'click': 'mouseClick'
	},
	
	initialize: function(){
		this.model.on('change', this.render, this);
		var tagId = "nav_" + this.model.get("id");
		this.$el.attr({"id":tagId});
		this.render();
	},
	
	mouseOver: function(e){
		if(this.model.get('class') != "active current"){
			this.model.hoverItem();
		}
	},
	mouseOff: function(e){
		if(this.model.get('class') != "active current"){
			this.model.disableItem();
		}
	},
	mouseClick: function(e){
		if(this.model.get('class') != "active current"){
			this.model.selectItem();
		}
	},
	disableItem:function(){
		this.model.disableItem();
	}
	
});


