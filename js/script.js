jQuery(document).ready(function() {
    landingPage.initialize();
});


var landingPage = {

  initialize: function () {
    // landingPage.matchBrowserHeight();
  },

  matchBrowserHeight: function() {
    wh = $(window).height();
    $('.landing-section').height(wh);
  }
};

