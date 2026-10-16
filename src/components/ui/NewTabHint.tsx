/**
 * Screen-reader warning for links that open a new tab (RGAA 13.2 good practice).
 * Use the label directly when the link's name comes from `aria-label`/`title`.
 */
export const NEW_TAB_LABEL = 'opens in a new tab';

// The separating space lives outside the hidden span so it is never trimmed
// out of the accessible name.
const NewTabHint = () => (
  <>
    {' '}
    <span className='sr-only'>({NEW_TAB_LABEL})</span>
  </>
);

export default NewTabHint;
