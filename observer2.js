// Devera contar o numero de vezes que o gatilho é 
// chamado e passar como parametro de evento
// Devera ter funcao para adicionar listeners
// Devera executar todos os listeners adicionados
// quando o gatilho for acionado

var listeners = [];

function Counter() {
	var count = 0;
	return { 
		count: count,
		contar: function() {
			this.count++;	
		} 
	};
}

function ObserverCounter() {
	var counter = Counter();

	return {
		adicionarOuvinte: function(func) {
			listeners.push(func);
		},
		executar: function() {
			counter.contar();
			listeners.forEach(function(func) {
				func(counter.count);
			});
		}
	}
}

var Observer = ObserverCounter(); 

function helloWorld(count) {
	console.log('Hello world, observer: ', count);
}

Observer.adicionarOuvinte(helloWorld);
Observer.executar();
Observer.executar();
