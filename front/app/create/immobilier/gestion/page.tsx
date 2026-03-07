"use client";

import { useState } from "react";

export default function GestionAirbnbPage() {

const [form, setForm] = useState({
city: "",
district: "",
propertyType: "",
rooms: "",
revenue: "",
managementType: "",
commission: "",
airbnbLink: "",
title: "",
description: ""
});

const handleChange = (e:any) => {
setForm({
...form,
[e.target.name]: e.target.value
});
};

const getManagementDescription = () => {

if (form.managementType === "complete")
return "Le partenaire gère entièrement le bien : annonce, voyageurs, check-in et optimisation.";

if (form.managementType === "cohost")
return "Le partenaire vous aide dans certaines tâches (messages, optimisation ou calendrier).";

if (form.managementType === "discuss")
return "Les modalités de gestion seront définies avec le partenaire intéressé.";

return "";

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
Gestion Airbnb
</h1>

<p className="text-sm text-gray-500 mt-1">
Trouvez un partenaire pour gérer votre bien en location courte durée.
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

<input
type="text"
name="district"
placeholder="Quartier (optionnel)"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
/>

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
</select>

<select
name="rooms"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
>
<option value="">Chambres</option>
<option>Studio</option>
<option>1 chambre</option>
<option>2 chambres</option>
<option>3 chambres</option>
<option>4+</option>
</select>

</div>

</div>

<hr className="border-gray-100"/>

{/* AIRBNB MANAGEMENT */}

<div className="space-y-4">

<h2 className="text-sm font-semibold">
Gestion Airbnb
</h2>

<select
name="revenue"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
>

<option value="">Revenu mensuel estimé</option>
<option>Je ne sais pas</option>
<option>Moins de 10 000 DH</option>
<option>10 000 - 20 000 DH</option>
<option>20 000 - 40 000 DH</option>
<option>40 000+ DH</option>

</select>

<select
name="managementType"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
>

<option value="">Type de gestion</option>
<option value="complete">Gestion complète</option>
<option value="cohost">Co-host</option>
<option value="discuss">À discuter</option>

</select>

{form.managementType && (

<p className="text-xs text-gray-400">
{getManagementDescription()}
</p>

)}

{form.managementType !== "discuss" && form.managementType && (

<select
name="commission"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
>

<option value="">Commission</option>
<option>10%</option>
<option>15%</option>
<option>20%</option>
<option>25%</option>
<option>30%</option>

</select>

)}

<input
type="text"
name="airbnbLink"
placeholder="Lien Airbnb (optionnel)"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
/>

<p className="text-xs text-gray-400">
Ajoutez le lien si votre bien est déjà publié sur Airbnb.
</p>

</div>

<hr className="border-gray-100"/>

{/* DESCRIPTION */}

<div>

<h2 className="text-sm font-semibold mb-4">
Description
</h2>

<input
name="title"
placeholder="Titre de l’opportunité"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full mb-3"
/>

<textarea
name="description"
rows={4}
placeholder="Décrivez votre projet..."
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
/>

</div>

{/* BUTTON */}

<div className="flex justify-end pt-4 border-t border-gray-100">

<button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
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

{form.city && <p>Ville : {form.city}</p>}

{form.district && (
<p>Quartier : {form.district}</p>
)}

{form.propertyType && (
<p>Type : {form.propertyType}</p>
)}

{form.rooms && (
<p>Chambres : {form.rooms}</p>
)}

{form.revenue && (
<p>Revenu estimé : {form.revenue}</p>
)}

{form.managementType && (
<p>
Gestion :
{form.managementType === "complete" && " Gestion complète"}
{form.managementType === "cohost" && " Co-host"}
{form.managementType === "discuss" && " À discuter"}
</p>
)}

{form.managementType !== "discuss" && form.commission && (
<p>Commission : {form.commission}</p>
)}

</div>

</div>

</div>

</div>

</div>

);
}