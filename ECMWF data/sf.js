var url;
var ustr = '';
for(var up=0;up<window.location.pathname.split('/').length;up++) {
	if(up > 0) {
		if(window.location.pathname.split('/')[up] != 'index.php') {
			ustr += '/'+window.location.pathname.split('/')[up];
		} else {
			break;
		}
	}
}

url = window.location.origin+ustr+'/server_default.json';

var system_config_data;
$.getJSON(url,function(data,error){
	  //console.log("Line JSON");
	  console.log(data);
	 system_config_data = data;


});




var Line = function(id,data,config,ErrorData){
   config.colors = system_config_data.Line.colors;
   config.strokeWidth  = system_config_data.Line.width;
   // config.strokeWidth  = system_config_data.Line.width;

	//****************************Line chart Legend***************
	var split_timestamp = data.split("\n");
	var header = split_timestamp.splice(0,1).join(",");
	var data1 = header.split(",");
	data1.splice(0,1).join(",");
	var pairArr = [];
	var clr = config.colors;

	for(var len=0; len<data1.length;len++){
	    var singleArr =[];
	    singleArr.push(data1[len],clr[len]);
	    pairArr.push(singleArr);	    
	}      
	
	var lineLegend = "";	                          
	var k = 390;
	var l = 15;
	
	lineLegend +="<svg width=\"958\" height=\"20\" class=\"pw\"><g class='line-legend'>"

	        for (var i=0; i<pairArr.length; i++) {
	           lineLegend += "<rect x=\"" + k + "\" y=\"1\" width=\"" + 10 + "\" height=\"" + 10 + "\" style=\"fill:" + pairArr[i][1] + "\" ></rect>";
	          lineLegend += "<text x=\"" + (k + l) + "\" y=\"10\" >"+ pairArr[i][0].charAt(0).toUpperCase()+ pairArr[i][0].slice(1) +"</text>";
	          //j++;
	          k+=100;	          
	        }
	        lineLegend += "</g></svg>"

	$('.legendLine').append(lineLegend);
	//****************************Line chart Legend***************






   this.DATA = data;
   this.ID = id;
   this.g2= {};
   this.default ;
   this.header =[];
   this.config = config;

   this.config.axes= {
                       x: {
                           valueFormatter: function(ms) {
                            return new Date(ms).strftime("%d-%m-%Y %H:%M");
                           }
                          }
                         };
//console.log(this.config);
   this.config.legend = 'follow';
 
   this.ErrorData = ErrorData;

    this.Line_Simple = function(e){
    	      if(e){
            	$(".iclass").removeClass("fa fa-check-square-o").addClass("fa fa-square-o fa-lg");
            	e.childNodes[0].childNodes[1].className="fa fa-check-square-o iclass" ;
               }
                // Remove below line for working visibility dailog box
                //this.header = []; 


            	this.g2 = new Dygraph(
				    document.getElementById(this.ID),
				    

				    this.DATA,
				    this.config
			    );
			    this.default= this.Line_Simple;
			}



	this.Line_Area =function(e){
            if(e){
            	$(".iclass").removeClass("fa fa-check-square-o").addClass("fa fa-square-o fa-lg");
            	e.childNodes[0].childNodes[1].className="fa fa-check-square-o iclass" ;
              }
               // Remove below line for working visibility dailog box
                //this.header = []; 
              	// var conf = Object.assign({}, this.config);
              	var conf= JSON.parse( JSON.stringify( this.config ) );
              	//console.log(conf);
                conf.fillGraph = true;
                conf.axes= {
                       x: {
                           valueFormatter: function(ms) {
                            return new Date(ms).strftime("%d-%m-%Y %H:%M");
                           }
                          }
                         },
            	this.g2 = new Dygraph(
			    document.getElementById(this.ID),
			    this.DATA,
			   

			    conf
			    );
			     this.default= this.Line_Area;
    }
//this.Line_Area();
    this.Line_Stack =  function(e){
    	if(e){
             $(".iclass").removeClass("fa fa-check-square-o").addClass("fa fa-square-o fa-lg");
             e.childNodes[0].childNodes[1].className="fa fa-check-square-o iclass" ;
           }	
           		// Remove below line for working visibility dailog box
                //this.header = []; 
           		var conf= JSON.parse( JSON.stringify( this.config ) );
           		console.log('why '+ conf)
           		conf.stackedGraph = true;
           		 conf.axes= {
                       x: {
                           valueFormatter: function(ms) {
                            return new Date(ms).strftime("%d-%m-%Y %H:%M");
                           }
                          }
                         },
            	this.g2 = new Dygraph(
			    document.getElementById(this.ID),
			    this.DATA,

			    conf
			    );
			     this.default= this.Line_Stack;
         }

     this.Line_ErrorBar =    function(e){
     			if(e){
	            	$(".iclass").removeClass("fa fa-check-square-o").addClass("fa fa-square-o fa-lg");
	            	e.childNodes[0].childNodes[1].className="fa fa-check-square-o iclass" ;
            	}
            	// Remove below line for working visibility dailog box
                //this.header = []; 
            	var conf= JSON.parse( JSON.stringify( this.config ) );
           		conf.errorBars = true;
           		 conf.axes= {
                       x: {
                           valueFormatter: function(ms) {
                            return new Date(ms).strftime("%d-%m-%Y %H:%M");
                           }
                          }
                         },
            	this.g2 = new Dygraph(
			    document.getElementById(this.ID),
			    this.ErrorData,
			    conf
			    );
			    this.default= this.Line_ErrorBar;
        }
 		

 	  this.Line_Scatter =   function(e) {
 	  			if(e){
	            	$(".iclass").removeClass("fa fa-check-square-o").addClass("fa fa-square-o fa-lg");
	            	e.childNodes[0].childNodes[1].className="fa fa-check-square-o iclass" ;
			    }
			   // Remove below line for working visibility dailog box
                //this.header = []; 
			   	var conf= JSON.parse( JSON.stringify( this.config ) );
           	   conf.drawPoints = true;
           	    conf.axes= {
                       x: {
                           valueFormatter: function(ms) {
                            return new Date(ms).strftime("%d-%m-%Y %H:%M");
                           }
                          }
                         },
           	   conf.strokeWidth = 0.0;
			   var orig_colors = [];
		       this.g2 = new Dygraph(
		              document.getElementById(this.ID),
		              this.DATA,
		          	  conf
		          );
		       this.default= this.Line_Scatter;
			}	

	  this.Line_Multiple_axes = function(e){


	  			$("#myModal").remove();

	  	   // console.log(e);
	  				$("#line-graph-modal").append('\
			  <div class="modal fade" id="myModal" role="dialog" >\
			    <div id="common_modal_dialog" class="modal-dialog modal-md">\
			      <div class="modal-content">   \
			        <div class="modal-body">	\
			        </div>\
			      </div>\
			    </div>\
			  </div>');

				$("#myModal").modal();
		 	var html_el = '<h5 class="label-line-heading">List of Series Options Respectively</h5><div class="content-form">';


			        	html_el +='<div class="input-group">\
			   		   <input  type="text" class="form-control text-center" readonly name="header" value="Series"  >\
				       <span class="input-group-addon text-span">Y1</span>\
				       <span class="input-group-addon text-span">Y2</span>\
				     \
				    </div>\
				    ';
			   for(var ii=0;ii <this.g2.layout_.setNames.length;ii++){
			       var na = this.g2.layout_.setNames[ii];
			   		 	html_el +='<div class="input-group">\
			   		   <input  type="text" class="form-control text-center" readonly name="'+na+'" value="'+na+'"  >\
				       <span class="input-group-addon panel-label label-container"><label class=""><input class="checkbox-radio-input" type="radio" checked name="'+na+'" value="y1" > <span class="checkmark line-bar-chart radius-radio"></span></label></span>\
				       <span class="input-group-addon panel-label label-container"><label class=""><input class="checkbox-radio-input" type="radio" name="'+na+'" value="y2" > <span class="checkmark line-bar-chart radius-radio"></span></label></span>\
				     \
				    </div>\
				    ';
			   }
			    eee = e;		     
			   html_el+='</div><center class="action-btn-div">\
				    	 <button type="button"  class="btn btn-primary" onclick="'+e.attributes["uknow"].value+'.Multiple_axes_draw(eee);"> OK </button>\
				    	 <button type="button" class="btn btn-disabled" data-dismiss="modal"> Close </button>\
					</center>';
			 $("body").find("#line-graph-modal .modal-body").html(html_el);
			 this.default= this.Line_Multiple_axes;

			}


	 this.Multiple_axes_draw = function(e){
	 			    inputs = $("body").find('.modal-body');
  			        inputs = inputs.find('input');
	  			
	  			   opt = this.g2.user_attrs_;
	  			   opt.series = {};
				for (index = 0; index < inputs.length; index+=1) {
				    if(inputs[index].checked){
				    	   opt['series'][inputs[index].name]={ 'axis' : inputs[index].value };			 	
				    }
				}

				$(".iclass").removeClass("fa fa-check-square-o").addClass("fa fa-square-o fa-lg");
            	e.childNodes[0].childNodes[1].className="fa fa-check-square-o iclass" ;
			 
			       this.g2 = new Dygraph(
			              document.getElementById(this.ID),
			              this.DATA,
			              opt
			          );
			      $("#myModal").modal("hide");
	     }


	 this.Line_Ylabel = function(e){
            	var maxLength = 15;
				var txt = -1;

				while (txt == -1 || (txt != null && txt.length > maxLength)) {
				    txt = window.prompt('Enter the Y label for Graph. ' + maxLength + ' characters');
				}
		  	 	this.g2.updateOptions({ylabel: txt});
		  	 	this.g2 = new Dygraph(
			    document.getElementById(this.ID),
			    DATA,
			    this.g2.user_attrs_
			    );
			    this.config = this.g2.user_attrs_;
     }

      this.Line_Xlabel = function(e){
		  	 	var maxLength = 15;
				var txt = -1;

				while (txt == -1 || (txt != null && txt.length > maxLength)) {
				    txt = window.prompt('Enter the X label for Graph. ' + maxLength + ' characters');
				}
		  	 	this.g2.updateOptions({xlabel: txt});
		  	 	this.g2 = new Dygraph(
			    document.getElementById(this.ID),
			    DATA,
			    this.g2.user_attrs_
			    );
			    this.config = this.g2.user_attrs_;
		    }

		this.Line_Title =  function(e){
		  	 	//txt = prompt("Enter the title for Graph.");
		  	 	var maxLength = 30;
				var txt = -1;

				while (txt == -1 || (txt != null && txt.length > maxLength)) {
				    txt = window.prompt('Enter the title for Graph. ' + maxLength + ' characters');
				}

		  	 	this.g2.updateOptions({title: txt});
		  	 	this.g2 = new Dygraph(
			    document.getElementById(this.ID),
			    DATA,
			    this.g2.user_attrs_
			    );
			   	this.config = this.g2.user_attrs_;
			   

		   }

		this.Line_Range =    function(e){
		  	   	if(this.g2.user_attrs_.showRangeSelector){
				 	delete this.g2.user_attrs_.showRangeSelector;
				 	delete this.g2.user_attrs_.rangeSelectorHeight;
				 	delete this.g2.user_attrs_.rangeSelectorPlotStrokeColor;
				}else{
					this.g2.updateOptions({ showRangeSelector: true,
			        rangeSelectorHeight: 15,
			        rangeSelectorPlotStrokeColor: 'yellow'});
				}
				this.g2 = new Dygraph(
				    document.getElementById(this.ID),
				    this.DATA,
				    this.g2.user_attrs_
				);
				this.config = this.g2.user_attrs_;
			}


	   this.Line_HighlightSeries = function(e) {
		 	  
  	   		    if(this.g2.user_attrs_.highlightSeriesOpts){
				 	delete this.g2.user_attrs_.highlightSeriesOpts;
				}else{
					this.g2.updateOptions({highlightSeriesOpts: {
			          strokeWidth: 2,
			          strokeBorderWidth: 1,
			          highlightCircleSize: 5
              	}});
				}	
				this.g2 = new Dygraph(
				    document.getElementById(this.ID),
				    this.DATA,
				    this.g2.user_attrs_
			    );

			    this.config = this.g2.user_attrs_;
		    }
      
       this.Line_Points = function(e){
  	   		 if(this.g2.user_attrs_.drawPoints){
				 	delete this.g2.user_attrs_.drawPoints;
			    }else{
					this.g2.updateOptions({drawPoints: true});
				}	
  	   		
	        this.g2 = new Dygraph(
				    document.getElementById(this.ID),
				    this.DATA,
				    this.g2.user_attrs_
			  );
	        this.config = this.g2.user_attrs_;
		  }

	   this.Line_Colors = function(e){
	   		$("#myModal").remove();
	        $("#line-graph-modal").append('\
			  <div class="modal fade" id="myModal" role="dialog">\
			    <div id="common_modal_dialog" class="modal-dialog modal-md">\
			      <div class="modal-content">   \
			        <div class="modal-body ">	\
			        </div>\
			      </div>\
			    </div>\
			  </div>');

		 	// 	// Size of modal box
		  //   $("#"+this.ID).parent().find("#common_modal_dialog").removeClass("modal-sm").addClass("modal-md");

		 	$("#myModal").modal();

		 	var html_el = '<h5>List of Colors Options Respectively</h5><div class="content-form">';
		 	  for(var ii=0;ii < this.g2.layout_.setNames.length ;ii++){
			     var na = this.g2.layout_.setNames[ii];
			   		 	html_el +='<div class="input-group ">\
				       <span class="input-group-addon panel-label label-container"><label class=""><input class="checkbox-radio-input" type="checkbox" name="'+na+'_check"> <span class="checkmark line-bar-check-chart radius-checkbox"></span></label></span>\
				       <span class="input-group-addon"  > '+na.charAt(0).toUpperCase()+ na.slice(1)+' </span>\
				      <input  type="color" class="form-control" value="'+this.g2.colors_[ii]+'" name="'+na+'"  >\
				    </div>\
				    ';
			  }
			  		     
			   html_el+='</div><center class="action-btn-div">\
				    	 <button type="button" id="d_c_b_o_m" class="btn btn-primary" onclick="'+e.attributes['uknow'].value+'.C_conb_line();"> OK </button>\
				    	 <button type="button" class="btn btn-disabled" data-dismiss="modal"> Close </button>\
					</center>';
			   $("#line-graph-modal .modal-body").html(html_el);
			   $("input[type='color']").spectrum({preferredFormat: "hex6"});
		 }

         this.C_conb_line = function(e){
  			inputs = $("body").find('.modal-body');
  			inputs = inputs.find('input');

			for (index = 0; index < inputs.length-1; index+=2) {
			    if(inputs[index].checked){
			    	  opt = { series: {  } };
				 	  opt['series'][inputs[index+1].name]= { color: inputs[index+1].value} ;
					 	 this.g2.updateOptions( opt);
						 this.g2 = new Dygraph(
						    document.getElementById(this.ID),
						    this.DATA,
						    this.g2.user_attrs_
					  	);
					this.config = this.g2.user_attrs_;
			    }
			}
	
  			$("#myModal").modal("hide");
  		}   

  		this.Line_Annotations = function(e) {
  				$("#myModal").remove();
  			 $("#line-graph-modal").append('\
			  <div class="modal fade" id="myModal" role="dialog">\
			    <div id="common_modal_dialog" class="modal-dialog modal-md">\
			      <div class="modal-content">   \
			        <div class="modal-body">	\
			        </div>\
			      </div>\
			    </div>\
			  </div>');

		

  		    $("#myModal").modal();
		 	var html_el = '<h5>Set  Annotations</h5><div class="content-form">';
			     	html_el +='<div id="genearte_ann"> ';
			     	var i=0;
			     	html_el +=' <!--<div class="panel panel-default">-->\
      							<div class="panel-body">\
      	    						<div class="form-horizontal">\
			    						<div class="form-group">\
			    							<label class="control-label col-sm-4" for="sel'+i+'"> Series :</label>\
			      						<div class="col-sm-8">\
			      						<select class="form-control" id="sel'+i+'" name="sel'+i+'">';
			      							
			      		  for(var ii=0;ii<this.g2.layout_.setNames.length;ii++){					
			      		  	   var na  = this.g2.layout_.setNames[ii];
			      		  	   html_el+='<option value='+na+' > '+na+'</option>';
			      		  }

			    html_el+='</select>\
			      </div>\
					    </div>\
					    <div class="form-group">\
					      <label class="control-label col-sm-4" for="date'+i+'">Date :</label>\
					      <div class="col-sm-8">\
					        <input type="date" class="form-control" id="date'+i+'" placeholder="Enter date" name="date'+i+'">\
					      </div>\
					    </div>\
					    <div class="form-group">\
					      <label class="control-label col-sm-4" for="Abbreviation'+i+'"> Abbreviation : </label>\
					      <div class="col-sm-8">\
					        <input type="text" class="form-control" id="Abbreviation'+i+'" placeholder="Enter Minimum Text" name="Abbreviation'+i+'">\
					      </div>\
					    </div>\
					     <div class="form-group">\
					      <label class="control-label col-sm-4" for="Description'+i+'"> Description : </label>\
					      <div class="col-sm-8">\
					        <textarea class="form-control" id="Description'+i+'" placeholder="Enter Description" name="Description'+i+'"></textarea>\
					      </div>\
					    </div>\
		    		</div>\
			      <!--</div>-->\
			    </div>';
	    			i++;
                  	html_el +=' </div>';

			   html_el+='</div><center class="action-btn-div">\
				    	 <button type="button" class="btn btn-primary" onclick="'+e.attributes["uknow"].value+'.set_annotations();"> OK </button>\
				    	 <button type="button" class="btn btn-disabled" data-dismiss="modal"> Close </button>\
					</center>';
			  $("#line-graph-modal .modal-body").html(html_el);

  		}

  		this.set_annotations = function(e) {

  			var data = document.getElementsByClassName("panel-body");
  		    var opts = [];
  			var i=0;
  			while(i<data.length){
  				var temp={series: 'series','x':'',shortText:'',text:''};
  				var temp_name = ['x','shortText'];
  				var inputs = data[i].getElementsByTagName('input');
  				for(var j=0;j<inputs.length;j++){
  					temp[temp_name[j]]=inputs[j].value;
  				}
  				temp['x']=temp['x'].replace(/-/g, "");
  				// temp['x']="20070125";
  			    inputs = data[i].getElementsByTagName('textarea');
  				temp['text']=inputs[0].value;
  				inputs = data[i].getElementsByTagName('select');
  				temp['series']=inputs[0].value;
  				opts.push(temp);
  				i++;
  			}
  			 
  			  this.g2.ready(function() {
				    this.setAnnotations(
				    opts
				    );
  				});

  			 $(".dygraph-legend")[0].style.right=0;
  			 $(".dygraph-legend")[0].style.left="";

  		    // console.log(this.g2);

  		     $("#myModal").modal('hide');
  		}

  		this.Line_Visibility = function(e){
  			  $("#myModal").remove();
  			  $("#line-graph-modal").append('\
			  <div class="modal fade" id="myModal" role="dialog">\
			    <div id="common_modal_dialog" class="modal-dialog modal-md">\
			      <div class="modal-content">   \
			        <div class="modal-body">	\
			        </div>\
			      </div>\
			    </div>\
			  </div>');
		 		// Size of modal box
		    /// $("#"+this.ID).parent().find("#common_modal_dialog").removeClass("modal-sm").addClass("modal-md");

		 	$("#myModal").modal();

		 	var html_el = '<h5>List of Colors Options Respectively</h5><div class="content-form">';
			 // console.log('Hello Dear');
			 // console.log(this.header.length);
			   if(this.header.length==0){
			   		var i=0;

			   		for(var ii=0;ii<this.g2.layout_.setNames.length;ii++){
			   		var tmp = this.g2.layout_.setNames[ii];
			   			this.header.push([tmp,"checked",i++]);
			   		}

			   }
			  	for(var ii=0;ii< this.header.length;ii++){
			   		var na  = this.header[ii];
			   		html_el +='<div class="input-group">\
				       <span class="input-group-addon panel-label label-container"><label class=""><input class="checkbox-radio-input" type="checkbox" '+na[1]+' name="'+na[2]+'"> <span class="checkmark line-bar-check-chart radius-checkbox"></span></label></span>\
				       <span class="input-group-addon" > '+na[0]+' </span>\
				    </div>\
				    ';
			   }
			  		     
			   html_el+='</div><center class="action-btn-div">\
				    	 <button type="button" class="btn btn-primary" onclick="'+e.attributes["uknow"].value+'.visibilitySetting();"> OK </button>\
				    	 <button type="button" class="btn btn-disabled" data-dismiss="modal"> Close </button>\
					</center>';
			   $("#line-graph-modal .modal-body").html(html_el);


  		}

  		this.visibilitySetting = function(e){
  	// 		console.log('visibilitySetting');
			// console.log(this.g2.visibility());
  			inputs = $("#myModal").find('.modal-body');
  			inputs = inputs.find('input');
  			// console.log(this.header);
			for (index = 0; index < this.header.length; index+=1) {
			    if(inputs[index].checked){
				 	   this.header[index][1]="checked";
					   this.g2.setVisibility(parseInt(this.header[index][2]), true);
			    }else{
			    	  this.header[index][1]="";
					  this.g2.setVisibility(parseInt(inputs[index].name), false);
			    }
			}
			// console.log('Default One');
			// console.log(this.config);
			// console.log('User config');
			// console.log(this.g2.user_attrs_);
			// console.log('All After visibilitySetting');
			console.log(this.g2);
			// this.config = this.g2.user_attrs_;
			// console.log('visibilitySetting');
			this.config.visibility = this.g2.visibility();
			// console.log();
  			$("#myModal").modal("hide");
  		}  

  		 
  		console.log(system_config_data.Line.type)

    if(system_config_data.Line.type == 'Simple'){
       this.Line_Simple();
	}else if(system_config_data.Line.type == 'Area'){
		this.Line_Area();
	}else if(system_config_data.Line.type == 'Scatter'){
		this.Line_Scatter();
	}else if(system_config_data.Line.type == 'Error'){
		this.Line_ErrorBar();
	}else if(system_config_data.Line.type == 'Stack'){
		this.Line_Stack();
	}else{
		 this.Line_Simple();
	}


  }

  