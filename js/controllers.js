angular.module('wordpaper.controllers', [])

.controller('MainCtrl', function($cordovaKeyboard,$timeout,$cordovaToast,$ionicModal,$cordovaToImageRoll,$scope,$ionicGesture,$cordovaSocialSharing) {
    $scope.boxHeight=$('#word-box').width()+20;
    $scope.controllerHeight=$(window).height()-$scope.boxHeight;
    $scope.centerTop=  ($scope.controllerHeight-94)/2;
    $scope.textAlign=["center"];
    $scope.textShadow=false;
    $scope.fontSize=18;
    $scope.colorShow=false;
    $scope.currentColorIndex=0;
    $scope.currentFontIndex=0;
    $scope.currentColor={
        name:"云朵银",
        back:"#ECF0F1",
        font:'#bdc3c7'
    }
    $scope.currentFont={
        name:"默认",
        family:"STHeitiSC-Light"
    }
    $scope.currentBox=0;
    $scope.Boxes=[{id:0}];
    $scope.text=[''];

    $scope.Fonts=[
        {
            name:"默认",
            family:"STYuanti-SC-Light"
        },
        {
            name:"黑体",
            family:"STHeitiSC-Medium"
        },
        {
            name:"苹果丽黑",
            family:"HiraKakuProN-W6"
        },
        {
            name:"宋体",
            family:"HiraMinProN-W6"
        }
    ];
    $scope.EnglishFonts=[
        {
            name:"Yo",
            family:"AppleColorEmoji"
        },
        {
            name:"Yo",
            family:"Baskerville-SemiBoldItalic"
        },
        {
            name:"Yo",
            family:"Courier"
        },
        {
            name:"Yo",
            family:"Futura-Medium"
        },
        {
            name:"Yo",
            family:"HelveticaNeue"
        }
    ];
    $scope.Colors=[
        {
            name:"云朵银",
            back:"#ECF0F1",
            font:'#bdc3c7'
        },
        {
            name:'萝卜红',
            back:'#E67E22',
            font:'white'
        },
        {
            name:'宝石绿',
            back:'#2ECC71',
            font:'white'
        },
        {
            name:'冷静红',
            back:'#C0392B',
            font:'white'
        },
        {
            name:'天空蓝',
            back:'#3498DB',
            font:'white'
        },
        {
            name:'湿润灰',
            back:'#34495E',
            font:'white'
        },
        {
            name:'天使紫',
            back:'#9B59B6',
            font:'white'
        },
        {
            name:'太阳橙',
            back:'#F1C40F',
            font:'white'
        }
    ]

    $scope.addBox=function() {
        var length=$scope.Boxes.length;
        if (length<2) {
            $scope.Boxes.push({id:1});
            $scope.textAlign.push('center');
            $scope.setAlign('left');
            $scope.text.push[''];
            $('.textarea')[1].focus();
        } 
    }

    $scope.deleteBox=function() {
        var length=$scope.Boxes.length;
        if (length>1) {
            $scope.Boxes.pop();
            $scope.textAlign.pop();
            $scope.setAlign('center');
            $scope.text.pop();
            $('.textarea')[0].focus();
        } 
    }

    $scope.pinchin=function() {
        if ($scope.fontSize>=14) {
            $scope.fontSize=$scope.fontSize-0.5;
        }
        $(".textarea").css('font-size',$scope.fontSize+"px");
    }

    $scope.pinchout=function() {
        if ($scope.fontSize<=30) {
            $scope.fontSize=$scope.fontSize+0.5;
        }
        $(".textarea").css('font-size',$scope.fontSize+"px");
    }

    $scope.save=function() {
        var img;
        html2canvas($('#word-box'), {
          onrendered: function(canvas) {
            $cordovaToImageRoll.save(canvas) // Share via native share sheet
            .then( function(result) {
                var master=$scope.text;
                $scope.text="保存成功！";
                $timeout(function(){
                    $scope.text=master;
                },1000);
            },function(err) {
                
            });
          }
        });
        
    }

    $scope.share=function() {
        var img;
        html2canvas($('#word-box'), {
          onrendered: function(canvas) {
            img = canvas.toDataURL();
            $cordovaSocialSharing
            .share(null, null, img, null) // Share via native share sheet
            .then( function(result) {
                
            },function(err) {
                
            });
          }
        });
    }

    $scope.showColor=function() {
        $.each($('.color-ball'), function(index) {
            $timeout(function () {
                return function () {
                    $('.color-ball').eq(index).toggleClass('show');
                };
            } ($(this).index()), $(this).index()*15);
        });
    }

    $scope.showFont=function() {
        $.each($('.font-span'), function(index) {
            $timeout(function () {
                return function () {
                    $('.font-span').eq(index).toggleClass('show');
                };
            } ($(this).index()), $(this).index()*15);
        });
    }



    $scope.setAlign=function(align) {
        for (i in $scope.textAlign) {
            if (i==0 || i==2) {
                $scope.textAlign[i]=align;
            }
            else if (align=="left") {
                $scope.textAlign[i]='right';
            }
            else {
                $scope.textAlign[i]='left';
            }
        }
        
    }

    $scope.toggleShadow=function() {
        $scope.textShadow=!$scope.textShadow;
    }

    $scope.setBack=function(index,color) {
        $scope.currentColor=color;
        $scope.currentColorIndex=index;
    }

     $scope.setFont=function(index,font) {
        $scope.currentFont=font;
        $scope.currentFontIndex=index;
    }

    $ionicModal.fromTemplateUrl('templates/font.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.fontModal = modal;
    });

    $scope.openFont=function() {
        $scope.fontModal.show();
    }

    $scope.closeFont=function() {
        $scope.fontModal.hide();
    }

    $scope.hideKeyboard=function() {
        $cordovaKeyboard.close();
    }

    window.addEventListener('native.keyboardshow', keyboardShowHandler);
    window.addEventListener('native.keyboardhide', keyboardHideHandler);

    function keyboardShowHandler(e){
        $('.keyboard-button').addClass('show');
    }

    function keyboardHideHandler(e){
        $('.keyboard-button').removeClass('show');
    }
                
})

.directive('pinchin', function($ionicGesture) {
  return {
    restrict :  'A',
    link : function(scope, elem, attrs) {
        $ionicGesture.on('pinchin', scope.pinchin, elem);
      }
    }
})

.directive('pinchout', function($ionicGesture) {
  return {
    restrict :  'A',
    link : function(scope, elem, attrs) {
        $ionicGesture.on('pinchout', scope.pinchout, elem);
      }
    }
})

.factory('$cordovaToImageRoll', ['$q', '$window', function ($q, $window) {
    return {
      save: function (ele) {
        var q = $q.defer();
        $window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(msg){
            q.resolve(true);
        },
        function(err){
            q.reject(false);
        },
        ele
        );
        return q.promise;
      }
    }
}])
