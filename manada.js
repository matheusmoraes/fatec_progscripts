var Animal = function() {
  this.fazerBarulho = function() {
    throw new Error('Método não implementado!'); 
  };
};

var Cao = function() {};
Cao.prototype = new Animal();
Cao.prototype.fazerBarulho = function() {
  return 'Au';
};

var Gato = function() {};
Gato.prototype = new Animal();
Gato.prototype.fazerBarulho = function() {
  return 'Miau';
};

var Manada = function() {
  this.animais = [];
  this.adicionar = function(animal) {
    this.animais.push(animal);
  };
};

var ManadaVirgula = function() {};
ManadaVirgula.prototype = new Manada();
ManadaVirgula.prototype.barulhos = function() {
  var todosBarulhos = [];
  this.animais.forEach(function(animal) {
    todosBarulhos.push(animal.fazerBarulho());
  }); 
  return todosBarulhos.join(', ');
};

var ManadaSustenido = function() {};
ManadaSustenido.prototype = new Manada();
ManadaSustenido.prototype.barulhos = function() {
  var todosBarulhos = [];
  this.animais.forEach(function(animal) {
    var barulho = animal.fazerBarulho();
    todosBarulhos.push(barulho);
    todosBarulhos.push(barulho);
  });
  return todosBarulhos.join('# ');
};

var manadaVirgula = new ManadaVirgula();
var manadaSustenidaDupla = new ManadaSustenido();
var animais = [new Cao(), new Gato()];

animais.forEach(function(animal) {
  manadaVirgula.adicionar(animal);
  manadaSustenidaDupla.adicionar(animal);
});

console.log(manadaVirgula.barulhos()); // Au, Miau
console.log(manadaSustenidaDupla.barulhos()); // Au# Au# Miau# Miau#




