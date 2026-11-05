import { useState } from 'react';
import { useFileSystem } from '@/hooks/useFileSystem';

interface JsonLearningSet {
  name: string;
  pairs: string; // "term = def\nterm = def"
}

interface JsonFolder {
  name: string;
  learningSets: JsonLearningSet[];
}

interface ImportJson {
  folders: JsonFolder[];
}

export const JsonImportPanel = ({ onClose }: { onClose: () => void }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [status, setStatus] = useState('');
  const { createFolder, createLearningSet, addPairToSet } = useFileSystem();

  const handleApply = () => {
    try {
      const data: ImportJson = JSON.parse(jsonInput);
      if (!data.folders || !Array.isArray(data.folders)) {
        setStatus('Error: JSON must have a "folders" array');
        return;
      }

      let folderCount = 0;
      let setCount = 0;
      let pairCount = 0;

      for (const folder of data.folders) {
        const folderId = createFolder(folder.name, null);
        folderCount++;

        if (folder.learningSets && Array.isArray(folder.learningSets)) {
          for (const ls of folder.learningSets) {
            const setId = createLearningSet(ls.name, folderId);
            setCount++;

            if (ls.pairs && typeof ls.pairs === 'string') {
              const lines = ls.pairs.split('\n').filter(l => l.trim());
              for (const line of lines) {
                const sepIndex = line.indexOf(' = ');
                if (sepIndex !== -1) {
                  const term = line.substring(0, sepIndex).trim();
                  const def = line.substring(sepIndex + 3).trim();
                  if (term && def) {
                    addPairToSet(setId, term, def);
                    pairCount++;
                  }
                }
              }
            }
          }
        }
      }

      setStatus(`Success! Created ${folderCount} folders, ${setCount} sets, ${pairCount} pairs.`);
      setJsonInput('');
    } catch (e: any) {
      setStatus(`Error: ${e.message}`);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', zIndex: 99999,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#1a1a2e', border: '1px solid #4a4a6a', borderRadius: 12,
        padding: 24, width: '90%', maxWidth: 600, maxHeight: '80vh', overflow: 'auto'
      }}>
        <h2 style={{ color: '#fff', marginBottom: 12, fontSize: 20 }}>JSON Import</h2>
        <textarea
          value={jsonInput}
          onChange={e => setJsonInput(e.target.value)}
          placeholder='Paste your JSON here...'
          style={{
            width: '100%', minHeight: 200, background: '#0d0d1a', color: '#fff',
            border: '1px solid #4a4a6a', borderRadius: 8, padding: 12, fontFamily: 'monospace',
            fontSize: 13, resize: 'vertical'
          }}
        />
        {status && (
          <p style={{ color: status.startsWith('Error') ? '#ff6b6b' : '#6bff6b', marginTop: 8, fontSize: 14 }}>
            {status}
          </p>
        )}
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button onClick={handleApply} style={{
            background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8,
            padding: '8px 20px', cursor: 'pointer', fontSize: 14
          }}>Apply JSON</button>
          <button onClick={onClose} style={{
            background: '#333', color: '#fff', border: '1px solid #555', borderRadius: 8,
            padding: '8px 20px', cursor: 'pointer', fontSize: 14
          }}>Close</button>
        </div>
      </div>
    </div>
  );
};
