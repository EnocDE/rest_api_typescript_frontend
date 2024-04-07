import axios from "axios";
import { safeParse } from "valibot";
import {
	DraftProductSchema,
	Product,
	ProductSchema,
	ProductsSchema,
} from "../types";
import { toBoolean } from "../utils";

type ProductData = {
	[k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
	try {
		// Se pasa el objeto editado para cambiar el tipo de dato de price
		const result = safeParse(DraftProductSchema, {
			name: data.name,
			price: +data.price,
		});

		if (result.success) {
			const url = `${import.meta.env.VITE_API_URL}/api/products`;
			await axios(url, {
				method: "POST",
				data: {
					name: result.output.name,
					price: result.output.price,
				},
			});
		} else {
			throw new Error("Datos no válidos");
		}
	} catch (error) {
		console.log(error);
	}
}

export async function getProducts() {
	try {
		const url = `${import.meta.env.VITE_API_URL}/api/products`;
		const { data } = await axios(url);

		const result = safeParse(ProductsSchema, data.data);

		if (result.success) {
			return result.output;
		} else {
			throw new Error("Hubo un error");
		}
	} catch (error) {
		console.log(error);
	}
}

export async function getProductById(id: Product["id"]) {
	try {
		const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
		const { data } = await axios(url);

		const result = safeParse(ProductSchema, data.data);

		if (result.success) {
			return result.output;
		} else {
			throw new Error("Hubo un error");
		}
	} catch (error) {
		console.log(error);
	}
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
	try {
		const result = safeParse(ProductSchema, {
			id,
			name: data.name,
			price: +data.price,
			availability: toBoolean(data.availability.toString()),
		});

		if (result.success) {
			const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
			await axios(url, { method: "PUT", data: result.output });
		}
	} catch (error) {
		console.log(error);
	}
}

export async function deleteProduct(id: Product["id"]) {
	try {
		const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios(url, {method: "DELETE", data: {id}})
  
	} catch (error) {
		console.log(error);
	}
}

export async function updateProductAvailability(id: Product['id']) {
  try {
		const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios(url, {method: "PATCH", data: {id}})
  
	} catch (error) {
		console.log(error);
	}
}