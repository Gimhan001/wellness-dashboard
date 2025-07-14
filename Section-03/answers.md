## Section 3: Conceptual Questions

1. I’d start with a flexible layout—use CSS Grid or Flexbox so tabs wrap or scroll horizontally on narrow screens. 
   On desktop, all tabs can sit side by side; on mobile, I’d either collapse overflow into a swipeable container or 
   convert excess tabs into a “More” dropdown. Touch targets should be at least 44×44 px, and active states clearly highlighted 
   so users always know which panel they’re on.

2. I’d lean on a windowing library like `react-window` or `react-virtualized` to only render visible items plus a small buffer. 
   Memoizing individual row components and extracting stable `key` props prevents unnecessary re-renders. If logs update frequently, 
   I’d batch updates or debounce filter inputs so we’re not recalculating the visible window on every keystroke.

3. For both components, I’d add proper ARIA roles and attributes:  
   - **Dropdown**: `role="button"`, `aria-haspopup="menu"`, `aria-expanded` toggled on open/close, and `role="menuitem"` on each option.  
   - **Modal**: `role="dialog"` with `aria-modal="true"` and a meaningful `aria-labelledby` or `aria-describedby`.  
   In both cases, I’d trap focus inside the component, restore focus on close, and support standard keys (Tab to move focus, Enter/Escape to select or dismiss).

4. Where possible, store JWTs in **httpOnly, secure** cookies so JavaScript can’t read them and they auto-attach on requests. If you must use `localStorage`, 
   keep tokens short-lived, pair them with a rotating refresh token, and watch for XSS vulnerabilities. Always validate tokens on the server, use HTTPS everywhere, 
   and clear sensitive state on logout.

5. Where possible, store JWTs in **httpOnly, secure** cookies so JavaScript can’t read them and they auto-attach on requests. If you must use `localStorage`, keep 
   tokens short-lived, pair them with a rotating refresh token, and watch for XSS vulnerabilities. Always validate tokens on the server, use HTTPS everywhere, and 
   clear sensitive state on logout. 


## React Native

1. **View vs Text vs ScrollView**  
   - `View`: a basic box/container (like `<div>`).  
   - `Text`: only for displaying text—you can’t put raw strings in a `View`.  
   - `ScrollView`: scrollable area that renders all children (fine for small content).

2. **Secure token storage**  
   - Use `react-native-keychain` or `expo-secure-store` (secure OS storage).  
   - Don’t store tokens in `AsyncStorage`.  
   - Handle token refresh on 401 via an HTTP interceptor.

3. **`navigate` vs `push`**  
   - `navigate('Screen')`: goes to that screen once (won’t duplicate if you’re already there).  
   - `push('Screen')`: always adds a new copy of that screen on the stack.

4. **Performance tips**  
   - Use `FlatList` for long lists instead of `ScrollView`.  
   - Wrap components in `React.memo` and handlers in `useCallback`.  
   - Enable Hermes for faster JS startup.  
   - Use `useNativeDriver` for animations to keep them smooth.