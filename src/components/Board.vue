<template>
  <div class="tile-wrapper">
      <!-- <transition-group name="slide-fade" class="dice-section" tag="div"> -->
    <svg viewBox="-110 -200 3150 1800" style="max-width: 1200px;">
      <g transform="translate(0, 0)">
          <g class="grid">
              <Tile v-for="tile in flattenedTiles"
                    :value="tile.value" 
                    :resourceType="tile.resourceType"
                    :id="tile.id"
                    :rValue="tile.rValue"
                    :qValue="tile.qValue"
                    :key="tile.id">
              </Tile>
          </g>
      </g>
    </svg>

      <!-- </transition-group> -->
  </div>
</template>

<script>
import Tile from '@/components/Tile.vue';

export default {
  components: {
    Tile,
  },
  name: 'Board',
  data() {
    return {
      tiles: [[{
        id: 0,
        value: 5,
        resourceType: "brick"
      }, {
        id: 1,
        value: 2,
        resourceType: "wood"
      }],[ {
        id: 2,
        value: 5,
        resourceType: "wool"
      }, {
        id: 3,
        value: 2,
        resourceType: "ore"
      }, {
        id: 4,
        value: 5,
        resourceType: "wheat"
      }], [{
        id: 5,
        value: 2,
        resourceType: "sand"
      }, {
        id: 5,
        value: 2,
        resourceType: "sand"
      },]]
    };
  },
  mounted() {

  },
  computed: {
    flattenedTiles() {
      let flattenedTiles = [];

      for(let q = 0; q < this.tiles.length; q++) {
        for(let r = 0; r < this.tiles[q].length; r++) {
          let updatedTile = this.tiles[q][r];
          updatedTile.qValue = q;
          updatedTile.rValue = r;


          flattenedTiles.push(updatedTile);
        }
      }

      return flattenedTiles;
    }
  },
  methods: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
