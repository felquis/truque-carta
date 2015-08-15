(function () {

  'use strict'

  var init = function () {

    var game = new Game()

    document.addEventListener('click', function (event) {
      // Inicia game
      if (!_.isUndefined(event.target.dataset.fnInitGame)) {
        game = new Game()
        game.renderColumns()
      }

      // Escolhe coluna
      if (!_.isUndefined(event.target.dataset.choseColumn)) {
        game.choseColumn(event.target.dataset.choseColumn)
      }
    })
  }

  init()
}())
