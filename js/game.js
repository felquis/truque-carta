(function (global) {

  'use strict'

  function Game () {

    var self = this

    this.config = {
      cardsNumber: 21,
      columnsNumber: 3
    }

    this.turn = 1

    this.cartas = this.createCartas()

    this.columns = this.createColumns();

    return this
  }

  Game.prototype.createColumns = function (cartas) {

    // Sort indices randomly
    this.cartas = _.shuffle(cartas || this.cartas)

    this.columns = _.chunk(this.cartas, 7);

    return this.columns
  }

  Game.prototype.renderColumns = function (columns) {

    var self = this;

    columns = columns || this.columns

    var fragment = document.createDocumentFragment(),
        wrapper = document.createElement('div')

    wrapper.classList.add('ui-column-wrapper')

    // Cada coluna
    columns.forEach(function (column, i) {

      // UI Coluna
      let uiColumn = document.createElement('div')
      uiColumn.classList.add('ui-column')

        // Cada carta
        column.forEach(function (cardValue) {
          let uiCard = document.createElement('div');
          uiCard.classList.add('ui-card')
          uiCard.innerHTML = cardValue.numero

          uiColumn.appendChild(uiCard)
        })

      wrapper.appendChild(uiColumn)
    })

    self.removeElements()

    fragment.appendChild(wrapper)
    document.body.appendChild(fragment)
    self.Events.enter()
  }

  Game.prototype.removeElements = function () {
    var elements = [
      document.querySelector('.ui-column-wrapper'),
      document.querySelector('.ui-result-wrapper')
    ]

    _.forEach(elements, function (element) {
      if (!!element) {
        element.parentElement.removeChild(element)
      }
    });
  }

  // Coloca a coluna escolhida no meio do array de colunas
  Game.prototype.choseColumn = function (indice) {
    var columns = _.clone(this.columns)
    indice = Math.ceil(indice)

    var table = [];

    table[1] = columns.splice(indice, 1)[0]
    table[0] = columns.shift();
    table[2] = columns.pop();

    if (this.turn === 3) {
      this.columns = table
      this.distribuiCartas()
      this.mostraResultado(table)
    } else {
      this.turn = this.turn + 1
      this.columns = table
      this.distribuiCartas()
    }
  }

  Game.prototype.distribuiCartas = function () {
    var self = this
    var table = [[], [], []];

    var allCards = _.union(this.columns[0], this.columns[1], this.columns[2])

    allCards.forEach(function (value, i) {
      table[i % 3].push(value);
    })

    this.columns = table

    this.renderColumns()
  }

  Game.prototype.mostraResultado = function() {
    var allCards = _.union(this.columns[0], this.columns[1], this.columns[2])

    this.removeElements()

    var fragment = document.createDocumentFragment()
    var wrapper = document.createElement('div')

    wrapper.classList.add('ui-result-wrapper');

    var resultLabel = document.createElement('spam')
    resultLabel.classList.add('ui-result-label')

    var resultNumber = document.createElement('spam')
    resultNumber.classList.add('ui-result-label')

    resultNumber.innerHTML = allCards[10].numero
    resultLabel.innerHTML = 'Você escolheu'

    wrapper.appendChild(resultLabel)
    wrapper.appendChild(resultNumber)
    fragment.appendChild(wrapper)

    console.log(allCards[10])

    document.body.appendChild(fragment)
  }

  Game.prototype.restart = function () {
    this.cartas = this.createCartas()
    this.columns = this.createColumns()
  }

  Game.prototype.createCartas = function () {
    var self = this;

    let cartas = []

    // 20 cartas começando por 0, são 21 cartas
    for (let i = 0; i < self.config.cardsNumber; i++) {
      cartas.push({
        numero: i + 1
      })
    }

    return cartas
  }

  Game.prototype.Events = {};

  Game.prototype.Events.enter = function () {
    var uiCards = document.querySelectorAll('.ui-card');

    _.forEach(uiCards, function (card, i) {
      card.classList.add('ui-card-enter')
    })
  }

  global.Game = Game;
}(window))
