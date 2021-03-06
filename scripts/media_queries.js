/**
 * @file
 * Fire callbacks for media query breakpoints
 *
 * To use this file enable the OnMediaQuery.js polyfill in your subthemes
 * appearance settings - this will load the required plugin and this file.
 *
 * This allows you to write context (media query) specific JS without hard
 * coding the media queries, aka like matchMedia. Each context matches the
 * media queries you set in theme settings (by adding the font-family
 * declarations to the responsive layout CSS).
 *
 * SEE: https://github.com/JoshBarr/js-media-queries (really, go look, lots of
 * useful documentation available).
 *
 * IMPORTANT: do not rename or move this file, or change the directory name!
 */

function moveLeaderboardLeftDown() {
  if (jQuery("#leaderboard-wrapper #block-menu-menu-leaderboard-left").length){
    jQuery("#footer div.region div.region-inner").append(jQuery("#block-menu-menu-leaderboard-left"));
    jQuery("#block-menu-menu-leaderboard-left div ul li").html("<a href=\"http://www.carleton.ca\" title=\"Carleton Home\"><img src=\"/sites/all/themes/drosophila/images/cu-logo-white-outlined.svg\" alt=\"Link to Carleton University's Home Page\" /></a>") 
  }

}

function moveLeaderboardLeftUp() {  
  if (! jQuery("#leaderboard-wrapper #block-menu-menu-leaderboard-left").length){
    jQuery("#leaderboard-wrapper div.container div.region div.region-inner").prepend(jQuery("#block-menu-menu-leaderboard-left"));
    jQuery("#block-menu-menu-leaderboard-left div ul li").html("<a href=\"http://www.carleton.ca\" title=\"Carleton Home\">Carleton Home</a>") 
  }

}

function makeMenuLink() { 
  if (! jQuery("#leaderboard-wrapper #menu-link").length){
    jQuery("#block-system-main-menu").hide();
    var menuImage = Drupal.settings.pathToTheme+"/images/menu.svg";
    jQuery("#leaderboard-wrapper div.container div.region div.region-inner").prepend("<a href=\"#\" id=\"menu-link\" class=\"inactive\">Menu</a>");
  }
}

function destroyMenuLink() {  
  jQuery("#block-system-main-menu").removeClass("accordion").show(); 
  jQuery("#menu-link").remove();
}

function moveSecondaryMenuLinks() {
  if (! jQuery("#leaderboard-wrapper #block-menu-menu-secondary-menu-to-leaderboa").length){
    jQuery("#block-menu-menu-secondary-menu").hide();
    jQuery("#leaderboard-wrapper div.container div.region div.region-inner").prepend(jQuery("#block-menu-menu-secondary-menu-to-leaderboa"));
  }

  if (! jQuery("#leaderboard-wrapper #block-menu-menu-secondary-menu-to-hamburger").length){
    jQuery("#block-menu-menu-secondary-menu-to-hamburger").hide();
    jQuery("#leaderboard-wrapper #block-system-main-menu").before(jQuery("#block-menu-menu-secondary-menu-to-hamburger"));
  }
}

function restoreSecondaryMenuLinks() {
  jQuery("#block-menu-menu-secondary-menu").show(); 
  
  if (jQuery("#leaderboard-wrapper #block-menu-menu-secondary-menu-to-hamburger").length){
    jQuery("#block-menu-menu-secondary-menu-to-hamburger").show();
    jQuery("#header-wrapper div.container div.region div.region-inner").prepend(jQuery("#block-menu-menu-secondary-menu-to-hamburger"));
  }

  if (jQuery("#leaderboard-wrapper #block-menu-menu-secondary-menu-to-leaderboa").length){
    jQuery("#header-wrapper div.container div.region div.region-inner").prepend(jQuery("#block-menu-menu-secondary-menu-to-leaderboa"));
  }

}

function moveSearch() {
  if (! jQuery("#leaderboard-wrapper #block-search-form").length){
    jQuery("#block-search-form").hide();
    jQuery("#leaderboard-wrapper div.container div.region div.region-inner").append(jQuery("#block-search-form"));
  }
}

function restoreSearch() { 
  if (jQuery("#leaderboard-wrapper #block-search-form").length){
    jQuery("#block-search-form").show();
    jQuery("#header-wrapper div.container div.region div.region-inner").append(jQuery("#block-search-form"));
  }
}

function moveSearch() {
  if (! jQuery("#leaderboard-wrapper #block-search-form").length){
    jQuery("#block-search-form").hide();
    jQuery("#leaderboard-wrapper div.container div.region div.region-inner").append(jQuery("#block-search-form"));
  }
}

function restoreSearch() { 
  if (jQuery("#leaderboard-wrapper #block-search-form").length){
    jQuery("#block-search-form").show();
    jQuery("#header-wrapper div.container div.region div.region-inner").append(jQuery("#block-search-form"));
  }
}

function moveLogo() { 
  if (! jQuery("#leaderboard-wrapper #logo").length){
    jQuery("#leaderboard-wrapper #menu-link").after(jQuery("#logo"));
  }
}

function restoreLogo() {
  if (jQuery("#leaderboard-wrapper #logo").length){
    jQuery("#branding").prepend(jQuery("#logo"));
  }
}

var queries = [
  // README! The following are examples, remove what you don"t need!


  // Smartphone
  {
    context: ["smalltouch_portrait", "smalltouch_landscape"],
    call_in_each_context: false,
    callback: function() {      
      makeMenuLink();
      moveLeaderboardLeftDown();
      moveSecondaryMenuLinks();
      moveSearch();
      moveLogo();
      console.log("smalltouch");
    },
  },
  // portrait only
  {
    context: "smalltouch_portrait",
    callback: function() {
      
      // Debug
      console.log("smalltouch portrait");
    }
  },
  // landscape only
  {
    context: "smalltouch_landscape",
    callback: function() {
      // Debug
      console.log("smalltouch_landscape ");
    }
  },


  // Tablet
  {
    context: ["tablet_portrait", "tablet_landscape"],
    call_in_each_context: false,
    callback: function() {    
      console.log("tablet");
    }
  },
  // portrait only
  {
    context: "tablet_portrait",
    callback: function() {
      moveLeaderboardLeftDown(); 
      makeMenuLink();
      moveSecondaryMenuLinks();
      moveSearch();
      moveLogo();
      console.log("tablet_portrait");
    }
  },
  // landscape only
  {
    context: "tablet_landscape",
    callback: function() {
      moveLeaderboardLeftUp(); 
      destroyMenuLink();
      restoreSecondaryMenuLinks();
      restoreSearch();
      restoreLogo();
      console.log("tablet_landscape");
    }
  },


  // Standard desktop context
  {
    context: "standard",
    callback: function() {
      moveLeaderboardLeftUp();     
      destroyMenuLink();
      restoreSecondaryMenuLinks();
      restoreSearch();
      restoreLogo();
      console.log("standard desktop");
    }
  },
];

// Go!
MQ.init(queries);

//Here we start getting the menu working...
jQuery(document).ready(function($){
  
  $("body").delegate("#menu-link.inactive", "hover", function(event){
    if( event.type === "mouseenter" ){  
      var menuImage = Drupal.settings.pathToTheme+"/images/menu-hover.svg";
      $(this).addClass("hover");
    }
    else {
      var menuImage = Drupal.settings.pathToTheme+"/images/menu.svg";
      $(this).removeClass("hover");
    }
  });

  $("body").delegate("#menu-link.active", "hover", function(event){
    if( event.type === "mouseenter" ){  
      var menuImage = Drupal.settings.pathToTheme+"/images/menu-active-hover.svg";
      $(this).addClass("hover");
    }
    else {
      var menuImage = Drupal.settings.pathToTheme+"/images/menu-active.svg";
      $(this).removeClass("hover");
    }
  });

  $("body").delegate("#menu-link", "click", function(event){
    if($(this).hasClass("active")){
      var menuImage = Drupal.settings.pathToTheme+"/images/menu.svg";
      $(this).removeClass("active");
      $(this).addClass("inactive");
      $(this).removeClass("hover");
      $("#block-system-main-menu").hide();
      $("#block-system-main-menu").removeClass("accordion");
      $("#block-menu-menu-secondary-menu-to-hamburger").hide();
      $("#block-menu-menu-secondary-menu-to-hamburger").removeClass("accordion");
      $("#block-search-form").hide();
      $("#block-search-form").removeClass("accordion");
    }
    else{
      var menuImage = Drupal.settings.pathToTheme+"/images/menu-active.svg";
      $(this).attr("src", menuImage); 
      $(this).addClass("active");
      $(this).removeClass("inactive");
      $(this).removeClass("hover");
      $("#block-system-main-menu").show();
      $("#block-system-main-menu").addClass("accordion");
      $("#block-menu-menu-secondary-menu-to-hamburger").show();
      $("#block-menu-menu-secondary-menu-to-hamburger").addClass("accordion");  
      $("#block-search-form").show();
      $("#block-search-form").addClass("accordion"); 
    }
  });

  $("#edit-search-block-form--2").attr("placeholder", "Search the library website...");
  var context = $("html").css('font-family');
  console.log(context); 
  MQ.triggerCallbacks(context); 

});
