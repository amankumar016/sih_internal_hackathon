import PoliceAlertCard from '../PoliceAlertCard';

export default function PoliceAlertCardExample() {
  const mockAlerts = [
    {
      id: "ALR-001",
      touristName: "Priya Sharma",
      type: "PANIC" as const,
      location: "Shillong Peak Trail, Meghalaya",
      timestamp: "2 min ago",
      status: "new" as const,
      priority: "critical" as const,
    },
    {
      id: "ALR-002", 
      touristName: "Rajesh Kumar",
      type: "GEOFENCE" as const,
      location: "Restricted Area, Kaziranga",
      timestamp: "15 min ago", 
      status: "acknowledged" as const,
      priority: "high" as const,
    },
    {
      id: "ALR-003",
      touristName: "Maria Rodriguez",
      type: "MEDICAL" as const,
      location: "Nohkalikai Falls Viewpoint",
      timestamp: "1 hour ago",
      status: "dispatched" as const,
      priority: "medium" as const,
    }
  ];

  return (
    <div className="space-y-4 p-6 max-w-lg">
      <h3 className="text-lg font-semibold">Police Alert Management</h3>
      <PoliceAlertCard alerts={mockAlerts} />
    </div>
  );
}