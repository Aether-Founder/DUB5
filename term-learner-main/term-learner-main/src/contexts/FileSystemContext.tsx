
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface LearningPair {
  term: string;
  definition: string;
}

export interface LearningSet {
  id: string;
  name: string;
  pairs: LearningPair[];
  folderId: string | null;
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
}

interface FileSystemContextType {
  folders: Folder[];
  learningSets: LearningSet[];
  currentFolderId: string | null;
  setCurrentFolderId: (id: string | null) => void;
  createFolder: (name: string, parentId?: string | null) => string;
  renameFolder: (folderId: string, newName: string) => void;
  deleteFolder: (folderId: string) => void;
  createLearningSet: (name: string, folderId?: string | null) => string;
  renameLearningSet: (setId: string, newName: string) => void;
  deleteLearningSet: (setId: string) => void;
  moveLearningSet: (setId: string, folderId: string | null) => void;
  addPairToSet: (setId: string, term: string, definition: string) => void;
  removePairFromSet: (setId: string, pairIndex: number) => void;
  getCurrentFolderItems: () => { subfolders: Folder[]; sets: LearningSet[] };
  getFolderPath: (folderId: string | null) => Folder[];
}

const FileSystemContext = createContext<FileSystemContextType | undefined>(undefined);

const FILESYSTEM_STORAGE_KEY = 'stellar-learning-filesystem';

export const FileSystemProvider = ({ children }: { children: ReactNode }) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [learningSets, setLearningSets] = useState<LearningSet[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);

  // Load from curriculum.json
  useEffect(() => {
    fetch('/curriculum.json')
      .then(response => response.json())
      .then(data => {
        // Convert curriculum to folder structure
        const newFolders: Folder[] = [];
        const newSets: LearningSet[] = [];

        data.subjects.forEach((subject: any) => {
          // Create subject folder
          const subjectFolderId = `subject-${subject.id}`;
          newFolders.push({
            id: subjectFolderId,
            name: subject.name,
            parentId: null
          });

          // Create chapters as subfolders
          if (subject.chapters && subject.chapters.length > 0) {
            subject.chapters.forEach((chapter: any) => {
              const chapterFolderId = `chapter-${chapter.id}`;
              newFolders.push({
                id: chapterFolderId,
                name: chapter.name,
                parentId: subjectFolderId
              });

              // Create learning sets
              if (chapter.learningSets && chapter.learningSets.length > 0) {
                chapter.learningSets.forEach((set: any) => {
                  newSets.push({
                    id: set.id,
                    name: set.name,
                    pairs: set.pairs,
                    folderId: chapterFolderId
                  });
                });
              }
            });
          }
        });

        setFolders(newFolders);
        setLearningSets(newSets);
        console.log('FileSystemProvider: Loaded from curriculum.json:', { folders: newFolders.length, sets: newSets.length });
      })
      .catch(error => {
        console.error('Failed to load curriculum.json:', error);
        // Fallback to localStorage if curriculum.json fails
        const savedData = localStorage.getItem(FILESYSTEM_STORAGE_KEY);
        if (savedData) {
          try {
            const { folders: savedFolders, learningSets: savedSets } = JSON.parse(savedData);
            setFolders(savedFolders || []);
            setLearningSets(savedSets || []);
            console.log('FileSystemProvider: Loaded from storage fallback:', { folders: savedFolders?.length, sets: savedSets?.length });
          } catch (error) {
            console.error('Failed to load filesystem data from storage:', error);
          }
        }
      });
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (folders.length > 0 || learningSets.length > 0) {
      localStorage.setItem(FILESYSTEM_STORAGE_KEY, JSON.stringify({
        folders,
        learningSets
      }));
      console.log('FileSystemProvider: Saved to storage:', { folders: folders.length, sets: learningSets.length });
    }
  }, [folders, learningSets]);

  const createFolder = (name: string, parentId: string | null = null) => {
    const newFolder: Folder = {
      id: Date.now().toString(),
      name,
      parentId: parentId || currentFolderId
    };
    setFolders(prev => [...prev, newFolder]);
    return newFolder.id;
  };

  const renameFolder = (folderId: string, newName: string) => {
    setFolders(prev => prev.map(folder => 
      folder.id === folderId ? { ...folder, name: newName } : folder
    ));
  };

  const deleteFolder = (folderId: string) => {
    // Move learning sets from deleted folder to root
    setLearningSets(prev => prev.map(set => 
      set.folderId === folderId ? { ...set, folderId: null } : set
    ));
    // Delete folder and its subfolders
    const foldersToDelete = getAllSubfolders(folderId);
    setFolders(prev => prev.filter(folder => !foldersToDelete.includes(folder.id)));
  };

  const getAllSubfolders = (parentId: string): string[] => {
    const subfolders = folders.filter(folder => folder.parentId === parentId);
    const result = [parentId];
    subfolders.forEach(subfolder => {
      result.push(...getAllSubfolders(subfolder.id));
    });
    return result;
  };

  const createLearningSet = (name: string, folderId: string | null = null) => {
    const newSet: LearningSet = {
      id: Date.now().toString(),
      name,
      pairs: [],
      folderId: folderId || currentFolderId
    };
    console.log('FileSystemProvider: Creating new set:', newSet);
    setLearningSets(prev => {
      const updated = [...prev, newSet];
      console.log('FileSystemProvider: Updated learning sets after creation:', updated.length);
      return updated;
    });
    return newSet.id;
  };

  const renameLearningSet = (setId: string, newName: string) => {
    setLearningSets(prev => prev.map(set => 
      set.id === setId ? { ...set, name: newName } : set
    ));
  };

  const deleteLearningSet = (setId: string) => {
    setLearningSets(prev => prev.filter(set => set.id !== setId));
  };

  const moveLearningSet = (setId: string, folderId: string | null) => {
    setLearningSets(prev => prev.map(set => 
      set.id === setId ? { ...set, folderId } : set
    ));
  };

  const addPairToSet = (setId: string, term: string, definition: string) => {
    console.log(`FileSystemProvider: Adding pair to set ${setId}: ${term} = ${definition}`);
    
    const newPair: LearningPair = { term, definition };
    
    setLearningSets(prev => {
      console.log(`FileSystemProvider: Current sets when adding pair:`, prev.map(s => ({ id: s.id, name: s.name, pairs: s.pairs.length })));
      
      const targetSet = prev.find(set => set.id === setId);
      if (!targetSet) {
        console.error(`FileSystemProvider: Set with ID ${setId} not found!`);
        return prev;
      }
      
      console.log(`FileSystemProvider: Found target set, adding pair`);
      
      const updated = prev.map(set => 
        set.id === setId ? { ...set, pairs: [...set.pairs, newPair] } : set
      );
      
      const updatedSet = updated.find(set => set.id === setId);
      console.log(`FileSystemProvider: Set after adding pair:`, updatedSet);
      
      return updated;
    });
  };

  const removePairFromSet = (setId: string, pairIndex: number) => {
    setLearningSets(prev => prev.map(set => 
      set.id === setId ? 
        { ...set, pairs: set.pairs.filter((_, index) => index !== pairIndex) } : 
        set
    ));
  };

  const getCurrentFolderItems = () => {
    const subfolders = folders.filter(folder => folder.parentId === currentFolderId);
    const sets = learningSets.filter(set => set.folderId === currentFolderId);
    return { subfolders, sets };
  };

  const getFolderPath = (folderId: string | null): Folder[] => {
    if (!folderId) return [];
    const folder = folders.find(f => f.id === folderId);
    if (!folder) return [];
    return [...getFolderPath(folder.parentId), folder];
  };

  const value: FileSystemContextType = {
    folders,
    learningSets,
    currentFolderId,
    setCurrentFolderId,
    createFolder,
    renameFolder,
    deleteFolder,
    createLearningSet,
    renameLearningSet,
    deleteLearningSet,
    moveLearningSet,
    addPairToSet,
    removePairFromSet,
    getCurrentFolderItems,
    getFolderPath
  };

  return (
    <FileSystemContext.Provider value={value}>
      {children}
    </FileSystemContext.Provider>
  );
};

export const useFileSystem = () => {
  const context = useContext(FileSystemContext);
  if (context === undefined) {
    throw new Error('useFileSystem must be used within a FileSystemProvider');
  }
  return context;
};
