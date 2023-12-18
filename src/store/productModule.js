import operations from "@/api/operations";
import CyrillicToTranslit from "cyrillic-to-translit-js";
import LS from "@/localStorage/localStorage";

const cyrillicToTranslit = new CyrillicToTranslit();

export const productModule = {
  state: () => ({
    id: null,
    selectedProduct: null,
    translitFood: "",
    prodModal: false,
    loader: true,
    content: false,
    priceFood: 0,
    cart: [],
    lineIdCount: 0,
    cartTotal: 0,
    cartCount: 0,
  }),

  mutations: {
    setId(state, id) {
      state.id = id;
    },
    cartCount(state) {
      let count = 0;
      state.cart.forEach((item) => {
        count += item.amount;
      });

      state.cartCount = count > 0 ? count : false;
    },
    switchStateLoad(state) {
      state.loader ? (state.loader = false) : (state.loader = true);
      state.content ? (state.content = false) : (state.content = true);
      if (state.content && LS.getStorage("cartProduct") && LS.getStorage("lineIdCount")) {
        state.cart = LS.getStorage("cartProduct");
        state.lineIdCount = LS.getStorage("lineIdCount");
        state.cartTotal = LS.getStorage("cartTotal");
      }
    },
    setSelectedProduct(state, selectedProduct) {
      state.selectedProduct = selectedProduct;
      state.priceFood = selectedProduct.product.price;
      state.translitFood = cyrillicToTranslit
        .transform(selectedProduct.product.product_name.trimEnd(), "-")
        .toLowerCase();
    },

    switchProdModal(state) {
      state.prodModal ? (state.prodModal = false) : (state.prodModal = true);
      state.prodModal
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "visible");
      if (state.prodModal === false) {
        state.loader = true;
        state.content = false;
      }
    },

    //

    addToCartState(state, payload) {
      state.cart.push(payload);
      LS.setStorage("cartProduct", state.cart);
      state.lineIdCount = payload.line_id;
      LS.setStorage("lineIdCount", state.lineIdCount);

      /* const item_id = payload.item_id;
			const line_id = state.lineIdCount + 1;
			const product = state.product;
			const item = {
				line_id: line_id,
				item_id: item_id,
				product_name: product.product_name,
				weight: Math.round(product.weight * 1000),
				weight_unit: 'мл',
				amount: 1,
				price: product.price
			};

			state.cart.push(item);
			state.lineIdCount = line_id; */
    },

    //

    calculateCartTotal(state) {
      let total = 0;
      const cart = state.cart;
      cart.forEach((item) => {
        total += item.price * item.amount;
      });

      state.cartTotal = total;
      LS.setStorage("cartTotal", state.cartTotal);
    },

    changeAmount(state, payload) {
      const line_id = payload.line_id;
      const action = payload.action;
      const item = state.cart.find((item) => item.line_id === line_id);

      switch (action) {
        case "increase":
          item.amount++;
          LS.setStorage("cartProduct", state.cart);
          break;
        case "decrease":
          if (item.amount > 1) item.amount--;
          LS.setStorage("cartProduct", state.cart);
          break;
        default:
          // duh
          break;
      }
    },

    removeCartItem(state, payload) {
      const line_id = payload.line_id;
      state.cart = state.cart.filter((item) => item.line_id !== line_id);

      if (state.cart.length === 0) state.lineIdCount = 0;
      LS.setStorage("cartProduct", state.cart);
    },

    setCart(state, storage) {
      state.cart = storage;
    },
    setLineIdCount(state, storage) {
      state.lineIdCount = storage;
    },
    setCartTotal(state, storage) {
      state.cartTotal = storage;
    },
  },

  actions: {
    async getProduct({ commit }, params) {
      try {
        const { data } = await operations.getProduct(params);
        commit("setSelectedProduct", data);
        commit("switchStateLoad");
        return true;
      } catch (err) {
        console.log(err);
      }
      return false;
    },

    addToCart({ commit, state }, params) {
      console.log(params);
      const product = state.selectedProduct.product;
      const cart = state.cart;

      const line_id = state.lineIdCount + 1;
      let fields = {};

      fields.line_id = line_id;
      fields.type = "Product"; // Tmp
      fields.productId = product.guid;
      fields.name = product.product_name;
      fields.price = parseFloat(params.price);
      fields.amount = 1;
      fields.image = product.image;

      if (params.options !== undefined && params.options.length > 0) {
        fields.modifiers = [];
        params.options.forEach((optionId) => {
          const group = product.options.find((options) => {
            return options.values.some((value) => {
              return value.id == optionId;
            });
          });

          const option = group.values.find((value) => {
            return value.id == optionId;
          });

          const modifier = {
            productId: option.guid,
            name: option.name,
            amount: 1,
            productGroupId: group.guid,
            // groupName: group.name
          };

          fields.modifiers.push(modifier);

          if (option.price > 0) fields.price += parseFloat(option.price);
          console.log(fields.price, option.price);
        });
      }

      const item = cart.find((line) => {
        return (
          line.productId === fields.productId &&
          JSON.stringify(line.modifiers) === JSON.stringify(fields.modifiers)
        );
      });

      if (typeof item !== "undefined") {
        commit("changeAmount", {
          line_id: item.line_id,
          action: "increase",
        });
      } else {
        commit("addToCartState", fields);
      }

      commit("calculateCartTotal");
      commit("cartCount");
    },
  },
  namespaced: true,
};
