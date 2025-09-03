# Physics Watercooler - Alphabetization Guide

## Alphabetization Rules

### For People (Names)
- Sort by **last name** first, then first name
- Examples:
  - Arno Penzias → "Penzias, Arno" → P section
  - Adam Riess → "Riess, Adam" → R section  
  - Vera Rubin → "Rubin, Vera" → R section
  - Brian Schmidt → "Schmidt, Brian" → S section

### For Concepts/Terms
- Sort by **first letter** of the term
- Examples:
  - Panspermia → P section
  - Phosphine → P section
  - Planck Mission → P section
  - Proxima Centauri → P section

## Current Letter P Order (Correct)
1. Panspermia (concept - starts with "P")
2. Arno Penzias (person - last name "Penzias")
3. Saul Perlmutter (person - last name "Perlmutter") 
4. Phosphine (concept - starts with "P")
5. Planck Mission (concept - starts with "P")
6. Proxima Centauri (concept - starts with "P")

## Current Letter R Order (Correct)
1. Rare Earth Hypothesis (concept - starts with "R")
2. Recombination Epoch (concept - starts with "R")
3. Redshift (concept - starts with "R")
4. Adam Riess (person - last name "Riess")
5. Vera Rubin (person - last name "Rubin")

## Implementation Notes
- When adding new entries, determine if it's a person or concept
- For people: extract last name and sort accordingly
- For concepts: use first letter/word
- Maintain this order when adding new content
- Consider creating an automated sorting system for future scalability

## Future Automation Suggestions
- Create a JSON file with entry metadata (type: person/concept, sort_key, etc.)
- Use JavaScript to automatically sort entries on page load
- Implement a content management system for easier additions

