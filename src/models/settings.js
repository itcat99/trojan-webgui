const axios = require("axios");

export default {
  namespace: "settings",
  state: "",
  reducer: {
    update: (state, payload) => payload,
  },
  effect: {
    getRules: async (_payload, actions) => {
      try {
        const result = await axios.get("/api/customRules");
        const { msg } = result.data;

        actions.settings.update(msg);
      } catch (error) {
        throw new Error(error);
      }
    },
    updateRules: async payload => {
      try {
        await axios.post("/api/updateRules", {
          rules: payload,
        });
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
