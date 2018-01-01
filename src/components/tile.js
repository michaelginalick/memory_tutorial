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
    },

    methods: {
      populateBoard() {

        for(let i = 0; i <= ((this.matchingOptions.length*2)-1); i++) {
          this.tiles.push({id: i, showFace: false, matched: false })
        }

        return this.tiles
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