function useRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
  data() {
    return {
      fuelBarValue: 100,
      distanceBarValue: 100,
      restrictGetFuel: 0,
      winner: null,
      winNumber: 0,
      lostNumber: 0,
      results: [],
    };
  },
  computed: {
    fuelBarStatus() {
      if (this.fuelBarValue < 0) {
        return { width: "0%" };
      }
      return {
        width: this.fuelBarValue + "%",
        backgroundColor: this.fuelBarValue < 50 ? "red" : "#04b42a",
      };
    },
    distanceBarStatus() {
      if (this.distanceBarValue < 0) {
        return { width: "0%" };
      }
      return { width: this.distanceBarValue + "%" };
    },
    getJustSomeFuel() {
      if (this.distanceBarValue >= 100) {
        return true;
      } else {
        if (this.restrictGetFuel > 3) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  watch: {
    fuelBarValue(value) {
      if (value <= 0 && this.distanceBarValue <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.lostNumber++;
        this.winner = "loser";
        this.results.push({
          fuelVal: 0,
          distanceVal: this.distanceBarValue,
        });
      }
    },
    distanceBarValue(value) {
      if (value <= 0 && this.fuelBarValue <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winNumber++;
        this.winner = "winner";
        this.results.push({
          fuelVal: this.fuelBarValue,
          distanceVal: 0,
        });
      }
    },
  },
  methods: {
    startGame() {
      this.fuelBarValue = 100;
      this.distanceBarValue = 100;
      this.restrictGetFuel = 0;
      this.winner = null;
      if (this.winNumber + this.lostNumber >= 10) {
        this.fuelBarValue = 100;
        this.distanceBarValue = 100;
        this.restrictGetFuel = 0;
        this.winNumber = 0;
        this.lostNumber = 0;
        this.winner = null;
        this.results = [];
      }
    },
    reduceDistance() {
      const usedValue = useRandomValue(5, 15);
      this.distanceBarValue -= usedValue;
    },
    fuelConsume() {
      const usedValue = useRandomValue(8, 13);
      this.fuelBarValue -= usedValue;
      this.reduceDistance();
    },
    goingFaster() {
      const usedValue = useRandomValue(10, 17);
      this.fuelBarValue -= usedValue;
      this.reduceDistance();
    },
    getFuel() {
      this.restrictGetFuel++;
      const usedValue = useRandomValue(8, 20);
      const addedValue = useRandomValue(8, 15);
      if (this.fuelBarValue + usedValue > 100) {
        this.fuelBarValue = 100;
      } else if (this.distanceBarValue + addedValue > 100) {
        this.distanceBarValue = 100;
      } else {
        this.fuelBarValue += usedValue;
        this.distanceBarValue += addedValue;
      }
    },
    burnAll() {
      const usedValue = useRandomValue(5, 25);
      this.fuelBarValue -= usedValue;
      this.reduceDistance();
    },
  },
});
app.mount("#game");
