
var NavigationItem = Backbone.Model.extend({
	defaults:{
		id: "blank",
		class: "inactive",
		opacity: 1,
	},
	
	hoverItem: function(){
		this.set({'class':'active'});
		this.set({'opacity':'.5'});
	},
	
	disableItem: function(){
		this.set({'class':'inactive'});
		this.set({'opacity':'1'});
	},
	
	selectItem: function(){
		disableItems();
		this.set({'class':'active current'});
		this.set({'opacity':'1'});
		
		loadContent(this.get('id'));
	}
});
