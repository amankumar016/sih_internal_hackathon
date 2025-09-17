import SafetyScoreWidget from '../SafetyScoreWidget';

export default function SafetyScoreWidgetExample() {
  return (
    <div className="space-y-6 p-6 max-w-md">
      <h3 className="text-lg font-semibold">Safety Score Widget</h3>
      <SafetyScoreWidget 
        score={25}
        location="Shillong, Meghalaya" 
        lastUpdated="2 min ago"
      />
      <SafetyScoreWidget 
        score={65}
        location="Manali, Himachal Pradesh" 
        lastUpdated="5 min ago"
      />
      <SafetyScoreWidget 
        score={85}
        location="Remote Mountain Area" 
        lastUpdated="1 hour ago"
      />
    </div>
  );
}