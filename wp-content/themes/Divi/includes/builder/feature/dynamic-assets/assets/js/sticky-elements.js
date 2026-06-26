
/* Divi sticky elements - placeholder for static site */
(function($){"use strict";
  $(document).ready(function(){
    $("[class*='et_pb_sticky']").each(function(){
      var $el=$(this);
      var offset=$el.offset().top;
      $(window).on("scroll",function(){
        if($(window).scrollTop()>=offset){
          $el.addClass("et_pb_sticky");
        }else{
          $el.removeClass("et_pb_sticky");
        }
      });
    });
  });
})(jQuery);
