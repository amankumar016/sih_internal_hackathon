import LocationCard from '../LocationCard';

export default function LocationCardExample() {
  const mockNearbyPlaces = [
    {
      name: "Nohkalikai Falls",
      type: "attraction" as const,
      rating: 4.8,
      distance: "2.3 km",
      status: "open" as const,
    },
    {
      name: "Hotel Pine Hill",
      type: "hotel" as const,
      rating: 4.2,
      distance: "500 m", 
      price: "₹2,500/night",
    },
    {
      name: "Tourist Rescue Center",
      type: "rescue" as const,
      distance: "1.2 km",
      contact: "112",
      status: "24/7" as const,
    },
    {
      name: "Civil Hospital Shillong", 
      type: "hospital" as const,
      distance: "8.5 km",
      contact: "+91-364-222-2013",
      status: "24/7" as const,
    }
  ];

  const mockMustTry = [
    "Jadoh (Rice Dish)",
    "Dohneiiong (Pork Curry)", 
    "Tungrymbai",
    "Pukhlein (Rice Cake)"
  ];

  return (
    <div className="space-y-4 p-6 max-w-md">
      <h3 className="text-lg font-semibold">Location Information Card</h3>
      <LocationCard 
        currentLocation="Shillong, Meghalaya"
        nearbyPlaces={mockNearbyPlaces}
        mustTry={mockMustTry}
      />
    </div>
  );
}