# Fix Category Filtering and Routing Issues

## Steps to Complete:

1. [ ] Fix handleNavigate function in Header.jsx to always navigate to /shopping/listing with proper category search params
2. [ ] Ensure consistent filter handling between URL params and sessionStorage
3. [ ] Test the category filtering functionality

## Current Issues Identified:
- handleNavigate only sets search params when already on listing page
- Navigation to category pages doesn't properly set URL filters
- Filtering relies on both URL params and sessionStorage which may cause inconsistency

## Planned Changes:
- Update Header.jsx handleNavigate to always navigate to listing page with category search params
- Remove sessionStorage dependency for category filters
- Ensure URL params are the single source of truth for filters
