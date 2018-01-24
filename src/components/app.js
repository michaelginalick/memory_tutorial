((() => {
  const html = `
    <div>
      <div id="myModal" class="modal" v-if="matchesLeft == 0">
        <!-- Modal content -->
        <div class="modal-content">
            <span>You win!</span><br>
           <input type="button" class="close" value="Play Again!" v-on:click="resetGame()"">
        </div>
      </div>
       <h1 style="margin-right:25%;">ROUND {{ level }}</h1>
       <h1 style="margin-right:25%;">Matches to go {{ matchesLeft }}</h1>
      <tile :tiles="tiles"
        :guesses="guesses"
        :matchingOptions="matchingOptions"
        @compare-matches="handleClickEventFromChild">
      </tile>
    </div>
  `

  Vue.component("app", {
    template: html,

    data() {
      return {
        tiles: [],
        matchingOptions: [
          {name: "Rails", pairs: 2},
          {name: "PHP", pairs: 2},
          {name: "Node", pairs: 2},
          {name: "React", pairs: 2},
          {name: "GoLang", pairs: 2},
          {name: "Lisp", pairs: 2},
          {name: "Perl", pairs: 2},
          {name: "Java", pairs: 2},
          {name: "C++", pairs: 2},
          {name: "C", pairs: 2},
          {name: "Ruby", pairs: 2},
          {name: "Python", pairs: 2},
        ],
        guesses: [],
        clickCount: 0,
        level: 1
      }
    },

    computed: {
      matchesLeft() {
        let matchesRemaining = 0
        let tilesLength = this.tiles.length

        for(let i = 0; i < tilesLength; i++) {
          if (this.tiles[i].matched == true) {
            ++matchesRemaining
          }
        }
        return ((tilesLength-matchesRemaining)/2)
      }
    },

    methods: {
      handleClickEventFromChild(tile) {

        tile.showFace = !tile.showFace
        ++this.clickCount
        this.guesses.push(tile)

        if(this.guesses.length > 1) {
          this.compareGuesses()
        }
      },

      compareGuesses() {
        const self = this

        if(this.guesses[0].face.name === this.guesses[1].face.name) {
          this.guesses[1].matched = true
          this.guesses[0].matched = true
          this.resetRound()
        } else {
          setTimeout(function() {
            self.resetRound()
          }, 500)
        }
      },

      resetRound() {
        this.clickCount = 0
        this.guesses = []
        ++this.level
        for(let i = 0; i < this.tiles.length; i++) {
          let tile = this.tiles[i]

          if (tile.showFace === true && tile.matched === false){
            this.tiles[i].showFace = false
          }
        }
      },

      resetGame() {

        this.clickCount = 0
        this.matchingOptions.forEach(function(element){
            element.pairs = 2;
        });
        this.level = 1
        this.guesses = []
        this.tiles = []

      },
    }

  })
}))()
