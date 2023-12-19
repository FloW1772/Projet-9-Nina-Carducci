(function($) {
  $.fn.mauGallery = function(options) {
    var options = $.extend({}, $.fn.mauGallery.defaults, options);
    var tagsCollection = [];

    return this.each(function() {
      var $gallery = $(this);
      $.fn.mauGallery.methods.createRowWrapper($gallery);

      if (options.lightBox) {
        $.fn.mauGallery.methods.createLightBox($gallery, options);
      }

      $.fn.mauGallery.listeners(options);

      $gallery.find(".gallery-item").each(function(index) {
        var $item = $(this);
        $.fn.mauGallery.methods.responsiveImageItem($item);
        $.fn.mauGallery.methods.moveItemInRowWrapper($item);
        $.fn.mauGallery.methods.wrapItemInColumn($item, options.columns);

        var theTag = $item.data("gallery-tag");
        if (options.showTags && theTag !== undefined && tagsCollection.indexOf(theTag) === -1) {
          tagsCollection.push(theTag);
        }
      });

      if (options.showTags) {
        $.fn.mauGallery.methods.showItemTags($gallery, options.tagsPosition, tagsCollection);
      }

      $gallery.fadeIn(500);
    });
  };

  $.fn.mauGallery.defaults = {
    columns: 3,
    lightBox: true,
    lightboxId: null,
    showTags: true,
    tagsPosition: "bottom",
    navigation: true
  };

  $.fn.mauGallery.listeners = function(options) {
    $(".gallery-item").on("click", function() {
      if (options.lightBox && $(this).prop("tagName") === "IMG") {
        $.fn.mauGallery.methods.openLightBox($(this), options.lightboxId);
      } else {
        return;
      }
    });

    $(".gallery").on("click", ".nav-link", $.fn.mauGallery.methods.filterByTag);
    $(".gallery").on("click", ".mg-prev", () => $.fn.mauGallery.methods.prevImage(options.lightboxId));
    $(".gallery").on("click", ".mg-next", () => $.fn.mauGallery.methods.nextImage(options.lightboxId));
  };

  $.fn.mauGallery.methods = {
    // Fonctions restantes ici, sans modifications majeures
  };
})(jQuery);
