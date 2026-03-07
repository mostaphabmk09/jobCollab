"use client";

import { useState, useEffect } from "react";

export default function SousLocationPage() {

const [form, setForm] = useState({
city: "",
district: "",
propertyType: "",
rooms: "",
maxRent: "",
exploitation: "",
revenue: "",
gestion: "",
title: "",
description: ""
});

const [tags, setTags] = useState<string[]>([]);
const [showStickyProgress, setShowStickyProgress] = useState(false);

useEffect(() => {

const handleScroll = () => {
setShowStickyProgress(window.scrollY > 200);
};

window.addEventListener("scroll", handleScroll);

return () => window.removeEventListener("scroll", handleScroll);

}, []);

const handleChange = (e:any) => {
setForm({
...form,
[e.target.name]: e.target.value
});
};

const toggleTag = (tag:string) => {

if(tags.includes(tag)){
setTags(tags.filter(t => t !== tag));
}
else if(tags.length < 3){
setTags([...tags, tag]);
}

};

const availableTags = [
"Paiement garanti",
"Gestion professionnelle",
"Expérience Airbnb",
"Optimisation revenus",
"Projet long terme",
"Partenaire sérieux"
];

/* progress calculation */

const filledFields = [
form.city,
form.propertyType,
form.rooms,
form.maxRent,
form.exploitation,
form.title,
form.description
].filter(Boolean).length;

const totalFields = 7;

const progress = Math.round((filledFields / totalFields) * 100);

const progressColor =
progress < 40
? "bg-red-400"
: progress < 70
? "bg-yellow-400"
: "bg-green-500";

return (

<div className="bg-gray-50 min-h-screen py-10 px-6">

{/* MINI STICKY PROGRESS */}

{showStickyProgress && (

<div className="fixed top-16 left-0 w-full bg-white border-b z-50 px-6 py-2">

<div className="max-w-7xl mx-auto flex items-center gap-4">

<span className="text-xs text-gray-500">
Progression {progress}%
</span>

<div className="flex-1 bg-gray-200 h-1.5 rounded-full">

<div
className={`h-1.5 rounded-full ${progressColor}`}
style={{ width: `${progress}%` }}
/>

</div>

</div>

</div>

)}

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
Recherche appartement pour sous-location
</h1>

<p className="text-sm text-gray-500 mt-1">
Publiez une annonce pour trouver un propriétaire prêt à louer son bien pour exploitation Airbnb.
</p>

</div>

{/* PROGRESS */}

<div className="bg-gray-50 border border-gray-100 rounded-xl p-4">

<div className="flex justify-between text-xs text-gray-500 mb-2">
<span>Complétude de l'annonce</span>
<span>{progress}%</span>
</div>

<div className="bg-gray-200 rounded-full h-2">

<div
className={`h-2 rounded-full ${progressColor}`}
style={{ width: `${progress}%` }}
/>

</div>

<p className="text-xs text-gray-400 mt-2">
Complétez votre annonce pour améliorer sa visibilité.
</p>

</div>

{/* BIEN RECHERCHÉ */}

<div>

<h2 className="text-sm font-semibold mb-4">
Bien recherché
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
name="district"
placeholder="Quartier"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
/>

<select
name="propertyType"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
>
<option value="">Type de bien</option>
<option>Peu importe</option>
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
<option>Peu importe</option>
<option>Studio</option>
<option>1 chambre</option>
<option>2 chambres</option>
<option>3 chambres</option>
<option>4+</option>
</select>

</div>

</div>

<hr className="border-gray-100"/>

{/* BUDGET */}

<div>

<h2 className="text-sm font-semibold mb-4">
Budget location
</h2>

<select
name="maxRent"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full"
>
<option value="">Loyer maximum</option>
<option>3000 - 5000 DH</option>
<option>5000 - 8000 DH</option>
<option>8000 - 12000 DH</option>
<option>12000+ DH</option>
</select>

</div>

{/* EXPLOITATION */}

<div className="grid md:grid-cols-2 gap-4">

<select
name="exploitation"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
>
<option value="">Type exploitation</option>
<option>Airbnb</option>
<option>Location courte durée</option>
<option>Mixte</option>
</select>

<select
name="revenue"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
>
<option value="">Revenu estimé</option>
<option>Je ne sais pas</option>
<option>10k - 20k</option>
<option>20k - 40k</option>
<option>40k+</option>
</select>

</div>

{/* TAGS */}

<div>

<h2 className="text-sm font-semibold mb-1">
Mettez en avant votre projet
</h2>

<p className="text-xs text-gray-400 mb-4">
Sélectionnez jusqu’à 3 éléments qui seront affichés sur votre annonce.
</p>

<div className="flex flex-wrap gap-2">

{availableTags.map(tag => (

<button
key={tag}
type="button"
onClick={() => toggleTag(tag)}
className={`px-3 py-1 text-xs rounded-full border
${tags.includes(tag)
? "bg-blue-100 text-blue-700 border-blue-200"
: "bg-gray-100 text-gray-600 border-gray-200"}`}
>

{tag}

</button>

))}

</div>

</div>

{/* DESCRIPTION */}

<div>

<input
name="title"
placeholder="Titre de l’annonce"
onChange={handleChange}
className="border border-gray-200 rounded-lg px-3 py-2 text-sm w-full mb-3"
/>

<textarea
name="description"
rows={4}
placeholder="Décrivez votre recherche..."
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
Aperçu de l'annonce
</p>

<div className="space-y-2 text-sm">

{form.city && <p>Ville : {form.city}</p>}
{form.propertyType && <p>Type : {form.propertyType}</p>}
{form.rooms && <p>Chambres : {form.rooms}</p>}
{form.maxRent && <p>Loyer max : {form.maxRent}</p>}

{tags.length > 0 && (

<div className="flex flex-wrap gap-2 pt-2">

{tags.map(tag => (

<span
key={tag}
className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
>

{tag}

</span>

))}

</div>

)}

</div>

</div>

</div>

</div>

</div>

);
}