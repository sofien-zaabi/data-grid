

export const scrollEvent = (eventElem, scrollElem, scroll) => {
	let mouseposition, keydownEvent;
	let arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'PageDown', 'PageUp', 'Home', 'End',
		'Left', 'Right', 'Up', 'Down' // IE11
	];
	if (eventElem) {
		eventElem.addEventListener("mouseenter", function (event) {
			mouseposition = this.tagName + '.' + this.className;
		});
		eventElem.addEventListener("mouseleave", function (event) {
			mouseposition = undefined;
		});
		if (eventElem.parentNode.classList.contains('table-scroll-wrapper') && !keydownEvent) {
			keydownEvent = true;
			eventElem.parentNode.addEventListener("keydown", function (event) {
				if (arrowKeys.indexOf(event.key) !== -1) {
					event.preventDefault();
				}
			});
		}
		eventElem.addEventListener("scroll", function (event) {
			if (scrollElem) {
				switch (scroll) {
					case 'scrollX':
						scrollElem.scrollLeft = this.scrollLeft;
						break;
					case 'scrollY':
						if (this.matches(mouseposition)) {
							scrollElem.scrollTop = this.scrollTop;
						}
						break;
				}
			}
		});
	}
}