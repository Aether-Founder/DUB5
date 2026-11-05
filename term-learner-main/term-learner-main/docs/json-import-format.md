# JSON Import/Export Format

## Console Commands

Open the browser console (F12 → Console) and run:

| Command | Description |
|---------|-------------|
| `showJsonImport()` | Opens a panel to paste and apply JSON to create folders & learning sets |
| `showJsonGenerator()` | Opens a visual builder to create JSON with buttons, then copy the output |

Both panels are overlay modals. Press **Close** to dismiss.

## JSON Format

```json
{
  "folders": [
    {
      "name": "Folder Name",
      "learningSets": [
        {
          "name": "Learning Set Name",
          "pairs": "term1 = definition1\nterm2 = definition2\nterm3 = definition3"
        },
        {
          "name": "Another Set",
          "pairs": "apple = appel\nhouse = huis"
        }
      ]
    },
    {
      "name": "Another Folder",
      "learningSets": [
        {
          "name": "Set In Another Folder",
          "pairs": "cat = kat\ndog = hond"
        }
      ]
    }
  ]
}
```

## Structure

- **folders** (array): List of folders to create
  - **name** (string): Name of the folder
  - **learningSets** (array): Learning sets inside this folder
    - **name** (string): Name of the learning set
    - **pairs** (string): Term-definition pairs separated by newlines (`\n`). Each pair uses ` = ` (space-equals-space) as separator between term and definition.

## Rules

- Each folder can contain multiple learning sets
- Each learning set contains pairs in `term = definition` format
- Pairs are separated by `\n` (newline) in the JSON string
- The separator between term and definition is ` = ` (space, equals sign, space)
- Empty lines are ignored
- All folders are created at the root level

## Example: Minimal

```json
{
  "folders": [
    {
      "name": "Biology",
      "learningSets": [
        {
          "name": "Cell Parts",
          "pairs": "nucleus = controls the cell\nmitochondria = powerhouse of the cell"
        }
      ]
    }
  ]
}
```
