((() => {
  const html = `
    <div class="wrapper">
      <div v-for="(tile, index) in tiles" v-bind:key="tile.id" class="box">{{tile.id}}</div>
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
          this.tiles.push({id: i})
        }
      }
    }

  })
}))()
