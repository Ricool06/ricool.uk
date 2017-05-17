
class UIcontroller 
{
	constructor(clickables) {
		this.navToggle = document.getElementById("nav-toggle");
		this.sideMenu = document.getElementById("side-menu");
		/*We attach the sideMenu to the navToggle button
		because onNavToggleClick runs in the document context,
		and doesn't have access to this class' member variables.
		Javascript is weird.*/
		this.navToggle.sideMenu = this.sideMenu;
		
		this.registerEventHandlers();
		console.log("CONSTRUCTED");
	}
	
	registerEventHandlers() {
		this.navToggle.addEventListener("click", this.onNavToggleClick);
	}
	
	
	onNavToggleClick(event) {
		//Because this method runs in the context of the document (because it was triggered by an event),
		//we pull out the sideMenu we attached earlier.
		this.navToggle = event.currentTarget;
		this.sideMenu = this.navToggle.sideMenu;
		if(this.navToggle.classList.contains("is-active")) {
			this.navToggle.classList.remove("is-active");
			this.sideMenu.style.width = "0";
		}
		else {
			this.navToggle.classList.add("is-active");
			this.sideMenu.style.width = "100%";
		}
	}
}

var ui = new UIcontroller();