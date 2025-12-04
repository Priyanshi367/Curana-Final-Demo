# Chatbot Widget Component

A global chatbot widget for the Curana Hub application with healthcare-themed design.

## Features

### ✅ Two States + Full Page

1. **Collapsed Bubble**
   - Small floating round button at bottom-right
   - Healthcare-themed icon (Stethoscope) combining medical + chat
   - Shows unread message count badge
   - Click to open mini chatbox
   - Curana gradient background (blue to purple)

2. **Mini Chatbox**
   - Compact 400px × 500px floating panel
   - Header with Curana gradient and stethoscope icon
   - Scrollable message list
   - Input field with send button
   - Expand button navigates to full chat page
   - Close button returns to collapsed state
   - Smooth animations

3. **Full Chat Page** (`/chat`)
   - Complete page with DashboardLayout
   - Back button to return to previous page
   - Quick action buttons (Find benefits, Submit expenses, HR contact, Policies, Healthcare info)
   - Spacious message area with avatars
   - Professional layout with Curana branding
   - Stethoscope icon for bot avatar
   - User initials (SK) for user avatar

### ✅ Global Visibility

- Visible on all pages except login
- Persists across React Router navigation
- Fixed positioning at bottom-right
- High z-index (z-50) to stay on top

### ✅ Curana Branding

- Uses Curana gradient (`var(--header-gradient)`) - blue to purple
- Matches header and announcement styling
- Healthcare-themed stethoscope icon
- Consistent with overall application design

### ✅ Smooth Transitions

- Fade-in/slide-in animations
- Zoom effect for expanded view
- Hover states on all interactive elements
- Auto-scroll to latest message

## Usage

The chatbot is already integrated globally in `App.tsx` and will appear on all pages except:
- Login page (`/login`)
- Chat page itself (`/chat`)

When users click the expand button in the mini chatbox, they are navigated to `/chat` for the full experience.

### Customization

You can customize the chatbot by modifying:

1. **Initial Messages**: Edit the `messages` state in `ChatbotWidget.tsx`
2. **Quick Actions**: Modify the quick action buttons in the expanded view
3. **Bot Responses**: Update the `handleSendMessage` function to integrate with your AI backend
4. **Styling**: Adjust Tailwind classes for colors, sizes, and spacing

### API Integration

To connect to a real AI backend, replace the simulated response in `handleSendMessage`:

```typescript
// Replace this:
setTimeout(() => {
  const botResponse: Message = {
    id: (Date.now() + 1).toString(),
    text: "Thank you for your message. I'm processing your request...",
    sender: "bot",
    timestamp: new Date(),
  };
  setMessages((prev) => [...prev, botResponse]);
}, 1000);

// With your API call:
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message: inputValue }),
});
const data = await response.json();
setMessages((prev) => [...prev, {
  id: Date.now().toString(),
  text: data.response,
  sender: "bot",
  timestamp: new Date(),
}]);
```

## Dependencies

- React
- Tailwind CSS
- ShadCN UI components (Button, Input, Card)
- Lucide React icons
- React Router (for location detection)

## File Structure

```
src/
├── components/
│   └── ChatbotWidget.tsx       # Floating widget (collapsed + mini)
├── pages/
│   └── ChatPage.tsx            # Full chat page
└── App.tsx                      # Global integration + routing
```

## State Management

Both components use local React state for:
- `chatState`: Current view state (collapsed/mini) - widget only
- `messages`: Array of chat messages
- `inputValue`: Current input field value
- `unreadCount`: Badge count on collapsed bubble - widget only

## Navigation

- Collapsed bubble → Mini chatbox (state change)
- Mini chatbox expand → Full chat page (`navigate('/chat')`)
- Full chat page back button → Previous page (`navigate(-1)`)

## Accessibility

- Proper ARIA labels on buttons
- Keyboard support (Enter to send)
- Focus management
- Semantic HTML structure

## Browser Support

Works on all modern browsers that support:
- CSS Grid & Flexbox
- CSS Custom Properties
- ES6+ JavaScript
