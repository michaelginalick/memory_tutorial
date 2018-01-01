((() => {
  const html = `
    <div class="wrapper">
      <div v-for="(tile, index) in tiles" 
        v-bind:key="tile.id" 
        v-bind:class="{black_active: !tile.showFace }"
        class="box"
         @click="handleClick(tile)">
          {{tile.face.name}}
      </div>
    </div>
  `

  Vue.component("tile", {
    template: html,

    data() {
      return {
        
      }
    },

    mounted() {
      this.populateBoard()
    },

    props: {
      tiles: {
        type: Array,
        required: true
      },

      matchingOptions: {
        type: Array,
        required: true
      },

      guesses: {
        type: Array,
        required: true
      },
    },

    methods: {
      populateBoard() {

        for(let i = 0; i <= ((this.matchingOptions.length*2)-1); i++) {
          this.tiles.push({id: i, showFace: false, matched: false, face: this.getRandomElement() })
        }

        return this.tiles
      },

      getRandomElement() {

        let pairs = this.matchingOptions.filter(object => object.pairs >= 1)
        pairs = this.shuffleArray(pairs)
        let item = pairs[Math.floor(Math.random() * pairs.length)]
        this.itemToDecrement(item)

        return item
      },

      shuffleArray(array) {
        return _.shuffle(array)
      },

      itemToDecrement(item) {
        let decrementItem = this.matchingOptions.find(object => object.name === item.name)

        return this.matchingOptions[decrementItem.pairs-=1]
      },

      handleClick(tile) {
        if(tile.matched === true || !this.verifyNonDuplicateGuess(tile)) {return}
        this.$emit("compare-matches", tile)
      },

      verifyNonDuplicateGuess(tile) {
        if(this.guesses.length === 1 && this.guesses[0].id === tile.id ){ return false }
        return true
      },

    }

  })
}))()