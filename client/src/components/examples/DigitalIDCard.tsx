import DigitalIDCard from '../DigitalIDCard';

export default function DigitalIDCardExample() {
  return (
    <div className="space-y-6 p-6">
      <h3 className="text-lg font-semibold">Digital Tourist ID Card</h3>
      <div className="space-y-4 max-w-md">
        <DigitalIDCard 
          touristName="Rajesh Kumar Singh"
          touristId="GRD-2025-MH-8847"
          validUntil="Jan 15, 2025"
          currentLocation="Shillong, Meghalaya"
          emergencyContact="+91-9876543210"
          status="active"
        />
        <DigitalIDCard 
          touristName="Priya Sharma"
          touristId="GRD-2024-HP-3321"
          validUntil="Dec 28, 2024"
          currentLocation="Manali, Himachal Pradesh"
          emergencyContact="+91-8765432109"
          status="expired"
        />
      </div>
    </div>
  );
}