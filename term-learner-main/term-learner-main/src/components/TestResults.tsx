
import { useState } from 'react';
import { X, Clock, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WrongAnswer {
  term: string;
  definition: string;
  userAnswer: string;
  timestamp: number;
}

interface TestResultsProps {
  isOpen: boolean;
  onClose: () => void;
  wrongAnswers: WrongAnswer[];
  onClearData: () => void;
}

export const TestResults = ({ isOpen, onClose, wrongAnswers, onClearData }: TestResultsProps) => {
  const formatTime = (timestamp: number) => new Date(timestamp).toLocaleString('nl-NL');

  const groupedAnswers = wrongAnswers.reduce((acc, answer) => {
    const key = `${answer.term}-${answer.definition}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(answer);
    return acc;
  }, {} as Record<string, WrongAnswer[]>);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-container border-primary/20 max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary flex items-center gap-2">
            <AlertCircle size={20} />
            Testresultaten & Inzichten
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="glass-container rounded-lg p-4 bg-opacity-30">
            <h3 className="text-lg font-semibold text-white mb-2">Samenvatting</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-400">Totaal foute pogingen:</span><span className="text-white ml-2 font-semibold">{wrongAnswers.length}</span></div>
              <div><span className="text-gray-400">Unieke foute paren:</span><span className="text-white ml-2 font-semibold">{Object.keys(groupedAnswers).length}</span></div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Foute antwoorden per paar</h3>
            {Object.entries(groupedAnswers).map(([key, answers]) => (
              <div key={key} className="glass-container rounded-lg p-4 bg-opacity-20">
                <div className="mb-3">
                  <div className="text-primary font-semibold">{answers[0].term}</div>
                  <div className="text-gray-300">Correct: {answers[0].definition}</div>
                  <div className="text-red-300 text-sm">Foute pogingen: {answers.length}</div>
                </div>
                <div className="space-y-2">
                  {answers.map((answer, index) => (
                    <div key={index} className="text-sm bg-red-500/10 rounded p-2 border border-red-500/20">
                      <div className="text-red-300">Jouw antwoord: "{answer.userAnswer}"</div>
                      <div className="text-gray-400 flex items-center gap-1 mt-1"><Clock size={12} />{formatTime(answer.timestamp)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-4 border-t border-primary/20">
            <Button onClick={onClose} variant="outline" className="flex-1">Sluiten</Button>
            <Button onClick={() => { onClearData(); onClose(); }} variant="destructive" className="flex-1">Testgegevens wissen</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
