(function ($, Drupal, window, document, undefined) {
  Drupal.behaviors.sl7_call_me = {
    attach: function (context, settings) {

      if (typeof(init) == "undefined") {
        // Получение формы и вставка в colorbox.
        $('a.sl7-call-me-toggle').bind('click', function() {
          $(this).SL7CallMe('colorbox');
        });
      }
      init = true;

    }
  };
})(jQuery, Drupal, this, this.document);