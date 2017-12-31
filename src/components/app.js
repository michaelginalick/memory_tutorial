((() => {
  const html = `
    <div class="wrapper">
      <div v-for="(tile, index) in tiles" 
        v-bind:key="tile.id" 
        v-bind:class="{black_active: !tile.showFace }"
        class="box"
         @click="handleClick(tile)">
          {{tile.id}}
      </div>
    </div>
  `

  Vue.component("app", {
    template: html,

    data() {
      return {
        tiles: [],
      }
    },

    mounted() {
      this.populateBoard()
    },


    methods: {
      populateBoard() {
        for(let i = 0; i <= 23; i++) {
          this.tiles.push({id: i, showFace: false})
        }
      },

      handleClick(tile) {
        tile.showFace = true
        
        setTimeout(function() {
          tile.showFace = false
        }, 2000)
        
      }
    }

  })
}))()
