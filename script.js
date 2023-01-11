$('.topbtn').on('click', function(){
  
  $('#topSearch').toggle();
  
});

$(".card").hover(function() {
  var vSrc =  $(this).find('iframe').data('video');
  var video = $(this).find('iframe');
  video.attr('src',vSrc);
  setTimeout(function(){ player.unMute(); }, 1000);
},
function() {
  $(this).find('iframe').attr('src','');
});

$('.view').click(function(){
  var el = $(this);
  
  if(el.hasClass('series_lacasa') == true){
    $('.episodes .episode').each(function(){
      var toShow = $(this).data('lacasa');
      $(this).css('background','url('+toShow+') no-repeat center/cover');
    });
  } else if (el.hasClass('series_got') == true) {
    $('.episodes .episode').each(function(){
      var toShow = $(this).data('got');
      $(this).css('background','url('+toShow+') no-repeat center/cover');
    });
  } else if (el.hasClass('series_dp') == true) {
    $('.episodes .episode').each(function(){
      var toShow = $(this).data('dp');
      $(this).css('background','url('+toShow+') no-repeat center/cover');
    });
  }  else if (el.hasClass('series_myname') == true) {
    $('.episodes .episode').each(function(){
      var toShow = $(this).data('myname');
      $(this).css('background','url('+toShow+') no-repeat center/cover');
    });
  }
    
  $('.fullserie').addClass('active');
});

$('.fullserie .close').click(function(){
  $('.fullserie').removeClass('active');
});
const tabItems = document.querySelectorAll('.tab-item');
const tabContentItems = document.querySelectorAll('.tab-content-item');


function selectItem(e) {

	removeBorder();
	removeShow();

	this.classList.add('tab-border');

	const tabContentItem = document.querySelector(`#${this.id}-content`);

	tabContentItem.classList.add('show');
}


function removeBorder() {
	tabItems.forEach(item => {
		item.classList.remove('tab-border');
	});
}


function removeShow() {
	tabContentItems.forEach(item => {
		item.classList.remove('show');
	});
}


tabItems.forEach(item => {
	item.addEventListener('click', selectItem);
});

$(function(){
        
  function setHeight(){
      $(".response").each(function(index,element){
          var target = $(element);
          target.removeClass("fixed-height");
          var height = target.innerHeight();
          target.attr("data-height", height)
                .addClass("fixed-height");
      });
  };
  
  $("input[name=question]").on("change", function(){
      $("p.response").removeAttr("style");
      
      var target = $(this).next().next();
      target.height(target.attr("data-height"));
  })
  
  setHeight();
});
const ele = '.promotion-carousel';
const $window = $(window);
const viewportHeight = $window.height();

let ui = {
  promo: ele + ' .promotion',
  promoText: ele + ' .promo-text',
  navigationItems: '.navigation a'
};

function isOnScreen(el) {
  const viewport = {
    top : $window.scrollTop()
  };

  viewport.bottom = viewport.top + viewportHeight;

  const bounds = el.offset();
  bounds.bottom = el.offset().top + el.outerHeight();

  return (!(viewport.bottom < bounds.top || viewport.top > bounds.bottom));
}

class ScrollEvents {

  run() {
    const $promo = $('.promotion');
    const $promoText = $('.promo-text');

    function smoothScroll(target) {
      $('body, html').animate({'scrollTop':target.offset().top}, 600);
    }

    $(ui.navigationItems).on('click', e => {
      e.preventDefault();
      smoothScroll($(e.currentTarget.hash));
    });

    $window.on('scroll', () => {

      $(ui.promo).toArray().forEach(el => {
        const $el = $(el);
        if (isOnScreen($el)) {
          this.scrolly($el);
        }
      });
      this.updateNavigation();
      this.fadeAtTop($(ui.promoText));
    });

    this.updateNavigation();
  }

  scrolly(el) {
    const topOffset = el.offset().top;
    const height = el.height();
    let scrollTop = $window.scrollTop();
    const maxPixels = height / 4;
    const percentageScrolled = (scrollTop - topOffset) / height;
    let backgroundOffset = maxPixels * percentageScrolled;

    backgroundOffset = Math.round(Math.min(maxPixels, Math.max(0, backgroundOffset)));

    el.css(`background-position`, `right 0px top ${backgroundOffset}px`);
  }

  fadeAtTop(el) {
    const startPos = 0.25;

    el.toArray().forEach(el => {
      const $el = $(el);
      let position = $el.offset().top - $window.scrollTop() + viewportHeight / 6;
      let opacity = position < viewportHeight * startPos ? position / (viewportHeight * startPos) * 1 : 1;

      $el.css('opacity', opacity);
    });
  }

  updateNavigation() {
    $(ui.promo).toArray().forEach((el) => {
      let $el = $(el);
      let activeSection = $(`.navigation a[href="#${$el.attr('id')}"]`).data('number') - 1;

      if ( ( $el.offset().top - $window.height()/2 < $window.scrollTop() ) && ( $el.offset().top + $el.height() - $window.height()/2 > $window.scrollTop() ) ) {
        $(ui.navigationItems).eq(activeSection).addClass('active');
      } else {
        $(ui.navigationItems).eq(activeSection).removeClass('active');
      }
    });
  }
};

const scrollEvents = new ScrollEvents();

scrollEvents.run();