<template>
  <g :transform="transformValue">
      <g :class="resourceTypeClass" class="tile">
          <polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon>
          <text dy="0.4em" transform="rotate(30)">
              <tspan class="q-coord">{{value}}</tspan>
          </text>
      </g>
  </g>      
</template>

<script>
export default {
  name: 'Tile',
  props: {
    id: Number,
    qValue: Number,
    rValue: Number,
    value: Number,
    resourceType: String,
    blocked: Boolean
  },
  computed: {
    resourceTypeClass() {
      return this.resourceType;
    },
    qOffset() {
      return 240  * this.qValue;
    },
    rOffset() {
      return 250 *   (3/4) * this.rValue;
    },
    transformValue() {
      return 'translate(' + this.qOffset + ',' + this.rOffset + ')';
    }
  }
};
</script>

<style scoped lang="scss">
.tile {
stroke: white;
font-size: 100px;

  &.brick {
    fill: #ca3e00;
  }

  &.wool {
    fill: yellowgreen;
  }

  &.ore {
    fill: #8a989e;
  }

  &.wheat {
    fill: #ffd441;
  }

  &.wood {
    fill: #057505;
  }

  &.sand {
    fill: tan;
  }
}

</style>
