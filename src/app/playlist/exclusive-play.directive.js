function ExclusivePlayDirective(){
	return function($scope, $element){
		$element.bind('play', function(){
		    $("audio").not($element).each(function(index, audio) {
		          audio.pause();
      		});
		})
	}
		
}

export default ExclusivePlayDirective;