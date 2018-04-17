//View Object constructor
var View2 = function (model) {
	this.startButton = $("#view2_startBtn");
	this.backButton = $("#view2_backBtn");
	var keys = [["A","W","D"],["F","T","H"],["J","I","L"],["Numpad4","Numpad8","Numpad6"]];

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
		btn1.disabled = true;
		
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
		lBtn.setAttribute('id', 'changeShipBtn' +direction+ id);
		
		var lTxt = document.createTextNode(direction);
		lBtn.appendChild(lTxt);
		
		col3_1.appendChild(lBtn);
		parentRow.appendChild(col3_1);
	}

	this.addPlayer = function( playerIndex ){
		var parent = document.getElementById('addPlayerBtn'+playerIndex).parentElement;
		//remove add player button
		while(parent.firstChild){
			parent.removeChild(parent.firstChild);
		}

		//create the input field and x button

		var col3_1 = document.createElement('div');
			col3_1.className = 'col-md-10';
			//name input
			var input = document.createElement('input');
			input.className = 'form-control';
			input.placeholder = 'Player Name ' + (playerIndex+1) ;
			input.setAttribute('id', 'input' + playerIndex);
			col3_1.appendChild(input);
			parent.appendChild(col3_1);

			var col3_2 = document.createElement('div');
			col3_2.className = 'col-md-2';
			//exit button
			var btn = document.createElement('button');
			btn.className='btn btn-danger';
			btn.setAttribute('id', 'xBtn' + playerIndex);
			var txt = document.createTextNode('X');
			btn.appendChild(txt);
			col3_2.appendChild(btn);
			parent.appendChild(col3_2);
	}
	
	this.deletePlayer = function( playerIndex ){
		var parent = document.getElementById('input'+playerIndex).parentElement.parentElement;
		//remove the input and x button
		while(parent.firstChild){
			parent.removeChild(parent.firstChild);
		}

		//create the add button
		var addBtn = document.createElement('button');
			addBtn.className = 'btn btn-primary addy';
			addBtn.setAttribute('id', 'addPlayerBtn' + playerIndex);
			var buttonText = document.createTextNode('Add Player ' + ( playerIndex + 1));
			addBtn.appendChild(buttonText);
		parent.appendChild(addBtn);

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
			img.src = 'images/ships/ship_pattern'+i+'.png';
			img.setAttribute('id', 'boatImg' + i);
			row2_1.appendChild(img);

			col1_2.appendChild(row2_1);

			//select ship controls
			var row2_2 = document.createElement('div');
			row2_2.className = 'row';
			
			this.createArrowBtn(i,"Left",row2_2);
			this.createArrowBtn(i,"Right",row2_2);

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
			this.createBtn(i,row2_2,"Left",keys[i][0]);
			this.createBtn(i,row2_2,"Shoot",keys[i][1]);
			this.createBtn(i,row2_2,"Right",keys[i][2]);

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
			img.src = 'images/ships/ship_pattern13.png';
			img.setAttribute('id', 'boatImg' + i);
			row2_1.appendChild(img);

			col1_2.appendChild(row2_1);

			//select ship controls
			var row2_2 = document.createElement('div');
			row2_2.className = 'row';

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
			var buttonText = document.createTextNode('Add Player ' + ( nr_of_players + j + 1 ));
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
}