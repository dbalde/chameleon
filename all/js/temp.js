const $drawerToggle = '[data-toggle="drawer"]';
const $drawer = '[data-container="drawer"]';
const $drawerMenuToggle = '[data-toggle="drawer-menu"]';
const $drawerMenu = '[data-container="drawer-menu"]';
const $notificationToggle = '[data-toggle="notifications"]';
const $notification = '[data-container="notificiations"]';
const $menuToggle = '[data-toggle="menu"]';
const $menu = '[data-container="menu"]';
const $searchToggle = '[data-toggle="search"]';
const $search = '[data-container="search"]';
const $profileToggle = '[data-toggle="profileToggle"]';
const $profile = '[data-container="profile"]';
const $tabs = '[data-toggle="tabs"]';
const $modalToggle = '[data-toggle="modal"]';
const $modal = '[data-container="modal"]';
const $toastToggle = '[data-toggle="toast"]';
const $toast = '[data-container="toast"]';
const $tooltip = '[data-tooltip="true"]';

const clearToggle = function (e, $el, $toggle) {
	const {target} = e;

	if (
		!$(target).is($el) &&
		!$(target).parents().is($el) &&
		!$(target).is($toggle) &&
		!$(target).parents().is($toggle)
	) {
		$($el).each(function () {
			$(this).toggleClass('is-active', false);
		});
	}
};

const clearTabs = function (e, $links) {
	$($links).children().each(function () {
		const $this = $(this);
		const $that = $this.attr('href');

		$this.toggleClass('is-active', false);
		$($that).toggleClass('is-active', false);
	});
};

//---------------------------------------------

$($modalToggle).click(e => {
	e.preventDefault();
	e.stopPropagation();
	$($modal).toggleClass('is-active');
});

//---------------------------------------------

$($toastToggle).click(e => {
	e.preventDefault();
	e.stopPropagation();
	$($toast).toggleClass('is-active');
});

//---------------------------------------------

$($tabs).children().each(function () {
	const $this = $(this);
	const $that = $this.attr('href');

	$this.on({
		'mouseup': e => {
			e.preventDefault();
			e.stopPropagation();
			clearTabs(e, $tabs);
			$this.toggleClass('is-active');
			$($that).toggleClass('is-active');
		}
	});
});

//---------------------------------------------

$($drawerToggle).click(e => {
	e.preventDefault();
	e.stopPropagation();
	$($drawer).toggleClass('is-active');
});

$($drawerMenuToggle).click(function (e) {
	e.preventDefault();
	e.stopPropagation();
	$(this).next($drawerMenu).toggleClass('is-active');
});

//---------------------------------------------

$($searchToggle).click(e => {
	e.preventDefault();
	e.stopPropagation();
	$($search).toggleClass('is-active');
});

//---------------------------------------------

$($notificationToggle).click(function (e) {
	e.preventDefault();
	e.stopPropagation();
	const $this = $(this);
	const $that = $($notification);
	const $targetOffset = $(window).width() - ($this.offset().left + $this.width());
	$that.toggleClass('is-active');
	$that.css('right', $targetOffset);
});

//---------------------------------------------

$($profileToggle).click(e => {
	e.preventDefault();
	e.stopPropagation();
	$($profile).toggleClass('is-active');
});

//---------------------------------------------

$($menu).each(function () {
	const $this = $(this);
	const $targetOffset = $this.offset();
	if ($targetOffset.left > $(window).width() / 2) {
		$this.css({'transform-origin': 'right top', 'right': 0});
	} else {
		$this.css('transform-origin', 'left top');
	}
});

$($menuToggle).click(function (e) {
	const $this = $(this);
	const $that = $($menu);
	e.preventDefault();
	e.stopPropagation();
	$that.each(() => {
		$this.toggleClass('is-active', false);
	});
	$this.next($menu).toggleClass('is-active');
});

// Clear menus

$(document).on({
	'touchstart': e => {
		clearToggle(e, $drawer, $drawerToggle);
		clearToggle(e, $search, $searchToggle);
		clearToggle(e, $notification, $notificationToggle);
		clearToggle(e, $menu, $menuToggle);
		clearToggle(e, $profile, $profileToggle);
	},
	'mouseup': e => {
		clearToggle(e, $drawer, $drawerToggle);
		clearToggle(e, $search, $searchToggle);
		clearToggle(e, $notification, $notificationToggle);
		clearToggle(e, $menu, $menuToggle);
		clearToggle(e, $profile, $profileToggle);
	}
});

//---------------------------------------------

$($tooltip).each(function () {
	const $this = $(this);
	const tip = $this.attr('title');
	$this.data('tip', tip);
	$this.on({
		'mouseenter': () => {
			$this.attr('title', '');
			$('body').append('<span class="tooltip"></span>');
			const $that = $('.tooltip');
			$that.append(tip);
			const $link = $this.offset();
			const $tipPos = $that.offset();
			$tipPos.top = $link.top + $this.innerHeight() + 6;
			$tipPos.left = ($link.left + ($this.innerWidth() / 2)) - ($that.innerWidth() / 2);
			$that.attr('style', 'left: ' + $tipPos.left + 'px; top: ' + $tipPos.top + 'px;');
			$that.toggleClass('is-active');
		},
		'mouseleave': () => {
			$this.attr('title', tip);
			$('.tooltip').each(function () {
				const $this = $(this);
				$this.remove();
			});
		}
	});
});

//----------------------------------------------