import {
	ActionFunctionArgs,
	Form,
	redirect,
	useFetcher,
	useNavigate,
} from "react-router-dom";
import type { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
	product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
	if (params.id !== undefined) {
		await deleteProduct(+params.id);
		return redirect("/");
	}
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const fetcher = useFetcher();
	const navigate = useNavigate();
	const isAvailable = product.availability;

	return (
		<tr className="border-b ">
			<td className="p-3 text-lg text-gray-800">{product.name}</td>
			<td className="p-3 text-lg text-gray-800">
				{formatCurrency(product.price)}
			</td>
			<td className="p-3 text-lg text-gray-800">
				<fetcher.Form method="POST">
					<button
						type="submit"
						name="id"
						value={product.id}
						className={`${
							isAvailable ? "text-green-500" : "text-red-600"
						} rounded-lg p-2 text-sm font-bold w-full border border-neutral-200 hover:cursor-pointer`}
					>
						{isAvailable ? "Disponible" : "No disponible"}{" "}
					</button>
				</fetcher.Form>
			</td>
			<td className="p-3 text-lg text-gray-800 ">
				<div className="flex gap-2 items-center">
					<button
						onClick={() =>
							navigate(`/productos/${product.id}/editar`, {
								state: { product },
							})
						}
						className="bg-indigo-600 text-white rounded-lg w-full p-2 font-bold text-xs text-center"
					>
						Editar
					</button>

					<Form
						className="w-full"
						method="POST"
						action={`productos/${product.id}/eliminar`}
						onSubmit={(e) => {
							if (!confirm("¿Estás seguro?")) {
								e.preventDefault();
							}
						}}
					>
						<input
							className="bg-red-600 hover:cursor-pointer text-white rounded-lg w-full p-2 font-bold text-xs text-center"
							type="submit"
							value={"Eliminar"}
						/>
					</Form>
				</div>
			</td>
		</tr>
	);
}
