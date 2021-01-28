var carros, index
let selecteds = []
let arrayIndex = []
let arrayIds = []
const table = document.querySelector("table");
const tbody = document.querySelector("tbody");
const formCadastro = document.getElementById('cadastraForm');
const formDelete = document.getElementById('deleteForm');
const formDeleteMany = document.getElementById('deleteManyForm');
const formEdit = document.getElementById('editForm');


const actions = "<a href='#editCarroModal' class='edit' data-toggle='modal' onclick='fillEditModal(this)'><i class='material-icons' data-toggle='tooltip' title='Edit'>&#xE254;</i></a><a href='#deleteCarroModal' class='delete' data-toggle='modal' onclick='getIndex(this)'><i class='material-icons' data-toggle='tooltip' title='Delete'>&#xE872;</i></a>"
const mark = "<span class='custom-checkbox'><input type='checkbox' name='options[]' value='1'><label for='checkbox1'></label></span>"


function jsRun(){
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();
	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		console.log("chegou")
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;                        
			});
		} else{
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});
}

// $(document).ready(function(){
	
	

// });






// Função que traz do banco as informações dos carros para popular a tabela

function getCars(){
	fetch("http://localhost:3333/cars/", {
		"method": "GET",
		"headers": {}
	})
	.then(response => {
		 response.json().then(response_json => {
			carros = response_json
			console.log(response_json)
		}).then( ()=>{
			generateCells(tbody, carros);
		});
	})
	.catch(err => {
		console.error(err);
	});
}

//Função que popula a tabela

function generateCells(table, data) {
	for (let element of data) {
		let row = table.insertRow();
		for (key in element) {
			let cell = row.insertCell();
			let text
			if (cell.cellIndex === 0){
				cell.innerHTML = mark
			}
			else if(cell.cellIndex === 5){
				cell.innerHTML = actions
			}
			else{
				text = document.createTextNode(element[key]);
				cell.appendChild(text);
			}
		}
	}
}


// Função que adiciona o carro

function addCarro(dataCar) {
	fetch("http://localhost:3333/cars", {
		"method": "POST",
		"headers": {
			"Content-Type": "application/json"
	},
		"body": "{\"marca\":\""+dataCar[0]+"\",\"modelo\":\""+dataCar[1]+"\",\"ano_fabricacao\":\""+dataCar[2]+"\",\"placa\":\""+dataCar[3]+"\"}"
	})
	.then(response => {
		response.json().then(response_json => {
			console.log(response_json)
		});
	})
	.catch(err => {
		console.error(err);
	});
}




//Função que deleta carro

function deleteCarro(id){
	fetch("http://localhost:3333/cars/"+id, {
		"method": "DELETE",
		"headers": {}
	})
	.then(response => {
		console.log(response);
	})
	.catch(err => {
		console.error(err);
	});
}



// Função que deleta os carros selecionados 
function deleteCarros(dataIds){
	fetch("http://localhost:3333/cars/", {
		"method": "DELETE",
		"headers": {
		"Content-Type": "application/json"
	},
	"body": JSON.stringify(dataIds)
	})
	.then(response => {
		console.log(response);
	})
	.catch(err => {
		console.error(err);
	});
}



function fillEditModal(element){

	getIndex(element);
	document.getElementById('editMarca').value = carros[index].marca;
	document.getElementById('editModelo').value = carros[index].modelo;
	document.getElementById('editAno').value = carros[index].ano_fabricacao;
	document.getElementById('editPlaca').value = carros[index].placa;

}


// Função que edita o carro

function editCarro(id,dataCar) {
	fetch("http://localhost:3333/cars/"+id, {
		"method": "PUT",
		"headers": {
			"Content-Type": "application/json"
	},
		"body": "{\"marca\":\""+dataCar[0]+"\",\"modelo\":\""+dataCar[1]+"\",\"ano_fabricacao\":\""+dataCar[2]+"\",\"placa\":\""+dataCar[3]+"\"}"
	})
	.then(response => {
		response.json().then(response_json => {
			console.log(response_json)
		});
	})
	.catch(err => {
		console.error(err);
	});
}

//Função que retorna o índice do item

function getIndex(element){
	index = element.parentElement.parentElement.rowIndex - 1;
	return index;
}

//Função que retorna o indice (para deletar muitos)
function getIndexes(element){
	index = element.parentElement.parentElement.parentElement.rowIndex - 1;
	return index;
}


window.onload = function() {
	jsRun();
	getCars();
	//EventListener do formulário de cadastro

	formCadastro.addEventListener('submit', function(event) {

		let dataCar = []

		let marca = document.getElementById('addMarca').value;
		let modelo = document.getElementById('addModelo').value;
		let ano = document.getElementById('addAno').value;
		let placa = document.getElementById('addPlaca').value;

		dataCar.push(marca,modelo,ano,placa)
		addCarro(dataCar);
		alert("Carro cadastrado com sucesso!!");
		document.location.reload();
		
	});

	//EventListener do formulário de exclusão

	formDelete.addEventListener('submit', function(event) {
		let idCarro = carros[index]._id;
		deleteCarro(idCarro);
		document.location.reload();
	});

	formEdit.addEventListener('submit', function(event) {
		let dataCar = []

		let marca = document.getElementById('editMarca').value;
		let modelo = document.getElementById('editModelo').value;
		let ano = document.getElementById('editAno').value;
		let placa = document.getElementById('editPlaca').value;

		dataCar.push(marca,modelo,ano,placa)

		let idCarro = carros[index]._id;
		// console.log(dataCar);
		console.log(idCarro);
		editCarro(idCarro,dataCar);
		alert("Carro editado com sucesso!!");
		document.location.reload();
		// event.preventDefault();
	});

	// formDeleteMany.addEventListener('submit', function(event) {
	// 	for (let item of checkboxes){
	// 		if (item.checked){
	// 		   selecteds.push(item);
	// 	   } 
	// 	}
		
	// 	for (let i of selecteds){
	// 		arrayIndex.push(getIndexes(i))
	// 	}
		
	// 	for (let i of arrayIndex){
	// 		idCarro = carros[i]._id;
	// 		arrayIds.push(idCarro);
	// 	}
	// 	oArrays = Object.assign({}, arrayIds)
	// 	deleteCarros(oArrays);
	// 	event.preventDefault();
	// });

	// formEdit.formDeleteMany.onload = function(){
	// 	let checkboxes = document.querySelectorAll("input[type=checkbox]")
	// }

}



 