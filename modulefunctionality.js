//Timer
angular.module("Watch",[]).controller("clockController",function($scope){
    $scope.startWatchFlag=false;
            var startWatch=function($scope)
            {
                $scope.currentHour=new Date().getHours();
                $scope.currentMinute=new Date().getMinutes();
                $scope.currentSecond=new Date().getSeconds();
            }
            startWatch($scope);
            setInterval(function(){
                $scope.$apply(startWatch);
            },1000);

            $scope.timeStart = function () {
                   if($(".resultsHour").val() && $(".resultsMinute").val() && $(".resultsSecond").val() &&($(".resultsHour").val()==0 && $(".resultsMinute").val()==0 && $(".resultsSecond").val()==0)){
                      $scope.leftHour=$scope.reqHour;
                      $scope.leftMinute=$scope.reqMin;
                      $scope.leftSecond=$scope.reqSec;
                  }
                  else
                  {
                      $scope.leftHour=$(".resultsHour").val();
                      $scope.leftMinute=$(".resultsMinute").val();
                      $scope.leftSecond=$(".resultsSecond").val();
                  }
                      angular.element("#timerModule input[type='number']").attr("disabled","disabled");
                      angular.element(".start").addClass("ng-hide");
                      angular.element(".stop").addClass("ng-show").removeClass("ng-hide");
                      $scope.startWatchFlag=true;
                
            }

            $scope.leftHour=0;
            $scope.leftMinute=0;
            $scope.leftSecond=0;
            $scope.timeStop = function () {
                    $scope.startWatchFlag=false;
                    angular.element(".start").addClass("ng-show").removeClass("ng-hide");
                    angular.element(".stop").addClass("ng-hide").removeClass("ng-show");
            }
            $scope.timeReset = function () {
                    $scope.reqHour=0;
                    $scope.reqMin=0;
                    $scope.reqSec=0;
                    $scope.leftHour=0;
                    $scope.leftMinute=0;
                    $scope.leftSecond=0;
                    angular.element("#timerModule input[type='number']").removeAttr("disabled");
                    angular.element(".start").addClass("ng-show").removeClass("ng-hide");
                    angular.element(".stop").addClass("ng-hide").removeClass("ng-show");
                    angular.element(".progressBar").stop();
                    angular.element(".progressBar").animate({width:"100%"});
            }
            
           
             setInterval(function(){

                 if($scope.leftHour>0 && $scope.startWatchFlag==true)
                 $scope.leftHour--;
             },60*60*1000);
              setInterval(function(){
                 if($scope.leftMinute>0 && $scope.startWatchFlag==true)
                 $scope.leftMinute--;
             },60*1000);
              setInterval(function(){
                 if($scope.leftSecond>0 && $scope.startWatchFlag==true)
                 $scope.leftSecond--;
             },1000);

});


//button functionality
angular.element(document).ready(function(){
        var zeroFlag=false;
        var nullArray=[];

        function checkZero(){
                    angular.element("#timerModule input[type='number']").each(function(){
                        var countInput=angular.element("#timerModule input[type='number']").length;
                        for(var i=0;i<countInput;i++){
                            nullArray[i]=angular.element("#input_"+i).val();
                        }
            });

        }
        function checkArray(zero) {
            return zero == 0;	
        }
        function everyElement(){
            zeroFlag = nullArray.every(checkArray);
        }

        function buttonEnableDisable(){
            if(angular.element("#timerModule input[type='number']").hasClass("ng-invalid-min") || 
                   angular.element("#timerModule input[type='number']").hasClass("ng-invalid-max") || zeroFlag==true )
                   $("#timerModule button").addClass("disabled");
                   else
                   $("#timerModule button").removeClass("disabled");
        }

        function testIntial()
        {
                if(zeroFlag==true)
                $("#timerModule button").addClass("disabled");
                else if(zeroFlag==false)
                $("#timerModule button").removeClass("disabled");
        }
      function timeVanish() {
                
                angular.element(".results input").each(function()
                                                {
                    if(angular.element(this).val()==0)
                        {
                            angular.element(this).attr("placeholder","0");
                        }         
                });
              
            }
    function progressBar() {
                var hourVal=angular.element("#input_0").val();
                var minVal=angular.element("#input_1").val();
                var secVal=angular.element("#input_2").val();
                var hourMilliseconds=hourVal*60*60*1000;
                var minMilliseconds=minVal*60*1000;
                var secMilliseconds=secVal*1000;
                var animateLength=hourMilliseconds+minMilliseconds+secMilliseconds;
    
                angular.element(".progressBar").animate({width:"0px"},animateLength);
    }
  
        angular.element("#timerModule input[type='number']").on('change',testIntial);
        angular.element("#timerModule input[type='number']").on('keyup',testIntial);

        angular.element("#timerModule input[type='number']").on('change',checkZero);
        angular.element("#timerModule input[type='number']").on('keyup',checkZero);

        angular.element("#timerModule input[type='number']").on('change',buttonEnableDisable);
        angular.element("#timerModule input[type='number']").on('keyup',buttonEnableDisable);

        angular.element("#timerModule input[type='number']").on('change',everyElement);
        angular.element("#timerModule input[type='number']").on('keyup',everyElement);
     
        angular.element(".start,.reset").on('click',timeVanish);
        angular.element(".start").on('click',progressBar);
   
   });

