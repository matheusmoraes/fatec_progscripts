
var Observer = function() {
	this.funcs = [];
};

Observer.prototype.adicionarOuvinte = function(func) {
	func._contador = 0;
	this.funcs.push(func);
	console.log('added listener to func ' + func.toString());
};

Observer.prototype.executar = function() {
	this.funcs.forEach(function(func) {
		func._contador++;
		func();
		console.log(func._contador);
	});
};	

var contadorObserver = new Observer();

function hello() {
	console.log('Hello world, observer!');
}

contadorObserver.adicionarOuvinte(hello);

contadorObserver.executar();
contadorObserver.executar();
contadorObserver.executar();
