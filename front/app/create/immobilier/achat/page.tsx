"use client";

import { useState } from "react";

export default function AchatPage() {

const [mode, setMode] = useState("define");

const [form, setForm] = useState({
city: "",
propertyType: "",
purpose: "",
totalBudget: "",
partners: "",
title: "",
description: ""
});

const investment =
form.totalBudget && form.partners
? Number(form.totalBudget) / Number(form.partners)
: 0;

const handleChange = (e:any) => {
setForm({
...form,
[e.target.name]: e.target.value
});
};

return (

<div className="bg-gray-50 min-h-screen py-10 px-6">

<div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-8">

{/* FORM */}

<div className="md:col-span-8">

<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">

{/* HEADER */}

<div>

<p className="text-xs font-semibold text-orange-500 uppercase">
Immobilier
</p>

<h1 className="text-2xl font-semibold mt-1">
Créer une opportunité d'achat
</h1>

<p className="text-sm text-gray-500 mt-1">
Trouvez un partenaire pour investir dans un bien immobilier.
</p>

</div>

{/* PROPERTY INFO */}

<div>

<h2 className="text-sm font-semibold mb-4">
Informations du bien
</h2>

<div className="grid md:grid-cols-2 gap-4">

<select
name="city"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
>
<option value="">Ville</option>
<option>Casablanca</option>
<option>Marrakech</option>
<option>Rabat</option>
<option>Tanger</option>
<option>Agadir</option>
</select>

<select
name="propertyType"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
>
<option value="">Type de bien</option>
<option>Appartement</option>
<option>Villa</option>
<option>Riad</option>
<option>Studio</option>
<option>Terrain</option>
</select>

<select
name="purpose"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm md:col-span-2"
>
<option value="">Objectif du projet</option>
<option>Location longue durée</option>
<option>Location Airbnb</option>
<option>Achat pour revente</option>
<option>Projet mixte</option>
</select>

</div>

</div>

<hr className="border-gray-100"/>

{/* INVESTMENT */}

<div>

<h2 className="text-sm font-semibold mb-4">
Investissement
</h2>

<div className="flex gap-6 mb-6">

<label className="flex items-center gap-2 text-sm">

<input
type="radio"
checked={mode === "define"}
onChange={() => setMode("define")}
/>

Définir l’investissement

</label>

<label className="flex items-center gap-2 text-sm">

<input
type="radio"
checked={mode === "discuss"}
onChange={() => setMode("discuss")}
/>

Discuter avec le partenaire

</label>

</div>

{mode === "define" && (

<div className="grid md:grid-cols-2 gap-4">

<input
type="number"
name="totalBudget"
placeholder="Budget total"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
/>

<input
type="number"
name="partners"
placeholder="Nombre investisseurs"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
/>

</div>

)}

{/* CALCUL */}

{mode === "define" && investment > 0 && (

<div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">

<p className="text-xs text-blue-600 font-medium mb-1">
Calcul automatique
</p>

<p className="text-sm">

Chaque investisseur doit apporter

<span className="font-semibold ml-2">
{investment.toLocaleString()} DH
</span>

</p>

</div>

)}

{mode === "discuss" && (

<p className="text-sm text-gray-500">
Les conditions d’investissement seront discutées avec le partenaire.
</p>

)}

</div>

<hr className="border-gray-100"/>

{/* DESCRIPTION */}

<div>

<h2 className="text-sm font-semibold mb-4">
Description
</h2>

<div className="space-y-4">

<input
name="title"
placeholder="Titre de l’opportunité"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
/>

<textarea
name="description"
rows={4}
placeholder="Décrivez votre projet..."
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
/>

</div>

</div>

{/* BUTTON */}

<div className="flex justify-end pt-4 border-t border-gray-100">

<button
type="submit"
className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
>
Publier l’opportunité
</button>

</div>

</div>

</div>

{/* PREVIEW */}

<div className="md:col-span-4">

<div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">

<p className="text-xs text-gray-400 mb-3">
Aperçu de l'opportunité
</p>

<div className="space-y-3 text-sm">

{form.city && (
<p>
<span className="text-gray-500">Ville :</span> {form.city}
</p>
)}

{form.propertyType && (
<p>
<span className="text-gray-500">Type :</span> {form.propertyType}
</p>
)}

{form.purpose && (
<p>
<span className="text-gray-500">Objectif :</span> {form.purpose}
</p>
)}

{mode === "define" && form.totalBudget && (
<p>
<span className="text-gray-500">Budget :</span>{" "}
{Number(form.totalBudget).toLocaleString()} DH
</p>
)}

{mode === "define" && form.partners && (
<p>
<span className="text-gray-500">Investisseurs :</span> {form.partners}
</p>
)}

{mode === "define" && investment > 0 && (
<p className="font-medium">
Par partenaire : {investment.toLocaleString()} DH
</p>
)}

{mode === "discuss" && (
<p className="text-gray-500">
Investissement à discuter avec le partenaire
</p>
)}

</div>

</div>

</div>

</div>

</div>

);
}