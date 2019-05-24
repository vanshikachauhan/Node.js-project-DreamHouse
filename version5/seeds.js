var mongoose   =require("mongoose"),
    House      =require("./models/house"),
    Comment    =require("./models/comment");
var data=[
			{
				name:"SNOW HOUSE",
			    image:"https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
			    description:"Landscape photo of 2-storey house"
			},
			{   name:"WHITE HOUSE",
				image:"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60",
				description:"White and grey concrete building near swimming pool under clear sky during daytime"
			},
				{name:"WOODEN MOUNTAIN HOUSE",
				image:"https://images.unsplash.com/photo-1519302959554-a75be0afc82a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
				description:"Yellow wooden house near mountain during cloudy day"
			}
		]    

function seedDB(){
	//removing houses
	House.remove({},function(err){
		if(err){
			console.log(err);

		}else{
			console.log("removed houses!!!!");
            //adding houses
            data.forEach(function(seed){
            	House.create(seed,function(err,house){
            		if(err){
            			console.log(err);
            		}else{
            			console.log("added houses!!!!");
            			//adding comments
            			Comment.create({
            				text:"this is a beautiful house",
            				author:"Vanshika Chauhan"
            			},function(err,comment){
            				if(err){
            					console.log(err);
            				}else{
            					house.comments.push(comment);
            				    house.save();
            				    console.log("created new comments!!!!!")

            				}
                           })
            		}
            	})
		})
            
	}
})
}   

module.exports=seedDB;

