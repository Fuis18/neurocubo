// src/app/juego/[param]/page.tsx
"use client";
import { use } from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getModulos, Modulo } from "@/data/bigdata";

export default function Page({
	params,
}: {
	params: Promise<{ param: string }>;
}) {
	const [mods, setMods] = useState<Modulo[]>([]);

	useEffect(() => {
		setMods(getModulos());
	}, []);

	const { param } = use(params);
	const key = `game/${param}`;
	const juego = mods.find((m) => m.link === key);
	// const juego: false | { name: string; score: string } = false;

	if (!juego) {
		return (
			<main className="p-6 max-w-xl mx-auto">
				<h2 className="text-xl font-bold mb-4">Módulo no encontrado</h2>
				<p className="text-gray-600">El módulo solicitado no existe.</p>
				<Link href="/" className="mt-4 inline-block text-blue-500">
					Volver al inicio
				</Link>
			</main>
		);
	}

	return (
		<main className="p-6 max-w-xl mx-auto">
			<h2 className="text-xl font-bold mb-4">{juego.name}</h2>

			<div className="bg-white p-4 rounded shadow mb-6">
				<p className="text-gray-700 text-lg">Progreso actual:</p>
				<div className="w-full bg-gray-200 rounded-full h-4 mt-2">
					<div
						className="bg-blue-500 h-4 rounded-full"
						style={{ width: `${juego.score}%` }}
					/>
				</div>
				<p className="text-sm text-gray-600 mt-2">
					Puntuación: {juego.score}%
				</p>
			</div>

			<div className="flex justify-between gap-2">
				<button className="flex-1 bg-green-500 text-white py-2 rounded">
					Jugar
				</button>
				<button className="flex-1 bg-yellow-500 text-white py-2 rounded">
					Pausar
				</button>
				<button className="flex-1 bg-red-500 text-white py-2 rounded">
					Terminar
				</button>
			</div>
		</main>
	);
}
