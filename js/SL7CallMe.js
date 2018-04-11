/**
 * Use:
 * $('element').SL7CallMe(); - load form in elements.
 * $('element').SL7CallMe('load'); - too.
 * $('element').SL7CallMe('colorbox'); - Load form in colorbox.
 */

(function($) {

    var phoneRegEx = /^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$/;

    var methods = {

        get : function() {
            return $.ajax({
                async: false,
                data: { name: "sl7_call_me" },
                url: '/ajax/sl7/entityform/get',
            });
        },

        colorbox : function() {
            return this.each(function() {
                methods.get().success(function(form) {
                    $.colorbox({html: form});
                });
                var that = $('#cboxLoadedContent');
                methods.init(that);
            })
        },

        load : function() {
            return this.each(function() {
                var that = $(this);
                methods.get().success(function(form) {
                    that.html(form);
                });
                methods.init(that);
            })
        },

        init : function(that) {
            var $form = that.find("#sl7-call-me-entityform-edit-form");
            var $submit = that.find('.sl7-call-me-submit');
            var $phone = that.find('#edit-sl7-call-me-phone-und-0-value');
            methods.validate($submit, $phone);

            $submit.bind('click', function() {
                methods.send($form, $phone, $submit);
            });
        },

        send : function($form, $phone, $submit) {
            var check = methods.check($phone);

            if (check !== false) {
                var number = check.replace(/[^0-9]/g, '');
                number = number.replace(/^8/, '+7');
                $phone.val(number);
                $submit.prop("disabled", true);
                $form.submit();
            }

            return false;
        },

        check : function($phone) {
            var number = $phone.val();
            return number.match(phoneRegEx) ? number : false;
        },

        validate : function($submit, $phone) {
            $submit.prop("disabled", true);

            $phone.keyup(function() {
                var number = $(this).val();
                if (!number.match(phoneRegEx)) {
                    $(this).addClass('error');
                    $submit.prop("disabled", true);

                    return false;
                }
                else {
                    $(this).removeClass('error');
                    $submit.prop("disabled", false);

                    return true;
                }
            });
        }

    };

    $.fn.SL7CallMe = function(method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.load.apply( this, arguments );
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.SL7CallMe' );
        }
    };

}(jQuery));