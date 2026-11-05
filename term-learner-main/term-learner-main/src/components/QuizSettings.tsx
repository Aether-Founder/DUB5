
import { useState } from 'react';
import { Settings, BarChart3 } from 'lucide-react';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface QuizSettingsData {
  showAnswer: boolean;
  showAnswerOnHover: boolean;
  testMode: boolean;
}

interface QuizSettingsProps {
  settings: QuizSettingsData;
  onSettingsChange: (settings: QuizSettingsData) => void;
  onViewTestResults: () => void;
  hasTestData: boolean;
}

export const QuizSettings = ({ settings, onSettingsChange, onViewTestResults, hasTestData }: QuizSettingsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSettingChange = (key: keyof QuizSettingsData, value: boolean) => {
    let newSettings = { ...settings };
    if (key === 'showAnswer' && value) {
      newSettings = { ...settings, showAnswer: true, showAnswerOnHover: false };
    } else if (key === 'showAnswerOnHover' && value) {
      newSettings = { ...settings, showAnswer: false, showAnswerOnHover: true };
    } else {
      newSettings[key] = value;
    }
    onSettingsChange(newSettings);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="glass-button p-2 rounded-lg text-gray-300 hover:text-white transition-colors"><Settings size={20} /></button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 bg-white/15 backdrop-blur-xl border border-white/25 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-primary">Quiz-instellingen</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <label className="text-white font-medium">Antwoord tonen</label>
                  <span className="text-sm text-gray-400">Toon het antwoord onder de vraag</span>
                </div>
                <Switch checked={settings.showAnswer} onCheckedChange={(checked) => handleSettingChange('showAnswer', checked)} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <label className="text-white font-medium">Antwoord bij hover</label>
                  <span className="text-sm text-gray-400">Toon antwoord bij muisaanwijzing</span>
                </div>
                <Switch checked={settings.showAnswerOnHover} onCheckedChange={(checked) => handleSettingChange('showAnswerOnHover', checked)} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <label className="text-white font-medium">Testmodus</label>
                  <span className="text-sm text-gray-400">Houd foute antwoorden bij</span>
                </div>
                <Switch checked={settings.testMode} onCheckedChange={(checked) => handleSettingChange('testMode', checked)} />
              </div>
            </div>
            {settings.testMode && hasTestData && (
              <div className="border-t border-primary/20 pt-4">
                <Button onClick={() => { onViewTestResults(); setIsOpen(false); }} className="w-full glass-button flex items-center gap-2" variant="outline">
                  <BarChart3 size={16} />
                  Testresultaten bekijken
                </Button>
              </div>
            )}
          </div>
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            <span className="sr-only">Sluiten</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};
