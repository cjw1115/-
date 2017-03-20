

    $(function() {
            var screenIndex = 1,
                numScreens = $('.screen').length;
            $('.wrapper').css('width',numScreens*100+'%');
            $('.screen').css('width',100/numScreens+'%');
            //跳过第0张，显示第1张
            $('.wrapper').transit(
                        {'left':'-'+(100*(screenIndex))+'%'},
                        0,null);

            // Use Modernizr to detect for touch devices, 
            // which don't support autoplay and may have less bandwidth, 
            // so just give them the poster images instead
            
            var isTransitioning = false,
                transitionDur = 1000,
                isTouch = Modernizr.touch,
                $bigImage = $('.big-image'),
                $window = $(window);
            
            // if (!isTouch) {
            //     $bigImage
            //         .css('position','relative')
            //         .imagesLoaded(adjustImagePositioning);
            //     // and on window resize
            //     $window.on('resize', adjustImagePositioning);
            // }
            $bigImage.css('position','relative').imagesLoaded(adjustImagePositioning);
                // and on window resize
                $window.on('resize', adjustImagePositioning);
            
            // Next button click goes to next div
            $('#next-btn').on('click', function(e) {
                e.preventDefault();
                if (!isTransitioning) {
                    next();
                }
            });
             // Next button click goes to next div
            $('#prev-btn').on('click', function(e) {
                e.preventDefault();
                if (!isTransitioning) {
                    prev();
                }
            });

            //自动播放
            var timerDuration=3500;
            var timer=setInterval(AutoPlay,3500);
            function AutoPlay(){
                if(!isTransitioning){
                    next();
                }
            }
            
            $('.navPoint a').each(function(){
                $(this).on('click',function(){
                    var selIndex=parseInt($(this).attr('id'));
                    screenIndex=selIndex;
                    $('.wrapper').transit(
                        {'left':'-'+(100*(selIndex))+'%'},
                        0,
                        null);
                    updateSel();
                });
                $(this).mouseenter(function(){
                    clearInterval(timer);
                });
                $(this).mouseleave(function(){
                    timer=setInterval(AutoPlay,timerDuration);
                })
            });
            var lastSelIndex=1;
            function updateSel(){
                var points=$('.navPoint a');
                var selIndex;
                if(screenIndex==0){
                    selIndex=1;
                }
                if(screenIndex==numScreens-1){
                    selIndex=screenIndex-1;
                }
                selIndex=screenIndex;

                $(points[lastSelIndex-1]).removeClass('sel');
                $(points[lastSelIndex-1]).addClass('nosel');
                
                
                $(points[selIndex-1]).removeClass('nosel');
                $(points[selIndex-1]).addClass('sel');
                
                lastSelIndex=selIndex;
            }
            function next() {
                isTransitioning = true;
                
                screenIndex++;
               
               $('.wrapper').transit(
                        {'left':'-'+(100*(screenIndex))+'%'},
                        transitionDur,
                        onTransitionComplete);

                if (screenIndex == numScreens-1) {
                    screenIndex = 1;

                     $('.wrapper').transit(
                        {'left':'-'+(100*(screenIndex))+'%'},
                        0,
                        onTransitionComplete);
                } 
                updateSel();        
            }
            function prev() {
                isTransitioning = true;
                
                screenIndex--;
               
                $('.wrapper').transit(
                        {'left':'-'+(100*(screenIndex))+'%'},
                        transitionDur,
                        onTransitionComplete);

                    if(screenIndex==0){
                        screenIndex=numScreens-2;
                    $('.wrapper').transit(
                        {'left':'-'+(100*(screenIndex))+'%'},
                        0,
                        onTransitionComplete); 
                }  
                updateSel();    
                       
            }

            function onTransitionComplete() {
                isTransitioning = false;
            }

            //让图片适配全屏
            function adjustImagePositioning() {
                $bigImage.each(function(){
                    var $img = $(this),
                        img = new Image();

                    img.src = $img.attr('src');
                    var margin=0;
                    var windowWidth = $window.width(),
                        windowHeight = $window.height()-margin,
                        r_w = windowHeight / windowWidth,    
                        i_w = img.width,
                        i_h = img.height,
                        new_w, new_h, new_left, new_top;
                        var r_i;
                        if(img.width==0||img.height==0){
                            r_i= 1125 / 2000;
                        }else{
                            r_i=i_h/i_w;
                        }
                        new_w=windowWidth;
                        new_h=windowWidth*r_i;
                    // if( r_w > r_i ) {
                    //     new_h   = windowHeight;
                    //     new_w   = windowHeight / r_i;
                    // }
                    // else {
                    //     new_h   = windowWidth * r_i;
                    //     new_w   = windowWidth;
                    // }

                    $img.css({
                        width   : new_w,
                        height  : new_h,
                        // left    : ( windowWidth - new_w ) / 2,
                        // top     : ( windowHeight - new_h ) / 2
                        left    : 0,
                        top     : 0
                    })

                });

            }
        });