define("stock/MicroStrategy/resources/linkPage/src", ["dojo/parser"],function(parser){

	return function(){
		try{
			parser.parse();
		}catch(e){
			debugger;
			0 && console.log(e.message);
		}
		
	};
});