
import { useState } from 'react';
import { Upload } from 'lucide-react';
import {
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog } from "@/components/ui/dialog";

interface ImportDialogProps {
  onImport: (pairs: { term: string; definition: string }[]) => void;
}

export const ImportDialog = ({ onImport }: ImportDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [termDefinitionSeparator, setTermDefinitionSeparator] = useState('custom');
  const [rowSeparator, setRowSeparator] = useState('newline');
  const [customTermDefSep, setCustomTermDefSep] = useState(' = ');
  const [customRowSep, setCustomRowSep] = useState('');

  const handleImport = () => {
    if (!importText.trim()) return;
    let termDefSep = '\t';
    if (termDefinitionSeparator === 'comma') termDefSep = ',';
    else if (termDefinitionSeparator === 'custom') termDefSep = customTermDefSep;
    let rowSep = '\n';
    if (rowSeparator === 'semicolon') rowSep = ';';
    else if (rowSeparator === 'custom') rowSep = customRowSep;
    const rows = importText.split(rowSep).filter(row => row.trim());
    const pairs = rows.map(row => {
      const [term, ...defParts] = row.split(termDefSep);
      return { term: term?.trim() || '', definition: defParts.join(termDefSep)?.trim() || '' };
    }).filter(pair => pair.term && pair.definition);
    onImport(pairs);
    setIsOpen(false);
    setImportText('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="glass-button px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2 hover:text-primary transition-colors">
          <Upload size={16} />
          Begrippen importeren
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-50 bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 bg-white/15 backdrop-blur-xl border border-white/25 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-primary">Begrippen en definities importeren</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-primary/80">Tussen begrip en definitie</h4>
                <RadioGroup value={termDefinitionSeparator} onValueChange={setTermDefinitionSeparator} className="space-y-2">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="tab" id="tab" className="border-white/30 text-primary" /><label htmlFor="tab" className="text-sm text-gray-300 cursor-pointer">Tab</label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="comma" id="comma" className="border-white/30 text-primary" /><label htmlFor="comma" className="text-sm text-gray-300 cursor-pointer">Komma</label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="custom" id="termCustom" className="border-white/30 text-primary" /><label htmlFor="termCustom" className="text-sm text-gray-300 cursor-pointer">Aangepast</label></div>
                </RadioGroup>
                {termDefinitionSeparator === 'custom' && (
                  <input type="text" placeholder="Voer scheidingsteken in" value={customTermDefSep} onChange={(e) => setCustomTermDefSep(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/25 text-white placeholder-gray-400 text-sm focus:border-primary focus:bg-white/15 focus:outline-none backdrop-blur-sm" />
                )}
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-primary/80">Tussen rijen</h4>
                <RadioGroup value={rowSeparator} onValueChange={setRowSeparator} className="space-y-2">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="newline" id="newline" className="border-white/30 text-primary" /><label htmlFor="newline" className="text-sm text-gray-300 cursor-pointer">Nieuwe regel</label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="semicolon" id="semicolon" className="border-white/30 text-primary" /><label htmlFor="semicolon" className="text-sm text-gray-300 cursor-pointer">Puntkomma</label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="custom" id="rowCustom" className="border-white/30 text-primary" /><label htmlFor="rowCustom" className="text-sm text-gray-300 cursor-pointer">Aangepast</label></div>
                </RadioGroup>
                {rowSeparator === 'custom' && (
                  <input type="text" placeholder="Voer scheidingsteken in" value={customRowSep} onChange={(e) => setCustomRowSep(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/25 text-white placeholder-gray-400 text-sm focus:border-primary focus:bg-white/15 focus:outline-none backdrop-blur-sm" />
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary/80">Plak je begrippen en definities</label>
              <textarea value={importText} onChange={(e) => setImportText(e.target.value)} placeholder="Voorbeeld:&#10;appel = een rood of groen fruit&#10;banaan = een geel tropisch fruit" className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/25 text-white placeholder-gray-400 text-sm focus:border-primary focus:bg-white/15 focus:outline-none backdrop-blur-sm min-h-32 resize-none" />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsOpen(false)} className="glass-button px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors">Annuleren</button>
              <button onClick={handleImport} disabled={!importText.trim()} className="glass-button px-4 py-2 rounded-lg text-white font-semibold hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Importeren</button>
            </div>
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
