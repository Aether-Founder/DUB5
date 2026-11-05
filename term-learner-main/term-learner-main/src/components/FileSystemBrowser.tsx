
import { useState } from 'react';
import { FolderPlus, Plus, Folder, FileText, ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import { useFileSystem, LearningSet } from '../hooks/useFileSystem';

interface FileSystemBrowserProps {
  onSelectLearningSet: (set: LearningSet) => void;
  selectedSetId: string | null;
}

export const FileSystemBrowser = ({ onSelectLearningSet, selectedSetId }: FileSystemBrowserProps) => {
  const {
    currentFolderId,
    setCurrentFolderId,
    createFolder,
    renameFolder,
    deleteFolder,
    createLearningSet,
    renameLearningSet,
    deleteLearningSet,
    getCurrentFolderItems,
    getFolderPath,
  } = useFileSystem();

  const [newFolderName, setNewFolderName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [showNewFolder, setShowNewFolder] = useState(false);

  const { subfolders, sets } = getCurrentFolderItems();
  const folderPath = getFolderPath(currentFolderId);

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      createFolder(newFolderName.trim());
      setNewFolderName('');
      setShowNewFolder(false);
    }
  };

  const handleCreateSet = () => {
    const setId = createLearningSet('Nieuwe leerlijst');
    const newSet: LearningSet = {
      id: setId,
      name: 'Nieuwe leerlijst',
      pairs: [],
      folderId: currentFolderId
    };
    onSelectLearningSet(newSet);
  };

  const handleRename = (id: string, type: 'folder' | 'set') => {
    if (editingName.trim()) {
      if (type === 'folder') renameFolder(id, editingName.trim());
      else renameLearningSet(id, editingName.trim());
      setEditingId(null);
      setEditingName('');
    }
  };

  const startEditing = (id: string, currentName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(id);
    setEditingName(currentName);
  };

  return (
    <div className="glass-container rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-2xl text-primary">Leerbibliotheek</h3>
        <div className="flex gap-2">
          <button onClick={() => setShowNewFolder(true)} className="glass-button p-2 rounded-lg text-primary hover:text-white transition-colors" title="Nieuwe map">
            <FolderPlus size={20} />
          </button>
          <button onClick={handleCreateSet} className="glass-button p-2 rounded-lg text-primary hover:text-white transition-colors" title="Nieuwe leerlijst">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <button onClick={() => setCurrentFolderId(null)} className="hover:text-primary transition-colors">Start</button>
        {folderPath.map((folder) => (
          <span key={folder.id} className="flex items-center gap-2">
            <span>/</span>
            <button onClick={() => setCurrentFolderId(folder.id)} className="hover:text-primary transition-colors">{folder.name}</button>
          </span>
        ))}
      </div>

      {currentFolderId && (
        <button
          onClick={() => {
            const parentId = folderPath[folderPath.length - 2]?.id || null;
            setCurrentFolderId(parentId);
          }}
          className="glass-button px-4 py-2 rounded-lg text-gray-300 flex items-center gap-2 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Terug
        </button>
      )}

      {showNewFolder && (
        <div className="flex gap-2">
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="Mapnaam"
            className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/25 text-white placeholder-gray-400 text-lg focus:border-primary focus:bg-white/15 focus:outline-none focus:ring-0 focus:ring-offset-0 backdrop-blur-sm"
            onKeyPress={(e) => e.key === 'Enter' && handleCreateFolder()}
            autoFocus
          />
          <button onClick={handleCreateFolder} className="glass-button px-4 py-2 rounded-lg text-primary hover:text-white">Aanmaken</button>
          <button onClick={() => setShowNewFolder(false)} className="glass-button px-4 py-2 rounded-lg text-gray-300 hover:text-white">Annuleren</button>
        </div>
      )}

      <div className="space-y-2">
        {subfolders.map((folder) => (
          <div
            key={folder.id}
            className="glass-container rounded-lg p-3 flex items-center justify-between bg-opacity-50 cursor-pointer hover:bg-opacity-70 transition-all"
            onClick={() => editingId !== folder.id && setCurrentFolderId(folder.id)}
          >
            <div className="flex items-center gap-3">
              <Folder size={20} className="text-primary" />
              {editingId === folder.id ? (
                <input
                  type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)}
                  className="glass-input px-2 py-1 rounded text-white text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleRename(folder.id, 'folder')}
                  onBlur={() => handleRename(folder.id, 'folder')}
                  onClick={(e) => e.stopPropagation()} autoFocus
                />
              ) : (
                <span className="text-white font-medium">{folder.name}</span>
              )}
            </div>
            <div className="flex gap-1">
              <button onClick={(e) => startEditing(folder.id, folder.name, e)} className="glass-button p-1 rounded text-gray-300 hover:text-primary"><Edit2 size={14} /></button>
              <button onClick={(e) => { e.stopPropagation(); deleteFolder(folder.id); }} className="glass-button p-1 rounded text-gray-300 hover:text-red-300"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}

        {sets.map((set) => (
          <div
            key={set.id}
            className={`glass-container rounded-lg p-3 flex items-center justify-between cursor-pointer transition-all ${
              selectedSetId === set.id ? 'bg-primary bg-opacity-20 border-primary border' : 'bg-opacity-50 hover:bg-opacity-70'
            }`}
            onClick={() => editingId !== set.id && onSelectLearningSet(set)}
          >
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-primary" />
              {editingId === set.id ? (
                <input
                  type="text" value={editingName} onChange={(e) => setEditingName(e.target.value)}
                  className="glass-input px-2 py-1 rounded text-white text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleRename(set.id, 'set')}
                  onBlur={() => handleRename(set.id, 'set')}
                  onClick={(e) => e.stopPropagation()} autoFocus
                />
              ) : (
                <div>
                  <div className="text-white font-medium">{set.name}</div>
                  <div className="text-xs text-gray-400">{set.pairs.length} begrippen</div>
                </div>
              )}
            </div>
            <div className="flex gap-1">
              <button onClick={(e) => startEditing(set.id, set.name, e)} className="glass-button p-1 rounded text-gray-300 hover:text-primary"><Edit2 size={14} /></button>
              <button onClick={(e) => { e.stopPropagation(); deleteLearningSet(set.id); }} className="glass-button p-1 rounded text-gray-300 hover:text-red-300"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {subfolders.length === 0 && sets.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <p>Deze map is leeg</p>
          <p className="text-sm mt-2">Maak een map of leerlijst aan om te beginnen</p>
        </div>
      )}
    </div>
  );
};
