import NavigationHeader from '../NavigationHeader';

export default function NavigationHeaderExample() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold p-6">Navigation Header</h3>
      <NavigationHeader />
      <div className="p-6 text-sm text-muted-foreground">
        Glassmorphism header with responsive navigation, language selector, and prominent panic button
      </div>
    </div>
  );
}