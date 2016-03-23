//View Object constructor
var View2 = function (model) {
	this.startButton = $("#view2_startBtn");
	this.backButton = $("#view2_backBtn");
	//Should be created in JavaSCript because it's dynamic

	///////////////////////////////////
	//-------element 		Id's----------
	//
	//	name input field: input(i)
	//	x button        : xBtn(i)
	//	Control Buttons : keyAssignBtn(i)
	//	Change Ship Btns: changeShipBtn(i)
	//	Image of Ship   : boatImg(i)
	//
	//	Add Player Btns : addPlayerBtn(j)
	///////////////////////////////////
	
	this.createBtn = function(id,parentRow,text,keyName){

		var col3_1 = document.createElement('div');
		col3_1.className = 'col-md-4';

		var row4_1 = document.createElement('div');
		row4_1.className = 'row';
		
		//text about button
		var text1 = document.createElement('p');
		var ph = document.createTextNode(text);
		
		text1.appendChild(ph);
		row4_1.appendChild(text1);
		col3_1.appendChild(row4_1);

		var row4_2 = document.createElement('div');
		row4_2.className = 'row';
		
		//button
		var btn1 = document.createElement('button');
		btn1.className='btn btn-success';
		btn1.setAttribute('id', 'keyAssignBtn' + id);
		
		var txt1 = document.createTextNode(keyName);
		btn1.appendChild(txt1);
		
		row4_2.appendChild(btn1);
		col3_1.appendChild(row4_2);

		parentRow.appendChild(col3_1);
			
	}

	this.createArrowBtn = function(id,direction,parentRow){
		var col3_1 = document.createElement('div');
		col3_1.className = 'col-md-6';
		
		var lBtn = document.createElement('button');
		lBtn.className='btn btn-info';
		lBtn.setAttribute('id', 'changeShipBtn' + id);
		
		var lTxt = document.createTextNode(direction);
		lBtn.appendChild(lTxt);
		
		col3_1.appendChild(lBtn);
		parentRow.appendChild(col3_1);
	}
	

	this.createHtml = function( nr_of_players ){
		for(i=0; i<nr_of_players; i++){
			//container for it all, might be unecessary 
			var container = document.createElement('div');
			container.className = 'container';

			var col1_2 = document.createElement('div');
			col1_2.className = 'col-md-4';

			//ship img
			var row2_1 = document.createElement('div');
			row2_1.className = 'row';
			var img = document.createElement('img');
			img.src = 'images/ships/ship_green.png';
			img.setAttribute('id', 'boatImg' + i);
			row2_1.appendChild(img);

			col1_2.appendChild(row2_1);

			//select ship controls
			var row2_2 = document.createElement('div');
			row2_2.className = 'row';
			
			this.createArrowBtn(i,"<--",row2_2);
			this.createArrowBtn(i,"-->",row2_2);

			col1_2.appendChild(row2_2);

			container.appendChild(col1_2);

			var col1_1 = document.createElement('div');
			col1_1.className = 'col-md-8';

			var row2_1 = document.createElement('div');
			row2_1.className = 'row';

			var col3_1 = document.createElement('div');
			col3_1.className = 'col-md-10';
			//name input
			var input = document.createElement('input');
			input.className = 'form-control';
			input.placeholder = 'Player Name ' + (i+1) ;
			input.setAttribute('id', 'input' + i);
			col3_1.appendChild(input);
			row2_1.appendChild(col3_1);

			var col3_2 = document.createElement('div');
			col3_2.className = 'col-md-2';
			//exit button
			var btn = document.createElement('button');
			btn.className='btn btn-danger';
			btn.setAttribute('id', 'xBtn' + i);
			var txt = document.createTextNode('X');
			btn.appendChild(txt);
			col3_2.appendChild(btn);
			row2_1.appendChild(col3_2);
			col1_1.appendChild(row2_1);

			var row2_2 = document.createElement('div');
			row2_2.className = 'row';
			
			//left right shoot, text and buttons
			this.createBtn(i,row2_2,"Left","A");
			this.createBtn(i,row2_2,"Shoot","W");
			this.createBtn(i,row2_2,"Right","D");

			col1_1.appendChild(row2_2);

			container.appendChild(col1_1);

			document.getElementById('view2_selections').appendChild(container);
		}
		
		
		for(j=0; j<(4-nr_of_players); j++){
			//container for it all, might be unecessary
			var container = document.createElement('div');
			container.className = 'container';

			var col1_2 = document.createElement('div');
			col1_2.className = 'col-md-4';

			//ship img
			var row2_1 = document.createElement('div');
			row2_1.className = 'row';
			var img = document.createElement('img');
			img.src = 'images/ships/ship_green.png';
			img.setAttribute('id', 'boatImg' + i);
			row2_1.appendChild(img);

			col1_2.appendChild(row2_1);

			//select ship controls
			var row2_2 = document.createElement('div');
			row2_2.className = 'row';

			//createArrowBtn = function(id,direction,parentRow)
			//left arrow button
			this.createArrowBtn(i,"<--",row2_2);
			this.createArrowBtn(i,"-->",row2_2);

			col1_2.appendChild(row2_2);

			container.appendChild(col1_2);

			var col1_1 = document.createElement('div');
			col1_1.className = 'col-md-8';

			var row2_1 = document.createElement('div');
			row2_1.className = 'row';

			var col3_1 = document.createElement('div');
			col3_1.className = 'col-md-12';
				//add player button
			var addBtn = document.createElement('button');
			addBtn.className = 'btn btn-primary addy';
			addBtn.setAttribute('id', 'addPlayerBtn' + j);
			var buttonText = document.createTextNode('Add Player ' + (4-j));
			addBtn.appendChild(buttonText);
			col3_1.appendChild(addBtn);
			row2_1.appendChild(col3_1);
			col1_1.appendChild(row2_1);

			var row2_2 = document.createElement('div');
			row2_2.className = 'row';
			//left right shoot, text and buttons

			this.createBtn(i,row2_2,"Left","A");
			this.createBtn(i,row2_2,"Shoot","W");
			this.createBtn(i,row2_2,"Right","D");

			col1_1.appendChild(row2_2);

			container.appendChild(col1_1);

			document.getElementById('view2_selections').appendChild(container);
		}

	}

	//create the view instantly so the buttons are possible to find?
	//this.createHtml(4);

	/*
	this.startButton = document.createElement('button');
	this.startButton.className = 'btn btn-primary';
	var buttonText = document.createTextNode('Start Game');
	this.startButton.appendChild(buttonText);

	this.backButton = document.createElement('button');
	this.startButton.className = 'btn btn-primary';
	var buttonText = document.createTextNode('Start Game');
	this.startButton.appendChild(buttonText);

	document.getElementById('view2').appendChild(this.startButton);
	document.getElementById('view2').appendChild(this.startButton);
	*/

}