import PanicButton from '../PanicButton';

export default function PanicButtonExample() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Panic Button Variants</h3>
        <div className="flex items-center gap-4">
          <PanicButton variant="header" />
          <PanicButton variant="large" />
        </div>
        <div className="text-sm text-muted-foreground">
          Floating variant is positioned fixed on screen
        </div>
      </div>
      <PanicButton variant="floating" />
    </div>
  );
}