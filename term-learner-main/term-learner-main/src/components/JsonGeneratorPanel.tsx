import { useState } from 'react';

interface GenPair {
  term: string;
  definition: string;
}

interface GenSet {
  name: string;
  pairs: GenPair[];
}

interface GenFolder {
  name: string;
  learningSets: GenSet[];
}

export const JsonGeneratorPanel = ({ onClose }: { onClose: () => void }) => {
  const [folders, setFolders] = useState<GenFolder[]>([]);
  const [output, setOutput] = useState('');

  const addFolder = () => {
    setFolders(prev => [...prev, { name: '', learningSets: [] }]);
  };

  const updateFolderName = (fi: number, name: string) => {
    setFolders(prev => prev.map((f, i) => i === fi ? { ...f, name } : f));
  };

  const removeFolder = (fi: number) => {
    setFolders(prev => prev.filter((_, i) => i !== fi));
  };

  const addSet = (fi: number) => {
    setFolders(prev => prev.map((f, i) =>
      i === fi ? { ...f, learningSets: [...f.learningSets, { name: '', pairs: [] }] } : f
    ));
  };

  const updateSetName = (fi: number, si: number, name: string) => {
    setFolders(prev => prev.map((f, i) =>
      i === fi ? { ...f, learningSets: f.learningSets.map((s, j) => j === si ? { ...s, name } : s) } : f
    ));
  };

  const removeSet = (fi: number, si: number) => {
    setFolders(prev => prev.map((f, i) =>
      i === fi ? { ...f, learningSets: f.learningSets.filter((_, j) => j !== si) } : f
    ));
  };

  const addPair = (fi: number, si: number) => {
    setFolders(prev => prev.map((f, i) =>
      i === fi ? {
        ...f, learningSets: f.learningSets.map((s, j) =>
          j === si ? { ...s, pairs: [...s.pairs, { term: '', definition: '' }] } : s
        )
      } : f
    ));
  };

  const updatePair = (fi: number, si: number, pi: number, field: 'term' | 'definition', value: string) => {
    setFolders(prev => prev.map((f, i) =>
      i === fi ? {
        ...f, learningSets: f.learningSets.map((s, j) =>
          j === si ? { ...s, pairs: s.pairs.map((p, k) => k === pi ? { ...p, [field]: value } : p) } : s
        )
      } : f
    ));
  };

  const removePair = (fi: number, si: number, pi: number) => {
    setFolders(prev => prev.map((f, i) =>
      i === fi ? {
        ...f, learningSets: f.learningSets.map((s, j) =>
          j === si ? { ...s, pairs: s.pairs.filter((_, k) => k !== pi) } : s
        )
      } : f
    ));
  };

  const generate = () => {
    const json = {
      folders: folders.map(f => ({
        name: f.name,
        learningSets: f.learningSets.map(s => ({
          name: s.name,
          pairs: s.pairs.map(p => `${p.term} = ${p.definition}`).join('\n')
        }))
      }))
    };
    setOutput(JSON.stringify(json, null, 2));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  const s = {
    input: {
      background: '#0d0d1a', color: '#fff', border: '1px solid #4a4a6a',
      borderRadius: 6, padding: '6px 10px', fontSize: 13, width: '100%'
    } as React.CSSProperties,
    btn: {
      background: '#6366f1', color: '#fff', border: 'none', borderRadius: 6,
      padding: '6px 14px', cursor: 'pointer', fontSize: 13
    } as React.CSSProperties,
    btnDanger: {
      background: '#dc2626', color: '#fff', border: 'none', borderRadius: 6,
      padding: '4px 10px', cursor: 'pointer', fontSize: 12
    } as React.CSSProperties,
    btnSecondary: {
      background: '#333', color: '#fff', border: '1px solid #555', borderRadius: 6,
      padding: '6px 14px', cursor: 'pointer', fontSize: 13
    } as React.CSSProperties,
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', zIndex: 99999,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#1a1a2e', border: '1px solid #4a4a6a', borderRadius: 12,
        padding: 24, width: '90%', maxWidth: 700, maxHeight: '85vh', overflow: 'auto'
      }}>
        <h2 style={{ color: '#fff', marginBottom: 12, fontSize: 20 }}>JSON Generator</h2>

        {folders.map((folder, fi) => (
          <div key={fi} style={{ border: '1px solid #4a4a6a', borderRadius: 8, padding: 12, marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
              <span style={{ color: '#aaa', fontSize: 13 }}>Folder:</span>
              <input value={folder.name} onChange={e => updateFolderName(fi, e.target.value)}
                placeholder="Folder name" style={s.input} />
              <button onClick={() => removeFolder(fi)} style={s.btnDanger}>✕</button>
            </div>

            {folder.learningSets.map((set, si) => (
              <div key={si} style={{ border: '1px solid #333', borderRadius: 6, padding: 10, marginBottom: 8, marginLeft: 16 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ color: '#aaa', fontSize: 12 }}>Set:</span>
                  <input value={set.name} onChange={e => updateSetName(fi, si, e.target.value)}
                    placeholder="Set name" style={s.input} />
                  <button onClick={() => removeSet(fi, si)} style={s.btnDanger}>✕</button>
                </div>

                {set.pairs.map((pair, pi) => (
                  <div key={pi} style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4, marginLeft: 16 }}>
                    <input value={pair.term} onChange={e => updatePair(fi, si, pi, 'term', e.target.value)}
                      placeholder="Term" style={{ ...s.input, width: '40%' }} />
                    <span style={{ color: '#888' }}>=</span>
                    <input value={pair.definition} onChange={e => updatePair(fi, si, pi, 'definition', e.target.value)}
                      placeholder="Definition" style={{ ...s.input, width: '40%' }} />
                    <button onClick={() => removePair(fi, si, pi)} style={s.btnDanger}>✕</button>
                  </div>
                ))}

                <button onClick={() => addPair(fi, si)} style={{ ...s.btnSecondary, marginLeft: 16, marginTop: 4 }}>+ Pair</button>
              </div>
            ))}

            <button onClick={() => addSet(fi)} style={{ ...s.btnSecondary, marginLeft: 16 }}>+ Learning Set</button>
          </div>
        ))}

        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button onClick={addFolder} style={s.btn}>+ Folder</button>
          <button onClick={generate} style={{ ...s.btn, background: '#059669' }}>Generate JSON</button>
          <button onClick={onClose} style={s.btnSecondary}>Close</button>
        </div>

        {output && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ color: '#aaa', fontSize: 13 }}>Generated JSON:</span>
              <button onClick={copyToClipboard} style={s.btnSecondary}>Copy</button>
            </div>
            <pre style={{
              background: '#0d0d1a', color: '#6bff6b', padding: 12, borderRadius: 8,
              fontSize: 12, overflow: 'auto', maxHeight: 200, whiteSpace: 'pre-wrap'
            }}>{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
