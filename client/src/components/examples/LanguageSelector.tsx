import LanguageSelector from '../LanguageSelector';

export default function LanguageSelectorExample() {
  return (
    <div className="space-y-4 p-6">
      <h3 className="text-lg font-semibold">Language Selector</h3>
      <div className="bg-slate-800 p-4 rounded-lg">
        <LanguageSelector />
      </div>
      <p className="text-sm text-muted-foreground">
        Supports 13 Indian languages with native script display
      </p>
    </div>
  );
}