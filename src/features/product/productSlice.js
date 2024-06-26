import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { cloudinaryUpload } from "../../utils/cloudinary";

const initialState = {
  isLoading: false,
  error: null,
  updatedProduct: null,
  deletedProduct: null,
  selectedProduct: null,
  filteredProducts: null,
  numberOfProducts: 0,
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const updatedProduct = action.payload;
      state.updatedProduct = updatedProduct;
    },

    getProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedProduct = action.payload;
    },

    getFilteredProductsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.filteredProducts = action.payload;
      state.numberOfProducts = action.payload.count;
    },

    deleteProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.deletedProduct = action.payload;
      state.numberOfProducts -= 1;
    }
  },
});

export default slice.reducer;

export const updateProductDetail =
  ({
    id,
    title,
    description,
    category,
    stocks,
    price,
    image,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        title,
        description,
        category,
        stocks,
        price,
        image,
      };
      if (image instanceof File) {
        const imageUrl = await cloudinaryUpload(image);
        data.image = imageUrl;
      }
      const response = await apiService.put(`/admin/products/${id}`, data);
      dispatch(slice.actions.updateProductSuccess(response.data));
      toast.success("Update Detail successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getProduct = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/products/${id}`);
    dispatch(slice.actions.getProductSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const filterProduct = (filter) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/products", { params: filter });
    dispatch(slice.actions.getFilteredProductsSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.delete(`/admin/products/${id}`);
    dispatch(slice.actions.deleteProductSuccess(response.data.data));
    toast.success("Delete product successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};