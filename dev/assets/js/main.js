$(document).ready(function() {

    var wow = new WOW({
        offset: 100,
    }).init();

    $(".slider_top .slider__item, .slider_top .slider__img").css('height', document.documentElement.clientHeight);

    if (document.body.clientWidth < 768) {
        $(".banner, .banner__img").css('height', document.documentElement.clientHeight);
    }

    // main page

    if ($('.fancybox').length) {
        $('.fancybox').fancybox();
    }

    // isMobile

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    function hideNotTarget(event, targetElems, hideElems, slideElems, removeClassElems) {
        if (!$(event.target).is(targetElems)) {
            $(hideElems).hide();
            slideElems ? $(slideElems).slideUp() : false;
            removeClassElems ? $(removeClassElems).removeClass('active') : false;
        };
    };



    // main slider

    $('.slider__wrap').slick({
        // autoplay: true,
        // dots: true,
        arrows: true,
        slidesToShow: 1,
        // autoplaySpeed: 3000,
        prevArrow: '<div class="slider__btn _prev"></div>',
        nextArrow: '<div class="slider__btn _next"></div>'
    });

    if (document.body.clientWidth > 767) {

        $('.menu__main > li').hover(function() {
            $(this).addClass('opened');
        }, function() {
            $(this).removeClass('opened');
        });

        $('.menu__sub > li').hover(function() {
            $(this).addClass('active');
        }, function() {
            $(this).removeClass('active');
        });

        if (isMobile.any()) {

            $('a.drop,a.nested').on('click', function(e) {
                e.preventDefault();
                var that = $(this);
                $('a.drop,a.nested').not(that).removeClass('onHover');
                var linkHref = that.attr('href');
                if (linkHref && that.hasClass('onHover')) {
                    location.href = linkHref;
                    return false;
                }
                that.toggleClass('onHover');
            });

        }

        // advice btn 

        $('.h-advice,.map__callback').fancybox();

    } else {

        $('.h-advice__icon').on('click', function() {
            $('#advice').slideToggle();
            $('.overlay_advice').toggle();
        });

        // phone btn

        $('.h-phone__icon').on('click', function() {
            $('.h-phone__list').slideToggle();
            $('.overlay_phone').toggle();
        });

        $(document).on('click touchstart', function(e) {

            hideNotTarget(e, '.h-phone__icon, .h-phone__list *', '.overlay_phone', '.h-phone__list');

            hideNotTarget(e, '.h-advice__icon, #advice *', '.overlay_advice', '#advice');

        });


        if (isMobile.any()) {

            $('.menu__arrow').on('click', function(e) {
                $('.menu__main > li').not($(this).parent()).removeClass('opened');
                $('.menu__sub').not($(this).next()).slideUp();
                $(this).parent().toggleClass('opened');
                $(this).next().slideToggle();
                if ($(this).parent().find('ul').length > 0) {
                    return false;
                }
            });

            $('.submenu__arrow').on('click', function(e) {
                $('.menu__sub li').not($(this).parent()).removeClass('active');
                $('.menu__sub_nested').not($(this).next()).slideUp();
                $(this).parent().toggleClass('active');
                $(this).next().slideToggle();
                if ($(this).parent().find('ul').length > 0) {
                    return false;
                }
            });
        }

    }


    // toggle btn


    $('.toggle').on('click', function(e) {
        $('.sidebar,.toggle').toggleClass('active');
        $('.overlay_menu').toggle();
    });

    $(document).on('click touchstart', function(e) {
        hideNotTarget(e, '.toggle *, .sidebar *', '.overlay_menu', null, '.sidebar,.toggle');
    });

    // back-top


    // $('#back-top').click(function() {
    //     $('body,html').animate({
    //         scrollTop: 0
    //     }, 500);
    //     return false;
    // });

    // tabs

    $(".about .tabs__item").hide().eq(0).show();
    $(".about .tabs__btn").click(function() {
        if (!$(this).hasClass("active")) {
            $(".about .tabs__btn").removeClass("active").eq($(this).index()).addClass("active");
            $(".about .tabs__item").hide().eq($(this).index()).fadeIn();
        }
        if ($('.contacts').length) {
            var img = $(this).data('img');
            var text = $(this).data('text');
            $('.banner__text').text(text);
            $('.banner__img').attr('style', img);
        }


    }).eq(0).addClass("active");

    // persona slider

    $('.persona__wrap').slick({
        // autoplay: true,
        // dots: true,
        arrows: true,
        slidesToShow: 3,
        // autoplaySpeed: 3000,
        prevArrow: '<div class="slider__btn _prev"></div>',
        nextArrow: '<div class="slider__btn _next"></div>',
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }]

    });

    // back-top scroll

    function choiseVisibility($scrollToTop) {
        $(document).scrollTop() > 600 ? $scrollToTop.show(100) : $scrollToTop.hide(100);
        // &&  $(document).scrollTop() < document.body.clientHeight -window.innerHeight -50
        if ($('.f-map').length) {
            $(document).scrollTop() >= $(document).height() - $(window).height() - 130 ? $scrollToTop.addClass('bottom') : $scrollToTop.removeClass('bottom');
        }
    }

    function scroll_position() {
        var $scrollToTop = $('#back-top');

        choiseVisibility($scrollToTop);
        $(window).on('scroll', function() {
            choiseVisibility($scrollToTop);
        });
        $scrollToTop.on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 500);
        });
    }
    scroll_position();

    // header scroll

    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            $('.header').addClass('fix');
        } else {
            $('.header').removeClass('fix');
        }

        if ($('.aboutus-indicators').length || $('.bas-area').length) {

            $('.item__img i').each(function() {
                var that = $(this);
                var elemPos = that.offset().top;
                var topOfWindow = $(window).scrollTop() + $(window).height();
                var number = that.data('value');



                if (elemPos < topOfWindow - 10) {

                    if (that.text() == 0) {
                        move(number)
                    }

                }

                function move(number) {
                    var finish = number;
                    var counter = 0;
                    var id = setInterval(frame, 1000 / number);

                    function frame() {
                        if (counter >= finish) {
                            clearInterval(id);
                        } else {
                            counter++;
                            that.text(counter);
                        }
                    }
                }
            });

        }





    });

    // form validate

    $('form button[type=submit]').click(function() {
        var er = 0;
        var form = $(this).parents('form');
        $(".err-text").remove();
        $.each(form.find('[data-valid]'), function(index, val) {

            var validType = $(this).data('valid');

            switch (validType) {

              case "email":
                if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test($(this).val()))) {
                    er++;
                    $(this).addClass('err');
                    $(this).parent().append('<span class="err-text">введите правильно e-mail!</span>');
                } else {
                    $(this).removeClass('err');
                    $(this).parent().children(".err-text").remove();
                }
                break;

              case "phone":
                if (!/[0-9()-\s+]{3,20}/.test($(this).val())) {
                    er++;
                    $(this).addClass('err');
                    $(this).parent().append('<span class="err-text">введите правильно номер!</span>');
                } else {
                    $(this).removeClass('err');
                    $(this).parent().children(".err-text").remove();
                }
                break;

              case "services":
                if ($(this).find('.checkbox__hidden:checked').length) {
                    $(this).removeClass('err');
                    $(this).parent().children(".err-text").remove();
                } else {
                    er++;
                    $(this).addClass('err');
                    $(this).parent().append('<span class="err-text">выберите услугу!</span>');
                }
                break;

              case "select":
                if ($(this).val() == '') {
                    er++;
                    $(this).parents('.dropdown').addClass('err');
                    $(this).parents('.form__block').append('<span class="err-text">выберите пункт!</span>');
                  } else {
                        $(this).parents('.dropdown').removeClass('err');
                        $(this).parents('.form__block').children(".err-text").remove();
                 }
                break;

              default:
                if ($(this).val() == '') {
                    er++;
                        $(this).addClass('err');
                        $(this).parent().append('<span class="err-text">заполните поле!</span>');
                } else {
                        $(this).removeClass('err');
                        $(this).parent().children(".err-text").remove();
                }

            }

        });
        if (er == 0) {
            $.fancybox.open({
              href: '#success'
            });
            return false;
        } else {
            return false;
        }
    });

    $('.js-close-popup').on('click', function() {
        $.fancybox.close();
    })



    $('.services__item .checkbox__hidden').on('change', function() {

        var priority = 0;

        $('.services__item .checkbox__hidden:checked').each(function(index, val){
            if ($(this).data('prior')>priority) {
                priority = $(this).data('prior');
            }
        })

        var arr;

        switch(priority) {
            case 6:
                arr = ['$2000 - $5000','$5000 - $10000','более $10000','Не знаю, посоветуйте'];
                break;
            case 5:
                arr = ['$500 - $1500','$1500 - $3000','$3000 - $6000','более $6000','Не знаю, посоветуйте'];
                break;
            case 4:
                arr = ['до $1000','$1000 - $2500','$2500 - $5000','более $5000','Не знаю, посоветуйте'];
                break;
            case 3:
                arr = ['до $500','$500 - $1000','$1000 - $3000','более $3000','Не знаю, посоветуйте'];
                break;
            case 2:
                arr = ['до $300','$300 - $500','$500 - $1000','более $1000','Не знаю, посоветуйте']; 
                break;
            case 1:
                arr = ['$250 - $500','$500 - $1000','более $1000','Не знаю, посоветуйте'];   
                break; 
            case 0:
                arr = ['до $500','$500 - $1000','$1000 - $3000','более $3000','Не знаю, посоветуйте'];
                break;                               
        }

        var selected = '<option value="" selected="">Планируемый бюджет *</option>';
        var noSelected = '';

        for (var i = 0; i < arr.length; i++) {
            noSelected+='<option>'+arr[i]+'</option>'
        }

        $('.select-budget').html('').append(selected).append(noSelected).easyDropDown('destroy').easyDropDown();

    })


    $('form input, form textarea').focus(function() {
        $(this).removeClass('err');
        $(this).parent().children(".err-text").remove();
        $(this).addClass('active');
    });
    $('.select').on('change', function() {
        $(this).parents('.dropdown').removeClass('err');
        $(this).parents('.form__block').children(".err-text").remove();
    })
    $('.checkbox').on('click', function() {
        $(this).parents('.services').removeClass('err');
        $(this).parents('.services').next(".err-text").remove();
    })

    $('form input, form textarea').blur(function() {
        if ($(this).val() === '') {
            $(this).removeClass('active');
        }
    });


    // Maps------------------------------------------------------------------------------

    function map() {

        function initMap() {

            var styles = [{ "featureType": "administrative.locality", "elementType": "all", "stylers": [{ "hue": "#2c2e33" }, { "saturation": 7 }, { "lightness": 19 }, { "visibility": "on" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "simplified" }] }, { "featureType": "poi", "elementType": "all", "stylers": [{ "hue": "#ffffff" }, { "saturation": -100 }, { "lightness": 100 }, { "visibility": "off" }] }, { "featureType": "road", "elementType": "geometry", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": 31 }, { "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": 31 }, { "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "labels", "stylers": [{ "hue": "#bbc0c4" }, { "saturation": -93 }, { "lightness": -2 }, { "visibility": "simplified" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "hue": "#e9ebed" }, { "saturation": -90 }, { "lightness": -8 }, { "visibility": "simplified" }] }, { "featureType": "transit", "elementType": "all", "stylers": [{ "hue": "#e9ebed" }, { "saturation": 10 }, { "lightness": 69 }, { "visibility": "on" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "hue": "#e9ebed" }, { "saturation": -78 }, { "lightness": 67 }, { "visibility": "simplified" }] }];

            var myLatlng = new google.maps.LatLng(56.800878, 30.1293792);
            var zoom = 5;
            if (document.body.clientWidth < 768) {
                zoom = 4;
            }

            var mapOptions = {
                zoom: zoom,
                center: myLatlng,
                scrollwheel: false,
                styles: styles
            }
            if ($('#mapGeo').length) {

                var map = new google.maps.Map(document.getElementById('mapGeo'), mapOptions);

                setOffices(map);
                setClients(map);

            }
            if ($('#map').length) {

                var mapFooter = new google.maps.Map(document.getElementById('map'), mapOptions);

                setOffices(mapFooter);
            }
            if ($('#mapContacts').length) {

                var mapFooter = new google.maps.Map(document.getElementById('mapContacts'), mapOptions);

                setOffices(mapFooter);
            }
        }

        var offices = [
            ['Беларусь, г.Минск, ул.Сурганова 43-804', 53.926826, 27.589426, 3, '<figure class="map__item"><div class="map__img"><img src="images/marker-img.png"alt=""></div><figcaption class="map__info"><div class="map__title">Адрес:</div><div class="map__text">г. Минск,ул. Сурганова 43,офис 804</div><div class="map__metro"><i></i>Академия наук</div><div class="map__title">Контакты:</div><div class="map__number">+375 (17) 292-14-94</div><a href="#advice"class="map__callback">Заказать обратный звонок</a></figcaption></figure>'],
            ['Латвия, г.Рига, ул.Лачплеша 14-305', 56.955705, 24.122132, 2, 'Латвия, г.Рига, ул.Лачплеша 14-305'],
            ['Россия, г.Москва', 55.72711, 37.59833, 1, 'Россия, г.Москва']
        ];

        function setOffices(map) {

            var image = {
                url: 'images/marker.png',
            };

            var _setOfficesLoop = function _setOfficesLoop() {
                var office = offices[i];
                var marker = new google.maps.Marker({
                    position: { lat: office[1], lng: office[2] },
                    map: map,
                    icon: image,
                    title: office[0],
                    zIndex: office[3]
                });

                var infowindow = new google.maps.InfoWindow({
                    content: office[4]
                });

                marker.addListener('click', function() {
                    map.setZoom(12);
                    map.setCenter(marker.position);
                    infowindow.open(map, marker);
                });
            };

            for (var i = 0; i < offices.length; i++) {
                _setOfficesLoop();
            }


        }

        var clients = [
            ['Cronulla Beach', 51.926826, 25.589426, 3],
            ['Manly Beach', 54.955705, 22.122132, 2],
            ['Maroubra Beach', 53.72711, 35.59833, 1]
        ];

        function setClients(map) {

            var image = {
                url: 'images/marker-client.png',
            };

            var _setClientsLoop = function _setClientsLoop() {
                var client = clients[i];
                var marker = new google.maps.Marker({
                    position: { lat: client[1], lng: client[2] },
                    map: map,
                    icon: image,
                    title: client[0],
                    // zIndex: client[3]
                });
            };

            for (var i = 0; i < clients.length; i++) {
                _setClientsLoop();
            }
        }


        initMap();
    };

    map();

    // other page    

    // .projects sort

    if ($('.projects__wrap').length) {

        var $projects = $(".projects__wrap");
        $projects.imagesLoaded(function() {
            $projects.masonry({
                itemSelector: ".projects__item",
                columnWidth: ".projects__sizer",
                percentPosition: true
            });
        });

        $('.sort__btn').on('click', function() {

            if (!$(this).hasClass('active')) {
                $('.sort__btn').removeClass('active');
                $(this).toggleClass('active');
                $('.projects__item').show();
                var filter = $(this).data('filter')
                $('.projects__item').not(filter).hide();
                $projects.masonry('layout');
            }

        })

        $('.projects__btn .btn').on('click', function() {
            $('.projects__item').show();
            $projects.masonry('layout');
        })


    }

    //news page

    if ($('.news__content').length) {

        $('.news__btn .btn').on('click', function() {
            $('.three.columns').slideDown();
        });
    }

    //shop page

    if ($('.item__btn .btn').length) {
        $('.item__btn .btn').on("click", function() {
            $(this).parents('.item__wrap').find('.item__answer').slideToggle();
        });
    }

    //seo page

    if ($('.seo-result').length) {
        $('.tabs__more').on("click", function() {
            $(this).prev().slideToggle();
            $(this).prev().toggleClass('opened');
            if ($(this).prev().hasClass('opened')) {
                $(this).children().text('Скрыть дополнительную статистику')
            } else {
                $(this).children().text('Показать еще статистику')
            }

        });

        $(".seo-result .tabs__item").hide().eq(0).show();
        $(".seo-result .tabs__btn").click(function() {
            if (!$(this).hasClass("active")) {
                $(".seo-result .tabs__btn").removeClass("active").eq($(this).index()).addClass("active");
                $(".seo-result .tabs__item").hide().eq($(this).index()).fadeIn();
            }
        }).eq(0).addClass("active");

        function tabsNav(dir) {
            var tab = $('.tabs__btn');
            var tabContent = $('.tabs__item');
            var tabsPos = $('.tabs__btn.active').index();
            tabsPos += dir;

            if (tabsPos < 0) {
                tabsPos = $('.tabs__btn').length - 1;
            } else if (tabsPos > $('.tabs__btn').length - 1) {
                tabsPos = 0;
            }

            $('.tabs__btn.active').removeClass('active');
            $('.tabs__btn').eq(tabsPos).addClass('active');
            $('.tabs__item').fadeOut('');
            $('.tabs__item').eq(tabsPos).fadeIn('');

        }

        $('.tabs__arrow.next').on('click', function() {
            tabsNav(1);
        });

        $('.tabs__arrow.prev').on('click', function() {
            tabsNav(-1);
        });

    }

    function moveIndicator(indicator) {
        var elem = indicator;
        var width = 0;
        var id = setInterval(frame, 10);

        function frame() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++;
                elem.style.width = width + '%';
            }
        }
    }

    function handleFileSelect(evt) {
        var files = evt.target.files;
        var output = [];
        for (var i = 0, f; f = files[i]; i++) {
            output.push('<div class="progress__item"><div class="progress__icon"></div><div class="progress__name">', f.name, '</div><div class="progress__size">', (f.size / 1024).toFixed(), ' kb</div><div class="progress__indicator"><div class="progress__bar"></div></div><div class="progress__cancel"></div></div>');
        }
        document.getElementById('list').innerHTML = output.join('');
        var bar = document.querySelectorAll('.progress__bar');
        for (var j = 0, b; b = bar[j]; j++) {
            moveIndicator(b);
        }
    }

    if ($('#files').length) {
        document.getElementById('files').addEventListener('change', handleFileSelect, false);
    }



    $(document).on('click', '.progress__cancel', function() {
        $(this).parent().remove();
        // $('#files').val("");
    });

    // $(".progress__btn input[type=file]").on('change', function() {
    //     var filename = $(this).val().replace(/.*\\/, "");
    //     var size = ($(this).get(0).files[0].size / 1024).toFixed(3) + " kb";
    //     $(".progress__name").text(filename);
    //     $(".progress__size").text(size);
    //     moveIndicator($(".progress__bar"));
    // });

    $(".select_site").on('change', function() {
        if ($(this).find('option:selected').text() === "Да") {
            $('.form__block_site').slideDown();
            $('.select_req').attr("data-valid", "select");

        } else {
            $('.form__block_site').slideUp();
            $('.select_req').removeAttr("data-valid");  
        
        }
    });

    $(".select_country").on('change', function() {
        if ($(this).find('option:selected').text() === "Другая страна") {
            $('.form__block_country').slideDown();

        } else {
            $('.form__block_country').slideUp();

        }
    });

    $(".select_hear").on('change', function() {
        if ($(this).find('option:selected').text() === "Другое") {
            $('.form__block_hear').slideDown();
        } else {
            $('.form__block_hear').slideUp();
        }
    });

    $('.select').easyDropDown();

    function animateSVG(id, type, duration) {

        new Vivus(id, {
            type: type || 'oneByOne',
            duration: duration || 150,
            animTimingFunction: Vivus.EASE,
            pathTimingFunction: Vivus.EASE
        }, function() {
            this.el.setAttribute("class", "filled");
        });

    }

    $('.svg-animate').each(function(index, elem) {
        var id = $(this).children('svg').attr('id');
        animateSVG(id);
    })


    function onHover(arr) {

        $.each(arr, function (index, value) {
            $(value).hover(
                function() {
                    $(this).addClass('onHover')
                },
                function() {
                    $(this).removeClass('onHover')
            });     
        })
   
    }

    onHover(['.client__item', '.portfolio__item', '.projects__item']);

});

$(window).load(function() {


    // $(".greyimg img").fadeIn(500);


    // $('.greyimg img').each(function() {
    //     var el = $(this);
    //     el.css({ "top": "0", "left": "0", "position": "absolute" }).wrap("<div class='img_wrapper' style='display: inline-block'>").clone().addClass('img_grayscale').css({ "top": "0", "left": "0", "position": "absolute", "z-index": "998", "opacity": "0" }).insertBefore(el).queue(function() {
    //         var el = $(this);
    //         el.parent().css({ "width": this.width, "height": this.height, "position": "relative" });
    //         el.dequeue();
    //     });
    //     this.src = grayscale(this.src);
    // });

    // $('.greyimg').mouseover(function() {
    //     $(this).find('img:first').stop().animate({ opacity: 1 }, 200);
    // })
    // $('.greyimg').mouseout(function() {
    //     $(this).find('.img_grayscale').stop().animate({ opacity: 0 }, 200);
    // });

    // function grayscale(src) {
    //     var canvas = document.createElement('canvas');
    //     var ctx = canvas.getContext('2d');
    //     var imgObj = new Image();
    //     imgObj.src = src;
    //     canvas.width = imgObj.width;
    //     canvas.height = imgObj.height;
    //     ctx.drawImage(imgObj, 0, 0);
    //     var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //     for (var y = 0; y < imgPixels.height; y++) {
    //         for (var x = 0; x < imgPixels.width; x++) {
    //             var i = (y * 4) * imgPixels.width + x * 4;
    //             var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
    //             imgPixels.data[i] = avg;
    //             imgPixels.data[i + 1] = avg;
    //             imgPixels.data[i + 2] = avg;
    //         }
    //     }
    //     ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
    //     return canvas.toDataURL();
    // }




    function sameHeight(elem) {
        var heightBlock = 0;
        var that = elem;
        if (that.length) {

            that.each(function() {
                if ($(this).height() > heightBlock) {
                    heightBlock = $(this).height();
                }
            });
            that.each(function() {
                $(this).height(heightBlock);
            });
        }

    }




    if (document.body.clientWidth > 767) {

        // sameHeight($('.working__info'));
    }

});
